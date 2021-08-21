/*
 * Describe the settings related to BeforeInstall,
 *  which is one of the deployment lifecycle event hooks.
 */

import { CodeDeploy } from 'aws-sdk'

import { WebClient } from '@slack/web-api'

const codeDeploy = new CodeDeploy({ apiVersion: '2014-10-06' })

import { createSlackMessage } from './createSlackMessage'

exports.handler = (event: any, context: any, callback: any) => {

  /**
   * Response CodeDeploy lifecycle event
   */
  const { DeploymentId, LifecycleEventHookExecutionId } = event

  /**
   * API Client for Slack
   */
  const web = new WebClient(process.env.SLACK_API_TOKEN)

  /**
   * 'Succeeded' or 'Failed'
   */
  const STATUS = 'Succeeded'

  const params = {
    deploymentId:                  DeploymentId,
    lifecycleEventHookExecutionId: LifecycleEventHookExecutionId,
    status:                        STATUS
  }

  /**
   * Pass AWS CodeDeploy the prepared validation test results.
   */
  codeDeploy.putLifecycleEventHookExecutionStatus(params, (err, _) => {
    if (err) { callback('Validation test failed') }
    else {
      codeDeploy.getDeployment({ deploymentId: DeploymentId }, (deploymentErr, getDeploymentOutput) => {
        if (deploymentErr) { console.log(deploymentErr) }
        else {
          codeDeploy.getDeploymentGroup({
            applicationName:     getDeploymentOutput.deploymentInfo?.applicationName!,
            deploymentGroupName: getDeploymentOutput.deploymentInfo?.deploymentGroupName!
          }, (deploymentGroupErr, getDeploymentGroupOutput) => {
            if (deploymentGroupErr) { console.log(deploymentGroupErr) }
            else {
              const ecsService = getDeploymentGroupOutput.deploymentGroupInfo?.ecsServices?.shift()

              codeDeploy.getDeploymentTarget({
                deploymentId: DeploymentId,
                targetId:     `${ecsService?.clusterName}:${ecsService?.serviceName}`
              }, (deploymentTargetErr, getDeploymentTargetOutput) => {
                if (deploymentTargetErr) { console.log(deploymentTargetErr) }
                else {
                  const deploymentGroupInfo = getDeploymentGroupOutput.deploymentGroupInfo
                  const taskSet             = getDeploymentTargetOutput.deploymentTarget?.ecsTarget?.taskSetsInfo?.shift()

                  const params = createSlackMessage(deploymentGroupInfo, taskSet)
                  web.chat.postMessage(params).then(
                    // Validation succeeded.
                    callback(null, 'Validation test succeeded')
                  ).catch(console.error)
                }
              })
            }
          })
        }
      })
    }
  })
}

//############### MEMO #######################
/*
======== codeDeploy.getDeploymentTarget ============
{
  "identifer": "ecs-svc/3605701707267980476",
  "desiredCount": 1,
  "pendingCount": 0,
  "runningCount": 1,
  "status": "PRIMARY",
  "trafficWeight": 100,
  "targetGroup": {
    "name": "stg-sg-green-group"
  },
  "taskSetLabel": "Blue"
}
========- codeDeploy.getDeploymentGroup ============
deploymentGroupInfo: {
  applicationName: 'stg-fargate-codedeploy',
  deploymentGroupId: '67973384-8142-4cc1-be70-adaa1d7d65c6',
  deploymentGroupName: 'stg-fargate-codedeploy-group',
  deploymentConfigName: 'CodeDeployDefault.ECSAllAtOnce',
  ec2TagFilters: [],
  onPremisesInstanceTagFilters: [],
  autoScalingGroups: [],
  serviceRoleArn: 'arn:aws:iam::102727849071:role/CodeDeployRoleForECS',
  triggerConfigurations: [],
  autoRollbackConfiguration: { enabled: true, events: [Array] },
  deploymentStyle: {
    deploymentType: 'BLUE_GREEN',
    deploymentOption: 'WITH_TRAFFIC_CONTROL'
  },
  outdatedInstancesStrategy: 'UPDATE',
  blueGreenDeploymentConfiguration: {
    terminateBlueInstancesOnDeploymentSuccess: [Object],
    deploymentReadyOption: [Object]
  },
  loadBalancerInfo: { targetGroupPairInfoList: [Array] },
  lastAttemptedDeployment: {
    deploymentId: 'd-I0ODAQ1CC',
    status: 'InProgress',
    createTime: 2021-08-21T11:13:37.440Z
  },
  computePlatform: 'ECS',
  ecsServices: [{
    "serviceName": "stg-sample-canary-deploy-service",
    "clusterName": "stg-sample-canary-deploy-cluster"
  }]
}
 */

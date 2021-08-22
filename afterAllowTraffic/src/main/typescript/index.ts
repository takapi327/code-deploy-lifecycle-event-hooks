/*
 * Describe the settings related to AfterInstall,
 * which is one of the deployment lifecycle event hooks.
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
  codeDeploy.putLifecycleEventHookExecutionStatus(params, (err, data) => {
    if (err) { console.log(err) }
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
                  console.log('======================================')
                  console.log(JSON.stringify(getDeploymentTargetOutput.deploymentTarget?.ecsTarget))
                  const params = createSlackMessage()
                  web.chat.postMessage(params).then(
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

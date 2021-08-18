/*
 * Describe the settings related to BeforeInstall,
 *  which is one of the deployment lifecycle event hooks.
 */

import { CodeDeploy } from 'aws-sdk'

const codeDeploy = new CodeDeploy({apiVersion: '2014-10-06'})

exports.handler = (event: any, context: any, callback: any) => {

  const { DeploymentId, LifecycleEventHookExecutionId } = event

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
    if (err) {
      // Validation failed.
      callback('Validation test failed');
    } else {
      codeDeploy.getDeploymentTarget({
        deploymentId: DeploymentId,
        targetId:     "stg-sample-canary-deploy-cluster:stg-sample-canary-deploy-service"
      }, (err, data: CodeDeploy.Types.GetDeploymentTargetOutput) => {
        if (err) {
          console.log("================================")
          console.log("================================")
          console.log(err)
          console.log("================================")
          console.log("================================")
        } else {
          console.log("==========batchGetApplications======================")
          console.log("================================")
          console.log(JSON.stringify(data.deploymentTarget?.ecsTarget?.taskSetsInfo))
          /**
           * {
           *     "identifer": "ecs-svc/3605701707267980476",
           *     "desiredCount": 1,
           *     "pendingCount": 0,
           *     "runningCount": 1,
           *     "status": "PRIMARY",
           *     "trafficWeight": 100,
           *     "targetGroup": {
           *         "name": "stg-sg-green-group"
           *     },
           *     "taskSetLabel": "Blue"
           * }
           */
        }
      })

      // Validation succeeded.
      callback(null, 'Validation test succeeded');
    }
  })
}

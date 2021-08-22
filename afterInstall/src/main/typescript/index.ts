/*
 * Describe the settings related to AfterInstall,
 * which is one of the deployment lifecycle event hooks.
 */

import { CodeDeploy } from 'aws-sdk'

const codeDeploy = new CodeDeploy({ apiVersion: '2014-10-06' })

exports.handler = (event: any, context: any, callback: any) => {

  /**
   * Response CodeDeploy lifecycle event
   */
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
    if (err) { console.log(err) }
    else {
      console.log('===============putLifecycleEventHookExecutionStatus===================')
      console.log(data)
      callback(null, 'Validation test succeeded')
    }
  })
}

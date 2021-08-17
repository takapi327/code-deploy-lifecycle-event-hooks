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
      // Validation succeeded.
      callback(null, 'Validation test succeeded');
    }
  })
}

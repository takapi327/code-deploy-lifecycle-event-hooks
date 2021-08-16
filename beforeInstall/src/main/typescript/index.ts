/*
 * Describe the settings related to BeforeInstall,
 *  which is one of the deployment lifecycle event hooks.
 */

import { CodeDeploy } from 'aws-sdk'

const codeDeploy = new CodeDeploy({apiVersion: '2014-10-06'})

exports.handler = async (event: any, context: any, callback: any) => {

  const { DeploymentId, LifecycleEventHookExecutionId } = event

  /**
   * 'Succeeded' or 'Failed'
   */
  const STATUS = 'Succeeded'

  /**
   * Pass AWS CodeDeploy the prepared validation test results.
   */
  return await codeDeploy.putLifecycleEventHookExecutionStatus({
    deploymentId:                  DeploymentId,
    lifecycleEventHookExecutionId: LifecycleEventHookExecutionId,
    status:                        STATUS
  }).promise()
}

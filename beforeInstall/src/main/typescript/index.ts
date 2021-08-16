/*
 * Describe the settings related to BeforeInstall,
 *  which is one of the deployment lifecycle event hooks.
 */

import { CodeDeploy } from 'aws-sdk'

const codedeploy = new CodeDeploy({apiVersion: '2014-10-06'})

exports.handler = (event, context, callback) => {

}

import { CodeDeploy } from "aws-sdk"

export function createSlackMessage(
  deploymentGroupInfo: CodeDeploy.DeploymentGroupInfo | undefined,
  taskSet:             CodeDeploy.ECSTaskSet          | undefined
): any {
  return {
    channel: process.env.SLACK_CHANNEL!,
    blocks:  [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "Notification of CodeDeploy's BeforInstall event",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*applicationName:*"
          },
          {
            "type": "mrkdwn",
            "text": deploymentGroupInfo?.applicationName
          },
          {
            "type": "mrkdwn",
            "text": "*deploymentGroupName:*"
          },
          {
            "type": "mrkdwn",
            "text": deploymentGroupInfo?.deploymentGroupName
          },
          {
            "type": "mrkdwn",
            "text": "*deploymentConfigName:*"
          },
          {
            "type": "mrkdwn",
            "text": deploymentGroupInfo?.deploymentConfigName
          },
          {
            "type": "mrkdwn",
            "text": "*deploymentStyle:*"
          },
          {
            "type": "mrkdwn",
            "text": deploymentGroupInfo?.deploymentStyle?.deploymentType
          },
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": `computePlatform: ${deploymentGroupInfo?.computePlatform}`,
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `>desiredCount: ${taskSet?.desiredCount}\n>pendingCount: ${taskSet?.pendingCount}\n>runningCount: ${taskSet?.runningCount}\n>status: ${taskSet?.status}\n>taskSetLabel: ${taskSet?.taskSetLabel}`
        }
      }
    ]
  }
}
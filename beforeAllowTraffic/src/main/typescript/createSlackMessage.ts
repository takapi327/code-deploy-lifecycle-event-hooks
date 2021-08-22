import { CodeDeploy } from "aws-sdk"

export function createSlackMessage(
  ecsTarget: CodeDeploy.ECSTarget | undefined,
): any {
  return {
    channel: process.env.SLACK_CHANNEL!,
    text:    'CodeDeployのBeforeAllowTrafficアクションの通知',
    blocks: [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "CodeDeployのBeforeAllowTrafficアクションの通知",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "ロードバランサーへの登録を行います",
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
            "text": "*LoadBalancer Name:*"
          },
          {
            "type": "mrkdwn",
            "text": "stg-sample-canary-deploy"
          },
          {
            "type": "mrkdwn",
            "text": "*LoadBalancer TargetGroup Name:*"
          },
          {
            "type": "mrkdwn",
            "text": ecsTarget?.taskSetsInfo?.shift()?.targetGroup?.name
          }
        ]
      },
      {
        "type": "divider"
      },
    ]
  }
}
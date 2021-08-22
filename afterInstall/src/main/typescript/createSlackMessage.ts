import { CodeDeploy } from "aws-sdk"

export function createSlackMessage(
  blueTaskSet:  CodeDeploy.ECSTaskSet | undefined,
  greenTaskSet: CodeDeploy.ECSTaskSet | undefined
): any {
  return {
    channel: process.env.SLACK_CHANNEL!,
    text:    'CodeDeployのAfterInstallアクションの通知',
    blocks: [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "CodeDeployのAfterInstallアクションの通知",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "CodeDeployのInstallが完了しました",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "タスクセットのアクティビティ",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": `TaskSetLabel: ${blueTaskSet?.taskSetLabel}`,
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
            "text": "*Status:*"
          },
          {
            "type": "mrkdwn",
            "text": blueTaskSet?.status
          },
          {
            "type": "mrkdwn",
            "text": "*TrafficWeight:*"
          },
          {
            "type": "mrkdwn",
            "text": `${blueTaskSet?.trafficWeight}%`
          },
          {
            "type": "mrkdwn",
            "text": "*DesiredCount:*"
          },
          {
            "type": "mrkdwn",
            "text": blueTaskSet?.desiredCount
          },
          {
            "type": "mrkdwn",
            "text": "*PendingCount:*"
          },
          {
            "type": "mrkdwn",
            "text": blueTaskSet?.pendingCount
          },
          {
            "type": "mrkdwn",
            "text": "*RunningCount:*"
          },
          {
            "type": "mrkdwn",
            "text": blueTaskSet?.runningCount
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": `TaskSetLabel: ${greenTaskSet?.taskSetLabel}`,
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
            "text": "*Status:*"
          },
          {
            "type": "mrkdwn",
            "text": greenTaskSet?.status
          },
          {
            "type": "mrkdwn",
            "text": "*TrafficWeight:*"
          },
          {
            "type": "mrkdwn",
            "text": `${greenTaskSet?.trafficWeight}%`
          },
          {
            "type": "mrkdwn",
            "text": "*DesiredCount:*"
          },
          {
            "type": "mrkdwn",
            "text": greenTaskSet?.desiredCount
          },
          {
            "type": "mrkdwn",
            "text": "*PendingCount:*"
          },
          {
            "type": "mrkdwn",
            "text": greenTaskSet?.pendingCount
          },
          {
            "type": "mrkdwn",
            "text": "*RunningCount:*"
          },
          {
            "type": "mrkdwn",
            "text": greenTaskSet?.runningCount
          }
        ]
      },
      {
        "type": "divider"
      }
    ]
  }
}
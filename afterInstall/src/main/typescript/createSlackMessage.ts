export function createSlackMessage(): any {
  return {
    channel: process.env.SLACK_CHANNEL!,
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
        "type": "divider"
      },
    ]
  }
}
export function createSlackMessage(): any {
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
          "text": "ロードバランサーへ登録を行います",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
    ]
  }
}
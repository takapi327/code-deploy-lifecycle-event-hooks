export function createSlackMessage(): any {
  return {
    channel: process.env.SLACK_CHANNEL!,
    text:    'CodeDeployのAfterAllowTrafficアクションの通知',
    blocks: [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "CodeDeployのAfterAllowTrafficアクションの通知",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "ロードバランサーへの登録が完了しました",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
    ]
  }
}

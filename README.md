# Sample Code Deploy Lifecycle Event Hooks

## 概要
AWS CodeDeployのライフサイクルイベントフックで起動させるLambdaアプリケーションの設定を行う

各ライフサイクルイベントごとにディレクトリを分けて実装を行う

| Resource | Directory | Note |
| -------- | ---- | ---- |
| BeforeInstall | beforeInstall| |
| AfterInstall | afterInstall| |

## セットアップ
### npm
```bash
$ npm init
$ npm install typescript
$ npm tsc --init
$ npm install --save-dev @types/node
```

### yarn
```bash
$ yarn init
$ yarn add typescript
$ yarn tsc --init
$ yarn add --dev @types/node
```

## クローン
```bash
$ git clone git@github.com:takapi327/code-deploy-lifecycle-event-hooks.git
$ yarn init or npm init
```
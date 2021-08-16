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
```

### yarn
```bash
$ yarn init
$ yarn add typescript
$ yarn tsc --init
```

# Lambda_Handler

## 実装したい機能

リクエストヘッダー内の Firebase Authentication の ID トークンを検証する

## テスト

ID トークンの検証が正しく行われていることをテストしたい
テスト項目は以下になる

- ID トークンが正しい場合、`200 OK`が返却されること
- Authentication ヘッダーがない場合、`401 Authorization header is missing`が返却されること
- Authentication ヘッダーから ID トークンが取得できない場合、`Authorization header format is invalid`が返却されること
- ID トークンが無効な場合、`401 Authentication failed`が返却されること

以下のエラーがきちんと反応するのかどうかを以下のテスト用のリクエストによって確認する

- 正しく設定されているリクエスト
- Authorization ヘッダーがないリクエスト
- Authorization ヘッダーのフォーマットが不正なリクエスト
- Authorization ヘッダーの ID トークンが無効なリクエスト

## 環境構築

### バージョン

Nodejs のバージョンは`20.x`を使用する

### 使用するモジュール

使用する JavaScript は

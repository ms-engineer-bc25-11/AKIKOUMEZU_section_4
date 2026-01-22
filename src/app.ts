import express, { Request, Response } from 'express';
// routerのファイルの中身を読み込むため。タイプスクリプトの場合は、importを使うのが一般的
import userRouter from './router/users';
import transactionRouter from './router/transactions';

// サーバー本体を作っている（設計図を作ったと考える）、空っぽのサーバーを用意した
const app = express();

// JSON形式のリクエストを読めるようにする設定（APIでは必須）
app.use(express.json());

//ルーティング
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);

export default app;

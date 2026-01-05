import express, { Request, Response}  from 'express';
// サーバー本体を作っている（設計図を作ったと考える）、空っぽのサーバーを用意した
const app = express();
// 3000のポートを使用する（サーバーの入口の番号を決めている）
const port = 3000;
// routerのファイルの中身を読み込むため。タイプスクリプトの場合は、importを使うのが一般的
import userRouter from './router/users';
import transactionRouter from './router/transactions';
// JSON形式のリクエストを読めるようにする設定（APIでは必須）
app.use(express.json());

// GETというアクセス方法に反応する命令・動作確認用（あとで消す）
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//ルーティング
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);
//起動したときに出るログ…これがないとサーバーは動かない
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

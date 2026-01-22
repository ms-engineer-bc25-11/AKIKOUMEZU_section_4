// Expressを使えるようにする。Request / Response の型も使う
import express, { Request, Response } from 'express';
// 小さなルーターを作っている。これがusers専用の司令塔
const router = express.Router();

/* 仮のユーザーデータ*/
const users = [
  {
    userId: 1,
    name: '田中　明子',
    userName: 'たっぴー',
    email: 'aki-t@gmail.com',
    password: '121212',
  },
];

/* =====================
【計算マニュアル】ユーザーを認証する関数
===================== */
export const authenticateUser = (
  allUsers: any[],
  email: string,
  pass: string
) => {
  // 指定されたメールとパスワードに一致する人を一人探す
  return allUsers.find((u) => u.email === email && u.password === pass);
};

/* =====================
ユーザー登録
POST /api/v1/users
===================== */
router.post('/', (req: Request, res: Response) => {
  const { name, userName, email, password } = req.body;

  const newUser = {
    userId: users.length + 1,
    name,
    userName,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

/* =====================
ログイン
POST /api/v1/users/login
===================== */
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = authenticateUser(users, email, password);

  if (!user) {
    return res.status(401).json({
      message: 'メールアドレスまたはパスワードが違います',
    });
  }

  res.json({
    message: 'ログイン成功',
    userId: user.userId,
    name: user.name,
  });
});

export default router;

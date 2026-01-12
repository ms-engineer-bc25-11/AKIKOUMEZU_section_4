
// Expressを使えるようにする。Request / Response の型も使う
import express, { Request, Response } from "express";
// 小さなルーターを作っている。これがusers専用の司令塔
const router = express.Router();

/* 仮のユーザーデータ*/
let users = [
  {
    userId: 1,
    name: "田中　明子",
    userName: "たっぴー",
    email: "aki-t@gmail.com",
    password: "121212",
  },
];

/* =====================
ユーザー登録
POST /api/v1/users
===================== */
router.post("/", (req: Request, res: Response) => {
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
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "メールアドレスまたはパスワードが違います",
    });
  }

  res.json({
    message: "ログイン成功",
    userId: user.userId,
    name: user.name,
  });
});

export default router;

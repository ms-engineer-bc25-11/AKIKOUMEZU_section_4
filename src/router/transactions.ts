import express, { Request, Response } from 'express';

const router = express.Router();

/* 入出金データの型 */
interface Transaction {
  id: number;
  date: string;
  category: string;
  amount: number;
  paymentMethod: string;
  type: '入金' | '出金';
  isActive: boolean;
  userId: number;
}

/* 仮の入出金データ */
const transactions: Transaction[] = [
  {
    id: 1,
    date: '2025-11-13',
    category: '食費',
    amount: 4344,
    paymentMethod: 'バーコード決済',
    type: '出金',
    isActive: true,
    userId: 2,
  },
];

/* 【マニュアル】有効なデータだけを抽出する */
export const filterActive = (allTransactions: Transaction[]) => {
  return allTransactions.filter((t) => t.isActive === true);
};

/* 【マニュアル】次のIDを計算する */
export const getNextId = (allTransactions: Transaction[]) => {
  return allTransactions.length + 1;
};

/* 【計算マニュアル】入出金の集計を行う関数 */
//1. exportをつける（他のファイルから呼べるようにする）
//2. (activeTransactions: Transaction[])は、「データの束をください」という依頼
export const calculateSummary = (activeTransactions: Transaction[]) => {
  //3. 入金だけを合計する
  const totalIncome = activeTransactions
    .filter((t) => t.type === '入金')
    .reduce((sum, t) => sum + t.amount, 0);

  //4. 出金だけを合計する
  const totalExpense = activeTransactions
    .filter((t) => t.type === '出金')
    .reduce((sum, t) => sum + t.amount, 0);

  //5. 残高を出す
  const balance = totalIncome - totalExpense;

  //6. 計算結果をセットにして返す
  return { totalIncome, totalExpense, balance };
};

/* =====================
入出金一覧取得
GET /api/v1/transactions
===================== */
router.get('/', (req: Request, res: Response) => {
  const activeTransactions = transactions.filter((t) => t.isActive === true);
  res.json(activeTransactions);
});

/* =====================
入出金登録
POST /api/v1/transactions
===================== */
router.post('/', (req: Request, res: Response) => {
  const { date, category, amount, paymentMethod, type } = req.body;

  const newTransaction = {
    id: transactions.length + 1,
    date,
    category,
    amount,
    paymentMethod,
    type,
    isActive: true,
    userId: 2,
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

/* =====================
入出金更新（PUT）
===================== */
router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = transactions.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'データが見つかりません' });
  }

  transactions[index] = {
    ...transactions[index],
    ...req.body,
  };

  res.json(transactions[index]);
});

/* =====================
入出金削除（無効化するだけ）
===================== */
router.patch('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return res.status(404).json({ message: 'データが見つかりません' });
  }

  transaction.isActive = false;

  res.json({
    id,
    message: '情報は無効化されました',
    isActive: false,
  });
});

/* =====================
集計
===================== */
router.get('/summary', (req: Request, res: Response) => {
  // 1. まず、有効なデータだけを絞り込む（これは今まで通り）
  const active = transactions.filter((t) => t.isActive);

  // 2. ★ここで新しいマニュアルを呼び出す！★
  // さっき外に作った calculateSummary に、材料（active）を渡します。
  const summary = calculateSummary(active);

  // 3. 結果を画面に返します
  res.json({
    userId: 2,
    totalIncome: summary.totalIncome, // マニュアルが計算してくれた結果を使う
    totalExpense: summary.totalExpense, // マニュアルが計算してくれた結果を使う
    balance: summary.balance, // マニュアルが計算してくれた結果を使う
    message: summary.balance < 0 ? '予算オーバーです！' : '順調です！',
    monthlySummary: [],
  });
});

export default router;

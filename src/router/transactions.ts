import express, { Request, Response } from "express";

const router = express.Router();

/* 仮の入出金データ */
let transactions = [
    {
    id: 1,
    date: "2025-11-13",
    category: "食費",
    amount: 4344,
    paymentMethod: "バーコード決済",
    type: "出金",
    isActive: true,
    userId: 2,
},
];

/* =====================
入出金一覧取得
GET /api/v1/transactions
===================== */
router.get("/", (req: Request, res: Response) => {
    const activeTransactions = transactions.filter(
    (t) => t.isActive === true
);
res.json(activeTransactions);
});

/* =====================
入出金登録
POST /api/v1/transactions
===================== */
router.post("/", (req: Request, res: Response) => {
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
router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = transactions.findIndex((t) => t.id === id);
    
    if (index === -1) {
    return res.status(404).json({ message: "データが見つかりません" });
    }

    transactions[index] = {
    ...transactions[index],
    ...req.body,
    };

    res.json(transactions[index]);
});

/* =====================
入出金削除（削除してる風）
===================== */
router.patch("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const transaction = transactions.find((t) => t.id === id);
    
    if (!transaction) {
    return res.status(404).json({ message: "データが見つかりません" });
    }
    
    transaction.isActive = false;
    
    res.json({
    id,
    message: "情報は無効化されました",
    isActive: false,
    });
});

/* =====================
集計
===================== */
router.get("/summary", (req: Request, res: Response) => {
    const active = transactions.filter((t) => t.isActive);
    
    const totalIncome = active
    .filter((t) => t.type === "入金")
    .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = active
    .filter((t) => t.type === "出金")
    .reduce((sum, t) => sum + t.amount, 0);
    
    res.json({
    userId: 2,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    monthlySummary: [],
    });
});

export default router;


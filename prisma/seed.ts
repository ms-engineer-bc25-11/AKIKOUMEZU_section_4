import { PrismaClient } from '../src/generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // すでにあるデータを一旦消去（やり直しやすくするため）
  await prisma.transaction.deleteMany();

  // サンプルデータを追加
  await prisma.transaction.createMany({
    data: [
      {
        date: '2026-01-19',
        category: '食費',
        amount: 1200,
        paymentMethod: '現金',
        type: '出金',
        isActive: true,
      },
      {
        date: '2026-01-19',
        category: '給与',
        amount: 200000,
        paymentMethod: '銀行振込',
        type: '入金',
        isActive: true,
      },
    ],
  });

  console.log('初期データの作成が完了しました！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

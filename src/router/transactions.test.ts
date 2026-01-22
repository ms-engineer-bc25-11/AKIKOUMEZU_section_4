//AIに書いてもらったコード（★まだ確認していない）

import { test, expect } from 'vitest'; // Vitestを呼ぶ
import { calculateSummary, filterActive, getNextId } from './transactions'; // 作ったマニュアルを呼ぶ

test('入金1000円と出金300円があるとき、残高が700円になること', () => {
  // 1. 【準備】テスト用のニセモノのデータを作る
  const mockData: any[] = [
    { amount: 1000, type: '入金', isActive: true },
    { amount: 300, type: '出金', isActive: true },
  ];

  // 2. 【実行】マニュアルにこのデータを渡して計算してもらう
  const result = calculateSummary(mockData);

  // 3. 【確認】マニュアルがくれた答えは、期待通りかな？
  expect(result.totalIncome).toBe(1000); // 入金合計は1000のはず！
  expect(result.totalExpense).toBe(300); // 出金合計は300のはず！
  expect(result.balance).toBe(700); // 残高は700のはず！
});

test('有効フラグ（isActive）がtrueのものだけが抽出されること', () => {
  // 1. 準備：有効なデータ1つと、無効（削除済み）なデータ1つを用意
  const mockData: any[] = [
    { id: 1, isActive: true },
    { id: 2, isActive: false },
  ];

  // 2. 実行：マニュアルを使って絞り込む
  const result = filterActive(mockData);

  // 3. 確認：結果は「1つ」だけで、そのIDは「1」であるはず！
  expect(result.length).toBe(1);
  expect(result[0].id).toBe(1);
});

test('次のIDが、現在の件数+1で計算されること', () => {
  // 1. 準備：今2件データがあるとする
  const mockData: any[] = [{ id: 1 }, { id: 2 }];

  // 2. 実行：次のIDを計算してもらう
  const nextId = getNextId(mockData);

  // 3. 確認：3になれば正解！
  expect(nextId).toBe(3);
});

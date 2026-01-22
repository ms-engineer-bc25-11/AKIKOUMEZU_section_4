import { test, expect } from 'vitest';
import { authenticateUser, createNewUser } from './users';

// 正常系テスト //

test('正しいメールアドレスとパスワードで、ユーザーが特定できること', () => {
  // 1. 【準備】テスト用ユーザー
  const mockUsers = [
    { userId: 1, email: 'test@example.com', password: 'password123' },
  ];

  // 2. 【実行】マニュアルを使ってログインを試みる（成功するはずの条件）
  const result = authenticateUser(mockUsers, 'test@example.com', 'password123');

  // 3. 【確認】ちゃんとユーザーが見つかって、IDが1であること
  expect(result).toBeDefined(); // 結果が空っぽ（undefined）じゃないこと
  expect(result?.userId).toBe(1);
});

test('新しいユーザーが正しいIDで作成されること', () => {
  // 1. 準備：現在1人ユーザーがいる状態
  const mockUsers = [{ userId: 1 }];
  const newInfo = {
    name: 'テスト',
    userName: 'test',
    email: 'a@b.com',
    password: 'pw',
  };

  // 2. 実行：マニュアルを使って新しいユーザーを作る
  const newUser = createNewUser(mockUsers, newInfo);

  // 3. 確認：IDが「2」になっているかな？
  expect(newUser.userId).toBe(2);
  // 名前も正しくコピーされているかな？
  expect(newUser.name).toBe('テスト');
});

// 異常系テスト //

test('間違ったパスワードの時、ユーザーが特定できない（undefinedになる）こと', () => {
  // 1. 準備：正しいデータ
  const mockUsers = [
    { userId: 1, email: 'test@example.com', password: 'password123' },
  ];

  // 2. 実行：あえて「違うパスワード」を渡してみる
  const result = authenticateUser(mockUsers, 'test@example.com', 'wrong-pass');

  // 3. 確認：結果が「空っぽ（undefined）」であることを期待する
  expect(result).toBeUndefined();
});

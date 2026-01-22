import { test, expect } from 'vitest';
import { authenticateUser } from './users';

test('正しいメールアドレスとパスワードで、ユーザーが特定できること', () => {
  // 1. 【準備】テスト用のニセモノユーザー
  const mockUsers = [
    { userId: 1, email: 'test@example.com', password: 'password123' },
  ];

  // 2. 【実行】マニュアルを使ってログインを試みる（成功するはずの条件）
  const result = authenticateUser(mockUsers, 'test@example.com', 'password123');

  // 3. 【確認】ちゃんとユーザーが見つかって、IDが1であること
  expect(result).toBeDefined(); // 結果が空っぽ（undefined）じゃないこと
  expect(result?.userId).toBe(1);
});

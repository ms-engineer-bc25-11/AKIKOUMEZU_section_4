//自分用メモ
GET 一覧取得
POST 追加
PUT 更新
DELETE 削除
PATCH 状態変更

「一覧（list）」＝ 複数件が返る可能性がある → 配列（array）で返す
⇛Reactではmapを使って書く。mapは配列にしか使えない。

#　設計書

##　リソース一覧
- users （ユーザー）
- transactions （入出金）

## エンドポイント一覧
- POST /api/v1/users
- POST /api/v1/users/login
- GET /api/v1/transactions
- POST /api/v1/transactions
- PUT /api/v1/transactions/{id}
- PATCH /api/v1/transactions/{id}
- GET /api/v1/transactions/summary

## ユーザー登録
- エンドポイント: /api/v1/users
- メソッド: POST

### リクエスト
{
        "name": "田中　明子",
        "userName": "たっぴー",
        "email": "aki-t@gmail.com",
        "password": "121212"
}

### レスポンス
{
        "userId": 2,
        "name": "田中　明子",
        "userName": "たっぴー",
        "email": "aki-t@gmail.com",
        "password": "121212"
}

## ログイン
- エンドポイント: /api/v1/users/login
- メソッド:POST 

### リクエスト
{
    "email": aki-t@gmail.com,
    "password": "121212"
}

### レスポンス
※※検討中※※

## 入出金一覧を取得
- エンドポイント: /api/v1/transactions
- メソッド:GET

### リクエスト
GET api/v1/transactions

### レスポンス
[
    {
        "id": 1,
        "date": "2025-11-13",
        "category": "食費",
        "amount": 4344,
        "paymentMethod": "バーコード決済",
        "type": "出金"
    },
    {
        "id": 2,
        "date": "2025-12-25",
        "category": "食費",
        "amount": 6250,
        "paymentMethod": "バーコード決済",
        "type": "出金"
    }    
]

## 入出金情報を登録
- エンドポイント: /api/v1/transactions
- メソッド: POST

### リクエスト
{
        "date": "2025-12-25",
        "category": "食費",
        "amount": 6250,
        "paymentMethod": "バーコード決済",
        "type": "出金"
}

### レスポンス
{
        "id": 2,
        "date": "2025-12-25",
        "category": "食費",
        "amount": 6250,
        "paymentMethod": "バーコード決済",
        "type": "出金"
}

## 入出金情報を編集（更新）
- エンドポイント: /api/v1/transactions/{id}
- メソッド: PUT

### リクエスト
PUT api/v1/transactions/1
{
        "date": "2025-12-13",
        "category": "食費",
        "amount": 6250,
        "paymentMethod": "バーコード決済",
        "type": "出金"
}

### レスポンス
{
        "id": 1,
        "date": "2025-12-13",
        "category": "食費",
        "amount": 6250,
        "paymentMethod": "バーコード決済",
        "type": "出金"
}

## 入出金情報を削除(無効化するだけ)
- エンドポイント: /api/v1/transactions/{id}
- メソッド: PATCH

### リクエスト
PATCH /api/v1/transactions/1

### レスポンス
{
        "id": 1,
        "message": "情報は無効化されました",
        "isActive": false
}

## 集計
- エンドポイント: /api/v1/transactions/summary
- メソッド: GET

### リクエスト
GET /api/v1/transactions/summary

### レスポンス(isActive = true のデータのみを集計)
{
    "userId": 2,
    "totalIncome": 400000,
    "totalExpense": 220000,
    "balance":180000,
    "monthlySummary":[
        {
            "month": "2025-11",
            "income": 200000,
            "expense": 110000
        },
        {
            "month": "2025-12",
            "income": 200000,
            "expense": 110000
        }
    ]
}
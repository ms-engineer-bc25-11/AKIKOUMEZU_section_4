//testのためにテストできる形に最低限リファクタした。起動処理はこちら

import app from './app'

const port = 4000
//起動したときに出るログ…これがないとサーバーは動かない
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

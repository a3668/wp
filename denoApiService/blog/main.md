sqlFetch是一個在lib裡sql.js裡的函數

let posts = await sqlFetch('blog', `SELECT id, title, body FROM posts`)
所有的貼文傳回來變成一個陣列

      呼叫R.list(posts)將所有貼文呈現在畫面上
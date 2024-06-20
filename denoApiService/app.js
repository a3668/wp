import { Application, Router} from "https://deno.land/x/oak@v12.0.0/mod.ts" // 引入 Oak 框架
import { oakCors } from "https://deno.land/x/cors/mod.ts"; // 引入 CORS 中介軟體
import { sqlHandler, fetchHandler, uploadHandler } from './handler.js' // 引入處理函數

const app = new Application() // 建立應用程式實例
const router = new Router() // 建立路由器實例

// 定義路由和對應的處理函數
router.post('/fetch', fetchHandler) // 處理前端發送的抓取請求
router.post('/sqlite', sqlHandler) // 處理前端發送的 SQLite 請求
router.post('/upload', uploadHandler) // 處理前端發送的檔案上傳請求

app.use(oakCors()); // 啟用所有路由的 CORS 支援 //跨站存取,不考慮安全性
app.use(router.routes()) // 使用路由中介軟體
app.use(router.allowedMethods()) // 使用允許的方法中介軟體

console.log('Server run at http://127.0.0.1:6789') // 在控制台輸出伺服器運行地址
await app.listen({ port: 6789 }) // 啟動伺服器並監聽指定的埠 //執行起來,並停在這
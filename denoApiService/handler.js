import { DB } from "https://deno.land/x/sqlite/mod.ts"; // 引入 SQLite 模組
import { oFetch } from "./lib.js" // 引入自定義的 oFetch 函數

// 處理 SQLite 請求的函數
export async function sqlHandler(ctx) {//接收對方傳來的訊息,放在body,檢查型態
    const body = ctx.request.body(); // 自動檢測內容型別 // content type automatically detected
    console.log('body = ', body)
    if (body.type === "json") {
        let json = await body.value  // 12.0.0 版，新版為 let json = await body.json()
        console.log('json=', json)
        let db = json.db // 獲取資料庫名稱 // 獲取資料庫名稱
        let sql = json.sql // 獲取 SQL 語句
        const dbo = new DB(`db/${db}.db`) // 打開指定的資料庫 //創建資料庫,將資料庫開起來
        let result = sql ? dbo.query(sql) : '[]' // 執行 SQL 語句
        dbo.close() // 關閉資料庫
        ctx.response.body = result // 回應結果
    }
}

// 處理抓取請求的函數
export async function fetchHandler(ctx) {//前端網頁透過這伺服器去抓別人的網站
    const body = ctx.request.body(); // 自動檢測內容型別 // content type automatically detected
    console.log('body = ', body)
    if (body.type === "json") {
        let json = await body.value // 解析 JSON 資料
        console.log('json=', json)
        let result = await oFetch(json) // 調用 oFetch 函數執行請求
        console.log('result=', result)
        ctx.response.body = result // 回應結果
    }
}

// 處理檔案上傳請求的函數
export async function uploadHandler(ctx) {
    const body = await ctx.request.body({ type: 'form-data' }) // 解析表單數據
    const data = await body.value.read() // 讀取表單數據
    console.log(data)
    console.log("fields=", data.fields) // 輸出表單欄位
    let r = []
    for (let f of data.files) { // 處理上傳的檔案
        console.log("filename=", f.filename)
        console.log("originalName=", f.originalName)
        await Deno.copyFile(f.filename, `./upload/${f.originalName}`) // 將上傳的檔案移動到指定目錄
        await Deno.remove(f.filename) // 刪除臨時檔案
        r.push({file:f.originalName}) // 將檔案資訊添加到結果陣列
    }
    ctx.response.body = r // 回應結果
}
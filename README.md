# سیستەمی یەکگرتووی دووکان

پێنج سیستەمی جیا لێرە بوونەتە یەک پڕۆژە (HTML + JS ساکار، بێ build):

| تاب | فایل | داتا لە کوێ |
|---|---|---|
| 📊 ڕاپۆرت | `js/modules/dashboard.js` | هەموو بەشەکان + Excel |
| 📦 مەخزەن | `inventory.js` | Firebase `inventory` |
| 🛒 فرۆشتن | `pos.js` | Firebase `sales` (هەڵگری `items[]`) |
| ⏱️ شێفت | `shifts.js` | Firebase `sales` (هەڵگری `item`) |
| 💰 دەین | `debt.js` | localStorage `invoices` |
| ↩️ گەڕانەوە | `returns.js` | localStorage `returns` |

## کارپێکردن
- ڕاستەوخۆ `index.html` بکەرەوە، یان GitHub Pages: **Settings → Pages → Deploy from branch → main / root**.
- ڕێکخستنەکان لە `js/config.js`ـە (Firebase، پاسۆرد).

## تێبینی گرنگ
- دەین و گەڕانەوە لە وێبگەڕی هەمان ئامێردا دەمێنن (localStorage)، نەک Firebase.
- Firebase config لە GitHub دەردەکەوێت. ئەمە ئاساییە، بەڵام پاراستن بە **Firestore Rules**ـەوەیە (`firestore.rules`). بێ Auth، هەرکەس لینکەکە بزانێت دەتوانێت داتا بگۆڕێت.
- پاسۆردی `9697` لە کۆدەکەدا دیارە؛ تەنها بۆ ڕێگری لە هەڵەی ئەکسیدێنتە.

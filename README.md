<<<<<<< HEAD
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
=======
# 🏪 Yalda Store & Inventory Management System

A modern and integrated **Store Management System** designed to manage daily store operations, inventory, sales, employee shifts, customer debts, and financial reports.

Built with HTML, CSS, JavaScript, and Firebase, featuring a Kurdish RTL interface.

## ✨ Features

### 📊 Dashboard
- Daily revenue overview
- Total sales and profits
- Inventory value
- Outstanding customer debts
- Low-stock alerts
- Top customers with outstanding debts

### 📦 Inventory Management
- Add, edit, and delete products
- Manage purchase and selling prices
- Track product quantities
- Set minimum stock levels
- Search products

### 🛒 Point of Sale (POS)
- Quick product selection
- Shopping cart management
- Automatic total calculation
- Automatic profit calculation
- Automatic inventory updates
- Sales history

### 🕐 Employee Shift Management
- Morning shift
- Evening shift
- Night shift
- Record shift sales
- Filter sales by shift
- Track sales totals

### 💰 Customer Debt Management
- Create customer invoices
- Track payments and outstanding debts
- Record partial payments
- Search customers
- Export debt reports

### 📝 Purchase List
- Add products to purchase lists
- Calculate total quantities and costs
- Export purchase lists to Word

### 📈 Reports & Analytics
- Sales reports by shift
- Best-selling products
- Revenue comparisons
- Export reports to Excel

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase Firestore
- Firebase JavaScript SDK 9.22.0
- SheetJS (XLSX)

## 🚀 Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/salman-sadiq129/shop-system.git
   ```

2. Open the project folder:

   ```bash
   cd shop-system
   ```

3. Open `index.html` in your browser.

4. Configure your Firebase project and Firestore database if necessary.

## 🔥 Firebase Configuration

This project uses Firebase Firestore to store and retrieve:

- Inventory
- Sales
- Customer invoices
- Restocking records

Make sure your Firebase Firestore database is configured correctly and appropriate security rules are enabled.

## 🌍 Language & Interface

- Kurdish language
- Right-to-Left (RTL) layout
- Responsive design
- Desktop and mobile support

## 📁 Project Structure

```text
shop-system/
│
├── index.html
└── README.md
```

## 👨‍💻 Developer

**Salman Sadiq**

GitHub: [@salman-sadiq129](https://github.com/salman-sadiq129)

## 📄 License

This project is currently available for personal and educational use.

---

⭐ If you find this project useful, consider giving it a star!
>>>>>>> b709a6f55c9fff772df80c9a71b70f1e65a1edaf

# 📈 Stock Screener App

A Dexscreener-style stock market dashboard built with **React**, **Bootstrap**, and **ApexCharts**, allowing users to explore real-time market data and view interactive stock charts.

---

## Live Demo
https://suyogshirpe.github.io/react-stocks-screener/

---

## 🚀 Features

✔ **Random Trending Stocks on Home Page**
✔ **Search by Company Name** (auto-resolves to ticker symbol)
✔ **Clickable Stocks → Detailed Page**
✔ **Interactive Chart (Candlestick / Line)**
✔ **Live Market Data for Each Stock**
✔ **Watchlist with LocalStorage**

---

## 🧱 Tech Stack

| Purpose                    | Technology                    |
| -------------------------- | ----------------------------- |
| Frontend UI                | React.js + Bootstrap          |
| Charts                     | ApexCharts (react-apexcharts) |
| Stock Profile + Search API | Finnhub API                   |
| Historical Chart Data API  | TwelveData API                |

---

## 🔍 API References

* **Finnhub**

  * Symbol Search (Company → Ticker)
  * Quote & Profile Data
    [https://finnhub.io/](https://finnhub.io/)

* **TwelveData**

  * Historical Time Series for Charts
    [https://twelvedata.com/](https://twelvedata.com/)

---

## 📂 Project Structure

```
src/
├── assets/
│   ├── apiKeys.js 
│   ├── Logo.png 
|   └── tickersList.js
├── components/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
|   ├── Navbar.jsx
│   ├── SearchDisplay.jsx
|   ├── StockCard.jsx
│   ├── StockDetails.jsx
│   ├── StockTable.jsx
│   └── Watchlist.jsx
├── custom_hooks/
│       ├── useGraphApi.jsx
│       ├── useRandOfQuoteApi.jsx
│       ├── useSingleProfQuote.jsx
│       └── useTickerApi.jsx
├── stylesheets/
│   ├── StockDetails.css
│   └── StocksTable.css
├── App.jsx
└── main.jss
```

---

## 🧭 App Flow

```
[Home Page]
   ↓ (click stock or search a stock)
[Stock Details Page]
   - Price Chart
   - Company Info
   ↓
[Back] 
```

* Home page fetches **15 random stocks** each refresh
* Search bar accepts **company names** (not tickers)
  → resolves to ticker symbol using Finnhub Search API
  → opens Stock Details page

---

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/suyogshirpe/react-stocks-screener.git

# Move into project folder
cd stock-screener

# Install dependencies
npm install

# Add your API keys in a .env file
REACT_APP_FINNHUB_KEY=your_finnhub_api_key
REACT_APP_TWELVEDATA_KEY=your_twelvedata_api_key

# Run the app
npm start
```

---

## 🔮 Future Enhancements

✨ Time Range Filters (1D / 1W / 1M / 3M / 1Y)
✨ Dark Mode Toggle
✨ Better Search Suggestions with Dropdown
✨ Volume chart under candlesticks


---

## 👨‍💻 Author

**Suyog Shirpe**
Frontend Developer | React Enthusiast

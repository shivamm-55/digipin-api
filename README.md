# 📍 digipin

**`digipin`** is a lightweight npm package that lets you convert between **latitude/longitude coordinates** and **Digital Postal Index Numbers (DIGIPINs)**.

DIGIPIN is a geo-coded addressing system introduced by the **Department of Posts, Government of India**, aimed at creating a standardized digital address for every location.

🔗 **Official DIGIPIN Page:**  
👉 https://www.indiapost.gov.in/vas/Pages/digipin.aspx

---

## ✨ Features

- 🌍 Convert **Latitude & Longitude → DIGIPIN**
- 🔁 Convert **DIGIPIN → Latitude & Longitude**
- 📦 Optional **REST API** (Node.js + Express + TypeScript)
- 🧠 Fully **TypeScript-supported**
- ⚡ Lightweight, fast, and dependency-friendly

---

## 📦 Installation

~~~bash
npm install digipin
~~~

---

## 🚀 Usage (Library)

### 📌 Named Imports

~~~ts
import { getDIGIPINFromLatLon, getLatLonFromDIGIPIN, getBoundsFromDIGIPIN } from 'digipin';

const digipin = getDIGIPINFromLatLon(12.34, 56.78);
console.log(digipin);

const coordinates = getLatLonFromDIGIPIN('G4J-9K4-7L');
console.log(coordinates);

const bounds = getBoundsFromDIGIPIN('F3M-P6T-FCJK');
console.log(bounds);
// { minLat, maxLat, minLon, maxLon }
~~~

---

### 📌 Default Import

~~~ts
import digipin from 'digipin';

const digipinCode = digipin.getDIGIPINFromLatLon(12.34, 56.78);
console.log(digipinCode);

const coordinates = digipin.getLatLonFromDIGIPIN('G4J-9K4-7L');
console.log(coordinates);
~~~

---

## 🔌 REST API Support (Optional)

This package also includes an **optional REST API** built with:

- Node.js
- Express
- TypeScript

> ⚠️ The REST API is **additive** and does **not affect** library usage.

---

### ▶️ Run API Locally

~~~bash
npm install
npm run dev
~~~

📡 Server runs at:

~~~text
http://localhost:3000
~~~

---

### ❤️ Health Check

~~~bash
curl http://localhost:3000/api/digipin/health
~~~

**Response:**

~~~text
DIGIPIN API is running 🚀
~~~

---

## 🔗 API Endpoints

### 1️⃣ Encode: Latitude/Longitude → DIGIPIN

**POST** `/api/digipin/encode`

#### Request Body

~~~json
{
  "latitude": 28.6139,
  "longitude": 77.2090
}
~~~

#### cURL

~~~bash
curl -X POST http://localhost:3000/api/digipin/encode \
  -H "Content-Type: application/json" \
  -d '{"latitude":28.6139,"longitude":77.2090}'
~~~

#### Response

~~~json
{
  "digipin": "DP-2861-7720"
}
~~~

---

### 2️⃣ Decode: DIGIPIN → Latitude/Longitude

**POST** `/api/digipin/decode`

#### Request Body

~~~json
{
  "digipin": "DP-2861-7720"
}
~~~

#### cURL

~~~bash
curl -X POST http://localhost:3000/api/digipin/decode \
  -H "Content-Type: application/json" \
  -d '{"digipin":"DP-2861-7720"}'
~~~

#### Response

~~~json
{
  "latitude": 28.61,
  "longitude": 77.2
}
~~~

---

### ❌ Error Response

**Invalid DIGIPIN**

~~~json
{
  "message": "Invalid DIGIPIN provided"
}
~~~

---

## 🤝 Contributing

Contributions are welcome! 🚀

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a Pull Request

## 📄 License

MIT © Shivam Mishra
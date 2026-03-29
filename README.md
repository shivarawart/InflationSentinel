# InflationSentinel (Cost-of-Living Shield)

**InflationSentinel** is a full-stack MERN web app that acts as a real-time shield against inflation by combining crowdsourced price tracking with a predictive barter marketplace. It empowers users to save money and trade skills or goods instead of spending cash in high-inflation environments.

---

## 1. What the Project Delivers (Core Features & User Experience)

### **Live “Price War” Map**
- Interactive Leaflet-powered map showing real-time price pins for groceries, healthcare items, rent, fuel, etc.
- Crowdsourced prices: anyone can report what they just paid (with photo proof and location).
- Live updates via Socket.io — prices refresh instantly across the globe.

### **City Cost-of-Living Indices**
- MongoDB aggregation pipelines calculate and rank city-level inflation indices.
- Filter by category and compare cities side-by-side.
- Example: “Tokyo groceries +12% this month”, “New York healthcare +18%”.

### **Smart Price Alerts**
- Cron-powered background jobs notify users via email or push when prices spike or drop beyond set thresholds.
- Users can customize alerts for specific items or categories.

### **AI-Free Predictive Barter Marketplace**
- Drag-and-drop React UI for listing skills, services, or goods and specifying needs.
- Matches users based on rule-based predictive logic (no AI required).
- Example: “2 hours English lessons” matches a rice farmer who needs English help in exchange for a month’s supply of rice.
- Built-in chat and rating system for secure barter confirmation.

### **Clean, Modern UX**
- Responsive React frontend with real-time updates.
- Beautiful map visualizations and one-click “I just paid this” reporting.

**In short:** Hyper-local, actionable data + immediate ways to fight inflation without spending more cash.

---

## 2. Problems It Solves

- **Japan-specific pain:** Weak yen and imported food inflation make household budgets tight. Users can track daily prices in supermarkets and neighborhoods.
- **US-specific pain:** Rising grocery and healthcare costs; official CPI numbers feel disconnected from real payments.
- **Universal problem:** Inflation erodes cash value; traditional apps show historical prices or corporate deals only. Barter is rare due to manual matching.

**InflationSentinel solves both:** shows cheapest prices **now** and enables effortless barter.

---

## 3. How It Is Useful (Real-World Value)

- **Everyday users (salarymen, families, students):**  
  Save 15–30% monthly by knowing where prices are lower today and bartering instead of buying.

- **Communities & neighborhoods:**  
  Creates local micro-economies; neighborhoods can become self-sufficient even during national inflation.

- **Expats & digital nomads:**  
  Understand true cost of living with city indices.

- **Job seekers & freelancers:**  
  Turn unused skills into real value through barter.

- **Broader societal benefit:**  
  Crowdsourced, real-time data is more accurate and faster than government statistics; reduces reliance on corporations and banks during inflation spikes.

---

## 4. Why This Project Is Strong for Job Applications

- Demonstrates real-time tech (Socket.io + Leaflet)
- Showcases data aggregation & background jobs (MongoDB + Express cron)
- Highlights smart matching logic without AI buzzwords
- Solves a tangible 2026 problem (inflation + cost of living)
- Tagline for resume/portfolio:  
  **“Real-time crowdsourced inflation shield + predictive barter marketplace built with MERN — helping users in Japan & US beat rising costs without extra spending.”**

---

## 5. Tech Stack

- **Frontend:** React, Leaflet, Socket.io  
- **Backend:** Node.js, Express, Socket.io  
- **Database:** MongoDB with aggregation pipelines  
- **Background Jobs:** Cron-powered price alerts  
- **Other:** Drag-and-drop UI, in-app chat & rating system  

---

## 6. Live Demo & Media

- One live demo link (map + barter functionality)  
- 60-second video showing live price updates and a successful barter match  

---

## 7. Installation & Setup

```bash
# Clone repository
git clone <repo-link>
cd InflationSentinel

# Install dependencies
npm install

# Start backend server
npm run server

# Start frontend
npm run client

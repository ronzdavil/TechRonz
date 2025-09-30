import express from "express";

const app = express();
app.use(express.json());

// Mock products (later replace with MongoDB + scraper)
const products = [
  { name: "Samsung Galaxy A15", price: "Rs 46,999", link: "https://priceoye.pk" },
  { name: "Infinix Note 40", price: "Rs 48,500", link: "https://priceoye.pk" },
  { name: "Tecno Spark 20 Pro", price: "Rs 44,999", link: "https://priceoye.pk" },
];

app.post("/api/ask", (req, res) => {
  const { query } = req.body;

  // Filter products by query (simple search)
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  let answer = "";
  if (results.length > 0) {
    answer = results.map(p => `📱 ${p.name} → ${p.price} [Buy Here](${p.link})`).join("\n");
  } else {
    answer = "⚠️ No matching products found.";
  }

  res.json({ answer });
});

app.listen(3001, () => console.log("✅ Backend running on http://localhost:3001"));

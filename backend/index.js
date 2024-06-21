import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import medidaRoutes from "./routes/medidaRoutes.js";
import sacoMedidaRoutes from "./routes/sacoMedidaRoutes.js";
import pantalonMedidaRoutes from "./routes/pantalonMedidaRoutes.js";
import camisaMedidaRoutes from "./routes/camisaMedidaRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/medidas", medidaRoutes);
app.use("/api/saco-medidas", sacoMedidaRoutes);
app.use("/api/pantalon-medidas", pantalonMedidaRoutes);
app.use("/api/camisa-medidas", camisaMedidaRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));

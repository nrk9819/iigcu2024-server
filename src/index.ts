import http from "http";
import cors from "cors";
import express from "express";
import router from "./routes";
import "dotenv/config";

const app = express();
const port = 3000;

const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "POST",
  })
);

app.use("/", router);

server.listen(port, () => {
  console.log("🚀 Server is running on port 3000");
});

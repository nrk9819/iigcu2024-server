import http from "http";
import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();
const port = 3000;

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use("/", router);

server.listen(port, () => {
  console.log("🚀 Server is running on port 3000");
});

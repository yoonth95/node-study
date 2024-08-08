import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.ENDPOINT_URL,
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "./.env.production") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "./.env.development") });
}

// routes 파일들을 모두 읽어서 각각을 Express 앱에 등록
const routesPath = path.join(__dirname, "/routes"); // routes 파일들이 있는 디렉토리 경로
const routeFiles = fs.readdirSync(routesPath);
for (const file of routeFiles) {
  const filePath = pathToFileURL(path.join(routesPath, file)).href;
  import(filePath)
    .then((module) => {
      const route = module.default;
      app.use("/api", route);
    })
    .catch((err) => {
      console.error(`Failed to load route ${filePath}:`, err);
    });
}

app.get("/", (req, res) => {
  res.send(`<div>
    <p>백엔드 연결</p>
    </div>`);
});

app.get("/home", (req, res) => {
  res.send(`<div>
    <p>백엔드 연결2222</p>
    </div>`);
});

app.listen(8080, () => {
  console.log("version 1.1.6");
});

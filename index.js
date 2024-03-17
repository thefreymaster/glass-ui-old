import express from "express";
import path from "path";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// cors
const whitelist = [
  "http://localhost:4000",
  "http://localhost:5173",
  "http://10.23.23.190:3000",
  "http://homeassistant.local:8123"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// middlewares
app.use(cors(corsOptions));
app.use(express.static(join(__dirname, "dist")));


app.get("/api", cors(), (req, res) => {
  res.send("API root");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT || port, () =>
  console.log(`Glass UI is running on port: ${port}`)
);

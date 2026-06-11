import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const isProd = process.env.NODE_ENV === "production";

const allowedOrigins = [
  "http://localhost:5173",
  "https://infofinsolutions.com",
  "https://www.infofinsolutions.com",
  "https://api.infofinsolutions.com",
];

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "infofin-dev-secret-2024",
    resave: false,
    saveUninitialized: false,
    proxy: isProd, // CRITICAL: Tells express to trust Render's reverse proxy header to pass cookies over HTTPS
    cookie: {
      secure: isProd,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: isProd ? "none" : "lax",
      // Remove the strict hardcoded domain parameter to let the browser automatically
      // scope the storage boundary cleanly to whichever site address you are visiting!
    },
  }),
);

app.use("/api", router);

export default app;
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
  "https://www.infofinsolutions.com"
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
      // Allow local testing tools or matched domains
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Configure Subdomain-safe Session Mapping
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "infofin-dev-secret-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd, // Must be true on HTTPS production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: isProd ? "none" : "lax", // Crucial block bypass for cross-subdomain contexts
      domain: isProd ? ".infofinsolutions.com" : undefined, // Wildcard dot shares sessions across app paths
    },
  }),
);

app.use("/api", router);

export default app;

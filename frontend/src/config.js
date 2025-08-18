//src/config.js

import { version } from "../package.json";

export const APP_VERSION = version;

export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"       // local dev
    : "https://apitester-production.up.railway.app";  // Railway production

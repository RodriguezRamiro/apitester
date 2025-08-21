//src/config.js

import { version } from "../package.json";

export const APP_VERSION = version;

export const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";  // Railway production

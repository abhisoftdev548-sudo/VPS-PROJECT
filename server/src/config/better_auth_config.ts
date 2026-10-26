import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { ENV } from "./env_config.js";
import { dash } from "@better-auth/infra";

const client = new MongoClient(ENV.MONGODB_URI);

const isProduction = ENV.NODE_ENV === "production";

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  basePath: "/api/v1/auth",
  baseURL: ENV.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [ENV.CLIENT_URL],
  appName: "Dockyard",
   plugins: [
    // Tumhare existing plugins, agar hain
    dash({
      apiKey: ENV.BETTER_AUTH_API_KEY,
    }),
  ],

  advanced: {
    ...(isProduction && {
      crossSubDomainCookies: {
        enabled: true,
        domain: ENV.BETTER_AUTH_DOMAIN,
      },
    }),

    defaultCookieAttributes: {
      sameSite: "lax",
      secure: isProduction,
      httpOnly: true,
    },
  },
});

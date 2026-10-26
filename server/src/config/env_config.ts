
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(3000),

  MONGODB_URI: z
    .string()
    .trim()
    .min(1, "MONGODB_URI is required")
    .refine(
      (value) =>
        value.startsWith("mongodb://") ||
        value.startsWith("mongodb+srv://"),
      "MONGODB_URI must be a valid MongoDB connection URL",
    ),

  BETTER_AUTH_API_KEY: z
    .string()
    .trim()
    .min(32, "BETTER_AUTH_API_KEY must be at least 32 characters"),

  BETTER_AUTH_URL: z
    .string()
    .trim()
    .url("BETTER_AUTH_URL must be a valid URL"),
    
  BETTER_AUTH_DOMAIN: z
    .string()
    .trim()
    .min(1, "BETTER_AUTH_DOMAIN is required"),

  CLIENT_URL: z
    .string()
    .trim()
    .url("CLIENT_URL must be a valid URL"),

    API_URL: z
    .string()
    .trim()
    .url("API_URL must be a valid URL"),

});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.warn("\nEnvironment configuration warnings:\n");

  for (const issue of result.error.issues) {
    console.warn(`- ${issue.path.join(".")}: ${issue.message}`);
  }

  console.warn(
    "\nServer startup will continue, but invalid configuration may cause runtime errors.\n",
  );
}

export const ENV = Object.freeze(
  result.success
    ? result.data
    : {
        NODE_ENV: process.env.NODE_ENV ?? "development",
        PORT: Number(process.env.PORT) || 3000,
        MONGODB_URI: process.env.MONGODB_URI ?? "",
        BETTER_AUTH_API_KEY: process.env.BETTER_AUTH_API_KEY ?? "",
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? "",
        BETTER_AUTH_DOMAIN: process.env.BETTER_AUTH_DOMAIN ?? "",
        CLIENT_URL: process.env.CLIENT_URL ?? "",
        API_URL: process.env.API_URL ?? "",
      },
);

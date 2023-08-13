export const isDevelopmentEnvironment = process.env.NODE_ENV !== "production";
export const server = isDevelopmentEnvironment
  ? "http://localhost:3000"
  : "https://regenscore.vercel.app";

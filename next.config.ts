import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack root set to this project to avoid workspace root inference warnings
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

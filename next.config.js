const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://culbridgetrade.onrender.com",
  },
  serverExternalPackages: ['better-sqlite3'],
};

module.exports = nextConfig;


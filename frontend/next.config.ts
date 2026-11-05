import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/yenel-dashboard" : "",
  assetPrefix: isGitHubPages ? "/yenel-dashboard/" : "",
  trailingSlash: true,
};

export default nextConfig;

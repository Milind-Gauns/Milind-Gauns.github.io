/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only: `next build` must emit ./out,
  // which the Pages workflow uploads. Image optimisation needs a server,
  // so it is disabled here.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

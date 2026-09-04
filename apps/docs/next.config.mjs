/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@seamless/tokens","@seamless/ui","@seamless/layout","@seamless/saas",
    "@seamless/ai","@seamless/themes","@seamless/blocks","@seamless/registry"
  ]
}
export default nextConfig

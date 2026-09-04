/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  // Preview docs site: dont block the deploy on a stray package type/lint error.
  // Type + lint correctness is enforced in the QA lane, not the docs preview build.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: [
    "@seamless/tokens","@seamless/ui","@seamless/layout","@seamless/saas",
    "@seamless/ai","@seamless/themes","@seamless/blocks","@seamless/registry"
  ]
}
export default nextConfig

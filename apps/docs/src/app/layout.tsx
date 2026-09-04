import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Seamless UI",
  description: "Design system platform — foundation/architecture",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="midnight-aubergine" data-mode="dark">
      <body>
        {children}
      </body>
    </html>
  )
}
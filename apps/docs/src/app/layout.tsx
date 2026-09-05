import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Seamless UI",
  description: "Beautiful, accessible components for your design system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <div hidden aria-hidden className="bg-primary bg-primary/90 bg-primary/80 hover:bg-primary/90 text-primary text-primary-foreground border-primary ring-primary bg-secondary bg-secondary/80 hover:bg-secondary/80 text-secondary text-secondary-foreground bg-destructive bg-destructive/90 hover:bg-destructive/90 text-destructive text-destructive-foreground bg-accent hover:bg-accent text-accent-foreground hover:text-accent-foreground bg-muted bg-muted/50 hover:bg-muted text-muted-foreground bg-background text-foreground bg-card text-card-foreground bg-popover text-popover-foreground border border-input border-border ring-ring ring-offset-background outline-ring hover:underline underline-offset-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary fill-primary stroke-primary bg-input" />
        {children}
      </body>
    </html>
  )
}

import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Q.iDeFi.AI',
  description: 'Quantum Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {children}
      <Analytics />
      </body>
    </html>
  )
}

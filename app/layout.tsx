import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}

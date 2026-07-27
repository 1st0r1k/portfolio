import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import { NetworkBackground } from '@/components/NetworkBackground'
import { CursorGlow } from '@/components/CursorGlow'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artem Bugrov — Systems Analyst',
  description: 'Systems analyst and full-stack builder — portfolio site.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-text-primary">
        <NetworkBackground />
        <CursorGlow />
        <div className="relative z-10">
          <LanguageProvider>{children}</LanguageProvider>
        </div>
      </body>
    </html>
  )
}

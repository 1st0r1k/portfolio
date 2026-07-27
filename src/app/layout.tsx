import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
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
        <CursorGlow />
        <div className="relative z-10">
          <LanguageProvider>{children}</LanguageProvider>
        </div>
      </body>
    </html>
  )
}

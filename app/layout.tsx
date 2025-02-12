import 'server-only';

import { Metadata } from 'next';
import React from 'react';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Providers from '@/components/contexts/providers';
import Header from '@/components/header/header';
import { Link } from '@/components/ui/link';
import { Toaster } from '@/components/ui/toaster';
import { Muted } from '@/components/ui/typography';
import { siteConfig } from '@/config/site';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  generator: 'Next.js',
  applicationName: siteConfig.metadata.title,
  referrer: 'origin-when-cross-origin',
  keywords: siteConfig.metadata.keywords,
  authors: [siteConfig.metadata.author],
  icons: siteConfig.metadata.icons,
};

type RootLayoutProps = { children: Readonly<React.ReactNode> };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="flex flex-col items-center scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col w-full lg:w-2/3">
        <Providers>
          <Header />

          <main className="mt-32 mb-20 scroll-mt-32 flex grow flex-col items-center">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>

          <Toaster />

          <footer className="flex flex-col items-center py-2 text-center text-sm">
            <Muted>
              Copyright &copy; {new Date().getUTCFullYear()}{' '}
              <Link href={siteConfig.metadata.author.url ?? '/'}>
                <strong>{siteConfig.metadata.author.name}</strong>
              </Link>
            </Muted>
            <Muted>
              {/* spans for line breaking: https://stackoverflow.com/a/24357132/20143641 */}
              <span className="inline-block">Articles are licensed under</span>{' '}
              <span className="inline-block">
                <Link href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">
                  <strong>CC BY-SA 4.0</strong>
                </Link>
              </span>{' '}
              <span className="inline-block">unless otherwise noted.</span>
            </Muted>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

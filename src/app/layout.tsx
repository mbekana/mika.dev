import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mika | Senior Frontend Engineer',
  description: 'Frontend systems engineer focused on React, App Architecture, and UX.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="app-main">
          {children}
        </main>
      </body>
    </html>
  );
}

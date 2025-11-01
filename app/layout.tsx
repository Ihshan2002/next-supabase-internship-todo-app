// app/layout.tsx
import './globals.css';
import Navbar from '@/app/Navbar' // Import your Navbar component

export const metadata = {
  title: 'My Next.js App',
  description: 'Next.js fundamentals project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />  {/* Navbar appears on all pages */}
        <main>{children}</main> {/* Your pages will render here */}
      </body>
    </html>
  );
}

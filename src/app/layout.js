import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ProjectFlow',
  description: 'Your project management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-black text-neutral-200 flex flex-col h-screen overflow-hidden`}>

        <div className="fixed inset-0 -z-10 h-full w-full bg-neutral-950">
           <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
           <div className="absolute left-0 right-0 top-0 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
      </body>
    </html>
  );
}
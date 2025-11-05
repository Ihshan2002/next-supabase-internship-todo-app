import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Next Supabase Todo",
  description: "Your simple and clean To-Do app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-50 text-gray-800 min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}

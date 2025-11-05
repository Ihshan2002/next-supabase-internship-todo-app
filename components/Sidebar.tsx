import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 border-r border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-blue-600">Menu</h2>
      <nav className="space-y-2">
        <Link href="/home" className="block hover:font-semibold">🏠 Home</Link>
        <Link href="/dashboard" className="block hover:font-semibold">📋 Dashboard</Link>
        <Link href="/about" className="block hover:font-semibold">ℹ️ About</Link>
      </nav>
    </aside>
  );
}

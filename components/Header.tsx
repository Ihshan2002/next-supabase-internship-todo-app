import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
        TaskFlow
      </Link>

      <div className="text-sm md:text-base font-medium text-gray-700 italic">
        ⚡ You are <span className="text-blue-600 font-semibold">Unstoppable</span> — keep pushing forward!
      </div>
    </header>
  );
}

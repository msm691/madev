import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Tags, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="w-64 bg-zinc-900 text-zinc-300 flex flex-col shadow-xl z-10">
        <div className="p-6 bg-zinc-950 font-bold text-white text-xl border-b border-zinc-800">
          MADEV Pass <span className="text-blue-500 text-sm block font-normal">Administration</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-zinc-800 hover:text-white rounded-lg transition font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-3 hover:bg-zinc-800 hover:text-white rounded-lg transition font-medium">
            <Users size={20} /> Validations
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 p-3 hover:bg-zinc-800 hover:text-white rounded-lg transition font-medium">
            <Tags size={20} /> Catégories
          </Link>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <Link href="/api/auth/signout" className="flex items-center gap-3 p-3 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition font-medium">
            <LogOut size={20} /> Déconnexion
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

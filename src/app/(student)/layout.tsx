import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Store, Heart, History, User, LogOut } from "lucide-react";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 font-bold text-blue-600 text-xl border-b border-gray-100">
          MADEV Pass <span className="text-gray-500 text-sm block font-normal">Espace Étudiant</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/student" className="flex items-center gap-3 p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition font-medium">
            <LayoutDashboard size={20} /> Mon QR Code
          </Link>
          <Link href="/student/merchants" className="flex items-center gap-3 p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition font-medium">
            <Store size={20} /> Commerçants & Offres
          </Link>
          <Link href="/student/favorites" className="flex items-center gap-3 p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition font-medium">
            <Heart size={20} /> Mes Favoris
          </Link>
          <Link href="/student/history" className="flex items-center gap-3 p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition font-medium">
            <History size={20} /> Mon Historique
          </Link>
          <Link href="/student/profile" className="flex items-center gap-3 p-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition font-medium">
            <User size={20} /> Mon Profil
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/api/auth/signout" className="flex items-center gap-3 p-3 hover:bg-red-50 text-red-500 rounded-lg transition font-medium">
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

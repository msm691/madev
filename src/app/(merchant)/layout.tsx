import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Store, Ticket, QrCode, LogOut } from "lucide-react";

export default function MerchantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10">
        <div className="p-6 bg-slate-950 font-bold text-white text-xl border-b border-slate-800">
          MADEV Pass <span className="text-green-500 text-sm block font-normal">Espace Commerçant</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/merchant" className="flex items-center gap-3 p-3 hover:bg-slate-800 hover:text-white rounded-lg transition font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/merchant/profile" className="flex items-center gap-3 p-3 hover:bg-slate-800 hover:text-white rounded-lg transition font-medium">
            <Store size={20} /> Ma Boutique
          </Link>
          <Link href="/merchant/offers" className="flex items-center gap-3 p-3 hover:bg-slate-800 hover:text-white rounded-lg transition font-medium">
            <Ticket size={20} /> Mes Offres
          </Link>
          <Link href="/merchant/scan" className="flex items-center gap-3 p-3 hover:bg-slate-800 hover:text-white rounded-lg transition font-medium">
            <QrCode size={20} /> Scanner un Pass
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
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

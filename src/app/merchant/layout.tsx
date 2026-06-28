import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Store, Ticket, QrCode, LogOut, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";

const NavLinks = () => (
  <>
    <Link href="/merchant" className="flex items-center gap-3 p-3 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition font-medium">
      <LayoutDashboard size={20} /> Dashboard
    </Link>
    <Link href="/merchant/profile" className="flex items-center gap-3 p-3 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition font-medium">
      <Store size={20} /> Ma Boutique
    </Link>
    <Link href="/merchant/offers" className="flex items-center gap-3 p-3 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition font-medium">
      <Ticket size={20} /> Mes Offres
    </Link>
    <Link href="/merchant/scan" className="flex items-center gap-3 p-3 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition font-medium">
      <QrCode size={20} /> Scanner un Pass
    </Link>
  </>
);

export default function MerchantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="font-bold text-white text-xl">MADEV Pass</div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-slate-800 text-slate-300 hover:text-white">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-slate-900 border-r border-slate-800">
              <div className="p-6 font-bold text-white text-xl border-b border-slate-800 bg-slate-950">
                MADEV Pass <span className="text-green-500 text-sm block font-normal mt-1">Espace Commerçant</span>
              </div>
              <nav className="p-4 space-y-2 flex-col flex">
                <NavLinks />
              </nav>
              <div className="p-4 border-t border-slate-800 mt-auto absolute bottom-0 w-full">
                <Link href="/api/auth/signout" className="flex items-center gap-3 p-3 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition font-medium">
                  <LogOut size={20} /> Déconnexion
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex-col shadow-xl z-10 sticky top-0 h-screen">
        <div className="p-6 font-bold text-white text-xl border-b border-slate-800 bg-slate-950">
          MADEV Pass <span className="text-green-500 text-sm block font-normal mt-1">Espace Commerçant</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-slate-800 flex justify-between items-center">
          <Link href="/api/auth/signout" className="flex items-center gap-2 p-2 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition font-medium">
            <LogOut size={20} /> Sortir
          </Link>
          <ModeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
}

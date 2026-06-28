import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Store, Heart, History, User, LogOut, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";

const NavLinks = () => (
  <>
    <Link href="/student" className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition font-medium">
      <LayoutDashboard size={20} /> Mon QR Code
    </Link>
    <Link href="/student/merchants" className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition font-medium">
      <Store size={20} /> Commerçants & Offres
    </Link>
    <Link href="/student/favorites" className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition font-medium">
      <Heart size={20} /> Mes Favoris
    </Link>
    <Link href="/student/history" className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition font-medium">
      <History size={20} /> Mon Historique
    </Link>
    <Link href="/student/profile" className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition font-medium">
      <User size={20} /> Mon Profil
    </Link>
  </>
);

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="font-bold text-blue-600 dark:text-blue-400 text-xl">MADEV Pass</div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-800">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
              <div className="p-6 font-bold text-blue-600 dark:text-blue-400 text-xl border-b border-slate-100 dark:border-slate-800">
                MADEV Pass <span className="text-slate-500 dark:text-slate-400 text-sm block font-normal mt-1">Espace Étudiant</span>
              </div>
              <nav className="p-4 space-y-2 flex-col flex">
                <NavLinks />
              </nav>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 mt-auto absolute bottom-0 w-full">
                <Link href="/api/auth/signout" className="flex items-center gap-3 p-3 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-lg transition font-medium">
                  <LogOut size={20} /> Déconnexion
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shadow-sm z-10 sticky top-0 h-screen">
        <div className="p-6 font-bold text-blue-600 dark:text-blue-400 text-xl border-b border-slate-100 dark:border-slate-800">
          MADEV Pass <span className="text-slate-500 dark:text-slate-400 text-sm block font-normal mt-1">Espace Étudiant</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <Link href="/api/auth/signout" className="flex items-center gap-2 p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-lg transition font-medium">
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

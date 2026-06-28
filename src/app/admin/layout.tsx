import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Tags, LogOut, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";

const NavLinks = () => (
  <>
    <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg transition font-medium">
      <LayoutDashboard size={20} /> Dashboard
    </Link>
    <Link href="/admin/users" className="flex items-center gap-3 p-3 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg transition font-medium">
      <Users size={20} /> Validations
    </Link>
    <Link href="/admin/categories" className="flex items-center gap-3 p-3 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg transition font-medium">
      <Tags size={20} /> Catégories
    </Link>
  </>
);

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="font-bold text-white text-xl">MADEV Pass</div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-zinc-800 text-zinc-300 hover:text-white">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-zinc-900 border-r border-zinc-800">
              <div className="p-6 font-bold text-white text-xl border-b border-zinc-800 bg-zinc-950">
                MADEV Pass <span className="text-blue-500 text-sm block font-normal mt-1">Administration</span>
              </div>
              <nav className="p-4 space-y-2 flex-col flex">
                <NavLinks />
              </nav>
              <div className="p-4 border-t border-zinc-800 mt-auto absolute bottom-0 w-full">
                <Link href="/api/auth/signout" className="flex items-center gap-3 p-3 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition font-medium">
                  <LogOut size={20} /> Déconnexion
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-zinc-900 text-zinc-300 border-r border-zinc-800 flex-col shadow-xl z-10 sticky top-0 h-screen">
        <div className="p-6 font-bold text-white text-xl border-b border-zinc-800 bg-zinc-950">
          MADEV Pass <span className="text-blue-500 text-sm block font-normal mt-1">Administration</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
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

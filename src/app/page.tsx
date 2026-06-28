import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Store, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden flex flex-col">
      <header className="px-8 py-6 flex justify-between items-center border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">MADEV<span className="text-slate-800">Pass</span></h1>
        <nav className="gap-4 flex">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold text-slate-600 hover:text-blue-600">Se connecter</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6">S'inscrire</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-blue-50 via-slate-50 to-white">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">carte numérique</span> 2.0
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Accédez à un réseau exclusif de commerçants partenaires, profitez de réductions et validez vos avantages en un simple scan de QR Code.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Rejoindre le réseau <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold">
                Espace Membre
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mt-24">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <QrCode className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Pass Numérique</h3>
            <p className="text-slate-600">Fini la carte plastique. Votre QR Code personnel est toujours avec vous sur votre smartphone.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="h-14 w-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <Store className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Réseau Commerçant</h3>
            <p className="text-slate-600">Découvrez les offres exclusives de nos commerçants partenaires directement sur la plateforme.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="h-14 w-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">100% Sécurisé</h3>
            <p className="text-slate-600">Une validation stricte des profils étudiants par l'administration pour garantir l'accès aux offres.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

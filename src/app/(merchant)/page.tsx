import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, ScanLine } from "lucide-react";

export default async function MerchantDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) return null;

  const merchantProfile = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id }
  });

  if (!merchantProfile) {
    return (
      <div className="p-6 bg-orange-50 text-orange-800 rounded-md">
        Bienvenue ! Veuillez configurer votre profil de boutique pour commencer (bientôt disponible).
      </div>
    );
  }

  const [totalOffers, totalScans] = await Promise.all([
    prisma.offer.count({ where: { merchantId: merchantProfile.id } }),
    prisma.scanHistory.count({ where: { merchantId: merchantProfile.id } })
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800">Bonjour, {merchantProfile.storeName}</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Offres Actives</CardTitle>
            <Ticket className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalOffers}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pass Étudiants Scannés</CardTitle>
            <ScanLine className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalScans}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

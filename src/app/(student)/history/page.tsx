import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function StudentHistoryPage() {
  const session = await getServerSession(authOptions);
  
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session?.user?.id || "" }
  });

  if (!profile) return <div className="p-4 text-red-500">Profil introuvable. Veuillez configurer votre profil.</div>;

  const scans = await prisma.scanHistory.findMany({
    where: { studentId: profile.id },
    orderBy: { scannedAt: "desc" },
    include: {
      merchant: true
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">Mon Historique</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Derniers passages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date et Heure</TableHead>
                <TableHead>Commerçant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-gray-500">Aucun passage enregistré.</TableCell>
                </TableRow>
              )}
              {scans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">
                    {format(new Date(scan.scannedAt), "PPP à HH:mm", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-blue-600 font-medium">
                    {scan.merchant.storeName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

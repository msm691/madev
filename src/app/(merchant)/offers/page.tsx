import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createOffer, deleteOffer } from "./actions";
import { Trash2 } from "lucide-react";

export default async function MerchantOffersPage() {
  const session = await getServerSession(authOptions);
  const profile = await prisma.merchantProfile.findUnique({
    where: { userId: session?.user?.id || "" }
  });

  if (!profile) return <div className="p-4 text-red-500">Profil incomplet. Vous devez d'abord configurer votre boutique.</div>;

  const offers = await prisma.offer.findMany({
    where: { merchantId: profile.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800">Gestion de mes offres</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit shadow-sm">
          <CardHeader>
            <CardTitle>Nouvelle offre</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createOffer} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Titre</label>
                <Input name="title" placeholder="Menu étudiant à 5€" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Input name="description" placeholder="Valable tous les midis..." required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Réduction / Avantage</label>
                <Input name="discount" placeholder="Ex: -15%, ou 1 acheté = 1 offert" required />
              </div>
              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">Créer l'offre</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Mes offres actives</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Avantage</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">Aucune offre créée.</TableCell>
                  </TableRow>
                )}
                {offers.map(offer => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.title}</TableCell>
                    <TableCell className="text-blue-600 font-semibold">{offer.discount}</TableCell>
                    <TableCell>
                      <Badge variant={offer.isActive ? "default" : "secondary"}>{offer.isActive ? "Active" : "Inactive"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={async () => { "use server"; await deleteOffer(offer.id); }}>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

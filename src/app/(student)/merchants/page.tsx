import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default async function MerchantsPage() {
  const merchants = await prisma.merchantProfile.findMany({
    include: {
      category: true,
      offers: {
        where: { isActive: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">Commerçants & Offres</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {merchants.map((merchant) => (
          <Card key={merchant.id} className="shadow-sm hover:shadow-md transition">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{merchant.storeName}</CardTitle>
                {merchant.category && (
                  <Badge variant="outline">{merchant.category.name}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">{merchant.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                {merchant.address && (
                  <div className="flex items-center gap-2"><MapPin size={14} /> {merchant.address}</div>
                )}
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-700">Offres du moment :</p>
                {merchant.offers.length === 0 ? (
                  <p className="text-sm text-gray-400">Aucune offre active.</p>
                ) : (
                  merchant.offers.map(offer => (
                    <div key={offer.id} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <span className="font-bold text-blue-700 block mb-1">{offer.discount}</span>
                      <span className="text-blue-900">{offer.title}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {merchants.length === 0 && (
          <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Aucun commerçant partenaire n'est encore inscrit.</p>
          </div>
        )}
      </div>
    </div>
  );
}

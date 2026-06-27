import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "./actions";

export default async function MerchantProfilePage() {
  const session = await getServerSession(authOptions);
  const profile = await prisma.merchantProfile.findUnique({
    where: { userId: session?.user?.id || "" }
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800">Ma Boutique</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Informations de la boutique</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Nom de la boutique</label>
              <Input name="storeName" defaultValue={profile?.storeName || ""} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Input name="description" defaultValue={profile?.description || ""} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Adresse postale</label>
              <Input name="address" defaultValue={profile?.address || ""} />
            </div>
            <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">Mettre à jour le profil</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

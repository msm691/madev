import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateStudentProfile } from "./actions";

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session?.user?.id || "" }
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">Mon Profil</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Mes informations</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateStudentProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Prénom</label>
                <Input name="firstName" defaultValue={profile?.firstName || ""} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Nom</label>
                <Input name="lastName" defaultValue={profile?.lastName || ""} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">École / Université</label>
              <Input name="school" defaultValue={profile?.school || ""} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Lien vers justificatif étudiant</label>
              <Input name="documentUrl" placeholder="https://..." defaultValue={profile?.documentUrl || ""} required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Mettre à jour</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

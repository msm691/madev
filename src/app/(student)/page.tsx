import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session?.user?.id || "" }
  });

  if (!profile) {
    return (
      <div className="p-6 bg-blue-50 text-blue-800 rounded-md border border-blue-200 shadow-sm max-w-2xl">
        <h3 className="font-bold text-lg mb-2">Bienvenue sur votre espace !</h3>
        <p className="mb-4">Pour générer votre QR Code, vous devez d'abord compléter vos informations personnelles.</p>
        <Link href="/student/profile" className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
          Configurer mon profil
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800 self-start">Mon MADEV Pass</h2>
      
      <Card className="max-w-sm w-full text-center shadow-xl border-t-4 border-t-blue-500 overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6">
          <CardTitle className="text-2xl text-blue-600">{profile.firstName} {profile.lastName}</CardTitle>
          <CardDescription className="font-medium text-gray-500 mt-1">{profile.school}</CardDescription>
        </CardHeader>
        <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 inline-block">
            <QRCodeSVG 
              value={profile.qrCode} 
              size={220}
              level="H"
              includeMargin={false}
              fgColor="#1e3a8a" // Tailwind blue-900
            />
          </div>
          <p className="mt-8 text-sm text-gray-500 leading-relaxed px-4">
            Présentez ce QR Code chez un commerçant partenaire pour valider votre avantage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserActions } from "./UserActions";

export const dynamic = "force-dynamic";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      studentProfile: true,
      merchantProfile: true,
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-800">Utilisateurs et Validations</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Nom / Boutique</TableHead>
                <TableHead>Justificatif</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-zinc-500">Aucun utilisateur trouvé.</TableCell>
                </TableRow>
              )}
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "STUDENT" ? "default" : user.role === "MERCHANT" ? "secondary" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === "STUDENT" && user.studentProfile ? `${user.studentProfile.firstName} ${user.studentProfile.lastName}` : ""}
                    {user.role === "MERCHANT" && user.merchantProfile ? user.merchantProfile.storeName : ""}
                    {user.role === "ADMIN" && "Admin"}
                  </TableCell>
                  <TableCell>
                    {user.studentProfile?.documentUrl ? (
                      <a href={user.studentProfile.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Voir document
                      </a>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.accountStatus === "APPROVED" ? "default" : user.accountStatus === "REJECTED" ? "destructive" : "outline"} className={user.accountStatus === "PENDING" ? "bg-orange-100 text-orange-800 border-orange-200" : ""}>
                      {user.accountStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.accountStatus === "PENDING" && (
                      <UserActions userId={user.id} />
                    )}
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

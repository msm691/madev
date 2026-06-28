import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory, deleteCategory } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { merchants: true } } }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-800">Catégories Commerçants</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit shadow-sm">
          <CardHeader>
            <CardTitle>Ajouter une catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createCategory} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nom de la catégorie</label>
                <Input name="name" placeholder="Ex: Restauration" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Input name="description" placeholder="Courte description..." />
              </div>
              <Button type="submit" className="w-full bg-zinc-900 text-white hover:bg-zinc-800">Créer</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Liste des catégories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Commerçants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-zinc-500">Aucune catégorie existante.</TableCell>
                  </TableRow>
                )}
                {categories.map((category: any) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-zinc-500">{category.description || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category._count.merchants}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={async () => { "use server"; await deleteCategory(category.id); }}>
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

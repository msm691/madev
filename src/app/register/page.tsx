"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const res = await registerUser(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-600">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">Rejoindre MADEV Pass</CardTitle>
          <CardDescription>Créez votre compte pour accéder à la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">{error}</div>}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Adresse Email</label>
              <Input name="email" type="email" placeholder="prenom.nom@ecole.fr" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mot de passe</label>
              <Input name="password" type="password" placeholder="••••••••" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Je suis un...</label>
              <select name="role" required className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="STUDENT">Étudiant (Profiter des réductions)</option>
                <option value="MERCHANT">Commerçant (Proposer des offres)</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6">
              S'inscrire
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Vous avez déjà un compte ? <Link href="/login" className="text-blue-600 hover:underline font-medium">Se connecter</Link>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-xs text-blue-800 border border-blue-100">
            <strong>Note :</strong> Après inscription, votre compte sera en attente. Un administrateur devra vérifier votre profil avant que vous puissiez vous connecter.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

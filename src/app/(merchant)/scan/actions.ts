"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function processScan(qrCode: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { success: false, error: "Non autorisé" };

  const merchantProfile = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id }
  });

  if (!merchantProfile) return { success: false, error: "Profil commerçant introuvable" };

  const student = await prisma.studentProfile.findUnique({
    where: { qrCode }
  });

  if (!student) return { success: false, error: "QR Code étudiant invalide ou introuvable" };

  // Enregistrer le scan
  await prisma.scanHistory.create({
    data: {
      studentId: student.id,
      merchantId: merchantProfile.id,
    }
  });

  return { 
    success: true, 
    studentName: `${student.firstName} ${student.lastName}`
  };
}

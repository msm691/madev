"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function getMerchantId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Non autorisé");
  const profile = await prisma.merchantProfile.findUnique({ where: { userId: session.user.id }});
  if (!profile) throw new Error("Profil introuvable");
  return profile.id;
}

export async function createOffer(formData: FormData) {
  try {
    const merchantId = await getMerchantId();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const discount = formData.get("discount") as string;

    if (!title || !description || !discount) return;

    await prisma.offer.create({
      data: { merchantId, title, description, discount }
    });

    revalidatePath("/merchant/offers");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteOffer(id: string) {
  try {
    const merchantId = await getMerchantId();
    await prisma.offer.delete({ where: { id, merchantId } });
    revalidatePath("/merchant/offers");
  } catch (error) {
    console.error(error);
  }
}

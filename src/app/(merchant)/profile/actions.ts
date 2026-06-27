"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const storeName = formData.get("storeName") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;

  await prisma.merchantProfile.upsert({
    where: { userId: session.user.id },
    update: { storeName, description, address },
    create: { userId: session.user.id, storeName, description, address }
  });

  revalidatePath("/merchant/profile");
  revalidatePath("/merchant");
}

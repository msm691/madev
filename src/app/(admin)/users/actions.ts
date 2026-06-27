"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserStatus(userId: string, status: "APPROVED" | "REJECTED") {
  await prisma.user.update({
    where: { id: userId },
    data: { accountStatus: status }
  });
  revalidatePath("/admin/users");
  revalidatePath("/admin");
}

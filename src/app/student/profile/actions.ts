"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStudentProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const school = formData.get("school") as string;
  const documentUrl = formData.get("documentUrl") as string;

  await prisma.studentProfile.upsert({
    where: { userId: session.user.id },
    update: { firstName, lastName, school, documentUrl },
    create: { userId: session.user.id, firstName, lastName, school, documentUrl }
  });

  revalidatePath("/student/profile");
  revalidatePath("/student");
}

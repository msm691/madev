import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const adminEmail = 'admin@madev.fr';
  const adminPassword = 'admin'; // Mot de passe simple pour le test local

  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (existingAdmin) {
    console.log(`Un administrateur existe déjà : ${existingAdmin.email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      accountStatus: 'APPROVED',
    },
  });

  console.log(`Compte Administrateur créé avec succès !`);
  console.log(`Email : ${adminEmail}`);
  console.log(`Mot de passe : ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

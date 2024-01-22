export const pageSeed = async () => {
  try {
    await prisma.page.upsert({
      where: {slug: 'main'},
      update: {},
      create: {name: 'Main', slug: 'main', content: ''},
    });
  } catch (error) {
    throw new Error('Error create page');
  }
};

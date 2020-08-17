import { prisma } from '~/utils/prisma'

const past = +new Date() - 1000 * 3600

async function shuffle(id: number) {
  const t = past + 1000 * Math.random() * 3600

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      createdAt: new Date(t),
    },
  })

  console.log(`${id} 업데이트함 ${t}`)
}

async function run() {
  const ids = (await prisma.product.findMany()).map((x) => x.id)

  for (const id of ids) {
    await shuffle(id)
  }

  prisma.$disconnect()
}

run()

import { prisma } from '~/utils/prisma'

const past = +new Date() - 1000 * 3600
const ids: number[] = []
for (let id = 2929; id <= 9528; id++) {
  ids.push(id)
}
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
  for (const id of ids) {
    await shuffle(id)
  }
}

run()

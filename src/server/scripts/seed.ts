import { PrismaClient } from '@prisma/client'
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

let results = [] as {
  name: string
  category: string
  price: string
  base_price: string
  discount_percentage: string
  img_src: string
}[]

const filenames = [
  'condiment',
  'dairy',
  'drinks',
  'eggs',
  'fish',
  'frozen',
  'fruits',
  'instant',
  'sauce',
  'snack',
  'vegetables',
]

function seed(filename: string) {
  results = []

  return new Promise((resolve) => {
    fs.createReadStream(
      path.join(__dirname, `../../../resource/${filename}.csv`)
    )
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', async () => {
        console.log(`🏃🏻‍♂️ ${filename} ${results.length}개 넣는 중...`)

        for (const item of results) {
          const price = parseInt(item.price.replace(/,/g, ''))
          const basePrice = parseInt(item.base_price.replace(/,/g, '')) || price
          const discount =
            parseInt(item.discount_percentage.replace(/%/g, '')) || 0

          // await prisma.product.create({
          //   data: {
          //     name: item.name,
          //     defaultPrice: basePrice,
          //     discount,
          //     price,
          //     category: item.category.replace(/\//g, '·'),
          //     imgV: item.img_src,
          //     imgH: item.img_src,
          //   },
          // })
        }

        console.log(`🏃🏻‍♂️ ${filename} 다 넣음ㅎ`)

        resolve()
      })
  })
}

async function run() {
  for (const filename of filenames) {
    await seed(filename)
  }

  prisma.$disconnect()
}

run()

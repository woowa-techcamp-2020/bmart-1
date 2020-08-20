import { PrismaClient } from '@prisma/client'
import fetch from 'node-fetch'

const prisma = new PrismaClient()

const baseURL = 'https://api.kurly.com/v1/categories/'

async function seedCurly() {
  const result = await fetch(baseURL)
  const {
    data: { categories },
  } = await result.json()

  for await (const category of categories) {
    const categoryName = category.name
    const subcategories = category.categories

    for await (const subcategory of subcategories) {
      const subcategoryId = subcategory.no
      const subcategoryName = subcategory.name
      const subcategoryURL = `${baseURL + subcategoryId}?page_limit=500&page_no=1`

      const result = await fetch(subcategoryURL)
      const {
        data: { products },
      } = await result.json()

      console.log(`working on ${subcategoryId}: ${subcategoryName} (${products.length} items)`)

      for await (const product of products) {
        const {
          name,
          original_price: defaultPrice,
          price,
          thumbnail_image_url: imgV,
          thumbnail_image_z_url: imgH,
          shortdesc: description,
          discount_amount: discount,
        } = product

        if (discount > 100) continue

        await prisma.product.create({
          data: {
            name,
            defaultPrice,
            price,
            imgV,
            imgH,
            description,
            discount,
            category: categoryName,
            subcategory: subcategoryName,
          },
        })
      }

      console.log(`${subcategoryName} done!`)
    }
  }

  prisma.$disconnect()
}

seedCurly()

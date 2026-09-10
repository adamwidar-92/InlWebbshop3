import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const router = Router()
const prisma = new PrismaClient()


// GET /api/products -  Hämta alla produkter

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' }
    })
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte hämta produkter' })
  }
})


// GET /api/products/:id - Hämta en produkt

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      return res.status(404).json({ error: 'Produkten hittades inte' })
    }

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte hämta produkten' })
  }
})


// POST /api/products - Skapa ny produkt

router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body

    // Enkel validering
    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: 'Alla fält utom category är obligatoriska' })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        category: category || null
      }
    })

    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte skapa produkten' })
  }
})


// PUT /api/products/:id - Uppdatera produkt

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, description, price, image, category } = req.body

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ error: 'Produkten hittades inte' })
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        image,
        category: category || null
      }
    })

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte uppdatera produkten' })
  }
})


// DELETE /api/products/:id - Ta bort produkt

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ error: 'Produkten hittades inte' })
    }

    await prisma.product.delete({
      where: { id }
    })

    res.json({ message: 'Produkten har tagits bort' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte ta bort produkten' })
  }
})

export default router
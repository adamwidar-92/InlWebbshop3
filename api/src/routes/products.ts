import { Router } from 'express'
import { db } from '../db.js'

const productsRouter = Router()

const isValidImagePath = (path: string): boolean => {
  const trimmed = path.trim()
  // Acceptera lokala vägar
  if (trimmed.startsWith('/src/assets/bilder/')) return true
  if (trimmed.startsWith('/assets/bilder/')) return true
  // Eller URL
  try {
    new URL(trimmed)
    return true
  } catch {
    return false
  }
}


// GET /api/products -  Hämta alla produkter

productsRouter.get('/', async (req, res) => {
  try {
    const products = await db.product.findMany({
      where: { isDeleted: false },
      orderBy: { id: 'asc' }
    })
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte hämta produkter' })
  }
})


// GET /api/products/:id - Hämta en produkt

productsRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const product = await db.product.findUnique({
      where: { id }
    })

    if (!product || product.isDeleted ) {
      return res.status(404).json({ error: 'Produkten hittades inte' })
    }

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte hämta produkten' })
  }
})


// POST /api/products - Skapa produkt

productsRouter.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ error: 'Namn är obligatoriskt och måste vara 2-100 tecken' })
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({ error: 'Beskrivning är obligatorisk och måste vara minst 10 tecken' })
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0 || Number(price) > 100000) {
      return res.status(400).json({ error: 'Pris är obligatoriskt, måste vara mellan 0 och 100 000' })
    }

    if (!image || typeof image !== 'string' || !isValidImagePath(image.trim())) {
      return res.status(400).json({ error: 'Bild-väg är obligatorisk och måste vara en giltig väg eller URL' })
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      return res.status(400).json({ error: 'Kategori är obligatorisk' })
    }

    const product = await db.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image.trim(),
        category: category.trim()
      }
    })

    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte skapa produkten' })
  }
})


// PUT /api/products/:id - Uppdatera produkt

productsRouter.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, description, price, image, category } = req.body

    const existing = await db.product.findUnique({ where: { id } })
    if (!existing || existing.isDeleted) {
      return res.status(404).json({ error: 'Produkten hittades inte' })
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ error: 'Namn är obligatoriskt och måste vara 2-100 tecken' })
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({ error: 'Beskrivning är obligatorisk och måste vara minst 10 tecken' })
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0 || Number(price) > 100000) {
      return res.status(400).json({ error: 'Pris är obligatoriskt, måste vara mellan 0 och 100 000' })
    }

    if (!image || typeof image !== 'string' || !isValidImagePath(image.trim())) {
      return res.status(400).json({ error: 'Bild-väg är obligatorisk och måste vara en giltig väg eller URL' })
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      return res.status(400).json({ error: 'Kategori är obligatorisk' })
    }

    const product = await db.product.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image.trim(),
        category: category.trim()
      }
    })

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte uppdatera produkten' })
  }
})


// DELETE /api/products/:id - Ta bort produkt (soft delete)

productsRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existing = await db.product.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ error: 'Produkten hittades inte' })
    }

    await db.product.update({
      where: { id },
      data: { isDeleted: true }
    })

    res.json({ message: 'Produkten har tagits bort' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Kunde inte ta bort produkten' })
  }
})

export default productsRouter
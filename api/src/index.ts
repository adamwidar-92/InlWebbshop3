import cors from 'cors'
import express from 'express'
import productsRouter from './routes/products.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', productsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API:et fungerar!' })
})

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`)
})
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // Hämta produkt om vi redigerar
  useEffect(() => {
    if (!isEdit) return

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || '',
          description: data.description || '',
          price: String(data.price ?? ''),
          image: data.image || '',
          category: data.category || '',
        })
      })
      .catch((err) => console.error(err))
  }, [id, isEdit])

   const categories = ['Vit Portion', 'Svart Portion', 'Slim Portion', 'Lös Snus', 'Övrig', 'White Portion', 'All White', 'Nikotinfritt']

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

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) {
      newErrors.name = 'Namn är obligatoriskt'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Namn måste vara minst 2 tecken'
    } else if (form.name.trim().length > 100) {
      newErrors.name = 'Namn får max vara 100 tecken'
    }

    if (!form.description.trim()) {
      newErrors.description = 'Beskrivning är obligatorisk'
    } else if (form.description.trim().length < 10) {
      newErrors.description = 'Beskrivning måste vara minst 10 tecken'
    }

    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = 'Ange ett giltigt pris (större än 0)'
    } else if (Number(form.price) > 100000) {
      newErrors.price = 'Priset kan inte överstiga 100 000 kr'
    }

    if (!form.image.trim()) {
      newErrors.image = 'Bild-väg är obligatorisk'
    } else if (!isValidImagePath(form.image.trim())) {
      newErrors.image = 'Ange en giltig bild-väg (t.ex. /assets/bilder/GbgRape.jpg) eller URL'
    }

    if (!form.category.trim()) {
      newErrors.category = 'Kategori är obligatorisk'
    } else if (!categories.includes(form.category.trim())) {
      newErrors.category = 'Välj en giltig kategori'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    const body = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      category: form.category.trim(),
    }

    const url = isEdit
      ? `/api/products/${id}`
      : '/api/products'

    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Något gick fel')
        setSubmitting(false)
        return
      }

      navigate('/admin')
    } catch (error) {
      console.error(error)
      alert('Kunde inte spara produkten')
      setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        {isEdit ? 'Redigera produkt' : 'Lägg till produkt'}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Namn"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <TextField
            fullWidth
            label="Beskrivning"
            margin="normal"
            multiline
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
            required
          />

          <TextField
            fullWidth
            label="Pris (kr)"
            margin="normal"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            error={!!errors.price}
            helperText={errors.price}
            required
          />

          <TextField
            fullWidth
            label="Bild-URL"
            margin="normal"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            error={!!errors.image}
            helperText={errors.image}
            required
            placeholder="/assets/bilder/GbgRape.jpg"
          />

          <FormControl fullWidth margin="normal" error={!!errors.category} required>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              label="Kategori"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="caption" sx={{ color: '#d32f2f', mt: 0.5 }}>
                {errors.category}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" disabled={submitting}>
              {isEdit ? 'Spara ändringar' : 'Skapa produkt'}
            </Button>
            <Button component={Link} to="/admin" disabled={submitting}>
              Avbryt
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
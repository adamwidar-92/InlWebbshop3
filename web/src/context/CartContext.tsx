import { Snackbar } from '@mui/material'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { CartItem } from '../types/CartItem'
import type { Product } from '../types/Product'

interface CartContextValue {
  items: CartItem[]
  addToCart: (product: Product) => void
  totalQuantity: number
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, newQuantity: number) => void
  clearCart: () => void

}

const CartContext = createContext<CartContextValue | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [showMsg, setShowMsg] = useState(false)
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart')

      if (!savedCart) {
        return []
      }

      const parsedCart = JSON.parse(savedCart)

      if (!Array.isArray(parsedCart)) {
        return []
      }

      const validItems = parsedCart.every((item) => {
        if (item === null || typeof item !== 'object') {
          return false
        }

        const validId = Number.isInteger(item.id) && item.id > 0

        const validText =
          typeof item.name === 'string' &&
          typeof item.description === 'string' &&
          typeof item.image === 'string'

        const validPrice =
          typeof item.price === 'number' &&
          Number.isFinite(item.price) &&
          item.price >= 0

        const validQuantity =
          Number.isInteger(item.quantity) && item.quantity > 0

        const validCategory =
          item.category == null || typeof item.category === 'string'

        return validId && validText && validPrice && validQuantity && validCategory
      })

      if (!validItems) {
        return []
      }

      return parsedCart as CartItem[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])


  function addToCart(product: Product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      )

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
    setShowMsg(true)
  }

  function removeFromCart(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  function clearCart() {
    setItems([])
  }

  function updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) {
      return undefined
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      )
    )
  }

  let totalQuantity = 0

  for (const item of items) {
    totalQuantity = totalQuantity + item.quantity
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        totalQuantity,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}

      <Snackbar
        open={showMsg}
        message="Produkten har lagts till i kundvagnen"
        autoHideDuration={3000}
        onClose={() => setShowMsg(false)}
      />
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart måste användas inuti CartProvider')
  }

  return context
}

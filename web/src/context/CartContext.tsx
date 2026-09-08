import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import type { CartItem } from '../types/CartItem'
import type { Product } from '../types/Product'

interface CartContextValue {
  items: CartItem[]
  addToCart: (product: Product) => void
  totalQuantity: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

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
  }

  let totalQuantity = 0

  for (const item of items) {
    totalQuantity = totalQuantity + item.quantity
  }

  return (
    <CartContext.Provider value={{ items, addToCart, totalQuantity }}>
      {children}
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

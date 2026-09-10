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

}

const CartContext = createContext<CartContextValue | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart')

    if (savedCart) {
      return JSON.parse(savedCart) as CartItem[]
    } else {
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
  }

  function removeFromCart(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
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
    <CartContext.Provider value={{ items, addToCart, totalQuantity, removeFromCart, updateQuantity }}>
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

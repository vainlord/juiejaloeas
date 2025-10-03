import { create } from 'zustand'

export interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image?: string
  notes?: string
}

interface CartStore {
  items: CartItem[]
  customerId?: number
  tableId?: number
  orderType: 'dine_in' | 'take_away' | 'delivery'
  discount: number
  tax: number
  
  addItem: (product: Omit<CartItem, 'id' | 'quantity'>) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  updateItemNotes: (id: number, notes: string) => void
  clearCart: () => void
  setCustomer: (customerId?: number) => void
  setTable: (tableId?: number) => void
  setOrderType: (type: 'dine_in' | 'take_away' | 'delivery') => void
  setDiscount: (amount: number) => void
  
  getSubtotal: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  orderType: 'dine_in',
  discount: 0,
  tax: 0.1, // 10% tax

  addItem: (product) => {
    const items = get().items
    const existingItem = items.find(item => item.productId === product.productId)
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      const newItem: CartItem = {
        ...product,
        id: Date.now(),
        quantity: 1,
      }
      set({ items: [...items, newItem] })
    }
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set({
      items: get().items.map(item =>
        item.id === id ? { ...item, quantity } : item
      ),
    })
  },

  removeItem: (id) => {
    set({ items: get().items.filter(item => item.id !== id) })
  },

  updateItemNotes: (id, notes) => {
    set({
      items: get().items.map(item =>
        item.id === id ? { ...item, notes } : item
      ),
    })
  },

  clearCart: () => {
    set({ 
      items: [], 
      customerId: undefined, 
      tableId: undefined, 
      discount: 0 
    })
  },

  setCustomer: (customerId) => set({ customerId }),
  setTable: (tableId) => set({ tableId }),
  setOrderType: (type) => set({ orderType: type }),
  setDiscount: (amount) => set({ discount: amount }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getTotal: () => {
    const subtotal = get().getSubtotal()
    const discount = get().discount
    const tax = get().tax
    return subtotal - discount + (subtotal * tax)
  },
}))

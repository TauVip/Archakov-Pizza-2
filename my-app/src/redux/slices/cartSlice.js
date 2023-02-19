import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

const price = items =>
  items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
const remove = (items, action) => items.filter(obj => obj.id !== action.payload)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) findItem.count++
      else state.items.push({ ...action.payload, count: 1 })

      state.totalPrice = price(state.items)
    },
    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) findItem.count--
      if (!findItem.count) state.items = remove(state.items, action)

      state.totalPrice = price(state.items)
    },
    removeItem(state, action) {
      state.items = remove(state.items, action)

      state.totalPrice = price(state.items)
    },
    clearItems(state) {
      state.items = []

      state.totalPrice = price(state.items)
    }
  }
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer

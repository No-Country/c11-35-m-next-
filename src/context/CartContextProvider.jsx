import { createContext, React, useState } from 'react'

export const CartContext = createContext({ cart: [] })

export default function CartContextProvider({ children }) {
  const [cartList, setCartList] = useState([])

  const addToCart = (item, qty) => {
    if (isInCart(item.id)) {
      // Si el artículo ya está en el carrito, actualizamos la cantidad
      const index = cartList.findIndex(cartItem => cartItem.id === item.id)
      const updatedItem = {
        ...cartList[index],
        qty: cartList[index].qty + qty
      }
      setCartList(prev => [
        ...prev.slice(0, index),
        updatedItem,
        ...prev.slice(index + 1)
      ])
    } else {
      // Si el artículo no está en el carrito, lo agregamos con la cantidad especificada
      setCartList(prev => [...prev, { ...item, qty }])
    }
  }
  const removeList = () => {
    setCartList([])
  }
  const deleteItem = id => {
    const updatedCart = cartList.filter(prod => prod.id !== id)
    setCartList(updatedCart)
  }
  const cartTotalPrice = cart => {
    const total = cart.reduce((acc, item) => {
      // Multiplicamos la cantidad por el precio y sumamos al acumulador
      return acc + item.qty * item.price
    }, 0)
    // Devolvemos el precio total del carrito
    return total
  }
  const updateItemQty = (id, qty) => {
    const listCopy = [...cartList]
    const toUpdate = listCopy.find(item => item.id === id)
    toUpdate.qty = qty
    setCartList(listCopy)
  }

  const isInCart = id => {
    return cartList.some(prod => prod.id === id)
  }

  const countItems = () => {
    const suma = cartList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.qty
    }, 0)
    return suma
  }
  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        removeList,
        cartTotalPrice,
        updateItemQty,
        countItems,
        deleteItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

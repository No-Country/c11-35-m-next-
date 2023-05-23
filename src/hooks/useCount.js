import { CartContext } from '@/context/CartContextProvider'
import { useContext, useState } from 'react'

export default function useCount (initialValue, id) {
  const [counter, setCounter] = useState(initialValue)
  const { updateItemQty } = useContext(CartContext)

  const decreaseCounter = () => {
    if (counter > 1) {
      const n = counter - 1
      setCounter(n)
      id && updateItemQty(id, n)
    }
  }
  const increaseCounter = () => {
    // if (counter < stock) { TODO: configurar el stock en la DB
    const n = counter + 1
    setCounter(n)
    id && updateItemQty(id, n)
    // }
  }
  return { counter, decreaseCounter, increaseCounter }
}

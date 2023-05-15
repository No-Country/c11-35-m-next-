import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './reducers/data'

const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/data'
import dataHomeReducer from './reducers/dataHome'

const store = configureStore({
  reducer: {
    data: dataReducer,
    dataHome: dataHomeReducer
  }
})

export default store

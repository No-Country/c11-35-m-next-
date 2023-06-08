import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDocs, collection, query, limit } from 'firebase/firestore'
import { db } from '@/services/db'

const initialState = {
  data: null,
  loading: false,
  error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async (props) => {
  try {
    const productsDB = collection(db, 'products')
    const querySnapshot = await getDocs(query(productsDB, limit()))
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data
  } catch (error) {
    throw new Error(error)
  }
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default dataSlice.reducer

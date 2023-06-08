import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDocs, collection, query, limit } from '@firebase/firestore'
import { db } from '@/services/db'

const initialState = {
  dataHome: null,
  loading: false,
  error: null
}

export const fetchDataHome = createAsyncThunk('data/fetchDataHome', async (props) => {
  try {
    const productsDB = collection(db, 'products')
    const querySnapshot = await getDocs(query(productsDB, limit()))
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    if (props !== undefined) {
      const lowercaseProps = props.toLowerCase()
      return data.filter(item =>
        item.name.toLowerCase().includes(lowercaseProps)
      )
    }

    return data
  } catch (error) {
    throw new Error(error)
  }
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataHome.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDataHome.fulfilled, (state, action) => {
        state.loading = false
        state.dataHome = action.payload
        state.error = null
      })
      .addCase(fetchDataHome.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default dataSlice.reducer

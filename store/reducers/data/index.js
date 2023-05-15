import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: null,
  loading: false,
  error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get('https://localhost:3001')
    return response.data
  } catch (error) {
    throw Error(error)
  }
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
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

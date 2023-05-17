import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: null,
  loading: false,
  error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async (props) => {
  try {
    if (props === undefined) {
      const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
      return response.data
    } else {
      const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=${props}`)
      return response.data
    }
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

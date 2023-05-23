import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: null,
  loading: false,
  error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async (props) => {
  try {
    let url = 'https://makeup-api.herokuapp.com/api/v1/products.json'
    if (props === undefined) {
      url += ''
    }

    const response = await axios.get(url)
    let data = response.data

    if (props !== undefined) {
      const lowercaseProps = props.toLowerCase()
      data = data.filter(item => item.name.toLowerCase().includes(lowercaseProps))
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

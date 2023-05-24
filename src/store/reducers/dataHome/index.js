import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  dataHome: null,
  loading: false,
  error: null
}

export const fetchDataHome = createAsyncThunk('data/fetchDataHome', async (props) => {
  try {
    let url = 'http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.9'
    if (props === undefined) {
      url += ''
    }

    const response = await axios.get(url)
    let data = response.data

    if (props !== undefined) {
      const lowercaseProps = props.toLowerCase()
      data = data.filter(item => item.name.toLowerCase().includes(lowercaseProps))
    }

    // Filtrar los primeros 5 resultados
    data = data.slice(0, 5)

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

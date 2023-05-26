import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
/* import { getDocs, collection, query, where } from '@firebase/firestore'
import { db } from '@/services/db' */

const initialState = {
  data: null,
  loading: false,
  error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async props => {
  // const productsDB = collection(db, 'products') // se
  try {
    let url = 'https://makeup-api.herokuapp.com/api/v1/products.json'
    if (props === undefined) {
      url += ''
    }

    const response = await axios.get(url)
    let data = response.data
    /*  const data2 = await getDocs(productsDB)
    let data = data2.docs.map(doc => ({ id: doc.id, ...doc.data() }))
 */
    // console.log(data)
    if (props !== undefined) {
      console.log(props)
      const lowercaseProps = props.toLowerCase()
      data = data.filter(item =>
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

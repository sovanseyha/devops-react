import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}

export const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        handleGetAllCategory: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {handleGetAllCategory} = categorySlice.actions
export default categorySlice.reducer
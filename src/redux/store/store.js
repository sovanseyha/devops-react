import { configureStore } from "@reduxjs/toolkit"
import  categorySlice  from "../slices/CategorySlice"
import taskSlice from "../slices/TaskSlice"

export const store = configureStore({
    reducer: {
        categories: categorySlice,
        tasks: taskSlice
    }
})
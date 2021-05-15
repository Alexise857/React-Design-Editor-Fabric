import { configureStore, Action } from "@reduxjs/toolkit"
import rootReducer, { RootState } from "@store/root-reducer"
import { useDispatch } from "react-redux"
import { ThunkAction } from "redux-thunk"

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store

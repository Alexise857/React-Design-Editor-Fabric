import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "@/services/api"
import { RootState } from "@/store/root-reducer"

export const getTextStyles = createAsyncThunk(
  "textStyles/getTextStyles",
  async (_, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = (getState() as RootState).textStyles
      if (loading !== true || requestId !== currentRequestId) {
        return
      }
      const response = await api.getTextStyles()
      return response
    } catch (err) {
      return rejectWithValue({ message: err.error })
    }
  }
)

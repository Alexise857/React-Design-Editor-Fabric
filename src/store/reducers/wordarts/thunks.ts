import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "@/services/api"

export const getWordArts = createAsyncThunk(
  "wordart/getWordArts",
  async (_, { getState, requestId, rejectWithValue }) => {
    try {
      const response = await api.getWordArts()
      return response
    } catch (err) {
      return rejectWithValue({ message: err.error })
    }
  }
)

export const getWordArtCategories = createAsyncThunk(
  "wordart/getWordArtCategories",
  async (_, { getState, requestId, rejectWithValue }) => {
    try {
      const response = await api.getWordArtCategories()
      return response
    } catch (err) {
      return rejectWithValue({ message: err.error })
    }
  }
)

export const getWordArtSubcategories = createAsyncThunk(
  "wordart/getWordArtSubcategories",
  async (_, { getState, requestId, rejectWithValue }) => {
    try {
      const response = await api.getWordArtSubcategories()
      return response
    } catch (err) {
      return rejectWithValue({ message: err.error })
    }
  }
)

import { createReducer } from "@reduxjs/toolkit"
import {
  getWordArtSubcategories,
  getWordArts,
  getWordArtCategories
} from "@store/reducers/wordarts/thunks"
import { IWordArtState } from "./types"

const initalState: IWordArtState = {
  wordArts: [],
  wordArtCategories: [],
  wordArtSubcategories: [],
  loading: false,
  errors: [],
  currentRequestId: undefined
}

export const wordArtReducer = createReducer(initalState, builder => {
  builder.addCase(getWordArts.pending, (state, { meta: { requestId } }) => {
    state.loading = true
    state.currentRequestId = requestId
    // if (state.loading === false) {
    // }
  })
  builder.addCase(getWordArts.fulfilled, (state, { meta: { requestId }, payload }) => {
    state.loading = false
    state.wordArts = payload
    state.currentRequestId = undefined
    // if (state.loading === true && state.currentRequestId === requestId) {
    // }
  })
  builder.addCase(getWordArtCategories.pending, (state, { meta: { requestId } }) => {
    state.loading = true
    state.currentRequestId = requestId
    // if (state.loading === false) {
    // }
  })
  builder.addCase(getWordArtCategories.fulfilled, (state, { meta: { requestId }, payload }) => {
    state.loading = false
    state.wordArtCategories = payload
    state.currentRequestId = undefined
    // if (state.loading === true && state.currentRequestId === requestId) {
    // }
  })
  builder.addCase(getWordArtSubcategories.pending, (state, { meta: { requestId } }) => {
    state.loading = true
    state.currentRequestId = requestId
    // if (state.loading === false) {
    // }
  })
  builder.addCase(getWordArtSubcategories.fulfilled, (state, { meta: { requestId }, payload }) => {
    state.loading = false
    state.wordArtSubcategories = payload
    state.currentRequestId = undefined
    // if (state.loading === true && state.currentRequestId === requestId) {
    // }
  })
})

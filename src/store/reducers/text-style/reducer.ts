import { createReducer } from "@reduxjs/toolkit"
import { ITextStyleState } from "@store/reducers/text-style/types"
import { getTextStyles } from "./thunks"

const initalState: ITextStyleState = {
  textStyles: [],
  loading: false,
  errors: [],
  currentRequestId: undefined,
}

export const textStylesReducer = createReducer(initalState, (builder) => {
  builder.addCase(getTextStyles.pending, (state, { meta: { requestId } }) => {
    if (state.loading === false) {
      state.loading = true
      state.currentRequestId = requestId
    }
  })
  builder.addCase(
    getTextStyles.fulfilled,
    (state, { meta: { requestId }, payload }) => {
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false
        state.textStyles = payload ? payload : []
        state.currentRequestId = undefined
      }
    }
  )
})

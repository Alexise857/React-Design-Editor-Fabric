import { createReducer } from "@reduxjs/toolkit"
import { getTemplates } from "@store/reducers/templates/thunks"
import { ITemplateState } from "./types"

const initalState: ITemplateState = {
  templates: [],
  loading: false,
  errors: [],
  currentRequestId: undefined,
}

export const templatesReducer = createReducer(initalState, (builder) => {
  builder.addCase(getTemplates.pending, (state, { meta: { requestId } }) => {
    if (state.loading === false) {
      state.loading = true
      state.currentRequestId = requestId
    }
  })
  builder.addCase(
    getTemplates.fulfilled,
    (state, { meta: { requestId }, payload }) => {
      if (state.loading === true && state.currentRequestId === requestId) {
        state.loading = false
        state.templates = payload ? payload : []
        state.currentRequestId = undefined
      }
    }
  )
})

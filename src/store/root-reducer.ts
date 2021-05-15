import { combineReducers } from "@reduxjs/toolkit"
import { textStylesReducer } from "@store/reducers/text-style/reducer"
import { templatesReducer } from "@store/reducers/templates/reducer"
import { wordArtReducer } from "@store/reducers/wordarts/reducer"

const rootReducer = combineReducers({
  textStyles: textStylesReducer,
  templates: templatesReducer,
  wordArt: wordArtReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

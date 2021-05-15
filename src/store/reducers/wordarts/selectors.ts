import { RootState } from "@store/root-reducer"

export const selectWordArtCategories = (state: RootState) => state.wordArt.wordArtCategories
export const selectWordArts = (state: RootState) => state.wordArt.wordArts
export const selectWordArtSubcategories = (state: RootState) => state.wordArt.wordArtSubcategories

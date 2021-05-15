import { RootState } from "@store/root-reducer"

export const selectTemplates = (state: RootState) => state.templates.templates

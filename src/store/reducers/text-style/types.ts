export interface ITextStyleState {
  textStyles: ITextStyle[]
  loading: boolean
  errors: string[]
  currentRequestId: string | undefined
}

export interface ITextStyle {
  id: number
  json: string
  svg: string
  updatedAt: string
  createdAt: string
}

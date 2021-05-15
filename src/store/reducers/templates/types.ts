export interface ITemplateState {
  templates: ITemplate[]
  loading: boolean
  errors: string[]
  currentRequestId: string | undefined
}

export interface ITemplate {
  id: number
  name: string
  files: any
  image: string
  path: string
  category: any
  subcategory: any
  updatedAt: string
  createdAt: string
}

export interface ISubcategory {
  id: number
  name: string
  image: string
  category: number
  subcategory: any
  updatedAt: string
  createdAt: string
}

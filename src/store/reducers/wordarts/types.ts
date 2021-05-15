export interface IWordArtState {
  wordArts: IWordArt[]
  wordArtCategories: IWordArtCategory[]
  wordArtSubcategories: IWordArtSubcategory[]
  loading: boolean
  errors: string[]
  currentRequestId: string | undefined
}

export interface IWordArtCategory {
  id: number
  name: string
  svgArt: any
  wordArts: IWordArt[]
  wordArtSubcategories: IWordArtSubcategory[]
  updatedAt: string
  createdAt: string
}

export interface IWordArt {
  id: number
  name: string
  svgArt: any
  wordArtCategory: number
  wordArtSubcategory: any
  wordartsubcategory: any
  updatedAt: string
  createdAt: string
}

export interface IWordArtSubcategory {
  id: number
  name: number
  wordArtCategory: number
  wordartcategory: any
  svgArt: any
  updatedAt: string
  createdAt: string
}

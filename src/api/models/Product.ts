export interface ProductModel {
  id: number
  title: string
  imageUrl: string
  price: number
}

export interface IProduct {
  id: number
  title: string
  imageUrl: string
  price: number
  isFavorite: boolean
  favoriteId?: number | null
  cartId?: number | null
  isAdded: boolean
}

import type { ProductModel } from '@/api/models/Product'

export interface OrderModel {
  id: number
  items: ProductModel[]
  totalPrice: number
}

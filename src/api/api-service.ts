import { client } from '@/api/client'
import type { AxiosInstance } from 'axios'
import type { ProductModel } from '@/api/models/Product'
import type { IFilters } from '@/api/models/Filters'
import type { FavoriteModel } from '@/api/models/Favorite'
import type { CartItemModel } from '@/api/models/CartItemModel'
import type { OrderModel } from '@/api/models/Order'

class ApiService {
  constructor(private readonly client: AxiosInstance) {}

  public async getAllItems(params?: IFilters): Promise<ProductModel[]> {
    const { data } = await client.get<ProductModel[]>('items', { params })
    return data
  }

  public async getAllFavorites(): Promise<FavoriteModel[]> {
    const { data } = await client.get<FavoriteModel[]>('favorites')
    return data
  }

  public async addFavorite(model: Partial<FavoriteModel>): Promise<FavoriteModel> {
    const { data } = await client.post<FavoriteModel>('favorites', model)
    return data
  }

  public async deleteFavoriteById(id: number): Promise<void> {
    await client.delete(`favorites/${id}`)
  }

  public async getAllCartItems(): Promise<CartItemModel[]> {
    const { data } = await client.get<CartItemModel[]>('cart')
    return data
  }

  public async addToCart(model: Partial<CartItemModel>): Promise<CartItemModel> {
    const { data } = await client.post<CartItemModel>('cart', model)
    return data
  }

  public async deleteFromCartBeId(id: number): Promise<void> {
    await client.delete(`cart/${id}`)
  }

  public async createOrder(model: Partial<OrderModel>): Promise<OrderModel> {
    const { data } = await client.post('orders', model)
    return data
  }
}

export const apiService = new ApiService(client)

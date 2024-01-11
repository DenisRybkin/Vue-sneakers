<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'

import { apiService } from '@/api/api-service'
import RootLayout from '@/components/layouts/RootLayout.vue'
import Drawer from '@/components/Drawer.vue'
import type { IProduct } from '@/api/models/Product'
import type { FavoriteModel } from '@/api/models/Favorite'
import type { CartItemModel } from '@/api/models/CartItemModel'
import type { OrderModel } from '@/api/models/Order'

const items = ref<IProduct[]>([])

const drawerOpen = ref<boolean>(false)

const openDrawer = () => (drawerOpen.value = true)
const closeDrawer = () => (drawerOpen.value = false)

const fetchItems = async (sortBy?: string, searchBy?: string) => {
  try {
    items.value = await apiService
      .getAllItems({
        ...(sortBy && { sortBy: sortBy }),
        ...(searchBy && { title: `*${searchBy}*` })
      })
      .then((items) =>
        items.map((item) => ({
          ...item,
          isFavorite: false,
          isAdded: false
        }))
      )
  } catch (e) {
    console.log(e)
  }
}

const fetchCartItems = async () => {
  try {
    const cartItems = await apiService.getAllCartItems()
    items.value = items.value.map((item) => {
      const cartItem = cartItems.find((cartItem) => item.id == cartItem.parentId)
      if (!cartItem) return item
      return { ...item, isAdded: true, cartId: cartItem.id }
    })
  } catch (e) {
    console.log(e)
  }
}

const fetchFavorites = async () => {
  try {
    const favorites = await apiService.getAllFavorites()
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => item.id == favorite.parentId)
      if (!favorite) return item
      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (e) {
    console.log(e)
  }
}

const createFavorite = async (model: Partial<FavoriteModel>) => {
  try {
    return await apiService.addFavorite(model)
  } catch (e) {
    console.log(e)
  }
}

const deleteFavorite = async (id: number) => {
  try {
    await apiService.deleteFavoriteById(id)
    items.value
  } catch (e) {
    console.log(e)
  }
}

const deleteFomCart = async (id: number) => {
  try {
    await apiService.deleteFromCartBeId(id)
  } catch (e) {
    console.log(e)
  }
}

const createCartItem = async (model: Partial<CartItemModel>) => {
  try {
    return await apiService.addToCart(model)
  } catch (e) {
    console.log(e)
  }
}

const createOrder = async (model: Partial<OrderModel>) => {
  try {
    const res = await apiService.createOrder(model)
    items.value = items.value.map((item) =>
      res.items.some((orderItem) => orderItem.id == item.id)
        ? { ...item, isAdded: false, cartId: null }
        : item
    )
    return res
  } catch (e) {
    console.log(e)
  }
}

const toggleCartItem = async (item: IProduct) => {
  if (!item.isAdded) {
    const createdCartItem = await createCartItem({ parentId: item.id })
    item.cartId = createdCartItem?.id
  } else if (item.cartId) {
    await deleteFomCart(item.cartId)
    delete item.cartId
  }
  item.isAdded = !item.isAdded
}

const toggleFavorite = async (item: IProduct) => {
  if (!item.isFavorite) {
    const createdFavorite = await createFavorite({ parentId: item.id })
    item.favoriteId = createdFavorite?.id
  } else if (item.favoriteId) {
    await deleteFavorite(item.favoriteId)
    delete item.favoriteId
  }
  item.isFavorite = !item.isFavorite
}

const init = async () => {
  await fetchItems()
  await Promise.all([fetchFavorites(), fetchCartItems()])
}

provide('cartData', { closeDrawer, openDrawer, toggleCartItem })
provide('homeData', { items, fetchItems, toggleCartItem, toggleFavorite })
onMounted(init)
</script>

<template>
  <Drawer :items="items" :createOrder="createOrder" v-if="drawerOpen" />
  <RootLayout>
    <router-view></router-view>
  </RootLayout>
</template>

<style scoped></style>

<script setup lang="ts">
import CartItem from '@/components/CartItem.vue'
import type { IProduct } from '@/api/models/Product'
import { inject } from 'vue'

interface Props {
  items?: IProduct[]
}
defineProps<Props>()
const { toggleCartItem } = inject<{ toggleCartItem: (item: IProduct) => void }>('cartData')!
</script>

<template>
  <div class="flex flex-col flex-1 mt-8 gap-4 overflow-auto" v-auto-animate>
    <CartItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :id="item.id"
      :image-url="item.imageUrl"
      :price="item.price"
      :on-click-delete="() => toggleCartItem(item)"
    />
  </div>
</template>

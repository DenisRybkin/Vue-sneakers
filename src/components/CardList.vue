<script setup lang="ts">
import Card from '@/components/Card.vue'
import type { IProduct } from '@/api/models/Product'

interface Props {
  items?: IProduct[]
  isFavorites?: boolean
}
interface Emits {
  (event: 'toggleFavorite', payload: IProduct): void
  (event: 'toggleCartItem', payload: IProduct): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    <Card
      v-for="item in items ?? []"
      v-bind:key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :on-click-favorite="isFavorites ? null : () => emit('toggleFavorite', item)"
      :on-click-add="isFavorites ? null : () => emit('toggleCartItem', item)"
    />
  </div>
</template>

<style scoped></style>

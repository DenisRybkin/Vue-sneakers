<script setup lang="ts">
import CardList from '@/components/CardList.vue'
import { inject } from 'vue'
import { IProduct } from '@/api/models/Product'
import { Ref, ref, watch } from 'vue'
interface InjectData {
  items: Ref<IProduct[]>
  fetchItems: (sortBy?: string, searchBy?: string) => Promise<void>
  toggleFavorite: (item: IProduct) => Promise<void>
  toggleCartItem: (item: IProduct) => Promise<void>
}

const { items, fetchItems, toggleFavorite, toggleCartItem } = inject<InjectData>('homeData')

const sortBy = ref<string>('title')
const searchBy = ref<string>('')
const onChangeSelect = (event: any) => (sortBy.value = event.target.value)
const onChangeSearchInput = (event: any) => (searchBy.value = event.target.value)

watch(sortBy, () => fetchItems(sortBy.value, searchBy.value))
watch(searchBy, () => fetchItems(sortBy.value, searchBy.value))
</script>

<template>
  <div class="flex flex-wrap justify-between items-center mb-10 gap-3">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>
    <div class="flex flex-wrap items-center gap-5">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img src="/search.svg" alt="Search" class="absolute left-4 top-3" />
        <input
          @input="onChangeSearchInput"
          placeholder="Поиск"
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 transition"
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @toggleFavorite="toggleFavorite" @toggleCartItem="toggleCartItem" />
</template>

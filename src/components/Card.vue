<script setup lang="ts">
interface Props {
  id: number
  imageUrl: string
  title: string
  price: number
  isAdded: boolean
  isFavorite: boolean
  onClickFavorite: (() => void) | null
  onClickAdd: (() => void) | null
}

const props = defineProps<Props>()
console.log(props.onClickAdd)
</script>

<template>
  <div
    class="relative border border-slate-100 rounded-3xl p-8 cursor-pointer transition bg-white hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Like"
      class="absolute top-8 left-8"
      @click="onClickFavorite!"
    />
    <img :src="imageUrl" alt="Sneaker" />
    <p class="mt-5">{{ title }}</p>

    <div class="flex justify-between mt-2">
      <div class="flex flex-col">
        <span class="text-slate-500">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img @click="onClickAdd!" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Ref } from 'vue'
import type { IProduct } from '@/api/models/Product'

const { openDrawer } = inject<{ openDrawer: () => void; closeDrawer: () => void }>('cartData')!
const { items } = inject<{ items: Ref<IProduct[]> }>('homeData')!

const totalPrice = computed(() =>
  items.value.reduce((acc, item) => (item.isAdded ? acc + item.price : acc), 0)
)
</script>

<template>
  <header
    class="flex flex-col md:flex-row md:justify-between border-b border-slate-300 px-10 py-8 gap-5"
  >
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500 font-semibold">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex flex-wrap items-center gap-3 md:gap-10 text-gray-500">
      <li @click="openDrawer" class="flex items-center gap-3 hover:text-black cursor-pointer">
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Favorites" />
          <span class="font-semibold">Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 hover:text-black cursor-pointer">
        <img src="/profile.svg" alt="Favorites" />
        <span class="font-semibold">Прфоиль</span>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { IProduct } from '@/api/models/Product'
import CardList from '@/components/CardList.vue'

interface InjectData {
  items: Ref<IProduct[]>
}

const { items } = inject<InjectData>('homeData')!
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>

  <CardList :items="(items as IProduct[]).filter(item => item.isFavorite)" is-favorites />
</template>

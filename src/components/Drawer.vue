<script setup lang="ts">
import DrawerHead from '@/components/DrawerHead.vue'
import CartItemList from '@/components/CartItemList.vue'
import type { IProduct } from '@/api/models/Product'
import { computed, ref } from 'vue'
import type { OrderModel } from '@/api/models/Order'
import InfoBlock from '@/components/InfoBlock.vue'

interface Props {
  items?: IProduct[]
  createOrder: (model: Partial<OrderModel>) => Promise<OrderModel | undefined>
}
// interface Emits {
//   (event: 'createOrder', payload: Partial<OrderModel>): Promise<OrderModel>
// }
const { items, createOrder } = defineProps<Props>()
// const emit = defineEmits<Emits>()
const order = ref<OrderModel | null>(null)
const {
  value: { totalPrice, withTax }
} = computed(() => {
  const totalPrice = (items ?? []).reduce((acc, item) => (item.isAdded ? acc + item.price : acc), 0)
  const withTax = Math.floor(totalPrice + totalPrice * 0.05)
  return { totalPrice, withTax }
})

const cartItems = computed(() => (items ?? [])?.filter((item) => item.isAdded))

const handleOrder = async () =>
  (order.value = (await createOrder({ totalPrice: withTax, items: cartItems.value })) ?? null)
console.log(cartItems, order)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" />
  <div class="bg-white w-full md:w-96 h-full fixed right-0 top-0 z-20 p-10">
    <DrawerHead />
    <div v-if="!cartItems.length || !!order" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !order"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="order"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${order.id} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>
    <div class="flex flex-col justify-between h-full">
      <CartItemList :items="cartItems" />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₽</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ withTax }} ₽</b>
        </div>

        <button
          @click="handleOrder"
          :disabled="!cartItems.length"
          class="mt-4 transition bg-lime-500 disabled:slate-400 disabled:cursor-not-allowed w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

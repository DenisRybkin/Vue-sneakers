<script setup lang="ts">
import Header from '@/components/layouts/Header.vue'
</script>

<template>
  <div class="w-full min-h-screen bg-blue-200 flex flex-col justify-center items-center py-12">
    <div class="w-4/5 min-h-[90vh] bg-white rounded-xl shadow-xl">
      <Header />
      <div class="p-5 md:p-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

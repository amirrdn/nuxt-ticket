<template>
  <div>
    <Header />
    <main>
      <div class="content py-6 px-4 md:px-10 lg:px-28 mt-10 md:mt-20">
        <div class="container mx-auto">
          <NuxtPage />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue"; // Mengimpor komponen Header
</script>

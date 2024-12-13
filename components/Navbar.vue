<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex justify-between">
      <div>
        <a href="/" class="text-lg font-bold">HotelBooking</a>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  </nav>
</template>
<script setup>
import SearchBar from "~/components/SearchBar.vue";
</script>

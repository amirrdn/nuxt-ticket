<template>
  <div>
    <section class="container mx-auto px-4">
      <div>
        <h1 class="text-2xl font-bold">{{ hotel.name }}</h1>
        <p>{{ hotel.address }}</p>
      </div>
      <div>
        <ul class="flex space-x-4">
          <li @click="currentTab = 'Deals'">Deals</li>
          <li @click="currentTab = 'Photos'">Photos</li>
          <li @click="currentTab = 'Info'">Info</li>
        </ul>
      </div>
      <div>
        <component :is="currentTabComponent" :hotel="hotel" />
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Deals from "~/components/Deals.vue";
import Photos from "~/components/Photos.vue";
import Info from "~/components/Info.vue";

const currentTab = ref("Deals");
const currentTabComponent = computed(() => {
  return currentTab.value === "Deals"
    ? Deals
    : currentTab.value === "Photos"
    ? Photos
    : Info;
});

const hotel = ref({});

onMounted(async () => {
  const { id } = useRoute().params;
  const response = await fetch(
    `https://project-technical-test-api.up.railway.app/hotels/${id}`
  );
  hotel.value = await response.json();
});
</script>

<template>
  <div class="flex flex-col sm:flex-row">
    <div id="hero-image" class="flex justify-center sm:w-1/3">
      <div class="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden">
        <img
          src="https://project-exterior-technical-test-app.up.railway.app/img/fallback-property.png"
          alt="Fairmont Jakarta"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <div class="flex-grow sm:ml-4 mt-4 sm:mt-0">
      <h1 class="text-lg font-semibold flex items-center">
        {{ content.name }}
      </h1>
      <div class="mt-2">
        {{ content.address_line }}{{ content.name_suffix }}
        {{ content.postal_code }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

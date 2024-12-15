<template>
  <div class="flex justify-center border-b mb-4">
    <div
      class="py-2 px-4 cursor-pointer transition-all duration-300"
      :class="{
        'border-b-2 border-blue-500': activeTab === 0,
        'text-blue-500': activeTab === 0,
      }"
      @click="$emit('update:activeTab', 0)"
    >
      <span class="inline-flex items-center">
        <span
          class="v-icon notranslate v-icon--left"
          style="font-size: 18px; height: 18px; width: 18px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
            class="w-5 h-5 fill-current"
          >
            <path
              d="M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58M13 20L4 11V4H11L20 13M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z"
            ></path>
          </svg>
        </span>
        <span class="text-button font-medium ml-2"> Deals </span>
      </span>
    </div>
    <div
      class="py-2 px-4 cursor-pointer transition-all duration-300"
      :class="{
        'border-b-2 border-blue-500': activeTab === 1,
        'text-blue-500': activeTab === 1,
      }"
      @click="$emit('update:activeTab', 1)"
    >
      <div class="inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          class="w-5 h-5 fill-current"
        >
          <path
            d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z"
          ></path>
        </svg>
        <span class="text-sm font-medium ml-2"> Photos </span>
      </div>
    </div>
    <div
      class="py-2 px-4 cursor-pointer transition-all duration-300"
      :class="{
        'border-b-2 border-blue-500': activeTab === 2,
        'text-blue-500': activeTab === 2,
      }"
      @click="$emit('update:activeTab', 2)"
    >
      <div class="inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          class="w-5 h-5 fill-current"
        >
          <path
            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
          ></path>
        </svg>
        <span class="text-sm font-medium ml-2"> Info </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: Number,
    required: true,
  },
});
</script>

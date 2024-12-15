<template>
  <div
    class="grid grid-cols-1 gap-4 p-4 border border-gray-200 rounded-md bg-white"
    v-if="itm"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-start">
        <div class="text-lg font-medium">{{ itm.room_name }}</div>
      </div>
      <button
        type="button"
        class="px-3 py-1 rounded-full text-primary text-sm font-medium hover:bg-primary/10"
      >
        See details
      </button>
    </div>

    <!-- Room Details -->
    <div class="flex flex-wrap items-center gap-4">
      <span class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M20 10V7A2 2 0 0 0 18 5H6A2 2 0 0 0 4 7V10A2 2 0 0 0 2 12V17H3.33L4 19H5L5.67 17H18.33L19 19H20L20.67 17H22V12A2 2 0 0 0 20 10M13 7H18V10H13M6 7H11V10H6M20 15H4V12H20Z"
          />
        </svg>
        <span class="text-sm">{{ itm.room_bed_groups }}</span>
      </span>
      <span class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M23,15H21V17H23V15M23,11H21V13H23V11M23,19H21V21C22,21 23,20 23,19M15,3H13V5H15V3M23,7H21V9H23V7M21,3V5H23C23,4 22,3 21,3M3,21H11V15H1V19A2,2 0 0,0 3,21M3,7H1V9H3V7M15,19H13V21H15V19M19,3H17V5H19V3M19,19H17V21H19V19M3,3C2,3 1,4 1,5H3V3M3,11H1V13H3V11M11,3H9V5H11V3M7,3H5V5H7V3Z"
          />
        </svg>
        <span class="text-sm">{{ itm.room_size_sqm }} m<sup>2</sup></span>
      </span>
    </div>

    <!-- Divider -->
    <hr class="border-t border-gray-300 mt-4 mb-4 sm:hidden" />
  </div>

  <!-- Offers Section -->
  <div
    class="grid grid-cols-1 gap-4 p-4 border border-gray-200 rounded-md bg-white"
    v-for="(ov, ix) in sortedOffers"
    :key="ix"
  >
    <div class="py-4 px-4 bg-transparent">
      <!-- start row 1 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col space-y-2">
          <div class="flex items-center space-x-2">
            <span class="text-success-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-4 w-4 text-green-500 fill-current"
              >
                <path
                  d="M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z"
                ></path>
              </svg>
            </span>
            <span class="text-sm font-medium text-green-500">{{
              ov.meal_plan_description
            }}</span>
          </div>
          <div class="flex items-center space-x-2" v-if="ov.cancel_policy_code === 'NR'">
            <span class="text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-4 w-4 text-red-500 fill-current"
              >
                <path
                  d="M0.93,4.2L2.21,2.93L20,20.72L18.73,22L16.73,20H4C2.89,20 2,19.1 2,18V6C2,5.78 2.04,5.57 2.11,5.38L0.93,4.2M20,8V6H7.82L5.82,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L19.82,18H20V12H13.82L9.82,8H20M4,8H4.73L4,7.27V8M4,12V18H14.73L8.73,12H4Z"
                ></path>
              </svg>
            </span>
            <span class="text-sm font-medium text-red-500">{{
              ov.cancel_policy_description
            }}</span>
          </div>
          <div class="flex items-center space-x-2" v-else>
            <span class="text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                class="h-4 w-4 text-green-500 fill-current"
              >
                <path
                  d="M13 19C13 18.66 13.04 18.33 13.09 18H3V12H19V13C19.7 13 20.37 13.13 21 13.35V6C21 4.89 20.11 4 19 4H3C1.89 4 1 4.89 1 6V18C1 19.1 1.89 20 3 20H13.09C13.04 19.67 13 19.34 13 19M3 6H19V8H3V6M17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22"
                ></path>
              </svg>
            </span>
            <span class="text-sm font-medium text-green-500">{{
              ov.cancel_policy_description
            }}</span>
          </div>
        </div>

        <div class="flex space-x-2 justify-end items-start">
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5">
              <path
                d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
              ></path>
            </svg>
          </button>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5">
              <path
                d="M19 19H15V21H19C20.1 21 21 20.1 21 19V15H19M19 3H15V5H19V9H21V5C21 3.9 20.1 3 19 3M5 5H9V3H5C3.9 3 3 3.9 3 5V9H5M5 15H3V19C3 20.1 3.9 21 5 21H9V19H5V15M7 11H9V13H7V11M11 11H13V13H11V11M15 11H17V13H15V11Z"
              ></path>
            </svg>
          </button>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5">
              <path
                d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Price Display Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div class="flex flex-col">
          <p class="text-lg font-medium">
            <span class="text-sm font-semibold">Rp&nbsp;</span>
            <span class="text-xl font-semibold">{{
              formatRupiah(ov.pricing_data.net_price_total_with_bonus)
            }}</span>
            <span class="text-sm">
              /
              <span class="text-sm">night <sup class="text-gray-500">*</sup></span></span
            >
          </p>
          <p class="text-gray-500 pt-1 pb-2">after tax & fees</p>
        </div>
        <div class="flex justify-end h-10">
          <button class="bg-blue-600 text-white py-0 px-4 rounded-md">Book Now</button>
        </div>
      </div>

      <!-- end row 1 -->
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  itm: Object,
});
const sortedOffers = computed(() => {
  return [...props.itm.offers].sort((a, b) => {
    if (a.cancel_policy_code === "NR" && b.cancel_policy_code !== "NR") {
      return -1; // a ke atas
    } else if (a.cancel_policy_code !== "NR" && b.cancel_policy_code === "NR") {
      return 1; // b ke atas
    }
    return 0; // tidak diubah
  });
});

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};
</script>

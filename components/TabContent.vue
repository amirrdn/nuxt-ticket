<template>
  <div v-if="activeTab === 0">
    <div class="flex justify-center mb-6">
      <div class="flex items-center flex-wrap">
        <!-- Filter text -->
        <div class="flex items-center mr-2 mb-2 sm:mb-0">
          <span class="ml-n1 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="w-5 h-5"
            >
              <path
                d="M15,19.88C15.04,20.18 14.94,20.5 14.71,20.71C14.32,21.1 13.69,21.1 13.3,20.71L9.29,16.7C9.06,16.47 8.96,16.16 9,15.87V10.75L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L15,10.75V19.88M7.04,5L11,10.06V15.58L13,17.58V10.05L16.96,5H7.04Z"
              ></path>
            </svg>
          </span>
          <p class="mb-0 ml-1 text-md font-medium whitespace-nowrap">Filter rooms by</p>
        </div>

        <!-- Clear All button -->
        <button
          type="button"
          class="flex items-center p-2 justify-center space-x-2 rounded-full border-2 border-primary text-primary text-sm py-2 px-4 text-center mr-2 mb-2 sm:mb-0"
          @click="clearAll"
          v-if="filterbutton !== 0"
        >
          <span class="font-medium">Hapus Semua</span>
          <span class="font-bold rounded-full bg-blue-600 text-white w-4">{{
            filterbutton
          }}</span>
        </button>

        <!-- Sarapan Gratis Checkbox -->
        <div class="flex items-center mr-2 mb-2 sm:mb-0">
          <input type="checkbox" id="freeBreakfast" v-model="isChecked" class="hidden" />
          <label
            for="freeBreakfast"
            :class="{
              'bg-primary': !isChecked,
              'bg-gray-200 text-gray-800': isChecked,
            }"
            class="cursor-pointer inline-flex items-center px-4 py-2 border-2 rounded-full transition-colors duration-300 text-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="w-4 h-4 mr-2"
            >
              <path
                d="M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z"
              ></path>
            </svg>
            Sarapan Gratis
          </label>
        </div>

        <!-- Pembatalan Gratis Checkbox -->
        <div class="flex items-center mr-2 mb-2 sm:mb-0">
          <input
            type="checkbox"
            id="freeCancellation"
            v-model="isFreeCancellationChecked"
            class="hidden"
          />
          <label
            for="freeCancellation"
            :class="{
              'bg-primary': !isFreeCancellationChecked,
              'bg-gray-200 text-gray-800': isFreeCancellationChecked,
            }"
            class="cursor-pointer inline-flex items-center px-4 py-2 border-2 rounded-full transition-colors duration-300 text-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="w-4 h-4 mr-2"
            >
              <path
                d="M13 19C13 18.66 13.04 18.33 13.09 18H3V12H19V13C19.7 13 20.37 13.13 21 13.35V6C21 4.89 20.11 4 19 4H3C1.89 4 1 4.89 1 6V18C1 19.1 1.89 20 3 20H13.09C13.04 19.67 13 19.34 13 19M3 6H19V8H3V6M17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22"
              ></path>
            </svg>
            Pembatalan Gratis
          </label>
        </div>
      </div>
    </div>

    <!-- TabContentDeals component -->
    <TabContentDeals :rooms="rooms" :detailRooms="detailRooms" />
  </div>

  <div v-if="activeTab === 1">
    <Photos :RoomImages="imagesRoom" />
  </div>

  <div v-if="activeTab === 2">
    <div class="lex justify-center mb-6">
      <p class="text-center text-red-700">
        tidak tahu, content harus diambil dari data json mana
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits, watch } from "vue";
import TabContentDeals from "./TabContentDeals.vue";
import Photos from "./Photos.vue";

const props = defineProps({
  activeTab: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Array,
  },
  detailRooms: {
    type: Array,
  },
  imagesRoom: {
    type: Array,
  },
  tmpdetail: {
    type: Array,
  },
});

const emits = defineEmits(["updateDetailRooms"]);

const isChecked = ref(false);
const isFreeCancellationChecked = ref(false);

const filterbutton = computed(() => {
  let count = 0;
  if (isChecked.value) {
    count += 1;
  }
  if (isFreeCancellationChecked.value) {
    count += 1;
  }
  return count;
});
const clearAll = () => {
  isChecked.value = false;
  isFreeCancellationChecked.value = false;
};

const filterAndUpdateRooms = () => {
  const updatedDetailRooms = props.detailRooms
    .filter((item) => {
      const isMealPlanValid = item.offers.some(
        (v) => v.meal_plan_description && v.meal_plan_description.trim() !== ""
      );

      const isFreeCancellationValid = isFreeCancellationChecked.value
        ? item.offers.some(
            (v) =>
              v.cancel_policy_description && v.cancel_policy_description.trim() !== ""
          )
        : true;

      return isMealPlanValid && isFreeCancellationValid;
    })
    .sort((a, b) => {
      const mealPlanA =
        a.offers.find((v) => v.pricing_data && v.pricing_data.net_price_total_with_bonus)
          ?.pricing_data.net_price_total_with_bonus || 0;
      const mealPlanB =
        b.offers.find((v) => v.pricing_data && v.pricing_data.net_price_total_with_bonus)
          ?.pricing_data.net_price_total_with_bonus || 0;
      return mealPlanA - mealPlanB;
    });

  const finalDetailRooms =
    updatedDetailRooms.length > 0 ? updatedDetailRooms : props.tmpdetail;

  emits("updateDetailRooms", finalDetailRooms);
};
watch([isChecked, isFreeCancellationChecked], () => {
  filterAndUpdateRooms();
});
</script>

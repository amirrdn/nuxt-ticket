<template>
  <div class="z-50 relative bg-white">
    <!-- Header tetap di atas dengan z-30 -->
    <header class="fixed bg-white top-0 left-0 right-0 py-2 px-4 md:px-20">
      <!-- Top Header -->
      <div
        class="container max-sm:flex mx-auto flex flex-wrap justify-between items-center py-2 px-4 md:px-20"
      >
        <img
          src="https://project-exterior-technical-test-app.up.railway.app/img/logo.png"
          class="hidden sm:block w-1/2 md:w-1/6 mb-2 md:mb-0 cursor-pointer"
          @click="goToHome"
        />
        <div class="max-sm:flex-1 flex items-center w-full md:w-[60%] mb-2 md:mb-0">
          <button
            @click="toggleSearch"
            class="btn btn-sm bg-slate-100 p-4 max-sm:p-2 max-sm:pl-2 rounded-md flex items-center max-sm:justify-normal justify-center w-full text-center max-sm:truncate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="mr-2"
              style="font-size: 16px; height: 16px; width: 16px"
            >
              <path
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              ></path>
            </svg>
            {{ titleHead }}
          </button>
        </div>
        <div class="space-x-4">
          <button
            class="bg-blue-600 text-white px-4 py-2 max-sm:-mt-1 max-sm:p-2 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
      </div>
      <!-- -->

      <div
        v-if="isSearchVisible"
        class="search-wrapper fixed top-[10%] left-[12%] w-[90%] max-sm:left-0 max-sm:w-full md:w-[77%] bg-white p-4 shadow-lg z-30"
      >
        <div class="flex flex-wrap items-center">
          <div class="w-full sm:w-[35%] mb-4 sm:mb-0">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  class="w-5 h-5 text-blue-400 fill-current"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 4.25 6 13 6 13s6-8.75 6-13c0-3.87-3.13-7-6-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="floating_outlined"
                class="block px-10 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                @focus="onFocus"
                @blur="onBlur"
                v-model="searchQuery"
                @input="fetchSuggestions"
                autocomplete="off"
              />
              <label
                for="floating_outlined"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >Where are you going?</label
              >
              <div
                class="px-2 py-0 rounded-lg elevation-3 max-h-80 overflow-y-auto w-full absolute bg-white z-50"
                v-if="isDropdownVisible"
              >
                <div
                  v-for="(item, index) in suggestions"
                  :key="index"
                  @click="selectSuggestion(item)"
                  class="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                >
                  <div class="mb-0 pa-2 v-list-item v-list-item--link theme--light">
                    <div class="v-list-item__content pa-0">
                      <div class="location-autocomplete-option">
                        <span
                          class="px-2 py-0 d-inline-flex flex-row flex-nowrap justify-start align-center"
                          v-if="
                            item.location_type === 'province_state' ||
                            item.location_type === 'neighborhood'
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-hidden="true"
                            class="float-left text-blue-600 w-5 text-sm relative top-1 fill-current"
                          >
                            <path
                              d="M15,23H13V21H15V23M19,21H17V23H19V21M15,17H13V19H15V17M7,21H5V23H7V21M7,17H5V19H7V17M19,17H17V19H19V17M15,13H13V15H15V13M19,13H17V15H19V13M21,9A2,2 0 0,1 23,11V23H21V11H11V23H9V15H3V23H1V15A2,2 0 0,1 3,13H9V11A2,2 0 0,1 11,9V7A2,2 0 0,1 13,5H15V1H17V5H19A2,2 0 0,1 21,7V9M19,9V7H13V9H19Z"
                            ></path>
                          </svg>
                          <small class="ml-2 text-green-500"> Area </small>
                        </span>

                        <span
                          class="px-2 py-0 d-inline-flex flex-row flex-nowrap justify-start align-center"
                          v-if="item.location_type === 'point_of_interest'"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-hidden="true"
                            class="float-left text-green-600 w-5 text-sm relative top-1 fill-current"
                          >
                            <path
                              d="M6.5,10H4.5V17H6.5V10M12.5,10H10.5V17H12.5V10M21,19H2V21H21V19M18.5,10H16.5V17H18.5V10M11.5,3.26L16.71,6H6.29L11.5,3.26M11.5,1L2,6V8H21V6L11.5,1Z"
                            ></path>
                          </svg>
                          <small class="ml-2 text-green-500"> Landmark </small>
                        </span>

                        <span
                          class="px-2 py-0 d-inline-flex flex-row flex-nowrap justify-start align-center"
                          v-if="item.location_type === 'train_station'"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-hidden="true"
                            class="float-left text-green-600 w-5 text-sm relative top-1 fill-current"
                          >
                            <path
                              d="M12,2C8,2 4,2.5 4,6V15.5A3.5,3.5 0 0,0 7.5,19L6,20.5V21H8.23L10.23,19H14L16,21H18V20.5L16.5,19A3.5,3.5 0 0,0 20,15.5V6C20,2.5 16.42,2 12,2M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M11,10H6V6H11V10M13,10V6H18V10H13M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17Z"
                            ></path>
                          </svg>
                          <small class="ml-2 text-green-500"> Train Station </small>
                        </span>

                        <span
                          class="px-2 py-0 d-inline-flex flex-row flex-nowrap justify-start align-center"
                          v-if="item.location_type === 'property'"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-hidden="true"
                            class="float-left text-blue-600 w-5 text-sm relative top-1 fill-current"
                          >
                            <path
                              d="M7 14C8.66 14 10 12.66 10 11C10 9.34 8.66 8 7 8C5.34 8 4 9.34 4 11C4 12.66 5.34 14 7 14M7 10C7.55 10 8 10.45 8 11C8 11.55 7.55 12 7 12C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10M19 7H11V15H3V5H1V20H3V17H21V20H23V11C23 8.79 21.21 7 19 7M21 15H13V9H19C20.1 9 21 9.9 21 11Z"
                            ></path>
                          </svg>
                          <small class="ml-2 text-blue-500"> Hotel </small>
                        </span>

                        <p class="mb-2 mt-2 text-h7 text--primary text-truncate">
                          {{ cleanHTML(item.highlight_data.name) }} -
                          {{ item.location_type }}
                        </p>
                        <p class="mb-2 text-caption text--secondary text-truncate">
                          {{ cleanHTML(item.highlight_data.name_suffix) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- -->
          <div class="w-full md:w-[30%] max-sm:w-full ps-2 max-sm:mb-4 max-sm:ps-0">
            <div class="relative z-30">
              <!-- VueDatePicker input field -->
              <VueDatePicker
                v-model="selectedDates"
                range
                multi-calendars
                @update:modelValue="onDateSelect"
                class="max-sm:block"
              >
                <template
                  #dp-input="{
                    value,
                    onInput,
                    onEnter,
                    onTab,
                    onClear,
                    onBlur,
                    onKeypress,
                    onPaste,
                    isMenuOpen,
                  }"
                >
                  <input
                    type="text"
                    :value="formattedDates"
                    @input="onInput"
                    @blur="onBlur"
                    class="peer z-30 block w-full px-4 py-3 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  />
                </template>
              </VueDatePicker>
              <!-- Floating label -->
              <label
                for="floating_outlined"
                class="absolute z-30 left-2 -top-3 text-lg text-gray-500 dark:text-gray-400 duration-300 transform scale-75 origin-[0] bg-white dark:bg-gray-900 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
              >
                Check In - Check Out
              </label>
            </div>
          </div>
          <!-- -->
          <div
            class="w-full sm:w-1/2 md:w-auto flex-shrink-0 ps-2 max-sm:ps-0 max-sm:mb-4"
          >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  class="w-5 text-blue-600 fill-current"
                >
                  <path
                    d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="guest-room"
                class="block px-10 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                @focus="onFocusRoom"
                v-model="guestCountDisplay"
                readonly
              />
              <label
                for="floating_outlined"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Guest & Room
              </label>
            </div>
          </div>
          <!-- -->
          <div
            v-if="isFocused"
            @mouseleave="onBlurRoom"
            class="w-full md:w-auto flex-shrink-0 mb-6 absolute inset-y-0 right-[13%] max-sm:righ-1 max-sm:w-full max-sm:left-0 max-sm:top-48 top-20"
          >
            <div class="space-y-3">
              <div class="bg-white shadow-md">
                <!-- Kamar per Tamu -->
                <div class="px-3 py-3">
                  <div class="flex items-center space-x-3 justify-between max-sm:mb-4">
                    <button
                      type="button"
                      @click="decreaseGuestCount"
                      @blur="onBlurRoom"
                      class="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-5 h-5"
                      >
                        <path d="M19,13H5V11H19V13Z"></path>
                      </svg>
                    </button>
                    <div class="text-center">
                      <div class="font-semibold">Double Room</div>
                      <div>
                        <span class="text-xl font-medium mr-1 text-blue-500">{{
                          guestCount
                        }}</span>
                        <span class="text-sm text-gray-600">guests/room</span>
                      </div>
                      <div class="text-sm mt-1 cursor-pointer text-gray-600">
                        <span
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-hidden="true"
                            class="w-3 h-3 fill-current float-left m-1"
                          >
                            <path
                              d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                            ></path></svg
                        ></span>
                        <small>What about children?</small>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="increaseGuestCount"
                      class="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-5 h-5"
                      >
                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Bagian Jumlah Kamar -->
                <div class="px-3 py-3">
                  <div class="flex flex-wrap items-center justify-between mb-6 space-x-3">
                    <button
                      type="button"
                      @click="decreaseRoomCount"
                      class="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-5 h-5"
                      >
                        <path d="M19,13H5V11H19V13Z"></path>
                      </svg>
                    </button>
                    <div class="text-center text-sm font-medium">
                      <span class="text-xl text-blue-500">{{ roomCount }}</span> Room
                    </div>
                    <button
                      type="button"
                      @click="increaseRoomCount"
                      class="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-5 h-5"
                      >
                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center max-sm:w-full max-sm:justify-end">
            <button
              @click="goToPages"
              class="ml-4 bg-blue-600 flex space-x-2 items-center p-2 text-white rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                class="w-4 h-4 fill-current"
              >
                <path
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                ></path>
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isSearchVisible"
        class="overlay fixed inset-0 bg-black opacity-50 z-10 top-20"
        @click="toggleSearch"
      ></div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { format } from "date-fns";
import { useRouter } from "vue-router";

const isSearchVisible = ref(false);
const isDropdownVisible = ref(false);
const searchQuery = ref("Fairmont Jakarta");
const suggestions = ref([]);
const selectedDates = ref([]);
const guestCount = ref(2);
const roomCount = ref(2);
const isFocused = ref(false);
const guestCountDisplay = ref(`${guestCount.value} Guest`);
const checkinDate = ref(null);
const checkoutDate = ref(null);
const queriesParms = ref("fairmont-jakarta-9000248394");
const router = useRouter();
const id = ref(null);
const titleHead = ref("Fairmont Jakarta");

watch([guestCount, roomCount], ([newGuestCount, newRoomCount]) => {
  let textguest = "";
  if (newGuestCount === 1) {
    textguest = `Single Room x ${newRoomCount}`;
  } else if (newGuestCount === 2) {
    textguest = `Double Room x ${newRoomCount}`;
  } else if (newGuestCount === 3) {
    textguest = `Triple Room x ${newRoomCount}`;
  } else if (newGuestCount > 3) {
    textguest = `Group Of ${newGuestCount} x ${newRoomCount}`;
  }
  guestCountDisplay.value = textguest; // Memperbarui nilai tampilan
});

const setTodayAndTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  checkinDate.value = format(new Date(today), "yyyy-MM-dd");
  checkoutDate.value = format(new Date(tomorrow), "yyyy-MM-dd");

  // Set tanggal yang dipilih menjadi hari ini dan besok
  selectedDates.value = [today, tomorrow];
};
const formattedDates = computed(() => {
  if (selectedDates.value.length > 0) {
    const startDate = format(selectedDates.value[0], "d");
    const endDate = format(
      selectedDates.value[selectedDates.value.length - 1],
      "d MMMM yyyy"
    );
    return `${startDate} - ${endDate}`;
  }
  return "";
});
const onDateSelect = (dates) => {
  dates.forEach((date, index) => {
    if (index === 0) {
      checkinDate.value = format(new Date(date), "yyyy-MM-dd");
    } else if (index === 1) {
      checkoutDate.value = format(new Date(date), "yyyy-MM-dd");
    }
  });
};

const fetchSuggestions = async () => {
  if (searchQuery.value.trim() === "") {
    suggestions.value = [];
    return;
  }

  try {
    // Mengambil data properti pertama
    const responseProperty = await axios.get(
      "https://project-technical-test-api.up.railway.app/property/search",
      {
        params: {
          query: searchQuery.value,
          language: "id-id",
        },
      }
    );

    // Mengambil data lokasi kedua
    const responseLocation = await axios.get(
      "https://project-technical-test-api.up.railway.app/location/search",
      {
        params: {
          query: searchQuery.value,
          language: "id-id",
        },
      }
    );

    const combinedSuggestions = [...responseProperty.data, ...responseLocation.data];

    suggestions.value = combinedSuggestions.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

const onFocus = () => {
  isDropdownVisible.value = true;
  isFocused.value = false;
};
const onBlur = () => {
  setTimeout(() => {
    isDropdownVisible.value = false;
  }, 200);
};
const onFocusRoom = () => {
  isFocused.value = true;
};

const onBlurRoom = () => {
  isFocused.value = false;
};

const increaseGuestCount = () => {
  guestCount.value++;
};
const decreaseGuestCount = () => {
  if (guestCount.value > 1) guestCount.value--;
};
const increaseRoomCount = () => {
  roomCount.value++;
};

const decreaseRoomCount = () => {
  if (roomCount.value > 1) roomCount.value--;
};
const selectSuggestion = (item) => {
  isDropdownVisible.value = false;
  queriesParms.value = item.slug;
  id.value = item.id;
  searchQuery.value = `${item.name}, ${item.name_suffix}`;
  titleHead.value = item.name;
};
const cleanHTML = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent || "";
};
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};
const goToPages = () => {
  isSearchVisible.value = !isSearchVisible.value;
  const routeParams = {
    checkin: checkinDate.value,
    checkout: checkoutDate.value,
    guest_per_room: guestCount.value,
    number_of_room: roomCount.value,
    title: titleHead.value,
  };
  router.push({
    path: `/stay/${queriesParms.value}`,
    query: routeParams,
  });
};
const goToHome = () => {
  router.push("/");
};
onMounted(() => {
  setTodayAndTomorrow();
});
</script>

<style scoped>
.overlay {
  z-index: 9;
}
.search-wrapper {
  z-index: 20;
}
.dropdown {
  /* top: 100%; */
  left: 0;
  z-index: 20;
}
</style>

<template>
  <div class="clear-both">
    <!-- Room Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
      v-for="(itm, index) in detailRooms"
      :key="index"
    >
      <!-- First Column (Image Section) -->
      <div class="col-span-1">
        <div class="container mx-auto">
          <div class="gallery">
            <img
              v-if="itm.room_images && itm.room_images.length > 0"
              :src="itm.room_images[0]?.size_sm"
              alt="Gambar Kamar Fairmont"
              @click="openImageModal(itm, itm.room_images[0]?.size_sm, 0)"
              class="w-full h-58 object-cover cursor-pointer"
            />

            <!-- Thumbnail Images -->
            <div
              class="grid grid-cols-3 gap-4 mt-4"
              v-if="itm.room_images && itm.room_images.length > 1"
            >
              <div
                class="max-h-28 overflow-hidden"
                v-for="(img, k) in itm.room_images.slice(1)"
                :key="k"
              >
                <img
                  :src="img.size_sm"
                  alt="Thumbnail"
                  class="w-full h-full object-cover cursor-pointer"
                  @click="openImageModal(itm, img.size_sm, k + 1)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Column (Room Details) -->
      <div class="col-span-1 sm:col-span-2 lg:col-span-2">
        <Rightcol :itm="itm" />
      </div>
    </div>

    <!-- Modal for Image and Details -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white p-4 rounded-md max-w-4xl max-h-[90vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <!-- Left Column: Image Slider -->
        <div class="relative">
          <div
            class="flex transition-transform duration-300"
            :style="{ transform: 'translateX(' + -currentImageIndex * 100 + '%)' }"
          >
            <div
              v-for="(image, index) in currentItems.room_images"
              :key="index"
              class="w-full h-full flex-shrink-0"
            >
              <img
                :src="image.size_sm"
                alt="Room Image"
                class="w-full min-h-[70%] h-[367px] object-cover object-center"
                v-if="index === currentImageIndex"
              />
            </div>
          </div>

          <!-- Navigation Buttons -->
          <button
            @click="prevImage"
            class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 px-3 rounded-full"
          >
            &#8592;
          </button>
          <button
            @click="nextImage"
            class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 px-3 rounded-full"
          >
            &#8594;
          </button>
        </div>

        <!-- Right Column: Details -->
        <div class="flex flex-col h-full max-h-96 relative">
          <!-- Header Section (Sticky) -->
          <div class="sticky top-0 bg-white z-10 p-4 border-b">
            <h2 class="text-xl font-semibold">Room Details</h2>
            <button
              @click="closeModal"
              class="absolute top-0 right-0 p-1 px-3 bg-gray-500 text-white rounded-full hover:bg-gray-700 z-10"
            >
              ×
            </button>
          </div>

          <!-- Scrollable Content Section -->
          <div class="flex-1 overflow-y-auto p-4">
            <h5 class="font-semibold mb-3">{{ currentItems.room_name }}</h5>

            <div class="inline-flex flex-wrap">
              <!-- Icon and Text for Room Bed Groups -->
              <span class="pr-3 flex items-center">
                <span class="w-4 h-4 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    role="img"
                    class="w-full h-full"
                  >
                    <path
                      d="M20 10V7A2 2 0 0 0 18 5H6A2 2 0 0 0 4 7V10A2 2 0 0 0 2 12V17H3.33L4 19H5L5.67 17H18.33L19 19H20L20.67 17H22V12A2 2 0 0 0 20 10M13 7H18V10H13M6 7H11V10H6M20 15H4V12H20Z"
                    ></path>
                  </svg>
                </span>
                <span class="text-sm">{{ currentItems.room_bed_groups }}</span>
              </span>

              <!-- Icon and Text for Room Size -->
              <span class="pr-3 flex items-center">
                <span class="w-4 h-4 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    role="img"
                    class="w-full h-full"
                  >
                    <path
                      d="M23,15H21V17H23V15M23,11H21V13H23V11M23,19H21V21C22,21 23,20 23,19M15,3H13V5H15V3M23,7H21V9H23V7M21,3V5H23C23,4 22,3 21,3M3,21H11V15H1V19A2,2 0 0,0 3,21M3,7H1V9H3V7M15,19H13V21H15V19M19,3H17V5H19V3M19,19H17V21H19V19M3,3C2,3 1,4 1,5H3V3M3,11H1V13H3V11M11,3H9V5H11V3M7,3H5V5H7V3Z"
                    ></path>
                  </svg>
                </span>
                <span class="text-sm"
                  >{{ currentItems.room_size_sqm }} m<sup>2</sup></span
                >
              </span>
            </div>

            <!-- Room Amenities List -->
            <h5 class="font-semibold">Room Amenities</h5>
            <ul class="mt-4 space-y-2">
              <li
                v-for="(v, index) in currentItems.amenities"
                :key="index"
                class="text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  class="w-4 float-left mt-1 mr-2"
                >
                  <path :d="v.icon" />
                </svg>
                {{ v.title }}
                <ul class="mt-4 space-y-2 mx-10 list-disc">
                  <li v-for="(b, i) in v.amenities" :key="i" class="text-gray-600">
                    {{ b.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import axios from "axios";

const isModalOpen = ref(false);
const currentItems = ref(null);
const currentImageIndex = ref(0);
const currentImg = ref(null);

const openImageModal = (value, imageUrl, index) => {
  currentItems.value = value;
  isModalOpen.value = true;
  currentImg.value = imageUrl;
  currentImageIndex.value = index;
  const transformedData = {
    context: "room",
    amenities: Object.values(value.amenities).reduce((acc, item) => {
      const amenity = {
        id: item.id,
        name: item.name,
      };

      // Menambahkan 'categories' hanya jika ada isinya
      if (item.categories && item.categories.length > 0) {
        amenity.categories = item.categories;
      }

      acc[item.id] = amenity;
      return acc;
    }, {}),
  };
  setTimeout(() => {
    transfromAmentities(transformedData);
  }, 500);
};
const transfromAmentities = async (data) => {
  try {
    await axios.post(`/amenities`, data).then((response) => {
      if (response.data) {
        const amenities = response.data.map((b) => ({
          ...b,
          amenities: Object.values(b.amenities),
        }));
        currentItems.value = {
          ...currentItems.value,
          amenities: amenities,
        };
      }
      //   console.log(response.data);
    });
    // getRoom();
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};
const closeModal = () => {
  isModalOpen.value = false;
};

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + currentItems.value.room_images.length) %
    currentItems.value.room_images.length;
};
const nextImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % currentItems.value.room_images.length;
};

const props = defineProps({
  rooms: Array,
  detailRooms: {
    type: Array,
  },
});
</script>

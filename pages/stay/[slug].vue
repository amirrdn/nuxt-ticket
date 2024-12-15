<template>
  <div>
    <div id="location-catalog" class="pt-4 pb-8">
      <!-- Hero Image -->
      <div class="flex flex-col sm:flex-row" v-if="content.catalog">
        <div id="hero-image" class="flex justify-center sm:w-1/3">
          <div
            class="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden"
            v-if="content.catalog && content.catalog.hero_image_url"
          >
            <img
              :src="content.catalog?.hero_image_url.sm"
              alt="Fairmont Jakarta"
              class="w-full h-full object-cover"
              @error="onImageError"
            />
          </div>
        </div>

        <!-- Catalog Data -->
        <div
          id="catalog-data"
          class="flex-grow sm:ml-4 mt-4 sm:mt-0"
          v-if="content.catalog"
        >
          <div id="catalog-header-desktop">
            <h1 class="text-lg font-semibold flex items-center">
              {{ content.name }}
              <div class="flex items-center space-x-1 ml-2">
                <!-- Star Rating -->
                <span
                  v-for="index in 5"
                  :key="index"
                  class="text-amber-500"
                  :class="{
                    'text-yellow-500': index <= content.catalog.star_rating,
                    'text-gray-300': index > content.catalog.star_rating,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                    ></path>
                  </svg>
                </span>
              </div>
            </h1>
          </div>

          <!-- Body -->
          <div id="catalog-body" class="mt-2">
            <p class="text-gray-600 text-sm capitalize-first-letter">
              {{ content.catalog.category }}
            </p>
            <p class="text-gray-700 text-sm mt-2">
              {{ content.address_line }}, {{ content.name_suffix }}
              {{ content.postal_code }}
            </p>
          </div>

          <!-- Reviews -->
          <div
            id="review-desktop"
            class="flex items-center mt-2 text-sm text-gray-700 mt-3"
          >
            <div class="relative w-10 h-10">
              <svg
                class="rotate-[-65deg] size-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  class="stroke-current font-bold text-violer-900 dark:text-neutral-700"
                  stroke-width="1"
                  :stroke-dasharray="content.catalog.review_rating"
                  stroke-linecap="round"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  class="stroke-current font-bold text-violet-900 dark:text-green-500"
                  stroke-width="3"
                  :stroke-dasharray="content.catalog.review_rating"
                  stroke-linecap="round"
                ></circle>
              </svg>

              <!-- Percentage Text -->
              <div
                class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2"
              >
                <span class="text-center text-sm text-violet-900 dark:text-blue-500">{{
                  content.catalog.review_rating
                }}</span>
              </div>
            </div>

            <span class="ml-2"
              >Excellent · {{ content.catalog.review_count }} reviews</span
            >
          </div>
        </div>
      </div>
      <Cardnotfound :content="content" v-else />
    </div>
    <div class="pt-4 pb-8 px-4 sm:px-8 lg:px-20">
      <!-- Tabs Header (Centered) -->
      <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event" />
      <TabContent
        :activeTab="activeTab"
        :rooms="roomstay"
        :detailRooms="detailRooms"
        :imagesRoom="imagesRoom"
        @updateDetailRooms="updateDetailRooms"
        :tmpdetail="tmpdetail"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Tabs from "~/components/Tabs.vue";
import TabContent from "~/components/TabContent.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Cardnotfound from "~/components/Cardnotfound.vue";

const content = ref({});
const activeTab = ref(0);
const roomstay = ref(null);
const detailRooms = ref(null);
const route = useRoute();
const tmpdetail = ref(null);

const slug = route.params.slug || "";
const id = slug.split("-").pop();
const checkin = route.query.checkin;
const checkout = route.query.checkout;
const guest_per_room = route.query.guest_per_room;
const number_of_room = route.query.number_of_room;

const getContent = async () => {
  try {
    const response = await axios.get(
      "https://project-technical-test-api.up.railway.app/property/content",
      {
        params: {
          id: id,
          language: "id-id",
          include: "room",
          inclcude: "general_info",
        },
      }
    );
    content.value = Object.values(response.data)[0];
    useSeoMeta({
      title: content.value.name,
      ogTitle: route.query.title,
      description: content.value.name,
      ogDescription: content.value.name,
      ogImage: content.value.catalog.hero_image_url.lg,
      twitterCard: "summary_large_image",
    });
    getRoom();
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};
const imagesRoom = computed(() => {
  if (content.value) {
    const datacontent = Object.values(content.value.room || {});
    return datacontent.flatMap((b) => b.images);
  }
});

const rooms = computed(() => {
  if (content.value) {
    const datacontent = Object.values(content.value.room || {});
    return datacontent.map((b) => ({
      room_id: b.id, // Pastikan ini sesuai dengan struktur data
      amenities: b.amenities ? Object.values(b.amenities) : [],
    }));
  }
  return [];
});
const onImageError = () => {
  imageSrc.value =
    "https://project-exterior-technical-test-app.up.railway.app/img/fallback-property.png";
};

const getRoom = async () => {
  try {
    const response = await axios.get(
      `https://project-technical-test-api.up.railway.app/stay/availability/${id}`,
      {
        params: {
          checkin: checkin,
          checkout: checkout,
          guest_per_room: guest_per_room,
          number_of_room: number_of_room,
          run_price_check: false,
        },
      }
    );
    const offers = response.data.offer_list;

    let result = offers.reduce((acc, curr) => {
      const roomId = curr.room_data.id;

      if (!acc[roomId]) {
        acc[roomId] = {
          roomid: roomId,
          room_name: curr.room_name,
          room_bed_groups: curr.room_bed_groups,
          room_size_sqm: curr.room_size_sqm,
          room_images: curr.room_images,
          room_available: curr.room_available,
          offers: [],
        };
      }

      acc[roomId].offers.unshift({
        offer_id: curr.offer_id,
        price_total: curr.price_total,
        meal_plan_code: curr.meal_plan_code,
        cancel_policy_description: curr.cancel_policy_description,
        tax: curr.tax,
        price_check_href: curr.price_check_href,
        room_data: curr.room_data,
        pricing_data: curr.pricing_data,
        wisata_point: curr.wisata_point,
        meal_plan_description: curr.meal_plan_description,
        cancel_policy_code: curr.cancel_policy_code,
      });

      return acc;
    }, {});

    const finalresult = Object.values(result).map((v) => {
      v.offers = v.offers.filter((offer) => offer.meal_plan_code === "BB");

      const match = rooms.value.find((c) => c.room_id === v.roomid);
      if (match) {
        return {
          ...v,
          amenities: [...(v.amenities || []), ...match.amenities],
        };
      }

      return v;
    });
    detailRooms.value = finalresult;
    tmpdetail.value = finalresult;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};
onMounted(() => {
  getContent();
});
definePageMeta({
  layout: "default",
});
const updateDetailRooms = (updatedRooms) => {
  detailRooms.value = updatedRooms;
};
</script>

<template>
  <div>
    <!-- Galeri Gambar -->
    <div class="grid grid-cols-3 gap-4">
      <div class="p-2 cursor-pointer" v-for="(img, keys) in RoomImages" :key="keys">
        <a @click.prevent="openModal(keys)">
          <div class="rounded-none hover:opacity-80">
            <div class="w-full h-64 bg-transparent overflow-hidden z-0">
              <img
                :alt="img.caption"
                :src="img.links['350px'].href"
                class="h-full w-full object-cover object-center transition-all duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Modal untuk Menampilkan Gambar Fullscreen dengan Transisi -->
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
      >
        <div
          class="relative transition-all duration-300 ease-in-out transform"
          :class="{ 'scale-100': isModalOpen, 'scale-90': !isModalOpen }"
        >
          <!-- Tombol Close Modal -->
          <button
            @click="closeModal"
            class="absolute top-4 -right-3 transform -translate-y-1/2 bg-white text-current p-2 px-4 text-md rounded-full hover:bg-red-400"
          >
            ×
          </button>

          <!-- Gambar Fullscreen -->
          <img
            :alt="RoomImages[currentIndex].caption"
            :src="RoomImages[currentIndex].links['1000px'].href"
            class="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
            loading="lazy"
          />
          <button
            @click="prevImage"
            class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 px-3 rounded-full hover:bg-red-400"
          >
            &#8592;
          </button>
          <button
            @click="nextImage"
            class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 px-3 rounded-full hover:bg-red-400"
          >
            &#8594;
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  RoomImages: {
    type: Array,
    required: true,
  },
});

const isModalOpen = ref(false);
const currentIndex = ref(0);

// Fungsi untuk membuka modal dengan gambar yang dipilih
const openModal = (index) => {
  currentIndex.value = index;
  isModalOpen.value = true;
};

// Fungsi untuk menutup modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Fungsi untuk pindah ke gambar sebelumnya
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.RoomImages.length - 1;
  }
};

// Fungsi untuk pindah ke gambar berikutnya
const nextImage = () => {
  if (currentIndex.value < props.RoomImages.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};
</script>

<style scoped>
/* Transisi untuk modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Styling modal */
.modal-content {
  position: relative;
}

.modal img {
  max-width: 100%;
  max-height: 80vh;
}

.modal .prev,
.modal .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  cursor: pointer;
}

.modal .prev {
  left: 10px;
}

.modal .next {
  right: 10px;
}

/* Efek zoom-in untuk modal */
.scale-90 {
  transform: scale(0.9);
}

.scale-100 {
  transform: scale(1);
}

/* Transisi untuk gambar */
.transition-all {
  transition: all 0.5s ease-in-out;
}
</style>

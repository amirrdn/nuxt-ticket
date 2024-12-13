<!-- components/Header.vue -->
<template>
  <div class="absolute appbar-intersect"></div>
  <header
    class="d-print-none bg-transparent v-sheet theme--light elevation-0 v-toolbar v-app-bar v-app-bar--elevate-on-scroll v-app-bar--fixed v-app-bar--hide-shadow info"
    style="
      height: 64px;
      margin-top: 0px;
      transform: translateY(0px);
      left: 0px;
      right: 0px;
      z-index: 20;
    "
    data-booted="true"
  >
    <div class="v-toolbar__content" style="height: 64px">
      <div class="container py-1 py-md-2">
        <div style="position: relative">
          <div class="appbartop-grid">
            <a
              href="/"
              class="d-inline-block brand-logo align-self-center nuxt-link-active"
              style="line-height: 0"
              ><div
                class="d-inline-block w-8"
                style="line-height: 0; margin: 0px 0px 0px -6px"
              >
                <img
                  src="https://project-exterior-technical-test-app.up.railway.app/img/logo.png"
                  alt="app-logo"
                  class="w-[60%]"
                /></div
            ></a>
            <div
              class="d-flex justify-center mr-2 ml-sm-6 mr-sm-6"
              style="min-width: 0; min-height: 0"
            >
              <div class="w-full searchnav-width">
                <button
                  type="button"
                  class="appsearchbar-btn v-btn v-btn--block v-btn--has-bg theme--light elevation-0 v-size--default"
                  style="height: 40px; max-width: 70%"
                >
                  <span class="v-btn__content"
                    ><span
                      aria-hidden="true"
                      class="v-icon notranslate mr-1 theme--light"
                      style="font-size: 16px; height: 16px; width: 16px"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-hidden="true"
                        class="v-icon__svg"
                        style="font-size: 16px; height: 16px; width: 16px"
                      >
                        <path
                          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                        ></path></svg
                    ></span>
                    <span class="text-truncate" style="min-width: 0; min-height: 0">
                      Fairmont Jakarta
                    </span>
                    <span> &nbsp;&nbsp;·&nbsp;&nbsp;4 – 8 Mar 2025 </span></span
                  >
                </button>
                <!---->
              </div>
            </div>
            <div class="bg-blue-800">
              <button
                type="button"
                class="v-btn v-btn--has-bg theme--light elevation-0 v-size--default primary"
              >
                <span class="v-btn__content"> Sign in </span>
              </button>
              <!---->
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// No JavaScript logic needed for this example
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>

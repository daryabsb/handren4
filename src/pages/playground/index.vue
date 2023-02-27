<template>
  <div class="video-bg">
    <video width="320" height="240" autoplay loop muted>
      <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <div class="dark-light">
    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  </div>
  <div
    class="app w-full max-w-[1250px] max-h-[860px] h-[90vh] flex flex-col overflow-hidden
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     relative rounded-md backdrop-blur-sm text-md font-semibold"
    style="background-color: var(--theme-bg-color);">
    <div class="header mobile-hide w-full flex  items-center h-16 border-b border-[var(--border-color)] px-4 ">
      <div class="gt-sm  menu-circle flex space-x-4 ml-2 mr-6">
        <div class=" flex-shrink-0 w-4 h-4 bg-[#f96057] rounded-full"></div>
        <div class="menu-circleflex-shrink-0 w-4 h-4 bg-[#f8ce52] rounded-full"></div>
        <div class="menu-circle flex-shrink-0 w-4 h-4 bg-[#5fcf65] rounded-full"></div>
      </div>
      <q-btn size="lg" padding="none" color="transparent" text-color="white" class="lt-md mx-2" flat icon="dehaze" />
      <q-tabs dense v-model="activeTopNav" :breakpoint="600" class="header-menu gt-sm sm:flex  items-center">
        <q-tab v-for="item in navigation.topNavigation" :key="item.id"
          class="  text-[var(--inactive-color)] py-4 px-6 decoration-transparent " :name="item.title" :label="item.title">
        </q-tab>
      </q-tabs>

      <div class="search-bar max-w-[600px] m-auto transition-all pl-0 box-border shadow-[var(--border-color)]">
        <input type="text" placeholder="Search"
          class="px-2 py-1.5 w-full h-full rounded-md pl-4 pr-8 text-[var(--theme-color)] bg-[var(--search-bg)] shadow-sm shadow-[rgb(134 140 160 / 2%)]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              placeholder:text-[var(--inactive-color)] placeholder:font-thin" />
      </div>
      <div class="header-profile row space-x-2 items-center ml-auto flex-shrink-0">
        <div class="gt-sm notification relative">
          <q-icon size="md" color="white" name="notifications"></q-icon>
          <q-badge color="red" floating>3</q-badge>

        </div>
        <q-icon size="md" class="gt-sm" color="white" name="thunderstorm"></q-icon>
        <img class="gt-sm profile-img ml-6 w-8 h-8 rounded-full object-cover border-2 border-[var(--theme-color)]"
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="" />
      </div>
    </div>
    <div class=" wrapper flex flex-1 overflow-hidden">
      <div class="left-side flex gt-sm  basis-60 border-r border-[var(--border-color)] p-6 overflow-auto flex-shrink-0">
        <div v-for="item in navigation.sideNavigation" :key="item.id" class="side-wrapper mt-5">
          <div class="side-title text-[var(--inactive-color)] mb-3">{{ item.title }}</div>
          <div class="side-menu  flex flex-col whitespace-nowrap">
            <a v-for="(link, index) in item.sections" :key="index" href="#"
              class="relative
                                                                                                                                                                                                                                                                                                                                                                          w-full hover:bg-[var(--hover-menu-bg)] decoration-[none] 
                                                                                                                                                                                                                                                                                                                                                                                text-[var(--theme-color)] flex items-center py-2 text-sm rounded-md transition-all">
              <q-icon class="mr-3 w-4" :name="link.icon" size="sm" />

              {{ link.title }}
              <q-badge v-if="index === 1" color="blue" class="ml-4">4</q-badge>


            </a>
          </div>
        </div>
      </div>

      <div class="col grow">
        <div class="main-header row items-center border-b border-[var(--border-color)] h-14 flex-shrink-0">
          <a class="menu-link-main decoration-[none] text-[var(--theme-color)] px-8" href="#">All Apps</a>
          <q-tabs v-model="loadedPage" class="header-menu active text-[var(--theme-color)]">
            <q-tab as="a" v-for="link in navigation.menu" :key="link.id" class="main-header-link " :name="link.name"
              href="#">
              {{ link.title }}</q-tab>
          </q-tabs>
        </div>
        <q-tab-panels animated v-model="loadedPage" class="bg-transparent h-full" style="background-color: none;">
          <q-tab-panel class="bg-none q-pa-none" name="desktop">
            <div
              class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">
              <div class="text-2xl font-extralight uppercase">Desktop</div>
              <div class="w-full h-96 bg-pink-700"></div>
            </div>
          </q-tab-panel>
          <q-tab-panel class="bg-none q-pa-none" name="mobile">
            <div
              class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">
              <div class="text-2xl font-extralight uppercase">Mobile</div>
              <div class="w-full h-96 bg-pink-700">

              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel class="bg-none q-pa-none" name="web">
            <div
              class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">
              <div class="text-2xl font-extralight uppercase">Web</div>
              <div class="w-full h-96 bg-pink-700"></div>
            </div>
          </q-tab-panel>
        </q-tab-panels>



      </div>
    </div>
    <div
      class="overlay-app w-full h-full fixed left-0 top-0 pointer-events-[all] bg-[rgba(36, 39, 59, 0.8)] opacity-0 hidden transition-colors">
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const loadedPage = ref('desktop')
const menuLinks = ['Home', 'About', 'Contact'];
const activeTopNav = ref('Apps')
function selectTopNav(title) {
  activeTopNav.value = title;
}


const navigation = {
  topNavigation: [
    {
      id: 1, title: 'Dashboard', href: '#'
    },
    {
      id: 2, title: 'Clients', href: '#'
    },
    {
      id: 3, title: 'Visits', href: '#'
    },
    {
      id: 4, title: 'Playground', href: '#'
    },
  ],
  menu: [
    {
      id: 1, title: 'Desktop', href: '#', name: 'desktop'
    },
    {
      id: 2, title: 'Mobile', href: '#', name: 'mobile'
    },
    {
      id: 3, title: 'Web', href: '#', name: 'web'
    },
  ],
  sideNavigation: [
    {
      id: 1, title: 'Apps', sections: [
        {
          title: "All Apps",
          icon: 'apps'
        },
        {
          title: "Updates",
          icon: 'update'
        },
      ]
    },
    {
      id: 2, title: 'Categories', sections: [
        { title: "Photography", icon: "photo_camera" },
        { title: "Graphic Design", icon: "architecture" },
        { title: "Video", icon: "video_stable" },
        { title: "Illustrations", icon: "palette" },
        { title: "UI/UX", icon: "grid_view" },
        { title: "3D/AR", icon: "view_in_ar" },
      ]
    },
    {
      id: 3, title: 'Fonts', sections: [
        { title: "Manage Fonts", icon: "text_format" },

      ]
    },
    {
      id: 4, title: 'Resource Links', sections: [
        { title: "Stock", icon: "inventory" },
        { title: "Tutorials", icon: "cast_for_education" },
        { title: "Portfolio", icon: "face" },
        { title: "Behance", icon: "water_drop" },
        { title: "Social Forum", icon: "military_tech" },
      ]
    },

  ],
  products: [
    {
      id: 1, title: 'Photoshop', status: 'Updated', btn: 'Open',
      icon: `<svg viewBox="0 0 52 52" style="border: 1px solid #3291b8;">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                        fill="#061e26" data-original="#393687" />
                      <path
                        d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z"
                        fill="#c1dbe6" data-original="#89d3ff" />
                    </g>
                  </svg>`
    },
    {
      id: 2, title: 'Illustrator', status: 'Update Available', btn: 'Update this app',
      icon: `<svg viewBox="0 0 52 52" style="border: 1px solid #b65a0b;">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                        fill="#261400" data-original="#6d4c13" />
                      <path
                        d="M30.68 39h-3.24l-2.76-9.04h-8.32L13.72 39H10.6l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L17.12 27h6.84zM37.479 12.24c0 .453-.16.84-.48 1.16-.32.319-.7.479-1.14.479-.44 0-.827-.166-1.16-.5-.334-.333-.5-.713-.5-1.14s.166-.807.5-1.141c.333-.333.72-.5 1.16-.5.44 0 .82.16 1.14.48.321.322.48.709.48 1.162zM37.24 39h-2.88V18.96h2.88V39z"
                        fill="#e6d2c0" data-original="#ffbd2e" />
                    </g>
                  </svg>`
    },
    {
      id: 3, title: 'After Effects', status: 'Updated', btn: 'Open',
      icon: `<svg viewBox="0 0 52 52" style="border: 1px solid #c75deb;">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                        fill="#3a3375" data-original="#3a3375" />
                      <path
                        d="M27.44 39H24.2l-2.76-9.04h-8.32L10.48 39H7.36l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L13.88 27h6.84zM31.48 33.48c0 2.267 1.333 3.399 4 3.399 1.653 0 3.466-.546 5.44-1.64L42 37.6c-2.054 1.254-4.2 1.881-6.44 1.881-4.64 0-6.96-1.946-6.96-5.841v-8.2c0-2.16.673-3.841 2.02-5.04 1.346-1.2 3.126-1.801 5.34-1.801s3.94.594 5.18 1.78c1.24 1.187 1.86 2.834 1.86 4.94V30.8l-11.52.6v2.08zm8.6-5.24v-3.08c0-1.413-.44-2.42-1.32-3.021-.88-.6-1.907-.899-3.08-.899-1.174 0-2.167.359-2.98 1.08-.814.72-1.22 1.773-1.22 3.16v3.199l8.6-.439z"
                        fill="#e4d1eb" data-original="#e7adfb" />
                    </g>
                  </svg>`
    },
  ],
  content: [
    {
      id: 1, title: 'Premiere Pro',
      subtext: 'Edit, master and create fully proffesional videos',
      btn: 'Update',
      icon: `<svg viewBox="0 0 512 512" style="border: 1px solid #a059a9;">
                    <path xmlns="http://www.w3.org/2000/svg"
                      d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
                      fill="#210027" data-original="#7b1fa2" />
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
                        fill="#f6e7fa" data-original="#e1bee7" />
                    </g>
                  </svg>`
    },
    {
      id: 2, title: 'InDesign',
      subtext: 'Design and publish great projects & mockups',
      btn: 'Update',
      icon: `<svg viewBox="0 0 52 52" style="border: 1px solid #c1316d;">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                        fill="#2f0015" data-original="#6f2b41" />
                      <path
                        d="M18.08 39H15.2V13.72l-2.64-.08V11h5.52v28zM27.68 19.4c1.173-.507 2.593-.761 4.26-.761s3.073.374 4.22 1.12V11h2.88v28c-2.293.32-4.414.48-6.36.48-1.947 0-3.707-.4-5.28-1.2-2.08-1.066-3.12-2.92-3.12-5.561v-7.56c0-2.799 1.133-4.719 3.4-5.759zm8.48 3.12c-1.387-.746-2.907-1.119-4.56-1.119-1.574 0-2.714.406-3.42 1.22-.707.813-1.06 1.847-1.06 3.1v7.12c0 1.227.44 2.188 1.32 2.88.96.719 2.146 1.079 3.56 1.079 1.413 0 2.8-.106 4.16-.319V22.52z"
                        fill="#e1c1cf" data-original="#ff70bd" />
                    </g>
                  </svg>`
    },
    {
      id: 3, title: 'After Effects',
      subtext: 'Industry Standart motion graphics & visual effects',
      btn: 'Update',
      icon: `<svg viewBox="0 0 52 52" style="border: 1px solid #c75deb;">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                        fill="#3a3375" data-original="#3a3375" />
                      <path
                        d="M27.44 39H24.2l-2.76-9.04h-8.32L10.48 39H7.36l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L13.88 27h6.84zM31.48 33.48c0 2.267 1.333 3.399 4 3.399 1.653 0 3.466-.546 5.44-1.64L42 37.6c-2.054 1.254-4.2 1.881-6.44 1.881-4.64 0-6.96-1.946-6.96-5.841v-8.2c0-2.16.673-3.841 2.02-5.04 1.346-1.2 3.126-1.801 5.34-1.801s3.94.594 5.18 1.78c1.24 1.187 1.86 2.834 1.86 4.94V30.8l-11.52.6v2.08zm8.6-5.24v-3.08c0-1.413-.44-2.42-1.32-3.021-.88-.6-1.907-.899-3.08-.899-1.174 0-2.167.359-2.98 1.08-.814.72-1.22 1.773-1.22 3.16v3.199l8.6-.439z"
                        fill="#e4d1eb" data-original="#e7adfb" />
                    </g>
                  </svg>`
    },
  ]
}
const updateTheApp = ref(false)
const psImg = ref(`
<svg viewBox="0 0 512 512">
                  <path
                    d="M467 0H45C20.099 0 0 20.099 0 45v422c0 24.901 20.099 45 45 45h422c24.901 0 45-20.099 45-45V45c0-24.901-20.099-45-45-45z"
                    fill="#d6355b" data-original="#ff468c" />
                  <path xmlns="http://www.w3.org/2000/svg"
                    d="M512 45v422c0 24.901-20.099 45-45 45H256V0h211c24.901 0 45 20.099 45 45z" fill="#d6355b"
                    data-original="#d72878" />
                  <path xmlns="http://www.w3.org/2000/svg"
                    d="M467 30H45c-8.401 0-15 6.599-15 15v422c0 8.401 6.599 15 15 15h422c8.401 0 15-6.599 15-15V45c0-8.401-6.599-15-15-15z"
                    fill="#2e000a" data-original="#700029" />
                  <path xmlns="http://www.w3.org/2000/svg"
                    d="M482 45v422c0 8.401-6.599 15-15 15H256V30h211c8.401 0 15 6.599 15 15z" fill="#2e000a"
                    data-original="#4d0e06" />
                  <path xmlns="http://www.w3.org/2000/svg"
                    d="M181 391c-41.353 0-75-33.647-75-75 0-8.291 6.709-15 15-15s15 6.709 15 15c0 24.814 20.186 45 45 45s45-20.186 45-45-20.186-45-45-45c-41.353 0-75-33.647-75-75s33.647-75 75-75 75 33.647 75 75c0 8.291-6.709 15-15 15s-15-6.709-15-15c0-24.814-20.186-45-45-45s-45 20.186-45 45 20.186 45 45 45c41.353 0 75 33.647 75 75s-33.647 75-75 75z"
                    fill="#d6355b" data-original="#ff468c" />
                  <path xmlns="http://www.w3.org/2000/svg"
                    d="M391 361h-30c-8.276 0-15-6.724-15-15V211h45c8.291 0 15-6.709 15-15s-6.709-15-15-15h-45v-45c0-8.291-6.709-15-15-15s-15 6.709-15 15v45h-15c-8.291 0-15 6.709-15 15s6.709 15 15 15h15v135c0 24.814 20.186 45 45 45h30c8.291 0 15-6.709 15-15s-6.709-15-15-15z"
                    fill="#d6355b" data-original="#d72878" />
                </svg>
`)


</script>

<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  outline: none;
  box-sizing: border-box;
}



body {
  font-family: var(--body-font);
  background-image: url(https://wallpapershome.com/images/wallpapers/macos-big-sur-1280x720-dark-wwdc-2020-22655.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 480px) {
    padding: 0.8em;
  }
}

.video-bg {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}



.dark-light {
  position: fixed;
  bottom: 50px;
  right: 30px;
  background-color: var(--dropdown-bg);
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;

  svg {
    width: 24px;
    flex-shrink: 0;
    fill: #ffce45;
    stroke: #ffce45;
    transition: 0.5s;
  }
}

.light-mode {
  .dark-light svg {
    fill: transparent;
    stroke: var(--theme-color);
  }

  .profile-img {
    border: 2px solid var(--theme-bg-color)
  }

  .content-section ul {
    background-color: var(--theme-bg-color);
  }

  .pop-up__title {
    border-color: var(--theme-color);
  }

  .dropdown.is-active ul {
    background-color: rgb(255 255 255 / 94%);
  }
}

body.light-mode:before,
body.light-mode .video-bg:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgb(255 255 255 / 45%) 100%);
  backdrop-filter: saturate(3);
}

.app {}

// .q-tab-panels {
//   @apply bg-transparent h-full;

// }

.header {


  @media screen and (max-width: 480px) {
    padding: 0 16px;
  }

  &-menu {


    a {

      @media screen and (max-width: 610px) {
        &:not(.main-header-link) {
          display: none;
        }
      }

      &.is-active,
      &:hover {
        color: var(--theme-color);
        border-bottom: 2px solid var(--theme-color);
      }
    }
  }
}

.notify {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    background-color: #3a6df0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    right: 20px;
    top: 16px;
  }

  @media screen and (max-width: 1055px) {
    display: none;
  }
}

.menu-circle {


  @media screen and (max-width: 945px) {
    display: none;
  }
}

.search-bar {


  input {


    &::placeholder {}
  }
}



.header-profile {


  svg {
    width: 22px;
    color: #f9fafb;
    flex-shrink: 0;
  }
}

.notification {


  &-number {}

  &+svg {


    @media screen and (max-width: 945px) {
      display: none;
    }
  }
}

.profile-img {}

.wide {

  .header-menu,
  .header-profile {
    display: none;
  }

  .search-bar {}

  .menu-circle {}
}

.wrapper {}

.left-side {


  @media screen and (max-width: 945px) {
    display: none;
  }
}

.side-wrapper+.side-wrapper {}

.side-title {}

.side-menu {


  a {


    &:hover {}
  }

  svg {}
}

.updates {
  position: relative;
  top: 0;
  right: 0;
  margin-left: auto;
  width: 18px;
  height: 18px;
  font-size: 11px;
}

.main-header {


  .header-menu {
    margin-left: 150px;

    @media screen and (max-width: 1055px) {
      margin: auto;
    }

    a {
      padding: 20px 24px;
    }
  }
}

.main-container {}

.menu-link-main {

  @media screen and (max-width: 1055px) {
    display: none;
  }
}

.content-wrapper {


  @media screen and (max-width: 510px) {
    padding: 20px;
  }

}



::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-bg);
  border-radius: 10px;
}
</style>
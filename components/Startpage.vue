<template>
  <div class="grid grid-flow-col columns-2 place-content-center h-screen items-center gap-7">
    <!-- <img src="https://cdn.anime-pictures.net/previews/7cd/7cd2fa5e4ef00cbe515371b0d7bfc996_bp.png" /> -->
    <div v-if="bg" class="h-screen flex items-center">
      <img v-bind:src="bg[bg.length - 1].URL" class="object-scale-down h-[80%]" />
    </div>
    <div class="ml-20 grid rows-3 grid-flow-row">
      <TimeAndDate />
      <div class="pl-20">
        <p class="font-bold font-sans text-header text-3xl">
          <span>~/</span>
          <span v-if="path">{{ path }}/</span>
          <span> > </span>
          <CommandInput :path="path" :bgData="bg" :itemData="itemData" autofocus @bg-change="bgChanged"
            @config-open="openConfig" @path-changed="pathChanged" ref="command" @refresh-data="dataChanged" />

        </p>
        <!-- <Config :show="showConfig" @close="showConfig = false" ref="configModal"> -->
        <!--   <template #header> -->
        <!--     <p class="text-3xl text-header"> Config </p> -->
        <!--   </template> -->
        <!--   <template #body> -->

        <!--     <p class="text-list text-base">Image URL: </p> -->
        <!--     <div class="basis-full h-0"></div> -->
        <!--     <input class="bg-bg-400 pl-1 flex-auto" :value="bgURL" @input="onURLInput" /> -->
        <!--   </template> -->
        <!-- </Config> -->
      </div>

      <div v-if="!apiError" class="mt-20 grid grid-flow-col auto-cols-max gap-3">
        <ul class="text-center" v-for="item in itemData" :key="item['name']">
          <li class="font-bold text-xl text-header">{{ item['name'] }}</li>
          <li v-for="link in item['links']">
            <a class="text-list font-bold" :href="link['URL']">{{ link['name'] }}</a>
          </li>
        </ul>
      </div>
      <div v-else class="text-list">
        <p> Something went wrong with the API. </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const command = ref()
const path = ref()

const { data: itemData, error: apiError, refresh } = await useFetch(
  'http://localhost:5192/api/items'
)

const { data: bg, refresh: refreshBg } = await useFetch('http://localhost:5192/api/bg')

async function refreshData() {
  await refresh()
}

const showConfig = ref(false)

function openConfig() {
  showConfig.value = true
}
function bgChanged(changedBg: string) {
  refreshBg()
}

async function dataChanged() {
  refreshData()
}

function onInput(e: Event) {
  // this.text = (<HTMLInputElement>e.target).value
}
function onURLInput() {
  console.log("yh")
}

function pathChanged(newPath: string) {
  path.value = newPath
}

</script>

<template>
  <div class="grid grid-flow-col columns-2 place-content-center h-screen items-center gap-7">
    <!-- <img src="https://cdn.anime-pictures.net/previews/7cd/7cd2fa5e4ef00cbe515371b0d7bfc996_bp.png" /> -->
    <div class="h-screen flex items-center">
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
        <Config :show="showConfig" @close="showConfig = false" ref="configModal">
          <template #header>
            <p class="text-3xl text-header"> Config </p>
          </template>
          <template #body>

            <p class="text-list text-base">Image URL: </p>
            <div class="basis-full h-0"></div>
            <input class="bg-bg-400 pl-1 flex-auto" :value="bgURL" @input="onURLInput" />
          </template>
        </Config>
      </div>

      <div class="mt-20 grid grid-flow-col auto-cols-max gap-3">
        <ul class="text-center" v-for="item in itemData" :key="item['name']">
          <li class="font-bold text-xl text-header">{{ item['name'] }}</li>
          <li v-for="link in item['links']">
            <a class="text-list font-bold" :href="link['URL']">{{ link['name'] }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const command = ref()
const allItems = ref()
const path = ref()

console.log("Asuh", path)

const { data: itemData, refresh } = await useFetch(
  'http://localhost:5192/api/items'
)

const { data: bg, refresh: refreshBg } = await useFetch('http://localhost:5192/api/bg')

// async function getLinksData() {
//   console.log("new data is:", allLinksData.value)
//   allItems.value = allLinksData.value.reduce((acc, link) => {
//     if (!acc[link.category]) {
//       acc[link.category] = {}
//     }
//     acc[link.category][link.name] = link.URL
//     return acc
//   }, {})
//   console.log("Yeh I'm doin it")
// }

async function refreshData() {
  await refresh()
  // await getLinksData()
}

// await getLinksData()

console.log("BG is", bg)
console.log(allItems)
console.log("LE VALUES: ", allItems.value)

const bgURL = ref('https://cdn.anime-pictures.net/previews/80d/80dfc1a8cee67bf2235580e8777ca7cf_bp.png')
const showConfig = ref(false)
// const lists = ref({
//   reddit: {
//     front: "https://reddit.com",
//     linux: "https://reddit.com/r/linux",
//     unixporn: "https://reddit.com/r/unixporn",
//     livestreamfails: "https://reddit.com/r/livestreamfails",
//     genshinleaks: "https://reddit.com/r/genshin_impact_leaks",
//     osugame: "https://reddit.com/r/osugame",
//     anime: "https://reddit.com/r/osugame",
//     manga: "https://reddit.com/r/osugame",
//   },
//   trackers: {
//     passthepopcorn: "https://passthepopcorn.me",
//     animebytes: "https://animebytes.tv",
//     beyondhd: "https://beyond-hd.me",
//     gazellegames: "https://gazellegames.net",
//     redacted: "https://redacted.ch",
//     jpopsuki: "https://jpopsuki.eu",
//     myanonamouse: "https://myanonamouse.net"
//   },
//   play: {
//     youtube: "https://youtube.com",
//     twitch: "https://twitch.com",
//     monkeytype: "https://monkeytype.com",
//   },
//   dev: {
//     github: "https://github.com",
//     stackoverflow: "https://stackoverflow.com"
//   },
// })

function openConfig() {
  showConfig.value = true
  console.log('suup 2')
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

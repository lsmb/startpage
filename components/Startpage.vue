<template>
  <div class="grid grid-flow-col columns-2 place-content-center h-screen items-center gap-7">
    <!-- <img src="https://cdn.anime-pictures.net/previews/7cd/7cd2fa5e4ef00cbe515371b0d7bfc996_bp.png" /> -->
    <img v-bind:src="bgURL" />

    <div class="ml-20 grid rows-2 grid-flow-row">
      <div class="pl-20">
        <p class="font-bold font-sans text-header text-3xl">
          > ~/
          <CommandInput autofocus @bg-change="bgChanged" @config-open="openConfig" ref="command" />

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

      <div class="mt-20 grid columns-4 grid-flow-col">
        <ul class="text-center" v-for="(listItem, listName) in allLinks" :key="listName">
          <li class="font-bold text-xl text-header">{{ listName }}</li>
          <li v-for="(item, itemName) in listItem">
            <a class="text-list font-bold" :href="item">{{ itemName }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const command = ref()

// onMounted(() => {
//   command.$el.focus()
// })

const { data: allLinksData } = await useFetch(
  'http://localhost:5192/api/links'
)

const allLinks = ref(allLinksData.value.reduce((acc, link) => {
  if (!acc[link.category]) {
    acc[link.category] = {}
  }
  acc[link.category][link.name] = link.URL
  return acc
}, {}))


// const allLinks = ref(allLinksData.value.map(link => {
//   return {
//     [link.category]: {
//       [link.name]: link.URL
//     }
//   }
// }))

// allLinks.value.map(link => {
//   console.log("ID is:", link.Id)
// })
console.log(allLinksData)
console.log("LE VALUES: ", allLinks.value)

const bgURL = ref('https://cdn.anime-pictures.net/previews/80d/80dfc1a8cee67bf2235580e8777ca7cf_bp.png')
const showConfig = ref(false)
const lists = ref({
  reddit: {
    front: "https://reddit.com",
    linux: "https://reddit.com/r/linux",
    unixporn: "https://reddit.com/r/unixporn",
    livestreamfails: "https://reddit.com/r/livestreamfails",
    genshinleaks: "https://reddit.com/r/genshin_impact_leaks",
    osugame: "https://reddit.com/r/osugame",
    anime: "https://reddit.com/r/osugame",
    manga: "https://reddit.com/r/osugame",
  },
  trackers: {
    passthepopcorn: "https://passthepopcorn.me",
    animebytes: "https://animebytes.tv",
    beyondhd: "https://beyond-hd.me",
    gazellegames: "https://gazellegames.net",
    redacted: "https://redacted.ch",
    jpopsuki: "https://jpopsuki.eu",
    myanonamouse: "https://myanonamouse.net"
  },
  play: {
    youtube: "https://youtube.com",
    twitch: "https://twitch.com",
    monkeytype: "https://monkeytype.com",
  },
  dev: {
    github: "https://github.com",
    stackoverflow: "https://stackoverflow.com"
  },
})

function openConfig() {
  showConfig.value = true
  console.log('suup 2')
}
function bgChanged(changedBg: string) {
  bgURL.value = changedBg
}

function onInput(e: Event) {
  // this.text = (<HTMLInputElement>e.target).value
}
function onURLInput() {
  console.log("yh")
}

</script>

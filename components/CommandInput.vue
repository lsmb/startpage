<script setup lang="ts">
import { ref } from 'vue'
import { addListener } from 'process';

const command = ref()

const emit = defineEmits(['configOpen', 'bgChange'])
let bgURL = "https://images.anime-pictures.net/7cd/7cd2fa5e4ef00cbe515371b0d7bfc996.png?if=ANIME-PICTURES.NET_-_750381-1155x1995-spy+x+family-yor+briar-kaetzchen-single-long+hair-tall+image.png"

function onInput(e: Event) {
  command.value = (<HTMLInputElement>e.target).value
}

// interface Link {
//   Id: string,
//   name: string,
//   URL: string,
//   category: string,
//   priority: number
// }

async function postLink(data) {
  await $fetch('https://localhost:7109/api/links', {
    method: 'POST',
    body: data,
    headers: {
      'content-type': 'application/json'
    }
  })
}

function addLink(args: string[]) {
  console.log('meme')
  if (args.length === 4) {
    const data = {
      category: args[0],
      name: args[1],
      URL: args[2],
      priority: args[3]
    }
    console.log("Memes,", JSON.stringify(data))
    postLink(data)
    console.log("MAAAN")
  }
}


function onEnter(e: Event) {
  let values = command.value.split(" ")
  switch (values[0]) {
    case "yt":
      if (values[1] !== undefined) {

        window.location.href = "https://www.youtube.com/results?search_query=" + values.slice(1).join(" ")
      } else {
        window.location.href = "https://www.youtube.com" + values.slice(1).join(" ")
      }
      break
    case "r":
      window.location.href = "https://reddit.com/r/" + values.slice(1).join(" ")
      break
    case "config":
      emit('configOpen')
      break
    case "bg":
      bgURL = values.slice(1).join(" ")
      emit('bgChange', bgURL)
      console.log('hi')
      break
    case "add":
      const args = values.slice(1)
      // console.log("Args are:", args)
      addLink(args)
      break;
    default:
      window.location.href = "https://www.google.com/search?q=" + values.join(" ")
  }
  command.value = ""
}





// console.log(allLinks.value[0])
</script>

<template>
  <input class="focus:outline-none bg-bg caret-pink-500" :value="command" @input="onInput" v-on:keyup.enter="onEnter"
    placeholder="" />
</template>


<!-- <script lang="ts"> -->
<!-- export default { -->
<!--   data() { -->
<!--     return { -->
<!--     } -->
<!--   }, -->
<!--   methods:  -->
<!-- } -->
<!-- </script> -->

<script setup lang="ts">
import { ref } from 'vue'
import { addListener } from 'process';

const command = ref()

const emit = defineEmits(['configOpen', 'bgChange', 'refreshData'])
const props = defineProps({
  listData: {
    type: Object,
    required: true
  },
  bgData: {
    type: Object,
    required: true
  }
})


let bgURL = "https://images.anime-pictures.net/7cd/7cd2fa5e4ef00cbe515371b0d7bfc996.png?if=ANIME-PICTURES.NET_-_750381-1155x1995-spy+x+family-yor+briar-kaetzchen-single-long+hair-tall+image.png"

function onInput(e: Event) {
  command.value = (<HTMLInputElement>e.target).value
}

interface Link {
  name: string
  URL: string
  category: string
  priority: number
}

async function postLink(data: Link) {
  console.log('Data for post is', data)
  await $fetch('http://localhost:5192/api/links', {
    method: 'POST',
    body: data
  })
}

async function deleteLink(id: string) {
  await $fetch(`http://localhost:5192/api/links/${id}`, {
    method: 'DELETE'
  })
}

async function deleteCategory(category: string) {
  await $fetch(`http://localhost:5192/api/links/${category}`, {
    method: 'DELETE'
  })
}

async function addLink(args: string[]) {
  console.log('meme', args)
  if (args.length >= 3) {
    if (args.length !== 4) {
      args.push("50")
    }

    let categoryName = args[0]
    switch (args[0]) {
      case "r":
        categoryName = "reddit"
        break;
      case "t":
        categoryName = "trackers"
        break;
      case "p":
        categoryName = "play"
        break;
      case "d":
        categoryName = "dev"
        break;
      default:
        break;
    }

    const data: Link = {
      category: categoryName,
      name: args[1],
      URL: args[2],
      priority: parseInt(args[3])
    }
    console.log("Memes,", JSON.stringify(data))
    await postLink(data)
    console.log("MAAAN")
    emit("refreshData")
  }
}

async function removeLink(args: string[]) {
  console.log('Deleting')
  if (args.length === 1) {
    var selectedItem = props.listData.filter(x => {
      return x.name === args[0]
    })
    console.log("Item is:", selectedItem)
    if (selectedItem.length !== 1) {
      console.log('Multiple same named. Implement error message here')
    } else {
      await deleteLink(selectedItem[0].Id)
      emit('refreshData')
    }
  }
}


async function removeCategory(category: string) {
  console.log('meme')
  if (category) {
    console.log("Yep got here")
    await deleteCategory(category)
    emit('refreshData')
  }
}

async function postBg(URL: string) {
  console.log('Data for post is', URL)
  await $fetch('http://localhost:5192/api/bg', {
    method: 'POST',
    body: { URL: URL }
  })
}


async function addNewBg(URL: string) {
  await postBg(URL)
  emit('bgChange')
}

async function deleteLatestBg(id: string) {
  await $fetch(`http://localhost:5192/api/bg/${id}`, {
    method: 'DELETE'
  })
  emit('bgChange')
}

function onEnter(e: Event) {
  let values = command.value.split(" ")
  const args = values.slice(1)
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
      if (args[0] == "pop") {
        deleteLatestBg(props.bgData[props.bgData.length - 1].Id)
        break;
      }
      addNewBg(args[0])
      console.log('hi')
      break
    case "touch":
      addLink(args)
      break;
    case "rm":
      if (args[0] === "-r") {
        removeCategory(args[1])
        break;
      }
      removeLink(args)
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

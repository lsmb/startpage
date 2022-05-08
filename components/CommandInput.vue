<script setup lang="ts">
import { ref } from 'vue'
import { addListener } from 'process';

const command = ref()

const emit = defineEmits(['configOpen', 'bgChange', 'refreshData', 'pathChanged'])
const props = defineProps({
  itemData: {
    type: Object,
    required: true
  },
  bgData: {
    type: Object,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

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

async function echo(cmd: string) {
  console.log('meme', cmd)
  let priority: number = 50
  if (cmd.includes(" > ")) {
    let sections: string[] = cmd.split(" > ")
    if (sections.length === 3) {
      priority = parseInt(sections[2])
    }

    let dirName = sections[0]
    switch (sections[0]) {
      case "r":
        dirName = "reddit"
        break;
      case "t":
        dirName = "trackers"
        break;
      case "p":
        dirName = "play"
        break;
      case "d":
        dirName = "dev"
        break;
      default:
        break;
    }


    await $fetch(`http://localhost:5192/api/items/${props.path}`, {
      method: 'POST',
      body: { name: sections[1], priority: priority ? priority : 50, URL: sections[0] }
    })

    emit("refreshData")
  }
}

async function rm(name: string) {
  console.log('Deleting')

  await $fetch(`http://localhost:5192/api/items/${props.path}/${name}`, {
    method: 'DELETE'
  })

  emit('refreshData')



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

async function mkdirPost(cmd: string) {
  console.log('Cmd post is', cmd)

  let sections: string[] = cmd.split(" > ")
  let itemPriority: number = 50

  itemPriority = 50
  console.log("Secs are:", sections)
  console.log("Priority is:", itemPriority)

  if (cmd.length > 1) {
    itemPriority = parseInt(sections[1])
  }

  await $fetch('http://localhost:5192/api/items', {
    method: 'POST',
    body: { name: sections[0], priority: itemPriority ? itemPriority : 50 }
  })
  emit('refreshData')
}

async function rmDir(name: string) {
  console.log("Name is:", name)
  await $fetch(`http://localhost:5192/api/items/${name}`, {
    method: 'DELETE'
  })
  emit('refreshData')
}


function onEnter(e: Event) {
  let values = command.value.split(" ")
  const args: string[] = values.slice(1)
  switch (values[0]) {
    case "cd":
      console.log("Current path:", props.path)
      console.log("ItemData:", props.itemData)

      if (args[0] === "..") {
        emit("pathChanged", null)
      } else if (props.itemData.some((x: String) => x['name'] === args[0])) {
        console.log("AYOOO")
        emit("pathChanged", args[0])
      }

      break
    case "mkdir":
      mkdirPost(command.value.slice(6))
      break
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
    case "echo":
      echo(command.value.slice(5))
      break
    case "rm":
      if (args[0] === "-r") {
        rmDir(command.value.slice("rm -r ".length))
        break
      }
      rm(args[0])
      break
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

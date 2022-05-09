<template>
  <div class="flex flex-col text-center mb-10">
    <p class="text-9xl text-header" v-if="time">{{ time }}</p>
    <p class="text-3xl text-header" v-if="todaysDate">{{ todaysDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref("")
const todaysDate = ref("")

function getTime() {
  const dateTime = new Date()
  let timeSections: string[] = []
  timeSections.push(("0" + dateTime.getHours()
    .toString()).slice(-2))
  timeSections.push(("0" + dateTime.getMinutes()
    .toString()).slice(-2))
  time.value = timeSections.join(":")
}

function getDate() {
  const dateTime = new Date()
  let dayName: string = ""
  let monthDay: string[] = []

  dayName = dateTime.toLocaleString('en-us',
    { weekday: 'long' })
  monthDay.push(dateTime.toLocaleDateString('en-us',
    { month: 'short' }))
  monthDay.push((dateTime.getDay() + 1).toString())
  console.log(monthDay)
  todaysDate.value = `${dayName}, ${monthDay.join(' ')}`
}

getTime()
getDate()

setInterval(() => {
  getTime()
}, 1000)

</script>

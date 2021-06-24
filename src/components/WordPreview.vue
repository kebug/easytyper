<template>
  <div class="wordpreview grid grid-cols-8 gap-y-px text-lg">
    <span v-for="(w,i) in wordList" :key="i" class="text-gray-400 p-1" :class="{'text-gray-600':curindex==i}">{{w.name}}</span>
  </div>
</template>

<script>
export default {
  name: "WordPreview",
  props: ["wordList","curindex"],
  setup() {


    return {

    }
  }
}
</script>

<style>

</style>
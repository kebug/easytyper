<template>
  <div class="word">
    <div
      ref="wordRef"
      class="text-7xl text-center text-gray-400 tracking-wide mt-20 mb-8"
      :class="{ shake: wordErrorShake }"
    >
      <span
        v-for="(l, i) in word.split('')"
        :key="i"
        :class="{ 'text-green-500': i < curIndex }"
        >{{ l }}</span
      >
    </div>

    <div class="text-lg text-center text-gray-400" v-show="!transVisible">Space to show translation!</div>
    <div
      v-for="(t, i) in trans"
      :key="i"
      class="text-lg text-center max-w-4xl text-gray-600 mt-2"
      v-show="transVisible"
    >
      {{ t }}
    </div>
    <div class="mb-15"></div>
    <audio ref="clickWav" :src="wavs[0]"></audio>
    <audio ref="beepWav" :src="wavs[1]"></audio>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import clickWavUrl from "../assets/wavs/click.wav";
import beepWavUrl from "../assets/wavs/beep.wav";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Word",
  props: ["word", "trans"],
  
  setup(props, ctx) {
    const wordRef = ref(null);
    const clickWav = ref(null);
    const beepWav = ref(null);
    const curIndex = ref(0);
    const wordErrorShake = ref(false);
    const letterList = "abcdefghijklmnopqrstuvwxyz".split("");
    const transVisible = ref(true)
    const wavs = ref([clickWavUrl, beepWavUrl]);

    window.addEventListener("keydown", (ev) => {
      if (letterList.includes(ev.key)) {
        if (ev.key == props.word[curIndex.value]) {
          curIndex.value += 1;
          clickWav.value.play();
          if (curIndex.value == props.word.length) {
            ctx.emit("wordFinished");
            curIndex.value = 0;
            transVisible.value = true
          }
        } else {
          wordErrorShake.value = true;
          curIndex.value = 0;
          beepWav.value.play();
        }
      }else if(ev.key==" ") {
        transVisible.value = true
      }
    });

    onMounted(() => {
      wordRef.value.addEventListener("animationend", () => {
        wordErrorShake.value = false;
      });
    });

    return {
      curIndex,
      wordErrorShake,
      wordRef,
      wavs,
      clickWav,
      beepWav,
      transVisible
    };
  },
};
</script>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
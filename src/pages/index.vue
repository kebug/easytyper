<template>
  <div class="index">
    <div class="container flex items-center text-gray-600 mx-auto h-20">
      <div class="ml-6 flex-1 text-5xl">Easy Typer</div>

      <div class="mr-6 flex-1 flex justify-end">
        <div
          class="border p-1 rounded bg-gray-200 cursor-pointer"
          @click="tagsVisible = true"
        >
          <TagIcon class="w-7 h-7 fill-current text-green-500" />
        </div>
      </div>
    </div>
    <div class="container flex justify-center">
      <Word
        :word="curWord.name"
        :trans="curWord.trans"
        @wordFinished="nextWord"
        class="h-96"
      />
    </div>
    <div class="container">
      <WordPreview
        :wordList="previewList"
        :curindex="previewIndex"
        class="w-3/5 mx-auto"
      />
    </div>
    <Tags
      :visible="tagsVisible"
      @selected="chooseTagWord($event)"
      :wordList="historyWords"
      @update:visible="tagsVisible = $event"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Word from "../components/Word.vue";
import WordPreview from "../components/WordPreview.vue";
import Tags from "../components/Tags.vue";
import { onMounted, onUnmounted } from "@vue/runtime-core";

import { LoadDict } from "../api/dicts";

import TagIcon from "../assets/svgs/tag.svg";

export default {
  name: "Home",
  components: {
    Word,
    WordPreview,
    TagIcon,
    Tags,
  },
  setup() {
    const wordList = ref([]);
    const previewList = ref([]);
    const previewIndex = ref(0);
    const curWord = ref({
      name: "EasyTyper",
      trans: [
        "通过练习英文打字的同时，学习英语单词",
        "模仿qwerty项目",
        "正在加载单词数据...",
      ],
    });
    const curIndex = ref(0);
    const letterList = "abcdefghijklmnopqrstuvwxyz".split("");
    const tagsVisible = ref(false);
    const wordType = ref("all");
    const historyIndexs = ref([]);
    const historyWords = ref([]);

    const loadInfoFromLocal = () => {
      const ci = window.localStorage.getItem("curindex");
      if (ci != null) {
        curIndex.value = Number.parseInt(ci);
      }
      const history = window.localStorage.getItem("history");
      if (history != null) {
        historyIndexs.value = JSON.parse(history);
      }
      if (
        historyIndexs.value[historyIndexs.value.length - 1] < curIndex.value
      ) {
        historyIndexs.value.push(curIndex.value);
      }
      window.localStorage.setItem(
        "history",
        JSON.stringify(historyIndexs.value)
      );
    };
    const updateHistoryIndex = () => {
      historyIndexs.value.forEach((element) => {
        wordList.value[element].index = element;
        historyWords.value.push(wordList.value[element]);
      });
    };
    const saveInfoToLocal = () => {
      window.localStorage.setItem("curindex", curIndex.value);
    };
    window.addEventListener("keydown", (ev) => {
      console.log(ev);
      if (ev.ctrlKey && ev.key == "Enter") {
        checkWord();
      }
      if (ev.key == "ArrowRight") {
        nextWord();
      }
      if (ev.key == "ArrowLeft") {
        preWord();
      }
    });
    const load_dict = () => {
      LoadDict()
        .then((res) => {
          wordList.value = res.data;
          curWord.value = wordList.value[curIndex.value];

          previewList.value = wordList.value.slice(
            curIndex.value,
            curIndex.value + 32
          );
          updateHistoryIndex();
        })
        .catch(() => {
          console.log("error");
        });
    };
    onMounted(() => {
      loadInfoFromLocal();
      load_dict();
    });

    const preWord = () => {
      if (curIndex.value > 0 && previewIndex.value > 0) {
        curIndex.value -= 1;
        previewIndex.value -= 1;
        saveInfoToLocal();
        curWord.value = wordList.value[curIndex.value];
      }
    };
    const nextWord = () => {
      curIndex.value += 1;
      previewIndex.value += 1;
      saveInfoToLocal();
      curWord.value = wordList.value[curIndex.value];
    };
    const checkWord = () => {
      console.log("checkword");
    };

    const chooseTagWord = (w) => {
      console.log(w);
      curIndex.value = w;
      curWord.value = wordList.value[curIndex.value];
      previewList.value = wordList.value.slice(
        curIndex.value,
        curIndex.value + 32
      );
    };
    return {
      nextWord,
      curWord,
      previewList,
      previewIndex,
      tagsVisible,
      checkWord,
      wordType,
      historyWords,
      chooseTagWord,
    };
  },
};
</script>

<style>
.index {
  font-family: "Times New Roman", Times, serif;
}
</style>
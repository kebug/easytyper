<template>
  <div
    class="tags fixed top-0 left-0 z-10 flex w-screen h-screen transition-all duration-700"
    v-show="visible"
  >
    <div
      class="
        content
        w-1/5
        h-screen
        divide-y divide-gray-300
        shadow-lg
        bg-white
      "
    >
      <ul class="h-full overflow-y-auto scrollbar">
        <li
          v-for="(w, i) in wordList"
          :key="i"
          @click="chooseTag(w.index)"
          class=" p-2 mx-1.5 rounded-lg cursor-pointer bg-gray-100 border-2 flex justify-between my-2"
        >
          <span class="text-xl">{{ w.name }}</span>
          <span class=" leading-7 text-gray-500 ">{{w.index}}</span>
        </li>
      </ul>
    </div>
    <div
      class="mask w-4/5 h-screen bg-black bg-opacity-30"
      @click="dismiss"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: ["wordList", "visible"],
  setup(props, ctx) {
    const dismiss = () => {
      // props.visible = false
      ctx.emit("update:visible", false);
    };

    const chooseTag = (i)=> {
      ctx.emit("selected",i)
      dismiss()
    }
    return {
      dismiss,
      chooseTag
    };
  },
};
</script>

<style>
::-webkit-scrollbar
{
    width:8px;
    height:8px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
    background-color: #c1c1c1;
}
</style>
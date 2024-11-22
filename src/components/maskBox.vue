<template>
  <h1
      class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
    角色</h1>
  <button class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
    <button  @click="inputChat('你好')"
            class="bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
            style="white-space: nowrap; display: inline-block;">
      <span class="text-orange-500"> 直接开始 →</span>
    </button>
  </button>
  <div class="md:flex flex-wrap items-start text-center gap-3.5">
    <ul class="flex flex-wrap gap-3.5 w-full">
      <li v-for="character in characters" :key="character.name"
          class="w-auto">
        <button @click="inputChat(character.des)"
                :style="{ backgroundColor: getSoftColor(), color: '#333' }"
                class="bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                style="white-space: nowrap; display: inline-block;">
          <span class="text-blue-500"> {{ character.name }} →</span>
        </button>
        <!-- 截取文字，鼠标悬停显示完整内容 -->
        <p class="text-sm text-gray-400 mt-1" :title="character.des" >
          {{ character.des.length > 10 ? character.des.slice(0, 5) + '...' : character.des }}
        </p>
      </li>
    </ul>
  </div>


  <!--  </div>-->
</template>
<script setup>
import { onMounted, ref, watch} from 'vue';

const props = defineProps({
  //发生的新对话标题
  characterData: {
    type: Array,
    default: []
  },
});
// 定义传递的事件
const emit = defineEmits(['update-chat-msg']);
const characters = ref(props.characterData) // 将 JSON 数据赋值到 characters
// 定义响应式变量
const exMsg = ref('');

// 输入消息并传递给父组件
function inputChat(msg,character='') {
  exMsg.value = msg;
  emit('update-chat-msg', exMsg.value,character); // 通过事件传递数据到父组件

}

function getSoftColor() {
  const r = Math.floor(200 + Math.random() * 55); // 高亮的红色分量
  const g = Math.floor(200 + Math.random() * 55); // 高亮的绿色分量
  const b = Math.floor(200 + Math.random() * 55); // 高亮的蓝色分量
  return `rgb(${r}, ${g}, ${b})`; // 生成柔和的浅色背景
}
watch(props.characterData, (newVal, oldVal) => {
  console.log(newVal)
  if (newVal !== oldVal) {
    console.log(newVal)
    characters.value = newVal.value
  }
});
onMounted(async () => {

});
</script>
<style scoped lang="scss">

</style>
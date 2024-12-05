<template>
  <h1
      class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
    角色</h1>
  <div class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2" style="margin-bottom: 10px">
    <button  @click="inputChat('')"
            class="bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
            style="white-space: nowrap; display: inline-block;">
      <span class="text-orange-500"> 直接开始 →</span>
    </button>
  </div>
  <div v-if="characters.length>0" class="md:flex flex-wrap items-start text-center gap-3.5">
    <ul class="flex flex-wrap gap-3.5 w-full">
      <li v-for="character in characters" :key="character.name"
          class="w-auto">
        <button @click="inputChat(character.des,character.id)"
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
const characters = ref(props.characterData); // 将 props.characterData 复制到 characters
// 定义响应式变量
const exMsg = ref('');

// 输入消息并传递给父组件
function inputChat(msg,character=-1) {
  exMsg.value = msg;
  emit('update-chat-msg', exMsg.value,character); // 通过事件传递数据到父组件

}

function getSoftColor() {
  const r = Math.floor(200 + Math.random() * 55); // 高亮的红色分量
  const g = Math.floor(200 + Math.random() * 55); // 高亮的绿色分量
  const b = Math.floor(200 + Math.random() * 55); // 高亮的蓝色分量
  return `rgb(${r}, ${g}, ${b})`; // 生成柔和的浅色背景
}
// 监听 prop 的变化
watch(
    () => props.characterData, // 监视 props.characterData 的变化
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        characters.value = [...newVal]; // 更新 characters
      }
    },
    { deep: true } // 如果 characterData 是一个深层嵌套数组，考虑使用 deep 选项
);
onMounted(async () => {

});
</script>
<style scoped lang="scss">

</style>
<template>
  <h1
      class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
    ChatGPT</h1>
  <div class="md:flex items-start text-center gap-3.5">
    <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
      <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
             stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em"
             xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        简单例子
      </h2>
      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
        <button @click="inputChat('随机给我一组双色球的号码')"
                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
          "随机给我一组双色球的号码" →
        </button>
        <button @click="inputChat('如何成为上帝?')"
                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
          "如何成为上帝"
          →
        </button>
        <button @click="inputChat('工作，消费主义和新穷人?')"
                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
          "工作，消费主义和新穷人?" →
        </button>
      </ul>
    </div>
    <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
      <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" aria-hidden="true" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z">
          </path>
        </svg>
        功能
      </h2>
      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          可能记住用户之前在对话中话
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          可能允许用户提供后续修正
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          请不要较真
        </li>
      </ul>
    </div>
    <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
      <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
             stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em"
             xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z">
          </path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        有所不为
      </h2>
      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          可能偶尔生成错误信息
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          偶尔产生有害或有偏见的内容
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          非实时内容
        </li>
      </ul>
    </div>
    <!-- 只在 Update 被成功导入时才渲染 -->
    <Suspense v-if="Update">
      <template #default>
        <component :is="Update" />
      </template>
      <template #fallback>
        <div>Loading...</div> <!-- 可选的加载提示 -->
      </template>
    </Suspense>

  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import {isTauri} from "@tauri-apps/api/core";
const Update = ref(null);
// 定义传递的事件
const emit = defineEmits(['update-chat-msg']);

// 定义响应式变量
const exMsg = ref('');

// 输入消息并传递给父组件
function inputChat(msg) {
  exMsg.value = msg;
  emit('update-chat-msg', exMsg.value); // 通过事件传递数据到父组件

}
onMounted(async () => {
  console.log(isTauri.call())
  if (isTauri.call()) {
    import("../components/Update.vue").then((module) => {
      Update.value = module.default;
    });
  }
});
</script>
<style scoped lang="scss">

</style>
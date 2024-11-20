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
       <span class="text-red-300"> 简单例子</span>
      </h2>
      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto" >
        <button @click="inputChat('随机给我一组双色球的号码')"
                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
          <span class="text-blue-500">"随机给我一组双色球的号码" →</span>
        </button>
        <button @click="inputChat('如何成为上帝?')"
                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
          <span class="text-blue-500">"如何成为上帝"→</span>

        </button>
        <button @click="inputChat('你的任务是以小红书博主的文章结构，以我给出的主题写一篇帖子推荐。你的回答应包括使用表情符号来增加趣味和互动，以及与每个段落相匹配的图片。'+
        '请以一个引人入胜的介绍开始，为你的推荐设定基调。然后，提供至少三个与主题相关的段落，突出它们的独特特点和吸引力。在你的写作中使用表情符号，使它更加引人入胜和有趣。'+
'          对于每个段落，请提供一个与描述内容相匹配的图片。这些图片应该视觉上吸引人，并帮助你的描述更加生动形象。我给出的主题是：'+
'          睁眼看世界')"
                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
          <span class="text-blue-500"> "你的任务是以小红书博主的文章结构，以我给出的主题写一篇帖子推荐。你的回答应包括使用表情符号来增加趣味和互动，以及与每个段落相匹配的图片。
          请以一个引人入胜的介绍开始，为你的推荐设定基调。然后，提供至少三个与主题相关的段落，突出它们的独特特点和吸引力。在你的写作中使用表情符号，使它更加引人入胜和有趣。
            对于每个段落，请提供一个与描述内容相匹配的图片。这些图片应该视觉上吸引人，并帮助你的描述更加生动形象。我给出的主题是：
        <span class="text-red-300">睁眼看世界 </span>
          " →</span>
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
          <span class="text-yellow-900">  记住用户之前在对话中话,因为API的Token缘故,此Chat的对话可能无法记住上面的对话.</span>
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          <span class="text-yellow-900">  请不要较真,对于AI,如果不自定义身份,它将不存在感情基调,请不要因为它的回答多次不满足而心生怨气.</span>
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
        不完美
      </h2>
      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          <span class="text-green-600">  可能偶尔生成错误信息 </span>
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          <span class="text-green-600">    偶尔产生有害或有偏见的内容</span>
        </li>
        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
          <span class="text-green-600">  非实时内容</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue';

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

});
</script>
<style scoped lang="scss">

</style>
<template>
  <div id="headlessui-portal-root" v-if="isVisible">
    <div data-headlessui-portal="">
      <button type="button" aria-hidden="true"
              style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;">
      </button>
      <div>
        <div class="relative z-50" id="headlessui-dialog-:r3:" role="dialog" aria-modal="true"
             data-headlessui-state="open" aria-labelledby="headlessui-dialog-title-:r5:">
          <div class="fixed inset-0 bg-gray-500/90 transition-opacity dark:bg-gray-800/90"></div>
          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div v-if="isVisible"
                   class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 sm:max-w-lg opacity-100 translate-y-0 sm:scale-100"
                   id="headlessui-dialog-panel-:r1:" data-headlessui-state="open">
                <div class="flex items-center sm:flex">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left"></div>
                </div>
                <div class="prose dark:prose-invert">
                  <div class="mb-5">
                    <h2 class="!mt-4 font-normal !mb-2"><b>ChatGPT</b></h2>
                  </div>
                  <div class="w-full h-[1px] bg-gray-300 opacity-20"></div>
                  <h4 class="mb-4">
                    本开源项目基于openai开放api开发，使用最新的gpt-4.0-mini，前端使用vue高仿ChatGpt界面，仅供学习使用.</h4>
                  <div class="flex gap-4 flex-col text-sm">
                    <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                      <div class="w-10 text-2xl text-center">🚨</div>
                      <div class="flex-1 leading-5">
                        <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                          <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                            修复了流式处理响应问题
                          </li>
                          <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Allows
                            加快了回复速度
                          </li>
                          <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Trained
                            修复了发送内容多但是现实不自动适应问题
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                      <div class="w-10 text-2xl text-center">🔬</div>
                      <div class="flex-1 leading-5">叫我超人！
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-4 mt-6">
                    <button @click="closePopup" class="btn flex justify-center gap-2 btn-primary ml-auto">Done
                    </button>
                  </div>
                </div>
                <div class="mt-5 flex flex-col gap-3 sm:mt-4 sm:flex-row-reverse"></div>
              </div>

              <div v-if="false"
                   class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 sm:max-w-lg"
                   id="headlessui-dialog-panel-:r4:" data-headlessui-state="open">
                <div class="flex items-center sm:flex">
                  <div
                      class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-green-100">
                    <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                         stroke-linecap="round"
                         stroke-linejoin="round" class="h-6 w-6 text-green-700" height="1em" width="1em"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                      </path>
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                        id="headlessui-dialog-title-:r5:" data-headlessui-state="open">Provide additional
                      feedback</h3>
                  </div>
                </div>
                <form><textarea id="feedback-other" placeholder="What would the ideal answer have been?" rows="3"
                                class="mt-4 mb-1 w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white"
                                tabindex="0" style="height: 89.4815px; overflow-y: hidden;"></textarea></form>
                <div class="mt-5 flex flex-col gap-3 sm:mt-4 sm:flex-row-reverse">
                  <button class="btn flex justify-center gap-2 btn-neutral">Submit feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" aria-hidden="true"
              style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"></button>
    </div>
  </div>
</template>
<script setup>
import {ref, watch} from 'vue';

// 获取传递的 prop
const props = defineProps({
  popupShow: {
    type: Boolean,
    default: false,
  },
});

// 定义事件
const emit = defineEmits(['close']);
// 响应式数据
const isVisible = ref(props.popupShow);
// 观察 popupShow prop 的变化
watch(() => props.popupShow, (val) => {
  isVisible.value = val;
});

// 关闭弹窗并保存状态
function closePopup() {
  isVisible.value = false;
  emit("close");
  // 将弹窗状态保存到 localStorage 中
  localStorage.setItem('popupShowV1.0', 'true');
}
</script>
<style scoped lang="scss">

</style>
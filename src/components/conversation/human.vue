<script setup>
import {ref} from "vue";
import imagePath from "../../assets/imgs/human9.png";
import SvgIcon from '../SvgIcon.vue';
const humanImage = ref(imagePath);
const props = defineProps({
  speech: {
    type: String,
    default: ""
  },
  cTime: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div
      class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
    <div class="w-[30px] flex flex-col relative items-end">
      <div class="relative flex">
                              <span class="common_span span_out">
                                <span
                                    class="common_span span_inner_1">
                                  <img aria-hidden="true" :src="humanImage" alt="huamn"
                                       class="common_span span_img_inner_1">
                                </span>
                              </span>
      </div>
    </div>
    <div
        class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
      <div class="flex flex-grow flex-col gap-3">
        <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap" >
          {{ speech }}
        </div>
      </div>
      <div v-if="false"
           class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
        <button
            class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible">
          <SvgIcon class="h-4 w-4">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </SvgIcon>
        </button>
      </div>
      <span class="text-gray-400 text-[10px]">{{props.cTime}}</span>
      <div class="flex justify-between"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common_span {
  box-sizing: border-box;
  display: block;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

.span_out {
  display: inline-block; /* 特有部分 */
  overflow: hidden;
  position: relative;
}

.span_inner_1 {
  /* 继承所有公共部分，无需额外代码 */
}

.span_img_inner_1 {
  display: block; /* 强调块级作用，冗余也可以省略 */
}

</style>
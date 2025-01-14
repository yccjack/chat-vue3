<script setup>
import {ref} from "vue";

const props = defineProps({
  models: { type: Array, default: []
  },
  currentTheme:{
    type: String,
    default: "dark"
  }
});
const emit = defineEmits(['select-option']);
// 选择选项
const selectOption = (option) => {
  selectedValue.value = option;
  emit('select-option', option); // 触发事件，将选中的数据传递给父组件
};

const showOptions = ref(false);
// 当前选中的值
const selectedValue = ref("");

const  currentLocalModel = ref('gpt-4o-mini')

// 切换选项列表显示
const toggleOptions = () => {
  event.stopPropagation(); // 阻止事件冒泡
  showOptions.value = true;
};
import {isTauri} from "@tauri-apps/api/core";
</script>

<template>
<div class="user-site dark:bg-gray-800"  :style="{ top: isTauri() ? '60px' : '20px' }">
  <div class="template">
    <div
        tabindex="0"
        class="popup button"
        style="padding:0 0.225rem  0; border-top-right-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;"
    >
      <div class="popup-header">
        <p
            style="letter-spacing: 1px; font-weight: 600;   padding: 0.625rem 0 0.625rem 0.825rem;"
        >
          请登录
        </p>

        <svg height="32" width="32" viewBox="0 0 1024 1024" class="icon">
          <path
              fill="#FFCE8B"
              d="M1021.103385 510.551692A510.551692 510.551692 0 1 1 510.551692 0a510.551692 510.551692 0 0 1 510.551693 510.551692"
          ></path>
          <path
              fill="#644646"
              d="M809.99026 493.192935v315.26567H494.979866a317.052601 317.052601 0 0 1-66.626996-7.147724V493.192935z"
          ></path>
          <path
              d="M494.979866 808.458605h-66.626996v-7.147724a317.052601 317.052601 0 0 0 66.626996 7.147724"
          ></path>
          <path
              fill="#644646"
              d="M809.99026 493.192935H428.35287v308.117946A315.010394 315.010394 0 0 1 178.693092 493.192935a310.670705 310.670705 0 0 1 21.953723-115.639958A314.755118 314.755118 0 0 1 494.979866 178.693092a308.373222 308.373222 0 0 1 82.96465 11.232138 313.989291 313.989291 0 0 1 232.045744 304.033532"
          ></path>
          <path
              fill="#C7F4F1"
              d="M758.935091 959.581906a510.551692 510.551692 0 0 1-512.338624-9.18993 268.55019 268.55019 0 0 1 512.338624 9.18993"
          ></path>
          <path
              fill="#F7BEA9"
              d="M581.263102 727.02561v86.793788a68.924478 68.924478 0 0 1-137.593681 0v-91.133477a184.309161 184.309161 0 0 0 74.285271 15.571826 178.693092 178.693092 0 0 0 63.30841-11.232137"
          ></path>
          <path
              fill="#FBD1BB"
              d="M700.987474 390.572045v163.121266a195.796574 195.796574 0 0 1-119.724372 183.798609 172.566472 172.566472 0 0 1-137.593681-4.850241 197.072953 197.072953 0 0 1-108.747511-178.693093v-163.376541a189.92523 189.92523 0 0 1 183.032782-195.796574 176.39561 176.39561 0 0 1 129.424854 57.437065 201.667919 201.667919 0 0 1 53.607928 138.359509"
          ></path>
          <path
              fill="#FBD1BB"
              d="M370.405253 553.182759a43.396894 43.396894 0 1 1-43.396894-41.099411 42.37579 42.37579 0 0 1 43.396894 41.099411"
          ></path>
          <path
              fill="#F49F83"
              d="M605.769583 590.963584v2.042207a70.966685 70.966685 0 1 1-141.93337 0v-2.042207"
          ></path>
          <path
              fill="#030303"
              d="M499.064279 517.699416a18.890413 18.890413 0 1 1-18.890412-18.890412 18.890413 18.890413 0 0 1 18.890412 18.890412M619.043927 517.699416a18.890413 18.890413 0 1 1-18.890412-18.890412 18.890413 18.890413 0 0 1 18.890412 18.890412"
          ></path>
          <path
              fill="#644646"
              d="M796.46064 401.038354a224.387469 224.387469 0 0 1-282.590362-28.590894 224.132193 224.132193 0 0 1-312.202359 5.105517A314.755118 314.755118 0 0 1 494.979866 178.693092a308.373222 308.373222 0 0 1 82.96465 11.232138 316.031498 316.031498 0 0 1 218.516124 211.878952"
          ></path>
        </svg>
      </div>

      <div class="popup-main">
        <button  @click="toggleOptions"
                 :title="selectedValue || currentLocalModel"
        >{{selectedValue || currentLocalModel}}</button>
        <ul
            v-show="showOptions"
            class="options-list"
            ref="dropdown"
        >
          <li
              v-for="(model, idx) in models" :key="idx"
              class="option-item"
              :class="{ 'bg-gray-800': currentTheme==='dark', 'nav-bk': currentTheme==='light' }"
              @click="selectOption(model.id)"
          >{{ model.id }}
          </li>
        </ul>
      </div>

    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.user-site {
  position: fixed;         /* 使用 fixed 定位 */
  right: 20px;            /* 距离右边20px */
  padding: 10px;          /* 内边距 */
  z-index: 1000;          /* 确保在最上层 */
}
/* From Uiverse.io by withyzu */
.template {
  /* ------------------------------------------------------------ */
  /* fill */
  --fill: #0000;
  --fill-hover: hsla(0, 0%, 45%, 0.1);
  --fill-active: hsl(0, 1%, 85%);
  /* txt */

  /*-------------------------*/
  --br: 0.325rem;
  --gap: 0.275rem;
  /* ---------------------------------------------------------- */
  display: flex;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 0.975rem;
  color: var(--txt);
}

/* button */
.button {
  display: inline-block;
  list-style-type: none;
  list-style: none;
  appearance: none;
  outline: 0;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;
  color: inherit;
  white-space: nowrap;
  padding: calc(var(--gap) * 3) calc(var(--gap) * 5);
  text-align: left;
  background-color: var(--fill);
  border-radius: var(--br);
}

.button:hover {
  background-color: var(--fill-hover);
}

.button:focus,
.button:active,
.button.active {
  background-color: var(--fill-active);
}

/* popup */
.popup {
  position: relative;
}

.popup-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: calc(var(--gap) * 3);
}

.popup-main {
  position: absolute;
  top: 100%;
  right: 0;
  opacity: 0;
  margin-top: var(--gap);
  border-radius: var(--br);
  padding: var(--gap);
  transition: 0.4s;
}

.popup:focus .popup-main {
  margin-top: 1rem;
  opacity: 1;
}

.list-box {
  display: flex;
  flex-direction: column;
}

</style>
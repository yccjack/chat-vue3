<script setup>
import { ref,onMounted,onUnmounted } from "vue";
import {isTauri} from "@tauri-apps/api/core";
const props = defineProps({
  models: { type: Array, default: []
  },
  currentTheme:{
    type: String,
    default: "dark"
  }
});
// 控制点击外部关闭下拉框
const dropdown = ref(null);
// 用于触发事件传递数据给父组件
const emit = defineEmits(['select-option']);
// 控制选项列表显示状态
const showOptions = ref(false);
// 当前选中的值
const selectedValue = ref("");

const  currentLocalModel = ref('gpt-4o-mini')

// 切换选项列表显示
const toggleOptions = () => {
  event.stopPropagation(); // 阻止事件冒泡
  showOptions.value = !showOptions.value;
};

// 选择选项
const selectOption = (option) => {
  selectedValue.value = option;
  emit('select-option', option); // 触发事件，将选中的数据传递给父组件
  showOptions.value = false; // 隐藏选项列表
};
// 监听点击事件，关闭下拉框
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    showOptions.value = false; // 点击外部区域时关闭下拉框
  }
};

onMounted(() => {
  currentLocalModel.value = localStorage.getItem("currentModel")||'gpt-4o-mini';
  emit('select-option', currentLocalModel.value); // 触发事件，将选中的数据传递给父组件
  document.addEventListener('click', handleClickOutside); // 添加全局点击事件监听
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside); // 移除事件监听
});
</script>

<template>
  <div class="custom-select-wrapper"
       :style="{ top: isTauri() ? '60px' : '20px' }" >
    <button  @click="toggleOptions"
            :title="selectedValue || currentLocalModel"
             :class="{ 'bg-gray-600': currentTheme==='dark', 'nav-bk': currentTheme==='light' }"
    >{{selectedValue || currentLocalModel}}</button>

    <!-- 自定义选项列表 -->
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

</template>

<style scoped lang="scss">
/* 媒体查询：屏幕宽度小于600px时隐藏按钮 */
@media (max-width: 770px) {
  .custom-select-wrapper {
    display: none;
  }
}
/* 自定义下拉框容器 */
.custom-select-wrapper {
  position: fixed;         /* 固定位置 */
  transition: top 0.3s ease; /* 可选：添加动画过渡效果 */
  right: 20px;             /* 距离右侧20px */
  z-index: 1000;
}
/* 自定义选项列表样式 */
.options-list {
  position: absolute;      /* 相对于父容器定位 */
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 150px;
  right: 100%;             /* 向左展开 */
  top: 0;                  /* 保持与按钮顶部对齐 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 单个选项样式 */
.option-item {
  padding: 8px 12px;
  font-size: 10px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden;    /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.option-item:hover {
  background-color: #f0f0f0;
}
/* From Uiverse.io by adamgiebl */
button {
  padding: 0.7em 1.7em;
  font-size: 10px;
  border-radius: 0.5em;
  cursor: pointer;
  border: 1px solid #082d7e;
  transition: all 0.3s;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden;    /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  max-width: 100px;
}

button:hover {
  border: 1px solid #e00707;
}

button:active {
  box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
}

</style>
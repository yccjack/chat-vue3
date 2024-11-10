<template>
  <div>
    <Modal v-model:open="open" title="Basic Modal" @ok="update">
      <p>检测到新版本，是否立即更新?</p>
    </Modal>
  </div>
</template>

<script setup>
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { Modal } from "ant-design-vue";
import { ref } from "vue";

const open = ref(true);
const update = async () => {
  try {
    const { shouldUpdate, manifest } = await check();
    console.log(manifest);
    console.log(shouldUpdate);
    if (shouldUpdate) {
      // 显示正在更新的提示或加载页面

      // 重新启动应用
      await relaunch();
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

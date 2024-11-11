<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { check } from "@tauri-apps/plugin-updater";
import { onMounted, ref } from "vue";
import Update from "./components/Update.vue";
import { getVersion, getName, getTauriVersion } from "@tauri-apps/api/app";
const appVersion = ref();
const appName = ref();
const tauriVersion = ref();

const showUpdate = ref(false);

const created = async () => {
  try {
    const update = await check();
    alert.log(update)
    if (update) {
      alert.log(
          `found update ${update.version} from ${update.date} with notes ${update.body}`
      );
      // 检测到新版本，显示更新组件
      showUpdate.value = true;
    }
  } catch (error) {
    alert.error(error);
  }
};

const init = async () => {
  appVersion.value = await getVersion();
  appName.value = await getName();
  tauriVersion.value = await getTauriVersion();
};

onMounted(() => {
  created();
  init();
});
</script>

<template>
  <div>
    应用名称：{{ appName }} <br />当前版本：{{ appVersion
    }}<br />当前tauri版本：{{ tauriVersion }}
    <Update key="1" v-if="showUpdate" />
  </div>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>

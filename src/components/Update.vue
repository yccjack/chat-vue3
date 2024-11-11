<template>
  <div>
    应用名称：{{ appName }} <br/>当前版本：{{
      appVersion
    }}<br/>当前tauri版本：{{ tauriVersion }}
  </div>
</template>

<script setup>
import {check} from "@tauri-apps/plugin-updater";
import {relaunch} from "@tauri-apps/plugin-process";
import {Modal} from "ant-design-vue";
import {onMounted, ref} from "vue";
import {getVersion, getName, getTauriVersion} from "@tauri-apps/api/app";

const appVersion = ref();
const appName = ref();
const tauriVersion = ref();
const open = ref(false);

const init = async () => {
  appVersion.value = await getVersion();
  appName.value = await getName();
  tauriVersion.value = await getTauriVersion();
  await checkUpdate();
};

const checkUpdate = async () => {
  try {
    const update = await check();
    console.log(update)
    if(update){
      console.log(
          `found update ${update.version} from ${update.date} with notes ${update.body}`
      );
      let downloaded = 0;
      let contentLength = 0;
      // alternatively we could also call update.download() and update.install() separately
      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            contentLength = event.data.contentLength;
            console.log(`started downloading ${event.data.contentLength} bytes`);
            break;
          case 'Progress':
            downloaded += event.data.chunkLength;
            console.log(`downloaded ${downloaded} from ${contentLength}`);
            break;
          case 'Finished':
            console.log('download finished');
            break;
        }
      });
      console.log('update installed');
      await relaunch();
    }
  } catch (error) {
    console.log.error(error);
  }
};

onMounted(() => {
  init();

});
</script>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>

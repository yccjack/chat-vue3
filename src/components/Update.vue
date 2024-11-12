<template>
  <div>
    <Modal v-model:open="open" title="更新窗口" @ok="handleOk"
           :ok-button-props="{ disabled: isDownloading }"
            :cancel-button-props="{ disabled: isDownloading }"
           :maskClosable="false" >
      <p>检测到新版本，是否立即更新?</p>
      <!-- 进度条 -->
      <div v-if="downloadProgress !== null">
        <progress :value="downloadProgress" :max="100"></progress>
        <p>{{ downloadProgress }}%</p>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import {check} from "@tauri-apps/plugin-updater";
import {relaunch} from "@tauri-apps/plugin-process";
import {onMounted, ref} from "vue";
import {getVersion, getName, getTauriVersion} from "@tauri-apps/api/app";
import { Modal } from "ant-design-vue";
const appVersion = ref(__APP_VERSION__);
const appName = ref();
const tauriVersion = ref();
const open = ref(false);
const isDownloading = ref(false); // 控制按钮禁用的状态
const update = await check();

// 更新进度
const downloadProgress = ref(null);  // 用于存储下载进度百分比
const init = async () => {
  appName.value = await getName();
  tauriVersion.value = await getTauriVersion();
  if(update){
    open.value=true
  }
};

const checkUpdate = async () => {
  try {

    if (update) {
      console.log(
          `found update ${update.version} from ${update.date} with notes ${update.body}`
      );
      let downloaded = 0;
      let contentLength = 0;
      // alternatively we could also call update.download() and update.install() separately
      await update.downloadAndInstall((event) => {
        isDownloading.value = true; // 开始下载，禁用按钮
        switch (event.event) {
          case 'Started':
            contentLength = event.data.contentLength;
            console.log(`started downloading ${event.data.contentLength} bytes`);
            break;
          case 'Progress':
            downloaded += event.data.chunkLength;
            downloadProgress.value = Math.floor((downloaded / contentLength) * 100);  // 更新下载进度
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
    console.error(error);
  }
};
const handleOk = async () => {
  // 处理ok事件的代码
  await checkUpdate()
}

onMounted(() => {
  init();

});
</script>

<style scoped>
</style>

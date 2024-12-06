<template>
  <div v-if="visible" class="modal-overlay" @click="handleMaskClick">
    <div class="modal-container" @click.stop>
      <header class="modal-header">
        <h3 class="text-gray-900">更新窗口</h3>
        <button class="close-btn" @click="closeModal">×</button>
      </header>
      <div class="modal-body">
        <p class="text-gray-900">检测到新版本，是否立即更新?</p>
        <div style="color: #2e95d3">
          <ul>
            <li>最新版本： {{ update.version }}, 发布时间： {{formatDate(update.date) }}</li>
            
          </ul>
        </div>
        <!-- 进度条 -->
        <div v-if="downloadProgress !== null" class="w-full">
          <progress :value="downloadProgress" :max="100"></progress>
          <p>{{ downloadProgress }}%</p>
        </div>
      </div>
      <footer class="modal-footer">
        <button class="btn" :disabled="isDownloading" @click="handleOk">确认</button>
        <button class="btn" :disabled="isDownloading" @click="closeModal">取消</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import {check} from "@tauri-apps/plugin-updater";
import {relaunch} from "@tauri-apps/plugin-process";
import {onMounted, ref} from "vue";
import {getName, getTauriVersion} from "@tauri-apps/api/app";
const appName = ref();
const tauriVersion = ref();
const open = ref(false);
const isDownloading = ref(false); // 控制按钮禁用的状态
const update = await check();
// 更新进度
const downloadProgress = ref(null);  // 用于存储下载进度百分比

// 弹窗可见性
const visible = ref(true);
const init = async () => {
  appName.value = await getName();
  tauriVersion.value = await getTauriVersion();
  if(update){
    visible.value=true
  }
};

const checkUpdate = async () => {
  try {

    if (update) {
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

// 关闭弹窗
const closeModal = () => {
  if (isDownloading.value) return; // 下载中不可关闭
  visible.value = false;
};

// 点击遮罩关闭
const handleMaskClick = () => {
  // 不允许点击遮罩关闭
};

function formatDate(dateString) {
  // 按空格和点号拆分字符串
  const [datePart, timePart] = dateString.split(' ');
  const [time, msAndZone] = timePart.split('.');

  // 拼接返回格式
  return `${datePart.replace(/-/g, '年').replace(/(\d+)年(\d+)/, '$1年$2月')}日 ${time}`;
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(178, 178, 182);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: #fcfcfc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2e95d3;
  color: #434852;
}

.btn:disabled {
  background-color: #0e0e0e;
  cursor: not-allowed;
}
</style>

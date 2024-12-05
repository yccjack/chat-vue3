<script setup>
import {ref, onMounted} from 'vue';

const currentTime = ref('');
const currentDate = ref('');
const isHovered = ref(false)
onMounted(() => {
  const updateTime = () => {
    const now = new Date();
    const options = isHovered.value
        ? { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
        : { hour: 'numeric', minute: 'numeric' };

    // 获取当前时间
    currentTime.value = now.toLocaleString('zh-CN', {hour: 'numeric', minute: 'numeric', hour12: true});

    // 获取当前日期
    currentDate.value = now.toLocaleDateString('zh-CN', options);
  };

  updateTime(); // 初始化时调用一次
  setInterval(updateTime, 60000); // 每分钟更新一次时间
});
</script>

<template>
  <div class="dateCard"
       @mouseover="isHovered = true"
       @mouseleave="isHovered = false">
    <p class="time-text"><span>{{ currentTime }}</span></p>
    <p class="day-text">{{ currentDate }}</p>
  </div>
</template>

<style scoped lang="scss">
.dateCard {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background-color: rgba(255, 255, 255, 0.8); /* Optional: Background color for visibility */
  padding: 10px;
  z-index: 1000; /* Ensures it appears above other elements */
  width: 280px;
  height: 150px;
  background: rgb(17, 4, 134);
  border-radius: 15px;
  box-shadow: rgb(0, 0, 0, 0.7) 5px 10px 50px, rgb(0,0,0,0.7) -5px 0px 250px;
  display: flex;
  color: white;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.dateCard:hover {
  box-shadow: rgb(0, 0, 0) 5px 10px 50px, rgb(0,0,0) -5px 0px 250px;
}

.time-text {
  font-size: 50px;
  margin-top: 20px;
  margin-left: 15px;
  font-weight: 600;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.time-sub-text {
  font-size: 15px;
  margin-left: 5px;
}

.day-text {
  font-size: 18px;
  margin-top: 0;
  letter-spacing: 4px; /* 增加字体间距 */
  margin-left: 15px;
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.moon {
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: all 0.3s ease-in-out;
}

.dateCard:hover > .moon {
  font-size: 23px;
}

</style>
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'


// 创建 Vue 实例
const app = createApp(App);


// 使用 Axios 设置全局配置
app.config.globalProperties.$axios = axios;

// 设置 Axios 默认的 Content-Type
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 挂载应用
app.mount('#app');

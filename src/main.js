import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import axios from 'axios'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";


// 创建 Vue 实例
const app = createApp(App);


// 使用 Axios 设置全局配置
app.config.globalProperties.$axios = axios;

// 使用 Ant Design Vue
// app.use(Antd);

// 设置 Axios 默认的 Content-Type
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 挂载应用
app.mount('#app');

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import {createHtmlPlugin} from 'vite-plugin-html';
export default defineConfig({
    plugins: [vue(), createHtmlPlugin({
        inject: {
            data: {
                TITLE: 'ChatY'
            }
        }
    })],
    alias: {
        '@': path.resolve(__dirname, './src')
    },
    define: {
        // 自定义 import.meta.env.MODE 的值
        'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'development'),

        // 你可以定义其他环境变量
        'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.VITE_APP_ENV || 'default'),

        // 可以设置 TAURI 标识来判断是否运行在 Tauri 中
        'import.meta.env.TAURI': JSON.stringify(process.env.TAURI || 'false')
    }
})

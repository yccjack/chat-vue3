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
    }
})

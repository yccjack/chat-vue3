import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import {createHtmlPlugin} from 'vite-plugin-html';
import {version} from './package.json';

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
    }, define: {
        __APP_VERSION__: JSON.stringify(version),
        __APP_API_RUI__: JSON.stringify('192.168.20.176:8383')
    },
})

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import {createHtmlPlugin} from 'vite-plugin-html';
import {version} from './package.json';

export default defineConfig({
    // 防止 Vite 清除 Rust 显示的错误
    clearScreen: false,
    server: {
        // Tauri 工作于固定端口，如果端口不可用则报错
        strictPort: true,
        port: 5173,
    },
    // 添加有关当前构建目标的额外前缀，使这些 CLI 设置的 Tauri 环境变量可以在客户端代码中访问
    envPrefix: ['VITE_', 'TAURI_ENV_*'],
    build: {
        // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
        target:
            process.env.TAURI_ENV_PLATFORM === 'windows'
                ? 'chrome105'
                : 'safari13',
        // 在 debug 构建中不使用 minify
        minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
        // 在 debug 构建中生成 sourcemap
        sourcemap: !!process.env.TAURI_ENV_DEBUG,
    },
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
        __APP_API_RUI__: JSON.stringify('chat.gschaos.club/api'),
        __UPDATE_NODE__: JSON.stringify('["所有请求使用SSL加密处理","增加侧边栏的主题切换","新增跟随系统自动切换主题(咱不可关闭)"]'),
    },
})

// 获取当前窗口
import { getCurrentWindow } from '@tauri-apps/api/window';
// 导入系统托盘
import { TrayIcon} from '@tauri-apps/api/tray';
// 托盘菜单
import { Menu } from '@tauri-apps/api/menu';
// 进程管理
import { exit } from '@tauri-apps/plugin-process';

/**
 * 在这里你可以添加一个托盘菜单，标题，工具提示，事件处理程序等
 */
const options = {
    // icon 的相对路径基于：项目根目录/src-tauri/，其他 tauri api 相对路径大抵都是这个套路
    icon: "icons/32x32.png",
    // 托盘提示，悬浮在托盘图标上可以显示 tauri-app
    tooltip: '大报恩寺',
    // 是否在左键点击时显示托盘菜单，默认为 true。当然不能为 true 啦，程序进入后台不得左键点击图标显示窗口啊。
    menuOnLeftClick: false,
    // 托盘图标上事件的处理程序。
    action: (event) => {
        // 左键点击事件
        if (event.type === 'Click' && event.button === "Left" && event.buttonState === 'Down') {
            console.log('单击事件');
            // 显示窗口
            winShowFocus().then(r => {});
        }
    }
}

/**
 * 窗口置顶显示
 */
async function winShowFocus() {
    // 获取窗体实例
    const win = await getCurrentWindow();
    // 检查窗口是否见，如果不可见则显示出来
    if (!(await win.isVisible())) {
        await win.show();
    } else {
        // 检查是否处于最小化状态，如果处于最小化状态则解除最小化
        if (await win.isMinimized()) {
            await win.unminimize();
        }
        // 窗口置顶
        await win.setFocus();
    }
}

/**
 * 创建托盘菜单
 */
async function createMenu() {
    return await Menu.new({
        // items 的显示顺序是倒过来的
        items: [
            {
                id: 'show',
                text: '显示窗口',
                action: () => {
                    winShowFocus();
                }
            },
            {
                // 菜单 id
                id: 'quit',
                // 菜单文本
                text: '退出',
                //  菜单项点击事件
                action: () => {
                    console.log('退出')
                    // 退出应用
                    exit(0);
                }
            }
        ]
    });
}

/**
 * 创建系统托盘
 */
export async function createTray() {
    // 获取 menu
    options.menu = await createMenu();
    await TrayIcon.new(options);
}

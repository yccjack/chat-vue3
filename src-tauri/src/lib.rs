#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::{AppHandle, Manager};
use tauri::{Builder, generate_context, menu::{CheckMenuItemBuilder,MenuBuilder, MenuItemBuilder, SubmenuBuilder, PredefinedMenuItem}};

pub fn run() {

    tauri::Builder::default()
            .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
                let _ = show_window(app);
            }))
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {

        let _open = MenuItemBuilder::new("打开").accelerator("Ctrl+Shift+O").build(app)?;
        let _save = MenuItemBuilder::new("保存").accelerator("Ctrl+Shift+S").build(app)?;
        let _exit = MenuItemBuilder::new("退出").build(app);
        let _undo = MenuItemBuilder::new("撤销").build(app)?;
        let _redo = MenuItemBuilder::new("重做").build(app)?;

       let toggle = MenuItemBuilder::with_id("toggle", "Toggle").build(app)?;
        let check = CheckMenuItemBuilder::new("Mark").build(app)?;
        let file_menu = SubmenuBuilder::new(app, "系统")
            .item(&PredefinedMenuItem::copy(app, None)?) // 添加复制菜单项
            .item(&PredefinedMenuItem::paste(app, None)?) // 添加粘贴菜单项
            .separator() // 添加分隔符
            .items(&[&toggle,&check]) // 添加自定义菜单项
            .build()?;
        // 创建 "编辑" 子菜单
        let edit_menu = SubmenuBuilder::new(app, "编辑")
            .items(&[&_undo,&_redo]) // 添加自定义菜单项
            .build()?;

        let menu = MenuBuilder::new(app)
            .item(&file_menu) // 添加文件菜单
            .item(&edit_menu) // 添加编辑菜单
            .build()?;
            // 设置菜单到应用 菜单是用js自定义菜单
//             app.set_menu(menu)?;
        app.on_menu_event(move |app, event| {
            if event.id() == check.id() {
                println!("`check` triggered, do something! is checked? {}", check.is_checked().unwrap());
            } else if event.id() == "toggle" {
                println!("toggle triggered!");
            }
        });
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
        fn show_window(app: &AppHandle) {
            let windows = app.webview_windows();

            windows
                .values()
                .next()
                .expect("Sorry, no window found")
                .set_focus()
                .expect("Can't Bring Window to Focus");
        }



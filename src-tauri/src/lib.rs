#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::{
    generate_context,
    Emitter,
    menu::{
       Menu, MenuItem
    },
    tray::{TrayIconBuilder,MouseButton, MouseButtonState, TrayIconEvent}
};
use tauri::{AppHandle, Manager};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new()
        .with_handler(|app, shortcut,cwd| {
                show_window(app);
              }).build())
        .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
            let _ = show_window(app);
        }))
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let webview = app.get_webview_window("main").unwrap();
            webview.eval("localStorage.removeItem('canTray');")?;
            let quit_i = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;
            let open_i = MenuItem::with_id(app, "open", "打开[Ctrl+Alt+Q]", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&open_i,&quit_i])?;
             let tray = TrayIconBuilder::new().on_menu_event(|app, event| match event.id.as_ref() {
                "quit" => {
                  app.exit(0);
                },
                "open" =>{
                 show_window(app);
                }
                _ => {

                }
              })
              .on_tray_icon_event(|tray, event| match event {
                                     TrayIconEvent::Click {
                                       button: MouseButton::Left,
                                       ..
                                     } => {
                                       let app = tray.app_handle();
                                       if let Some(window) = app.get_webview_window("main") {
                                         let _ = window.show();
                                         let _ = window.set_focus();
                                       }
                                     }
                                     _ => {
                                     }
                                   })
             .icon(app.default_window_icon().unwrap().clone())
               .menu(&menu)
               .menu_on_left_click(true)
            .build(app)?;
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
   // 查找第一个窗口
     if let Some(window) = windows.values().next() {
         // 显示窗口
         window.show().expect("Can't show window");

         // 在需要的时候可以设置窗口焦点
         window.set_focus().expect("Can't bring window to focus");
     } else {
         panic!("Sorry, no window found");
     }
    windows
        .values()
        .next()
        .expect("Sorry, no window found")
        .set_focus()
        .expect("Can't Bring Window to Focus");
}

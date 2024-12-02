#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::menu::{MenuBuilder, PredefinedMenuItem};
use tauri::{AppHandle, Manager};
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
            let _ = show_window(app);
        }))
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let menu = MenuBuilder::new(app)
                .copy()
                .paste()
                .separator()
                .undo()
                .redo()
                .text("open-url", "Open URL")
                .check("toggle", "Toggle")
                .icon(
                    "show-app",
                    "Show App",
                    app.default_window_icon().cloned().unwrap(),
                )
                .build()?;
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
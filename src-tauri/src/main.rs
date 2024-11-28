use tauri::{AppHandle, Manager, Runtime, WindowEvent};

fn main() {
    tauri::Builder::default()
        .on_window_event(|event| {
            if let WindowEvent::CloseRequested { api, .. } = event.event() {
                let window = event.window();
                api.prevent_close(); // 阻止关闭
                window.minimize().unwrap(); // 最小化窗口
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

import fs from 'fs' // 读取 tauri.conf.json
const tauriConf = JSON.parse(fs.readFileSync('./src-tauri/tauri.conf.json', 'utf8'));
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
let package_version = packageJson.version; //package版本号

// 更新 tauri.conf.json version
tauriConf.version = package_version;
fs.writeFileSync('./src-tauri/tauri.conf.json', JSON.stringify(tauriConf, null, 2));
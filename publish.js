import fs from 'fs'
// 读取 tauri.conf.json
const tauriConf = JSON.parse(fs.readFileSync('./src-tauri/tauri.conf.json', 'utf8'));
let newVersion = tauriConf.version; //更新的版本号

// 读取 update.json
let updateJson = JSON.parse(fs.readFileSync('update.json', 'utf8'));
// 更新 update.json version
updateJson.version = newVersion;

//获取版本更新的内容Y-Chat_0.1.8_x64_zh-CN
//签名、版本路径、发版日期
const signature =  fs.readFileSync(`./src-tauri/target/release/bundle/msi/Y-Chat_${newVersion}_x64_zh-CN.msi.sig`, 'utf8');
updateJson.signature = signature;
updateJson.url = `https://gschaos.club/update_file/Y-Chat_${newVersion}_x64_zh-CN.msi`
updateJson.pub_date = new Date();
fs.writeFileSync('update.json', JSON.stringify(updateJson, null, 2));
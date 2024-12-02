<script setup>
import { getCurrentWindow } from '@tauri-apps/api/window';
await getCurrentWindow().close();
import {isTauri} from "@tauri-apps/api/core";
</script>
<template>

</template>

<style scoped lang="scss">

</style>
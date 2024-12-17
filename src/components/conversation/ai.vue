<script setup>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import {computed} from "vue"; // 引入亮色主题
const props = defineProps({
  speeches: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  },
  modelVersion:{
    type: String,
    default: "GPT4-MINI"
  }
});

function renderCodeBlock(code, codeHtml, language = "") {
  return `<div class="bg-black mb-4 rounded-md">
    <div class="code_header flex items-center  text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans">
      <span>${language}</span>
      <button onclick="copy(this)" class="flex ml-auto gap-2">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
        <span>复制代码</span>
         <pre><code style="display:none">${code}</code></pre>
      </button>
    </div>

    <div style="margin: 10px 0 20px 10px;">
      <pre class="hljs !whitespace-pre language-${language}" ><code>${codeHtml}</code></pre>
    </div>
  </div>`;
}

// 配置 markdown-it 实例
const marked = new MarkdownIt({
  html: false,               // 允许 HTML 标签
  javascript: false,
  linkify: true,            // 将 URL 自动转换为链接
  typographer: true,        // 使用引号替换等
  highlight: (code, language) => {
    // 判断是否是HTML或JavaScript标签，如果是，直接返回原始内容
    if (language === 'html' || language.includes("css")||language.includes("javascript")||language.includes("vue")) {
      let codeDis = escapeHtml(code)
      return renderCodeBlock(codeDis, codeDis, language);
    }
    let codeHtml = language && hljs.getLanguage(language)
        ? hljs.highlight(code, {language}).value
        : hljs.highlightAuto(code).value;
    // 判断是否是HTML或JavaScript标签，如果是，直接返回原始内容
    return renderCodeBlock(code, codeHtml, language);
  }

});

// 转义 HTML 内容，避免被渲染为真实 DOM
function escapeHtml(html) {
  return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}

// 直接返回 highlight 函数生成的 HTML，避免 MarkdownIt 额外包裹 <code>
marked.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const language = token.info.trim();
  return marked.options.highlight(token.content, language);
};

function countAndConcat(str, substr) {
  // 使用正则表达式的全局匹配来查找子字符串
  const matches = str.match(new RegExp(substr, 'g'));

  // 判断子字符串的个数是奇数还是偶数
  const count = matches ? matches.length : 0;
  const isOdd = count % 2 === 1;
  // 根据判断结果返回相应的字符串
  return isOdd ? str + "\n" + substr : str;
}
// 使用 computed 来包裹 mdToHtml
const mdHtml = computed(() => {
  return mdToHtml(props.speeches); // 调用 mdToHtml 方法
});
function mdToHtml(md) {
  if (md === "") {
    return "<p></p>"
  }
  return marked.render(md);
}
</script>

<template>
  <div
      class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
    <div class="w-[30px] flex flex-col relative items-end">
      <div
          class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center"
          style="background-color: rgb(16, 163, 127);">
        <div class="button-container">
          <button class="brutalist-button openai">
            <span class="openai-logo">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="openai-icon"
              >
                <path
                    fill="#10A37F"
                    d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                ></path>
              </svg>
            </span>
            <span class="button-text">
              <span>Powered By</span>
              <span>{{props.modelVersion}}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div
        class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
      <div class="flex flex-grow flex-col gap-3">
        <div class="min-h-[20px] flex flex-col items-start gap-4">
          <div v-html="mdToHtml(props.speeches)"
               :class="{ 'result-streaming': props.loading }"
               class="markdown prose w-full break-words dark:prose-invert light">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
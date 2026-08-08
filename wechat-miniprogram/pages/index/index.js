// pages/index/index.js
Page({
  data: {
    // 嵌入的在线 AuraTranslate 地址
    webUrl: 'https://khssdsg-maker.github.io/aura-translate/?v=5.0'
  },
  onLoad: function (options) {
    console.log("加载 AuraTranslate 网页中:", this.data.webUrl);
  }
});

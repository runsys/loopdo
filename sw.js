// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

chrome.action.onClicked.addListener(openDemoTab);

function openDemoTab() {
  chrome.tabs.create({ url: 'index.html' });
}

chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  if (url !== 'https://example.com/#inject-programmatic') return;
  const { options } = await chrome.storage.local.get('options');
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['content-script.js'],
    ...options
  });
});

chrome.runtime.onMessage.addListener(async ({ name, options }) => {
  if (name === 'inject-programmatic') {
    await chrome.storage.local.set({ options });
    await chrome.tabs.create({
      url: 'https://example.com/#inject-programmatic'
    });
  }
});

// 扩展安装时执行
chrome.runtime.onInstalled.addListener(() => {
  console.log('loopdo扩展已安装');
});

// 打开/激活扩展时执行
chrome.runtime.onStartup.addListener(() => {
  console.log('loopdo扩展,浏览器启动，后台运行');
});

// 接收来自 content script / popup 的消息
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('loopdo扩展, 收到消息：', msg);
  sendResponse({ reply: '后台已收到' });
});



chrome.storage.local.get('downloaddata', function (di) {
	if(di.downloaddata){
		alert(di.downloaddata);
	}
})





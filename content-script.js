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

//alert('Hello World!');

chrome.storage.local.get('indexval', function (items) {
	// To avoid checking items.css we could specify storage.get({css: ''}) to
	// return a default value of '' if there is no css value yet.
	if (items.indexval) {
		console.log(items.indexval);
	}
});


  
  
/*
//1.先要存储要处理链接列表,链接列表手动加在sw.js代码后面
chrome.storage.local.set({urls:[1,'https://pkg.go.dev/google.golang.org/api/compute',
			'https://pkg.go.dev/vimagination.zapto.org/gopherjs/tabs',
			'https://pkg.go.dev/gocloud.dev/mysql/awsmysql']});			
		}
    }
  });
*/

//加载页面完成后自动运行的抓取与加载下一个链接脚本
//2.在网页抓取数据脚本代码  
var as=document.getElementsByTagName('a');
console.log(as.length);
for(a in as){
	console.log(a);
	console.log(as[a].href);
	console.log(/github.com/.test(as[a].href));
	if(as[a].getAttribute('rel')=='noopener'){
		var foundurl=/^https:\/\/[a-zA-Z_0-9-.]+\/[a-zA-Z_0-9-]+\/[a-zA-Z_0-9-]+/.exec(as[a].href);
		if(foundurl==null){
			foundurl=/^https:\/\/[a-zA-Z_0-9-.]+\/[a-zA-Z_0-9-]+/.exec(as[a].href);
		}
		if(foundurl!=null){
			alert(foundurl);
			var bset=false;
			//获取旧的downloaddata抓取数据
			chrome.storage.local.get('downloaddata', function (di) {
				if(di.downloaddata){
					chrome.storage.local.set({downloaddata:di.downloaddata+document.location.href+"\t"+foundurl+"\n"});
					bset=true;
				}
			})
			if(bset==false){
				//没有旧的downloaddata抓取数据就新保存一个
				chrome.storage.local.set({downloaddata:document.location.href+"\t"+foundurl+"\n"});
			}
			break;
		}
	}
	if(/https:\/\/github.com\/[a-zA-Z_0-9-]+\/[a-zA-Z_0-9-]+$/.test(as[a].href)){
		console.log(as[a].ref);
		alert(as[a].href);
		var bset=false;
		//获取旧的downloaddata抓取数据
		chrome.storage.local.get('downloaddata', function (di) {
			if(di.downloaddata){
				chrome.storage.local.set({downloaddata:di.downloaddata+document.location.href+"\t"+as[a].href+"\n"});
				bset=true;
			}
		})
		if(bset==false){
			//没有旧的downloaddata抓取数据就新保存一个
			chrome.storage.local.set({downloaddata:document.location.href+"\t"+foundurl+"\n"});
		}
		break;
	}
}
//3.抓取数据后加载下一个链接
chrome.storage.local.get('urls', function (items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.urls) {
		console.log(items.urls[0]);
		console.log(items.urls[0]+1);
		var url=items.urls[items.urls[0]];
		console.log(url);
		if(items.urls[0]<items.urls.length){
			console.log(url);
			items.urls[0]=items.urls[0]+1;
			chrome.storage.local.set({urls:items.urls});
			document.location.href=url;
		}
    }
  });

//4.编写设置好上面3点后, 在浏览器打开开发者模式, 加载此扩展目录, 点击扩展图标, 点击注册脚本就开始运行










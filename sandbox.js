// 接收消息
window.addEventListener('message', async function (event) {
	const message = event.data
	let result = ''
	if (message) {
		switch (message.command) {
			// 根据所收到消息的 command 值决定执行流程
			case 'eval':
				try {
					result = eval(message.expression)
				} catch (error) {
					event.source?.postMessage({ error, command: message.command }, event.origin)
					return;
				}
			break
		}
	}
	// 传回消息给消息发起方
	event.source?.postMessage({ result, command: message.command }, event.origin)
});


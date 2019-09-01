const description = new Map([
		['overcast clouds', 'Пасмурно'],
		['light rain', 'Легкий Дождь'],
		['scattered clouds', 'Рассеянные облака'],
		['few clouds', 'Малооблачно'],
		['clear sky', 'Чистое Небо'],
		['broken clouds', 'Облачно' ]
])

arr = ['overcast clouds',
'light rain',
'scattered clouds',
'few clouds',
'clear sky',
'broken clouds',
]

for (let key in arr) {
	if (description.has(arr[key])){
		let x = description.get(arr[key])
		console.log(x)
	}
}
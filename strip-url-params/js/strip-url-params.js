function clean (e) {
	const result = document.getElementById('result')
	const resultContainer = document.getElementById('resultContainer')

	document.getElementById('copyLabel').innerText = ''

	const urlNoParams = /^(https?:\/\/.*?)\?/

	const matches = urlNoParams.exec(e.target.value)

	result.innerText = matches ? matches[1] : e.target.value

	resultContainer.style.display = result.innerText.length
		? 'block'
		: 'none'
}

function copyOutput () {
	navigator.clipboard.writeText(
		document.getElementById('result').innerText
	)

	document.getElementById('copyLabel').innerHTML = '<p>Copied!</p>'
}

// --------------------------------------------------------------------------

document.getElementById('url').value = ''
document.getElementById('url').addEventListener('input', clean)
document.getElementById('copyButton').addEventListener('click', copyOutput)

if ('serviceWorker' in navigator)
	navigator.serviceWorker.register('service-worker.js', {
		scope: '.',
	})
		.then(registration => {})
		.catch(error => {
			console.log(
				"Couldn't register service worker: ",
				error
			)
		})

function getParam (param) {
	const parsedUrl = new URL(window.location)

	return parsedUrl.searchParams.get(param)
}

window.addEventListener('DOMContentLoaded', () => {
	const sharedUrl = getParam('url') || getParam('link') || getParam('text')

	if (sharedUrl)
		document.getElementById('url').value = sharedUrl
})


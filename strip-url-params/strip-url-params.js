const e = el => document.getElementById(el)

function clean (rawText) {
	const resultBox = e('result')
	const resultContainer = e('resultContainer')

	e('copyLabel').innerText = ''

	const urlNoParams = /^.*?(https?:\/\/.*?)\?/

	const matches = urlNoParams.exec(rawText)

	let result = matches ? matches[1] : rawText

	if (result.match(/\.amazon./)) result = result.replace(/\/ref=.*?$/, '')

	resultBox.innerText = result

	resultContainer.style.display = resultBox.innerText.length
		? 'block'
		: 'none'
}

function copyOutput () {
	navigator.clipboard.writeText(e('result').innerText)

	e('copyLabel').innerHTML = '<p>Copied!</p>'
}

function getParam (param) {
	const parsedUrl = new URL(window.location)

	return parsedUrl.searchParams.get(param)
}

window.addEventListener('DOMContentLoaded', () => {
	const sharedUrl = getParam('url') || getParam('link') || getParam('text')

	if (sharedUrl) {
		e('url').value = sharedUrl
		clean(sharedUrl)
	}
})

// --------------------------------------------------------------------------

e('url').value = ''
e('url').addEventListener('input', e => clean(e.target.value))
e('copyButton').addEventListener('click', copyOutput)

if ('serviceWorker' in navigator)
	navigator.serviceWorker.register('service-worker.js', { scope: '.' })

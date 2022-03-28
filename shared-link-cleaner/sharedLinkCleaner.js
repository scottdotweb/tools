const e = el => document.getElementById(el)
const urlBox = e('url')

const sampleUrl = 'https://example.com/post/whatever?tracking-id=abcdef123456'

// TODO: Handle bad input
function clean (rawText) {
	const resultBox = e('result')
	const resultContainer = e('resultContainer')

	e('copyNotification').innerText = ''

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

	e('copyNotification').innerHTML = 'Copied!'
}

function getParam (param) {
	const parsedUrl = new URL(window.location)

	return parsedUrl.searchParams.get(param)
}

window.addEventListener('DOMContentLoaded', () => {
	const sharedUrl = getParam('url') || getParam('link') || getParam('text')

	if (sharedUrl) {
		urlBox.value = sharedUrl
		clean(sharedUrl)
	}
})

// --------------------------------------------------------------------------

urlBox.innerText = sampleUrl
urlBox.addEventListener('click', e => {
	if (e.target.innerHTML === sampleUrl) e.target.innerHTML = ''
})
urlBox.addEventListener('input', e => clean(e.target.value))
e('result').addEventListener('click', copyOutput)

if ('serviceWorker' in navigator)
	navigator.serviceWorker.register('serviceWorker.js', { scope: '.' })

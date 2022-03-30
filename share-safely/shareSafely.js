const q = selector => document.querySelector(selector)

const urlBox = q('#url')
const resultContainer = q('#resultContainer')
const resultBox = q('#result')
const copyNotification = q('#copyNotification')
const shareContainer = q('#shareContainer')

const SAMPLE_URL = 'https://example.com/post/whatever?si=abcdef123456'

function prepUrlBoxIfNecessary () {
	if (urlBox.value === SAMPLE_URL) prepUrlBox()
}

function prepUrlBox () {
	urlBox.value = ''
	urlBox.style.color = '#000'
}

function resetUrlBox () {
	urlBox.style.color = '#696969'
	urlBox.value = SAMPLE_URL
}

function handleInput () {
	if (urlBox.value === '') {
		hideResultBox()
		return
	}

	clean(urlBox.value)
}

function hideResultBox () {
	resultContainer.style.display = 'none'
	shareContainer.display = 'none'
}

// TODO: Handle bad input
function clean (rawText) {
	if (urlBox.value === SAMPLE_URL) {
		hideResultBox()
		return
	}

	copyNotification.innerText = ''

	const urlNoParams = /^.*?(https?:\/\/.*?)\?/

	const matches = urlNoParams.exec(rawText)

	let result = matches ? matches[1] : rawText

	// Special cases
	if (result.match(/\.amazon./)) result = result.replace(/\/ref=.*?$/, '')

	resultBox.innerText = result

	resultContainer.style.display = 'block'

	if (window.navigator.canShare) {
		shareContainer.style.display = 'flex'
		q('#shareButton').addEventListener('click', share)
	}
}

function copyOutput () {
	navigator.clipboard.writeText(resultBox.innerText)

	copyNotification.innerHTML = 'Copied!'
}

async function share () {
	try {
		await navigator.share(
			{
				title: undefined,
				text:  undefined,
				url:   resultBox.innerText,
			}
		)
	} catch (err) {
		console.error(`Couldn't share: ${err}`)
	}
}

// ---------------------------------------------------------------------------

urlBox.innerText = SAMPLE_URL

q('body').addEventListener('click', event => {
	if (!event.target.closest('#url') && urlBox.value === '') resetUrlBox()
})

urlBox.addEventListener('click', prepUrlBoxIfNecessary)
urlBox.addEventListener('beforeinput', prepUrlBoxIfNecessary)
urlBox.addEventListener('input', handleInput)

resultBox.addEventListener('click', copyOutput)

window.addEventListener('DOMContentLoaded', () => {
	const getParam = param => new URL(window.location).searchParams.get(param)

	const sharedUrl = getParam('url') || getParam('link') || getParam('text')

	if (!sharedUrl) return

	urlBox.value = sharedUrl
	clean(sharedUrl)
})

if ('serviceWorker' in navigator)
	navigator.serviceWorker.register('serviceWorker.js', { scope: '.' })

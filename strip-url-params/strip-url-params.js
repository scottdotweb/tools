function clean (e) {
	const result = document.getElementById('result')
	const copyButton = document.getElementById('copyButton')

	document.getElementById('copyLabel').innerText = ''

	const urlNoParams = /^(https?:\/\/.*?)\?/

	const matches = urlNoParams.exec(e.target.value)

	result.innerText = matches ? matches[1] : e.target.value

	copyButton.style.display = result.innerText.length
		? 'inline'
		: 'none'
}

function copyOutput () {
	navigator.clipboard.writeText(
		document.getElementById('result').innerText
	)

	document.getElementById('copyLabel').innerText = 'Copied.'
}

document.getElementById('url').value = ''
document.getElementById('url').addEventListener('input', clean)
document.getElementById('copyButton').addEventListener('click', copyOutput)

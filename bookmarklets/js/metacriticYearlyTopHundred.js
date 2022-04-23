function updateSeenCount (e) {
	if (e.target.checked)
		seenCount++
	else
		seenCount--

	setH1()
}

function setH1 () {
	const title = document.createElement('span')
	title.innerHTML = pageTitle
	const count = document.createElement('span')
	count.setAttribute('class', 'seenCount')
	count.innerHTML = ` (seen: ${seenCount})`
	h1.innerHTML = ''
	h1.appendChild(title)
	h1.appendChild(count)
}

const junk = [
	'meta', 'link', 'script', 'style', 'iframe',
]

for (const junkSelector of junk)
	document.querySelectorAll(junkSelector).forEach(
		junkItem => junkItem.remove()
	)

document.body.removeAttribute('class')

const style = document.createElement('link')
style.setAttribute('rel', 'stylesheet')
style.setAttribute('href', 'https://scottdotjs.github.io/tools/bookmarklets/styles/metacriticYearlyTopHundred.css')

document.head.appendChild(style)

let seenCount = 0

const year = document.querySelector('.year button').innerText

const pageTitle = `Metacritic&rsquo;s top 100 films for ${year}`

document.head.querySelector('title').innerHTML = pageTitle

const table = document.createElement('table')

let count = 0

for (const input of document.querySelectorAll('.clamp-list tr:not([class=spacer])')) {
	count++

	let title = input.querySelector('a.title').innerText
	title = title.replaceAll('\'', '&rsquo;')

	const score = input.querySelector('div.metascore_w').innerText
	const imgSrc = input.querySelector('.clamp-image-wrap img').src

	const tr = document.createElement('tr')

	const imageCell = document.createElement('td')
	const image = document.createElement('img')
	image.setAttribute('src', imgSrc)
	imageCell.appendChild(image)

	const countCell = document.createElement('td')
	countCell.setAttribute('class', 'count')
	countCell.innerText = count

	const titleCell = document.createElement('td')
	titleCell.setAttribute('class', 'title')
	titleCell.innerHTML = title

	const scoreCell = document.createElement('td')
	const scoreBox = document.createElement('div')
	scoreBox.innerText = score

	scoreBox.classList.add('score')
	const scoreGroup = score >= 70
		? 'high'
		: score >= 50
			? 'medium'
			: 'low'
	scoreBox.classList.add(scoreGroup)
	scoreCell.appendChild(scoreBox)

	const seenCell = document.createElement('td')
	const seenBox = document.createElement('div')
	seenBox.setAttribute('class', 'seenBox')

	const checkboxId = `film${count}`
	const checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.setAttribute('id', checkboxId)
	checkbox.addEventListener('change', updateSeenCount)

	const label = document.createElement('label')
	label.setAttribute('for', checkboxId)

	seenCell.appendChild(seenBox)
	seenBox.appendChild(checkbox)
	seenBox.appendChild(label)

	tr.appendChild(imageCell)
	tr.appendChild(countCell)
	tr.appendChild(titleCell)
	tr.appendChild(scoreCell)
	tr.appendChild(seenCell)

	table.appendChild(tr)
}

document.body.innerHTML = ''

const main = document.createElement('main')

const h1 = document.createElement('h1')
setH1(0)

main.appendChild(h1)
main.appendChild(table)
document.body.appendChild(main)

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

const year = document.querySelector('.year button').innerText

const pageTitle = `Metacritic users' top 100 films for ${year}`

const h1 = document.createElement('h1')
h1.innerText = pageTitle
document.head.querySelector('title').innerText = pageTitle

const table = document.createElement('table')

let count = 0

for (const input of document.querySelectorAll('.clamp-list tr:not([class=spacer])')) {
	count++

	const title = input.querySelector('a.title').innerText
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
	titleCell.innerText = title

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
main.appendChild(h1)
main.appendChild(table)
document.body.appendChild(main)

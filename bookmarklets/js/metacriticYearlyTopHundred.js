const el = e => document.createElement(e)

function pageTitle () {
	return `Metacritic&rsquo;s top films for ${year}`
}

function updateSeenCount (e) {
	if (e.target.checked)
		filmsSeen++
	else
		filmsSeen--

	setHeading()
}

function setHeading () {
	const titleSpan = el('span')
	titleSpan.innerHTML = pageTitle()
	const countSpan = el('span')
	countSpan.setAttribute('class', 'filmsSeen')
	countSpan.innerHTML = ` (seen: ${filmsSeen}/${filmCount})`

	h1.innerHTML = ''
	h1.appendChild(titleSpan)
	h1.appendChild(countSpan)
}

function cleanAndRestylePage () {
	document.body.innerHTML = ''

	const junk = [
		'meta', 'link', 'script', 'style', 'iframe',
	]

	for (const junkSelector of junk)
		document.querySelectorAll(junkSelector).forEach(
			junkItem => junkItem.remove()
		)

	document.body.removeAttribute('class')

	const style = el('link')
	style.setAttribute('rel', 'stylesheet')
	style.setAttribute('href', 'https://scottdotjs.github.io/tools/bookmarklets/styles/metacriticYearlyTopHundred.css')

	document.head.appendChild(style)
}

const year = document.querySelector('.year button').innerText

const table = el('table')

let filmCount = 0
let filmsSeen = 0

const URL_ROOT = 'https://www.metacritic.com/browse/movies/score/metascore/year/filtered?view=detailed&year_selected='

const navRow = el('tr')
const navCell = el('td')
navCell.setAttribute('colspan', 5)
navCell.classList.add('yearNavigation')

const navContainer = el('div')
navCell.appendChild(navContainer)

const prevYear = year - 1
const nextYear = Number(year) + 1

const prevYearLink = el('a')
prevYearLink.setAttribute('href', `${URL_ROOT}${prevYear}`)
prevYearLink.innerHTML = `&larr; ${prevYear}`
navContainer.appendChild(prevYearLink)

const nextYearLink = el('a')
nextYearLink.setAttribute('href', `${URL_ROOT}${nextYear}`)
nextYearLink.innerHTML = `${nextYear} &rarr;`
navContainer.appendChild(nextYearLink)

navRow.appendChild(navCell)
table.appendChild(navRow)

for (const input of document.querySelectorAll('.clamp-list tr:not([class=spacer])')) {
	filmCount++

	const imgSrc = input.querySelector('.clamp-image-wrap img').src

	const tr = el('tr')

	const imageCell = el('td')
	const image = el('img')
	image.setAttribute('src', imgSrc)
	imageCell.appendChild(image)

	const countCell = el('td')
	countCell.setAttribute('class', 'count')
	countCell.innerText = filmCount

	const title = input.querySelector('a.title').innerText.replaceAll('\'', '&rsquo;')

	const titleHref = input.querySelector('a.title').getAttribute('href')

	const titleCell = el('td')
	titleCell.setAttribute('class', 'title')
	const titleLink = el('a')
	titleLink.setAttribute('href', titleHref)
	titleLink.innerHTML = title
	titleCell.appendChild(titleLink)

	const scoreCell = el('td')
	const scoreBox = el('div')

	const score = input.querySelector('div.metascore_w').innerText
	scoreBox.innerText = score

	scoreBox.classList.add('score')
	const scoreGroup = score >= 70
		? 'high'
		: score >= 50
			? 'medium'
			: 'low'
	scoreBox.classList.add(scoreGroup)
	scoreCell.appendChild(scoreBox)

	const seenCell = el('td')
	const seenBox = el('div')
	seenBox.setAttribute('class', 'seenBox')

	const checkboxId = `film${filmCount}`
	const checkbox = el('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.setAttribute('id', checkboxId)
	checkbox.addEventListener('change', updateSeenCount)

	const label = el('label')
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

cleanAndRestylePage()

document.head.querySelector('title').innerHTML = pageTitle()

const main = el('main')
const h1 = el('h1')

setHeading()

main.appendChild(h1)
main.appendChild(table)
document.body.appendChild(main)

// setTempStyle()

function setTempStyle () {
	const tempStyle = el('style')
	tempStyle.innerHTML =
	`
`
	document.head.appendChild(tempStyle)
}

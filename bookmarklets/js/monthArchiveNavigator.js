const monthsIndex = new Map();

[ ...Array(12).keys() ]
	.map(monthNum =>
		new Date(0, monthNum).toLocaleString('en', { month: 'short' })
	)
	.forEach((month, index) => {
		monthsIndex.set(month, index + 1)
		monthsIndex.set(index + 1, month)
	})

export function changeMonth (input, dir) {
	const incOrDec = val => dir === 'next' ? ++val : --val

	let [ , year, month ] = input.match(/(.{4})(.{3})/)

	let index = monthsIndex.get(month)

	if ((dir === 'prev' && index === 1) || (dir === 'next' && index === 12)) {
		index = index === 12 ? 1 : 12
		year = incOrDec(year)
	} else
		index = incOrDec(index)

	return `${year}${monthsIndex.get(index)}`
}

export function navigate (link, direction) {
	const oldUrl = link.getAttribute('href')
	const oldMonth = oldUrl.match(/(\d\d\d\d...)/)[0]
	const newUrl = oldUrl.replace(oldMonth, changeMonth(oldMonth, direction))
	link.setAttribute('href', newUrl)
	link.innerHTML = newUrl
}

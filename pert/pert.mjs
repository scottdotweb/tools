import chalk from 'chalk'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import fs from 'fs'

const PLAYLIST = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : 'playlist.json'

/*
	TODO
	- Make this a web app
	- Use Web Workers to fetch archive captures
		https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
	- (Eventually) Use YouTube Data API to get JSON for playlists
		https://developers.google.com/youtube/v3/docs
*/

for (const video of JSON.parse(fs.readFileSync(PLAYLIST, 'utf8'))) {
	const videoId = video.contentDetails.videoId
	const videoUrl = `https://youtube.com/watch?v=${videoId}`

	let videoTitle, rawDate, currentUrl

	if (
		video.snippet.title === 'Deleted video' ||
		video.snippet.title === 'Private video'
	) {
		const archivedUrl = await queryWaybackMachine(videoUrl)

		const html = await getSnapshot(archivedUrl)
		const $ = cheerio.load(html)

		if ($('#watch-headline-title'))
			videoTitle = $('#watch-headline-title').text().trim()
		else
			videoTitle = $('.watch-title').text().trim()

		videoTitle = '❌ ' + chalk.red(videoTitle)
		rawDate = new Date($('.watch-video-date').text().trim())
	} else {
		currentUrl = videoUrl
		videoTitle = video.snippet.title
		rawDate = new Date(video.contentDetails.videoPublishedAt)
	}

	console.info(`${chalk.bold(videoTitle)} (${
		new Intl.DateTimeFormat('en-GB').format(rawDate)
	})\n${currentUrl}\n`)
}

function queryWaybackMachine (videoUrl) {
	return fetch(`http://archive.org/wayback/available?url=${videoUrl}&timestamp=20050214`)
		.then(response => response.json())
		.then(data => {
			const archivedUrl = data.archived_snapshots?.closest?.url

			return archivedUrl ? archivedUrl : `${videoUrl} (not archived)`
		})
		.catch(error => {
			console.error('Error:', error)
		})
}

function getSnapshot (archivedUrl) {
	return fetch(archivedUrl)
		.then(response => response.text())
		.then(data => data)
		.catch(error => {
			console.error('Error:', error)
		})
}

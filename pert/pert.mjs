import fetch from 'node-fetch'
import fs from 'fs'

const PLAYLIST = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : 'playlist.json'

/*
	TODO
	- Make this a web app
	- Use Web Workers to fetch archive captures
		https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
	- Use Cheerio to get the video title from archive captures
		https://www.npmjs.com/package/cheerio
	- (Eventually) Use YouTube Data API to get JSON for playlists
		https://developers.google.com/youtube/v3/docs
*/

for (const video of JSON.parse(fs.readFileSync(PLAYLIST, 'utf8'))) {
	const isDeleted = video.snippet.title === 'Deleted video'
	const isPrivate = video.snippet.title === 'Private video'

	const unavailable = (isDeleted || isPrivate)

	let videoDate = 'unknown date'

	if (!unavailable) {
		const date = new Date(video.contentDetails.videoPublishedAt)

		videoDate = new Intl.DateTimeFormat('en-GB').format(date)
	}

	const videoId = video.contentDetails.videoId

	const videoUrl = `https://youtube.com/watch?v=${videoId}`

	const currentUrl = unavailable
		? await queryWaybackMachine(videoUrl)
		: videoUrl

	console.info(`${unavailable ? '❌ ' : ''}${video.snippet.title} (${videoDate})
${currentUrl}
`)
}

async function queryWaybackMachine (videoUrl) {
	return await fetch(`http://archive.org/wayback/available?url=${videoUrl}&timestamp=20050214`)
		.then(response => response.json())
		.then(data => {
			const archivedUrl = data.archived_snapshots?.closest?.url

			return archivedUrl ? archivedUrl : `${videoUrl} (not archived)`
		})
}

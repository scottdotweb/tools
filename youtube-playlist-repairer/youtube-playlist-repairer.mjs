import fetch from 'node-fetch'
import fs from 'fs'

const PLAYLIST = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : 'playlist.json'

// TODO: Make this into a web app

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

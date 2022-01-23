const CACHE_NAME = 'strip-url-params'

const CACHE_FILES = [
	'index.html',
	'styles.css',
	'strip-url-params.js',
]

const NETWORK_TIMEOUT = 5000

// Try to fetch files from the network before the cache. Based on:
// https://gist.github.com/JMPerez/8ca8d5ffcc0cc45a8b4e1c279efd8a94

function initializeCache (event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => cache.addAll(CACHE_FILES))
	)
}

function updateCache (request, response) {
	caches
		.open(CACHE_NAME)
		.then(cache =>
			fetch(request)
				.then(response => cache.put(request, response))
				.catch(error => console.warn(`Cache not updated: ${error}`))
		)
}

function fetchHandler (event) {
	const { request } = event
	let fetchError = false

	event.respondWith(
		fetchFromNetwork(request, NETWORK_TIMEOUT)
			.catch(() => {
				fetchError = true
				return fetchFromCache(request)
			})
	)

	if (!fetchError) event.waitUntil(updateCache(request))
}

function fetchFromNetwork (request) {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(reject, NETWORK_TIMEOUT)

		fetch(request)
			.then(
				response => {
					clearTimeout(timeoutId)
					resolve(response)
				}, reject
			)
	})
}

async function fetchFromCache (request) {
	let cache

	try {
		cache = await caches.open(CACHE_NAME)
	} catch (error) {
		throw new Error(error)
	}

	return await cache.match(request)
}

self.addEventListener('install', initializeCache)
self.addEventListener('fetch', fetchHandler)

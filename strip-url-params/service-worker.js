const CACHE_NAME = 'strip-url-params'

const CACHE_FILES = [
	'/index.html',
	'/css/strip-url-params.css',
	'/js/strip-url-params.js',
]

self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(CACHE_FILES)
			})
	)
})

self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request)
			.then(response => {
				return response || fetch(e.request)
			})
	)
})

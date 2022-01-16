const CACHE_NAME = 'strip-url-params'

const CACHE_FILES = [
	'index.html',
	'css/strip-url-params.css',
	'js/strip-url-params.js',
]

self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => cache.addAll(CACHE_FILES))
	)
})

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request)
			.then(response => (response || fetch(e.request)))
	)
})

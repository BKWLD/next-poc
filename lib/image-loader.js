export default function GeneralImageLoader({ src, width, quality }) {

  // Contentful images
	if (src.includes('ctfassets.net')) {
		return `${src}?w=${width}&q=${quality || 75}`
	}

  // Local fallback
  return src
}

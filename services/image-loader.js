export default function GeneralImageLoader({ src, width, quality }) {
	if (src.includes('ctfassets.net')) {
		return `${src}?w=${width}&q=${quality || 75}`
	}

}

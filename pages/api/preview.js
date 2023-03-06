import { execute } from '@/lib/contentful'

export default async function preview(req, res) {
  const { secret, id } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !id) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `id` exists
  const { entries: { items: [ entry ]} } = await execute({
    preview: true,
    variables: { id },
    query: `
      query entryById($id: String) {
        entries: entryCollection(
          limit: 1
          where: {
            sys: { id: $id }
          }
        ) {
          items {
            ...on Person { slug }
          }
        }
      }`
  })

  // If the id doesn't exist prevent preview mode from being enabled
  if (!entry) {
    return res.status(401).json({ message: 'Invalid id' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched entry
  console.log(entry)
  const url = `/people/${entry.slug}`
  res.redirect(url)
}

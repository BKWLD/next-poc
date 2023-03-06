// Execute a Contentful GQL query
export async function execute({ query, variables, preview = false }) {

  // Setup vars
  const spaceId = process.env.CONTENTFUL_SPACE_ID,
    endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    accessToken = preview ?
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN :
       process.env.CONTENTFUL_ACCESS_TOKEN

  // Run the query
	const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables })
  })

  // Return data
  const data = await response.json()
	return data.data
}

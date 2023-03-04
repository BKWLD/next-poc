import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ people }) {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Next POC</h1>

        {/* List of people */}
        <h2>People from previous Bukwild site</h2>
        <ul>
          { people.map(person => (
            <li key={ person.id }>
              <Link href={ person.url }>
                { person.name }
              </Link>
            </li>
          ))}
        </ul>

      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const people = await getPeople()
  return {
    props: { people },
  }
}

// Get all the people from Bukwild's old Contentful space
async function getPeople() {
  const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: `query {
      people: personCollection(order: name_ASC) {
        items {
          ...on Person {
            sys { id }
            name
            slug
          }
        }
      }
    }`})
  })
  const data = await response.json()
  return data.data.people.items
    .filter(person => !!person.name)
    .map(person => ({
      ...person,
      id: person.sys.id,
      url: `/people/${person.slug}`,
    }))
}

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { execute } from '@/lib/contentful'
import ToggleButton from '@/components/ToggleButton'
import logo from '@/assets/logo.png'

export default function Home({ people, preview }) {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>

        {/* Title */}
        <h1>
          Next POC
          { preview && <span> (preview mode)</span> }
        </h1>
        <Image src={logo} alt='Logo' priority unoptimized/>

        {/* Styling component */}
        <h2>Styling using Linaria</h2>
        <ToggleButton />

        {/* List of people */}
        <h2>People from previous Bukwild site</h2>
        <ul>
          { people.map(person => (
            <li key={ person.id }>
              <Link href={ person.url } style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}>

                {/* Person thumbnail */}
                { person.image && <div style={{
                    position: 'relative',
                    aspectRatio: person.image.width / person.image.height,
                    width: 24,
                    marginRight: 10,
                  }} >
                  <Image
                    src={ person.image.url }
                    fill
                    sizes='24px'
                    alt={ person.image.title } />
                </div>}

                {/* Person name */}
                { person.name }
              </Link>
            </li>
          ))}
        </ul>

      </main>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const people = await getPeople({ preview })
  return {
    props: { people, preview },
  }
}

// Get all the people from Bukwild's old Contentful space
export async function getPeople({ preview }) {
  const { people } = await execute({
    preview,
    variables: {
      preview: !!preview,
    },
    query: `
      query getPeople($preview: Boolean) {
        people: personCollection(
          preview: $preview
          order: name_ASC) {
          items {
            ...on Person {
              sys { id }
              name
              slug
              image {
                ...on Asset {
                  title
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    `})
  return people.items
    .filter(person => !!person.name)
    .map(person => ({
      ...person,
      id: person.sys.id,
      url: `/people/${person.slug}`,
    }))
}

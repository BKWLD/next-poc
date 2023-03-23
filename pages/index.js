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
      <main className='px-4 py-4 space-y-4'>

        {/* Title */}
        <h1 className='text-4xl font-bold'>
          Next POC
          { preview && <span> (preview mode)</span> }
        </h1>
        <Image src={logo} alt='Logo' priority unoptimized/>

        {/* Styling component */}
        <Subhead>Styling using Linaria</Subhead>
        <ToggleButton />

        {/* List of people */}
        <Subhead>People from previous Bukwild site</Subhead>
        <ul className='list-disc list-inside'>
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

// Dry up h2 styling
function Subhead({ children }) {
  return (
    <h2 className='text-2xl mt-8 font-bold'>
      { children }
    </h2>
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

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getPeople } from '@/pages/index'
import { execute } from '@/lib/contentful'

export default function Person({ person, preview }) {
  return (
    <>
      <Head>
        <title>{ person.name }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>

        {/* Name */}
        <h1>
          { person.name }
          { preview && <span> (preview mode)</span> }
        </h1>
        <p><Link href='/'>Back</Link></p>

        {/* Image */}
        { person.image && <div style={{
            position: 'relative',
            aspectRatio: person.image.width / person.image.height,
          }} >
          <Image
            src={ person.image.url }
            fill
            priority
            alt={ person.image.title } />
        </div>}
      </main>
    </>
  )
}

export async function getStaticPaths({ preview }) {
  const people = await getPeople({ preview })
  return {
    paths: people
      .filter(person => person.slug == 'robert-reinhard')
      .map(person => ({ params: { personSlug: person.slug }})),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, preview = false }) {
  const { people } = await execute({
    preview,
    variables: {
      slug: params.personSlug,
      preview: !!preview,
    },
    query: `
      query getPerson ($slug: String, $preview: Boolean) {
        people: personCollection(
          preview: $preview
          limit: 1
          where: { slug: $slug }
        ) {
          items {
            ...on Person {
              sys { id }
              name
              slug
              image {
                ...on Asset {
                  sys { id }
                  title
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }`
  })
  return {
    props: {
      person: people.items[0],
      preview,
    }
  }
}

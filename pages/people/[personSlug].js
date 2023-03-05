import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getPeople } from '@/pages/index'
import { execute } from '@/services/contentful'

export default function Home({ person }) {
  return (
    <>
      <Head>
        <title>{ person.name }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>

        {/* Name */}
        <h1>{ person.name }</h1>
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

export async function getStaticPaths() {
  const people = await getPeople()
  return {
    paths: people
      .filter(person => person.slug == 'robert-reinhard')
      .map(person => ({ params: { personSlug: person.slug }})),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { people } = await execute({
    query: `
      query getPerson ($slug: String) {
        people: personCollection(
          limit: 1,
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
      }`,
    variables: { slug: params.personSlug }
  })
  return {
    props: { person: people.items[0] }
  }
}

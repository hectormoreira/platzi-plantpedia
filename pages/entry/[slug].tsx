import { getPlant, getPlantList, getCategoryList } from '@api'
import React from 'react';
import { Layout } from '@components/Layout';
import { Grid } from '@ui/Grid';
import { Typography } from '@ui/Typography';
import { RichText } from '@components/RichText';
import { AuthorCard } from '@components/AuthorCard';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PlantEntryInline } from '@components/PlantCollection';
import Link from 'next/link'


type PathType = {
    params: {
        slug: string
    }
}

export const getStaticPaths = async () => {
    const entries = await getPlantList({ limit: 10 })
    const paths: PathType[] = entries.map((plant) => ({
        params: {
            slug: plant.slug
        }
    }))

    return {
        paths,
        // 404 en las entradas no encontradas
        fallback: "blocking"
    }
}

// Paginas vamos a ejecutar
type PlantEntryProps = {
    plant: Plant | null
    otherEntries: Plant[] | null
    categories: Category[] | null
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({ params }) => {
    const slug = params?.slug
    if (typeof slug !== "string") {
        return {
            notFound: true
        }
    }

    try {
        const plant = await getPlant(slug)

        // Sidebar
        const otherEntries = await getPlantList({
            limit: 5
        })
        const categories = await getCategoryList({
            limit: 5
        })

        return {
            props: {
                plant,
                otherEntries,
                categories
            },
            revalidate: 5 * 60 // refresh every 5min
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default function PlantEntryPage({ plant, otherEntries, categories }: InferGetStaticPropsType<typeof getStaticProps>) {

    if (plant == null) {
        return (
            <Layout>
                <main className="pt-16 text-center">404, My friend</main>
            </Layout>
        )
    }

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        <img src={plant.image.url} alt={plant.image.title} width={952} />
                    </figure>
                    <div className="px-12 pt-8">
                        <Typography variant="h2">{plant.plantName}</Typography>
                    </div>
                    <div className="p-10">
                        <RichText richText={plant.description} />
                    </div>

                </Grid>
                <Grid item xs={12} md={4} lg={3} component="aside">
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Recent post
                        </Typography>
                        {otherEntries?.map((plantEntry) => (
                            <article className="mb-4" key={plantEntry.id}>
                                <PlantEntryInline {...plantEntry} />
                            </article>
                        ))}
                    </section>
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Categories
                        </Typography>
                        <ul className='list'>
                            {categories?.map((category) => (
                                <li key={category.id}>
                                    <Link passHref href={`/category/${category.slug}`}>
                                        <Typography component="a" variant='h6'>
                                            {category.title}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </Grid>
            </Grid>
            <section className='my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7'>
                <AuthorCard {...plant.author} />
            </section>
        </Layout>
    );
};
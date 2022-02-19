import { Grid } from '@ui/Grid'
import { Button } from '@ui/Button'
import { Typography } from '@ui/Typography'
import { Layout } from '@components/Layout'
import { useEffect, useState } from 'react'
import { getPlantList } from '@api';
import { PlantCollection } from '@components/PlantCollection'

export default function Home() {
    const [data, setData] = useState<Plant[]>([])
    useEffect(() => {
        getPlantList({ limit: 10 })
            .then(receiveData => setData(receiveData))
    }, [])

    return (
        <Layout>
            <PlantCollection
                plants={data}
                variant="square"
            />
        </Layout>
    )
}


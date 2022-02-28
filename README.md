# [Curso de Next.js: Sitios Estáticos y Jamstack en Platzi](https://platzi.com/cursos/nextjs-jamstack/)
Notas y Repo del curso

[Live Demo - Vercel](https://hm-platzi-plantpedia.vercel.app/)

## Modos de rendering en Next.js
> Procesamiento de fragmentos de código y datos para mostrar un resultado. Por ejemplo de JS a HTML.
- **Client-side:** El rendering sucede en el navegador de cada uno de los usuarios. Ejemplo, Create-react-app.
- **Server-side:** En este caso tenemos un servidor (Backend) que se encarga de forma parcial o total de hacer el rendering. Ejemplos con python(Django), PHP, etc.
- **Static rendering:** El rendering se lleva a cabo el momento del Build Time (Cuando haces el Build de tu código). Este proceso solo sucede una vez a diferencia de los otros dos modos. Ejemplo de esto Next.js, Jekill, Hugo, Gatsby.
> **Next.js** te da la ventaja que te permite crear aplicaciones Híbridas, esto significa que podemos elegir uno o varios de los Rendering modes antes mencionados

## Arquitectura de la app
- La arquitectura está compuesta por la capa de datos que es de donde provienen nuestros datos los cuales pueden venir de un DB, internet, o archivos.
- Luego está la capa del generador estático que es el encargado de tomar los datos y que con ellos produzcamos con el rendering HTML Y CSS.

## CLI Contenful
```sh
npm install -g contentful-cli
contentful space import --config import/config.json
```
## GraphQL API y autogeneración de código
> Contentful ofrece graphiql
- `https://graphql.contentful.com/content/v1/spaces/%7BSPACE%7D/explore?access_token={CDA_TOKEN}`
- [Exploring graphiql](https://www.contentful.com/developers/docs/references/graphql/#/reference/exploring-the-schema-with-graphiql)

```graphql
{
  plantCollection (limit:10){
    total
    limit
    items{
      plantName
      author {
        fullName
      }
    }
  }
}
```
## Crear .env con secretos
- `NEXT_PUBLIC_SPACE_ID=`
- `NEXT_PUBLIC_ACCESS_TOKEN=`


## getStaticProps
> Nos funciona cuando requerimos que nuestra aplicacion sea SEO friendly. Dado que los SPA o client-side rendering no generan contenido, esta tecnica nos ayuda a que nuestro sitio en Next.js sea encontrado por Google. Solo funciona en páginas y se ejecuta en build time una vez

## 🚌 Trade-offs de SSG
- Al final, solo son archivos estáticos (HTML, CSS y JS): el deployment es el más fácil y puede hacer en cualquier servidor
  - Sin contar que no necesita muchos recursos,
  - No necesita mucho trabajo por parte del servidor
  - Podemos almacenar en un CDN para que sea superveloz
- El SEO y performance de carga serán de los mejores
- No todos los sitios se pueden generar de forma estática. Debido a que los datos debes obtenerlos en tiempo real y no estarán incrustados directamente en el HTML Ej.:
  - Páginas de usuario
  - Información personalizada
  - Dashboard
- El build time mientras más páginas se tenga más lento será el proceso

## Habilitando Incremental Static Generation - ISG
> Con ISSG puedes generar páginas bajo demanda, las cuales pueden estar generadas mediante dos estrategias de forma bloqueante y de la forma en que el usuario esta consiente del estado de carga. También puedes configurar una página de tal manera que cada cierto tiempo se actualice, esta técnica usa el enfoque state-while-revalidate, en la cual Next.js estará mirando que tiene que cambiar, actualizar y respondiendo con páginas guardadas en caché.
- Incremental Static Site Generation te permite poder crear nuevas páginas bajo demanda sin tener que volver a compilar la aplicacion otra vez
- Puedes generar un conjunto de páginas iniciales, y dejar otras por generar bajo demanda del usuario

```json
// pages/products/[id].js

export async function getStaticProps({ params }) {
  return {
    props: {
      product: await getProductFromDatabase(params.id),
    },
    revalidate: 60,
  };
}
```

## Estrategia `fallback`
- `fallback: false`: Muestra un 404
- `fallback: "blocking"`: Indica a next que cuando una página no se encuentre pre renderizada vaya al server a buscarla
- `fallback: true`: Da la oportunidad de mostrar estados de loading en el componente

## El enfoque stale-while-revalidate
Next se encarga de actualizar periodicamente el contenido de las paginas, el tiempo se configura con `revalidate`

## Trade-offs de ISG
**Ventajas**
- Flexibilidad de server-side rendering con las bondades de static generation.
- El build time no aumenta con el numero de paginas
- La revalidacion brinda mucha mas flexibilidad

**Desventajas**
- ISG(Incremental static generation) requiere un servidor con node.js
- No podemos ajustar tiempos de revalidacion ante un enlace que se vuelva viral
- No es apto para todas las paginas. Ej. páginas de usuario o información personalizada o dashboard en tiempo real
- ISG(Incremental static generation) no es un problema en sitios con pocas paginas, para un sitio de pocas páginas podrias usar Static Generation

## Otras alternativas: comparación entre SSG y SSR
**Next.js SSR / Ventajas**
- La información siempre estará actualizada
- Poder modificar la respuesta con base en la petición puede ser muy conveniente

**Next.js SSR / Ventajas**
- Golpea el servidor por cada petición y puede ser costoso. (consume recursos y consume dinero)

**Next.js Export**
- Puede exportar un renderizado HTML,CSS y JavaScript, por lo tanto no hay backend y puedes subir a servidores de archivos estáticos, como GitHub Pages.
- Next.js Export no tiene los beneficios de SSR, ISG, Revalidación, rutas, internalización y optimización de imágenes.




### Enlaces y lecturas recomendadas
- [Modern Web Development on the Jamstack - Netlify](https://www.netlify.com/oreilly-jamstack/)
- [What is Jamstack?](https://jamstack.org/what-is-jamstack/)
- [Contentful](https://www.contentful.com/)
- [Learn GraphQl - Contentful](https://www.contentful.com/developers/videos/learn-graphql/#exploring-graphql-endpoints-using-graphiql)
- [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)
- [A Complete Guide To Incremental Static Regeneration (ISR) With Next.js](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/)

#
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create a `.env.local` file with your Contentful secrets:

```bash
cp .env.local.example .env.local
```

Create a new API Key in Contentful: "Your Space > Settings > API Keys", then replace `SPACE_ID` and `ACCESS_TOKEN` with your values.

Second, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## GraphQL type generation

```bash
SPACE_ID={SPACE_ID} ACCESS_TOKEN={ACCESS_TOKEN} yarn dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

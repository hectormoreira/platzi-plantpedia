# [Curso de Next.js: Sitios Estáticos y Jamstack en Platzi](https://platzi.com/cursos/nextjs-jamstack/)
Notas y Repo del curso

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



### Enlaces y lecturas recomendadas
- [Modern Web Development on the Jamstack - Netlify](https://www.netlify.com/oreilly-jamstack/)
- [What is Jamstack?](https://jamstack.org/what-is-jamstack/)
- [Contentful](https://www.contentful.com/)
- [Learn GraphQl - Contentful](https://www.contentful.com/developers/videos/learn-graphql/#exploring-graphql-endpoints-using-graphiql)

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

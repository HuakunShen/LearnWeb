# SEO
See [SEO](common/SearchEngine/SEO.md) for more general information.
## Status Code
### 200
[`HTTP 200 OK`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)

### 301/308
[`HTTP 301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
**Note:** [Next.js permanent redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) use 308 by default instead of 301 as it is the newer version and considered the better option.
```jsx
// pages/about.js
export async function getStaticProps(context) {
  return {
    redirect: {
      destination: '/',
      permanent: true // triggers 308
    }
  }
}
```
or
```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true // triggers 308
      }
    ]
  }
}
```
### 302
[`HTTP 302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)
The HyperText Transfer Protocol (HTTP) **`302 Found`** redirect status response code indicates that the resource requested has been temporarily moved to the URL given by the [`Location`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) header.

### 404
[`HTTP 404 Not Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
Resource not found.
```jsx
export async function getStaticProps(context) {
  return {
    notFound: true // triggers 404
  }
}
```
#### Custom 404 Page
```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

### 410
[`HTTP 410 Gone`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410)
Target resource is no longer available at the origin server and that this condition is likely to be permanent.
Used for content that are removed, e.g. threads deleted by user, blog post removed from site.

### 500
[`HTTP 500 Internal Server Error`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500)
Next.js will automatically return a `500` status code for an unexpected application error. You can [create a custom `500` error page](https://nextjs.org/docs/advanced-features/custom-error-page#500-page) that is statically generated at build time by creating `pages/500.js`.

```jsx
// pages/500.js
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
}
```

### 503
The [`HTTP 503 Service Unavailable`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) server error response code indicates that the server is not ready to handle the request.
Used when website is down and predicted that it will be down by an extended period of time. This prevents losing rankings on a long-term basis.

## robots.txt
See [robots.txt](robots.md).
`robots.txt` specifies which routes can be crawled and which are not.
In Next.js, add `robots.txt` to `public` folder.
```
// robots.txt
# Block all crawlers for /accounts
User-agent: *
Disallow: /accounts

# Allow all crawlers
User-agent: *
Allow: /
```
File available at `http://<host>:<port>/robots.txt`.

## Sitemaps
Read [Sitemaps](../../common/SearchEngine/Sitemaps.md).
![[Sitemaps]]
### Add sitemaps to Next.js
#### Manual
For a simple site, add `public/sitemap.xml`
```html
<!-- public/sitemap.xml -->
<xml version="1.0" encoding="UTF-8">
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 <url>
   <loc>http://www.example.com/foo</loc>
   <lastmod>2021-06-01</lastmod>
 </url>
</urlset>
</xml>
```

#### getServerSideProps
Generate dynamic sitemaps with `getServerSideProps`.
Make file `pages/sitemap.xml.js`.
```js
// pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts'

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL)
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
```

## Special Meta Tags for Search Engines
See [Special Meta Tags for Search Engines](../../common/SearchEngine/MetaTag.md).
![[MetaTag]]


### Sample Code
```jsx
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>Meta Tag Example</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <p>Here we show some meta tags off!</p>
    </div>
  )
}

export default IndexPage
```

## Canonical Tag
See [Canonical Tag](../../comon/SearchEngine/CanonicalTag.md).
![[CanonicalTag]]



## Reference
- https://nextjs.org/learn/seo/crawling-and-indexing/status-codes
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- https://nextjs.org/learn/seo/crawling-and-indexing/metatags
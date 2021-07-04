const fs = require('fs')
const globby = require('globby')

const urlSite = 'https://www.libidoss.com.br/'
const axios = require('axios')

const api = axios.create({
  baseURL: process.env.APIURL
})

async function generateSiteMap () {
  const responseCategoria = await api.get('/categorias')
  const categorias = responseCategoria.data

  const responseProdutos = await api.get('/produtos')
  const Produtos = responseProdutos.data

  const pages = await globby([
    './src/pages/**.tsx',
    '!./src/pages/_*.tsx',
    '!./src/pages/**/[id].tsx',
    '!./src/pages/api',
    '!./src/pages/404.tsx',
    '!./src/pages/carrinho.tsx',
    '!./src/pages/success.tsx',
    '!./src/pages/checkout.tsx'
  ])

  const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
    .map((page) => {
      const path = page.replace('.tsx', '').replace('./src/pages/', '')
      const route = path === '/index' ? '' : path
      return `
                      <url>
                          <loc>${`${urlSite}${route}`}</loc>
                      </url>
                  `
    })
    .join('')}
            ${categorias.map((categoria) => `
                <url>
                 <loc>${`${urlSite}categoria/${categoria.id}?categoria=${categoria.Nome}`}</loc>
                </url>
              `).join('')}
            ${Produtos.map((produto) => `
                <url>
                 <loc>${`${urlSite}produto/${produto.id}?produto=${produto.Nome}`}</loc>
                </url>
              `).join('')}
            
      </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()

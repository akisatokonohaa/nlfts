import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const readProjectFile = (path: string) => readFileSync(join(projectRoot, path), 'utf8')

function collectFiles(directory: string, extension: string): string[] {
  return readdirSync(join(projectRoot, directory), { withFileTypes: true }).flatMap((entry) => {
    const relativePath = join(directory, entry.name)
    if (entry.isDirectory()) return collectFiles(relativePath, extension)
    return entry.name.endsWith(extension) ? [relativePath] : []
  })
}

describe('SEO contract', () => {
  it('defines Indonesian document metadata and canonical defaults', () => {
    const config = readProjectFile('nuxt.config.ts')

    expect(config).toContain('htmlAttrs: { lang: \'id\' }')
    expect(config).toContain('viewport: \'width=device-width, initial-scale=1\'')
    expect(config).toContain('{ name: \'robots\', content: \'index, follow')
    expect(config).toContain('rel: \'canonical\'')
  })

  it('keeps structured data and canonical URLs on the application shell', () => {
    const app = readProjectFile('app/app.vue')

    expect(app).toContain('type: \'application/ld+json\'')
    expect(app).toContain('\'@type\': \'Organization\'')
    expect(app).toContain('\'@type\': \'WebSite\'')
    expect(app).toContain('https://nlfts.dev')
    expect(app).not.toContain('https://NLFTs.dev')
  })

  it('provides page-level SEO metadata for core routes', () => {
    for (const path of [
      'app/pages/index.vue',
      'app/pages/about.vue',
      'app/pages/faq.vue',
      'app/pages/members.vue',
      'app/pages/jasa/index.vue'
    ]) {
      const source = readProjectFile(path)
      expect(source, path).toContain('useSeoMeta(')
      expect(source, path).toMatch(/description:\s*['`]/)
    }
  })
})

describe('Performance contract', () => {
  it('keeps image optimization and static delivery enabled', () => {
    const config = readProjectFile('nuxt.config.ts')

    expect(config).toMatch(/quality:\s*8[0-9]/)
    expect(config).toContain('format: [\'webp\', \'avif\']')
    expect(config).toContain('\'/**\': {')
    expect(config).toContain('prerender: true')
    expect(config).toContain('provider: \'ipx\'')
  })

  it('uses non-blocking font loading', () => {
    const app = readProjectFile('app/app.vue')

    expect(app).toContain('media: \'print\'')
    expect(app).toContain('this.media=\'all\'')
    expect(app).toContain('rel: \'preconnect\'')
  })
})

describe('TypeScript and project hygiene', () => {
  it('keeps the project typed and exposes validation scripts', () => {
    const packageJson = JSON.parse(readProjectFile('package.json')) as {
      type: string
      scripts: Record<string, string>
    }

    expect(packageJson.type).toBe('module')
    expect(packageJson.scripts.typecheck).toBeTruthy()
    expect(packageJson.scripts.lint).toBeTruthy()
    expect(packageJson.scripts.test).toContain('vitest')
    expect(collectFiles('app', '.ts').length).toBeGreaterThan(0)
    expect(collectFiles('server', '.ts').length).toBeGreaterThan(0)
  })

  it('does not ship fake metadata, hidden tool signatures, or dead anchors', () => {
    const sourceFiles = [...collectFiles('app', '.vue'), ...collectFiles('app', '.ts'), ...collectFiles('server', '.ts')]
    const source = sourceFiles.map(path => readProjectFile(path)).join('\n')

    expect(source).not.toMatch(/TRAPSTACK|WordPress 6\.4\.3|verification-fake/i)
    expect(source).not.toContain('href="#"')
  })
})

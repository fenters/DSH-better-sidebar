import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const reactIconsRoot = dirname(dirname(require.resolve('react-icons/lib')))

const siFile = readFileSync(join(reactIconsRoot, 'si', 'index.mjs'), 'utf8')
const vscFile = readFileSync(join(reactIconsRoot, 'vsc', 'index.mjs'), 'utf8')

/** Extract the GenIcon JSON argument for one icon name from a .mjs file. */
function extractIconData(mjsContent, iconName) {
  const re = new RegExp(`export function ${iconName} \\(props\\) \\{\\s*return GenIcon\\((.+?)\\)\\(props\\);`, 's')
  const m = mjsContent.match(re)
  if (!m) return null
  try { return JSON.parse(m[1]) } catch { return null }
}

/** Recursively render the GenIcon tree to SVG inner HTML. */
function renderTree(node) {
  if (!node || typeof node !== 'object') return ''
  let html = ''
  if (node.tag === 'path' && node.attr?.d) {
    html += `<path d="${node.attr.d}"/>`
  } else if (node.tag === 'rect' && node.attr) {
    const a = Object.entries(node.attr).map(([k,v]) => `${k}="${v}"`).join(' ')
    html += `<rect ${a}/>`
  } else if (node.tag === 'circle' && node.attr) {
    const a = Object.entries(node.attr).map(([k,v]) => `${k}="${v}"`).join(' ')
    html += `<circle ${a}/>`
  }
  if (node.child) for (const c of node.child) html += renderTree(c)
  return html
}

/** Build one inline SVG string from extracted icon data + color. */
function svgFor(iconName, source, color, size = 20) {
  const data = extractIconData(source, iconName)
  if (!data) return `<span style="color:#999;font-size:10px">?</span>`
  const vb = data.attr?.viewBox ?? '0 0 24 24'
  const inner = renderTree(data)
  return `<svg width="${size}" height="${size}" viewBox="${vb}" fill="${color}" style="flex:none">${inner}</svg>`
}

// ── Icon mapping (mirrors file-icons.tsx) ──────────────────────────────
const si = (name, color) => svgFor(name, siFile, color)
const vsc = (name, color) => svgFor(name, vscFile, color)

const sections = [
  { title: 'TypeScript / JavaScript', items: [
    ['ts', si('SiTypescript', '#3178C6'), '.ts'],
    ['tsx', si('SiReact', '#61DAFB'), '.tsx'],
    ['js', si('SiJavascript', '#F7DF1E'), '.js'],
    ['jsx', si('SiReact', '#61DAFB'), '.jsx'],
    ['mjs', si('SiJavascript', '#F7DF1E'), '.mjs'],
    ['cjs', si('SiJavascript', '#F7DF1E'), '.cjs'],
  ]},
  { title: 'Web Frameworks', items: [
    ['vue', si('SiVuedotjs', '#42B883'), '.vue'],
    ['svelte', si('SiSvelte', '#FF3E00'), '.svelte'],
    ['astro', si('SiAstro', '#FF5E00'), '.astro'],
    ['html', si('SiHtml5', '#E34F26'), '.html'],
    ['css', si('SiCss', '#1572B6'), '.css'],
    ['scss', si('SiSass', '#CC6699'), '.scss'],
    ['less', si('SiLess', '#1D365D'), '.less'],
  ]},
  { title: 'Systems', items: [
    ['py', si('SiPython', '#3776AB'), '.py'],
    ['rb', si('SiRuby', '#CC342D'), '.rb'],
    ['go', si('SiGo', '#00ADD8'), '.go'],
    ['rs', si('SiRust', '#DEA584'), '.rs'],
    ['php', si('SiPhp', '#777BB4'), '.php'],
    ['swift', si('SiSwift', '#F05138'), '.swift'],
    ['kt', si('SiKotlin', '#7F52FF'), '.kt'],
    ['dart', si('SiDart', '#0175C2'), '.dart'],
    ['lua', si('SiLua', '#2C2D72'), '.lua'],
    ['scala', si('SiScala', '#DC322F'), '.scala'],
    ['clj', si('SiClojure', '#5F5F5F'), '.clj'],
    ['ex', si('SiElixir', '#4B275F'), '.ex'],
    ['elm', si('SiElm', '#60B5CC'), '.elm'],
    ['nim', si('SiNim', '#FFE95B'), '.nim'],
    ['zig', si('SiZig', '#F7A41D'), '.zig'],
    ['ml', si('SiOcaml', '#EC672F'), '.ml'],
    ['sol', si('SiSolidity', '#363636'), '.sol'],
    ['vim', si('SiVim', '#019733'), '.vim'],
    ['gradle', si('SiGradle', '#02303A'), '.gradle'],
    ['nix', si('SiNixos', '#7EB1D6'), '.nix'],
  ]},
  { title: 'C / C++ / .NET', items: [
    ['c', si('SiC', '#A8B9CC'), '.c'],
    ['cpp', si('SiCplusplus', '#00599C'), '.cpp'],
    ['cs', si('SiDotnet', '#512BD4'), '.cs'],
    ['fs', si('SiDotnet', '#512BD4'), '.fs'],
  ]},
  { title: 'Shell', items: [
    ['sh', si('SiGnubash', '#4EAA25'), '.sh'],
    ['ps1', vsc('VscTerminalPowershell', '#012456'), '.ps1'],
    ['bat', vsc('VscTerminalCmd', '#C8C8C8'), '.bat'],
  ]},
  { title: 'Data / Config', items: [
    ['json', vsc('VscJson', '#F7DF1E'), '.json'],
    ['yaml', si('SiYaml', '#CB171E'), '.yaml'],
    ['toml', si('SiToml', '#9C4121'), '.toml'],
    ['env', si('SiDotenv', '#ECD53F'), '.env'],
    ['xml', vsc('VscFileCode', '#E3792B'), '.xml'],
    ['csv', vsc('VscFileText', '#2CB553'), '.csv'],
  ]},
  { title: 'Docs', items: [
    ['md', si('SiMarkdown', '#0844B8'), '.md'],
    ['txt', vsc('VscFileText', '#6B7280'), '.txt'],
    ['pdf', vsc('VscFilePdf', '#E53935'), '.pdf'],
    ['docx', vsc('VscFileText', '#2B579A'), '.docx'],
    ['xlsx', vsc('VscFileText', '#217346'), '.xlsx'],
    ['pptx', vsc('VscFileText', '#D24726'), '.pptx'],
  ]},
  { title: 'Media', items: [
    ['png', vsc('VscFileMedia', '#A855F7'), '.png'],
    ['svg', vsc('VscFileMedia', '#FFB13B'), '.svg'],
    ['mp4', vsc('VscFileMedia', '#FF6B6B'), '.mp4'],
    ['mp3', vsc('VscMusic', '#EC4899'), '.mp3'],
    ['zip', vsc('VscFileZip', '#F59E0B'), '.zip'],
    ['ttf', vsc('VscFileBinary', '#A855F7'), '.ttf'],
  ]},
  { title: 'Database / Keys', items: [
    ['sql', si('SiMysql', '#4479A1'), '.sql'],
    ['sqlite', si('SiSqlite', '#003B57'), '.sqlite'],
    ['pem', vsc('VscKey', '#10B981'), '.pem'],
  ]},
  { title: 'Special Filenames', items: [
    ['package.json', si('SiNpm', '#CB3837'), 'package.json'],
    ['pnpm-lock', si('SiPnpm', '#F69220'), 'pnpm-lock.yaml'],
    ['yarn.lock', si('SiYarn', '#2C8EBB'), 'yarn.lock'],
    ['Cargo.toml', si('SiRust', '#DEA584'), 'Cargo.toml'],
    ['Dockerfile', si('SiDocker', '#2496ED'), 'Dockerfile'],
    ['.gitignore', si('SiGit', '#F05032'), '.gitignore'],
    ['README', si('SiMarkdown', '#0844B8'), 'README.md'],
    ['LICENSE', vsc('VscBook', '#6B7280'), 'LICENSE'],
    ['vite.config', si('SiVite', '#646CFF'), 'vite.config.ts'],
    ['next.config', si('SiNextdotjs', '#000000'), 'next.config.js'],
    ['nuxt.config', si('SiNuxt', '#00DC82'), 'nuxt.config.ts'],
    ['tailwind.config', si('SiTailwindcss', '#06B6D4'), 'tailwind.config.ts'],
    ['jest.config', si('SiJest', '#C21325'), 'jest.config.js'],
    ['vitest.config', si('SiVitest', '#FCC00B'), 'vitest.config.ts'],
    ['cypress.config', si('SiCypress', '#17202C'), 'cypress.config.ts'],
    ['.eslintrc', si('SiEslint', '#4B32C3'), '.eslintrc.js'],
    ['.prettierrc', si('SiPrettier', '#F7B93E'), '.prettierrc'],
    ['babel.config', si('SiBabel', '#F9DC3D'), 'babel.config.js'],
    ['Jenkinsfile', si('SiJenkins', '#D24939'), 'Jenkinsfile'],
    ['.gitlab-ci', si('SiGitlab', '#FC6D26'), '.gitlab-ci.yml'],
    ['Chart.yaml', si('SiHelm', '#0F1689'), 'Chart.yaml'],
    ['turbo.json', si('SiTurbo', '#6DD3C6'), 'turbo.json'],
    ['biome.json', si('SiBiome', '#60A5FA'), 'biome.json'],
    ['flake.nix', si('SiNixos', '#7EB1D6'), 'flake.nix'],
    ['schema.prisma', si('SiPrisma', '#5D8AA8'), 'schema.prisma'],
    ['tauri.conf', si('SiTauri', '#FFC131'), 'tauri.conf.json'],
    ['vercel.json', si('SiVercel', '#000000'), 'vercel.json'],
  ]},
  { title: 'Special Folders', items: [
    ['node_modules', vsc('VscFolder', '#CB3837'), 'node_modules/'],
    ['src', vsc('VscFolder', '#3178C6'), 'src/'],
    ['.git', vsc('VscFolder', '#F05032'), '.git/'],
    ['public', vsc('VscFolder', '#42B883'), 'public/'],
    ['dist', vsc('VscFolder', '#E34F26'), 'dist/'],
    ['test', vsc('VscFolder', '#F7DF1E'), 'test/'],
    ['assets', vsc('VscFolder', '#A855F7'), 'assets/'],
    ['components', vsc('VscFolder', '#42B883'), 'components/'],
    ['docs', vsc('VscFolder', '#0844B8'), 'docs/'],
    ['scripts', vsc('VscFolder', '#4EAA25'), 'scripts/'],
    ['config', vsc('VscFolder', '#F7B500'), 'config/'],
    ['pages', vsc('VscFolder', '#3178C6'), 'pages/'],
    ['router', vsc('VscFolder', '#3178C6'), 'router/'],
    ['store', vsc('VscFolder', '#A855F7'), 'store/'],
    ['android', vsc('VscFolder', '#3DDC84'), 'android/'],
    ['ios', vsc('VscFolder', '#000000'), 'ios/'],
    ['.vscode', vsc('VscFolder', '#3178C6'), '.vscode/'],
    ['.github', vsc('VscFolder', '#F05032'), '.github/'],
    ['migrations', vsc('VscFolder', '#4479A1'), 'migrations/'],
    ['api', vsc('VscFolder', '#42B883'), 'api/'],
    ['app', vsc('VscFolder', '#3178C6'), 'app/'],
  ]},
]

// ── Generate HTML ───────────────────────────────────────────────────────
const cards = sections.map(s => `
  <div class="section">
    <h2>${s.title}</h2>
    <div class="grid">
      ${s.items.map(([, svg, label]) => `
        <div class="card">
          ${svg}
          <span class="label">${label}</span>
        </div>
      `).join('')}
    </div>
  </div>
`).join('')

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>dsh-better-sidebar — File Icon Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1a1a2e; color: #e0e0e0; padding: 24px; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
  .section { margin-bottom: 28px; }
  .section h2 { font-size: 14px; color: #aaa; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 6px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; }
  .card { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #16213e; border: 1px solid #233; border-radius: 8px; }
  .card:hover { border-color: #446; background: #1a2744; }
  .label { font-size: 12px; color: #ccc; font-family: ui-monospace, monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
</head>
<body>
<h1>📁 dsh-better-sidebar — File Icon Preview</h1>
<p class="subtitle">563 entries: 218 extensions + 197 special filenames + 148 folder colors — zero new dependencies (react-icons is an existing peer)</p>
${cards}
</body>
</html>`

writeFileSync(join(__dirname, 'icon-preview.html'), html, 'utf8')
console.log(`Generated icon-preview.html with ${sections.reduce((n, s) => n + s.items.length, 0)} icons`)

/**
 * Colored, type-specific file and folder icons for the file tree.
 *
 * Brand file types (.tsx → React, .vue → Vue, .py → Python, …) use the
 * Simple Icons set (react-icons/si) with each brand's official color.
 * Generic types (.txt, .pdf, .zip, …) use the VSCode Seti set
 * (react-icons/vsc) with a hand-picked color. Special folders
 * (node_modules, src, .git, …) get a tinted folder glyph so the tree
 * reads at a glance.
 *
 * Zero new dependencies: react-icons is already a peer of this plugin.
 */
import type { ReactNode } from 'react'
import {
  SiReact, SiVuedotjs, SiTypescript, SiJavascript, SiPython, SiGo,
  SiRust, SiPhp, SiHtml5, SiCss, SiSass, SiLess, SiSvelte, SiAstro,
  SiDocker, SiGit, SiMarkdown, SiSwift, SiKotlin, SiDart, SiGnubash,
  SiMysql, SiSqlite, SiLua, SiScala, SiClojure, SiPerl, SiHaskell,
  SiErlang, SiJulia, SiC, SiCplusplus, SiDotnet, SiYaml,
  SiToml, SiGraphql, SiTerraform, SiGodotengine, SiCrystal,
  SiCoffeescript, SiCmake, SiRuby, SiNpm, SiPnpm, SiYarn, SiComposer,
  SiVite, SiWebpack, SiRollupdotjs, SiEsbuild, SiNextdotjs, SiNuxt,
  SiTailwindcss, SiVitest, SiJest, SiCypress, SiEslint,
  SiPrettier, SiBabel, SiPostcss, SiPrisma, SiTurbo, SiNx, SiLerna,
  SiBiome, SiNodedotjs, SiDjango, SiTauri, SiElectron, SiDocusaurus,
  SiDotenv,
} from 'react-icons/si'
import {
  VscFile, VscFileText, VscFilePdf, VscFileMedia, VscFileZip,
  VscMusic, VscMap, VscKey, VscSettings, VscBook, VscJson,
  VscTerminalPowershell, VscTerminalCmd, VscFolder, VscFolderOpened,
} from 'react-icons/vsc'
import type { IconType } from 'react-icons'

/** A brand/generic icon paired with its display color. */
interface IconEntry {
  Icon: IconType
  color: string
}

/** Render one colored icon at the tree's 14px size. */
function colored(entry: IconEntry, size = 14): ReactNode {
  const { Icon, color } = entry
  return <Icon size={size} style={{ color }} />
}

// ── Brand file icons (extension → { icon, brand color }) ────────────────

const FILE_ICON_BY_EXT: Partial<Record<string, IconEntry>> = {
  // TypeScript / JavaScript
  ts: { Icon: SiTypescript, color: '#3178C6' },
  tsx: { Icon: SiReact, color: '#61DAFB' },
  js: { Icon: SiJavascript, color: '#F7DF1E' },
  jsx: { Icon: SiReact, color: '#61DAFB' },
  mjs: { Icon: SiJavascript, color: '#F7DF1E' },
  cjs: { Icon: SiJavascript, color: '#F7DF1E' },
  // Web frameworks
  vue: { Icon: SiVuedotjs, color: '#42B883' },
  svelte: { Icon: SiSvelte, color: '#FF3E00' },
  astro: { Icon: SiAstro, color: '#FF5E00' },
  html: { Icon: SiHtml5, color: '#E34F26' },
  htm: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  scss: { Icon: SiSass, color: '#CC6699' },
  sass: { Icon: SiSass, color: '#CC6699' },
  less: { Icon: SiLess, color: '#1D365D' },
  // Systems
  py: { Icon: SiPython, color: '#3776AB' },
  pyi: { Icon: SiPython, color: '#3776AB' },
  rb: { Icon: SiRuby, color: '#CC342D' },
  go: { Icon: SiGo, color: '#00ADD8' },
  rs: { Icon: SiRust, color: '#DEA584' },
  php: { Icon: SiPhp, color: '#777BB4' },
  swift: { Icon: SiSwift, color: '#F05138' },
  kt: { Icon: SiKotlin, color: '#7F52FF' },
  kts: { Icon: SiKotlin, color: '#7F52FF' },
  dart: { Icon: SiDart, color: '#0175C2' },
  lua: { Icon: SiLua, color: '#2C2D72' },
  scala: { Icon: SiScala, color: '#DC322F' },
  clj: { Icon: SiClojure, color: '#5F5F5F' },
  cljs: { Icon: SiClojure, color: '#5F5F5F' },
  edn: { Icon: SiClojure, color: '#5F5F5F' },
  pl: { Icon: SiPerl, color: '#393939' },
  pm: { Icon: SiPerl, color: '#393939' },
  hs: { Icon: SiHaskell, color: '#5E5086' },
  erl: { Icon: SiErlang, color: '#A90533' },
  jl: { Icon: SiJulia, color: '#9558B2' },
  // C / C++
  c: { Icon: SiC, color: '#A8B9CC' },
  h: { Icon: SiC, color: '#A8B9CC' },
  cpp: { Icon: SiCplusplus, color: '#00599C' },
  cc: { Icon: SiCplusplus, color: '#00599C' },
  cxx: { Icon: SiCplusplus, color: '#00599C' },
  hpp: { Icon: SiCplusplus, color: '#00599C' },
  hxx: { Icon: SiCplusplus, color: '#00599C' },
  cs: { Icon: SiDotnet, color: '#512BD4' },
  fs: { Icon: SiDotnet, color: '#512BD4' },
  vb: { Icon: SiDotnet, color: '#512BD4' },
  // Shell
  sh: { Icon: SiGnubash, color: '#4EAA25' },
  bash: { Icon: SiGnubash, color: '#4EAA25' },
  zsh: { Icon: SiGnubash, color: '#4EAA25' },
  fish: { Icon: SiGnubash, color: '#4EAA25' },
  ps1: { Icon: VscTerminalPowershell, color: '#012456' },
  psd1: { Icon: VscTerminalPowershell, color: '#012456' },
  psm1: { Icon: VscTerminalPowershell, color: '#012456' },
  bat: { Icon: VscTerminalCmd, color: '#C8C8C8' },
  cmd: { Icon: VscTerminalCmd, color: '#C8C8C8' },
  // Data / config
  json: { Icon: VscJson, color: '#F7DF1E' },
  jsonc: { Icon: VscJson, color: '#F7DF1E' },
  json5: { Icon: VscJson, color: '#F7DF1E' },
  yaml: { Icon: SiYaml, color: '#CB171E' },
  yml: { Icon: SiYaml, color: '#CB171E' },
  toml: { Icon: SiToml, color: '#9C4121' },
  ini: { Icon: VscSettings, color: '#8B5CF6' },
  conf: { Icon: VscSettings, color: '#8B5CF6' },
  cfg: { Icon: VscSettings, color: '#8B5CF6' },
  env: { Icon: SiDotenv, color: '#ECD53F' },
  // Docs
  md: { Icon: SiMarkdown, color: '#0844B8' },
  markdown: { Icon: SiMarkdown, color: '#0844B8' },
  txt: { Icon: VscFileText, color: '#6B7280' },
  log: { Icon: VscFileText, color: '#6B7280' },
  pdf: { Icon: VscFilePdf, color: '#E53935' },
  // Images
  png: { Icon: VscFileMedia, color: '#A855F7' },
  jpg: { Icon: VscFileMedia, color: '#A855F7' },
  jpeg: { Icon: VscFileMedia, color: '#A855F7' },
  gif: { Icon: VscFileMedia, color: '#A855F7' },
  webp: { Icon: VscFileMedia, color: '#A855F7' },
  svg: { Icon: VscFileMedia, color: '#FFB13B' },
  ico: { Icon: VscFileMedia, color: '#A855F7' },
  bmp: { Icon: VscFileMedia, color: '#A855F7' },
  avif: { Icon: VscFileMedia, color: '#A855F7' },
  tiff: { Icon: VscFileMedia, color: '#A855F7' },
  tif: { Icon: VscFileMedia, color: '#A855F7' },
  // Audio
  mp3: { Icon: VscMusic, color: '#EC4899' },
  wav: { Icon: VscMusic, color: '#EC4899' },
  flac: { Icon: VscMusic, color: '#EC4899' },
  ogg: { Icon: VscMusic, color: '#EC4899' },
  m4a: { Icon: VscMusic, color: '#EC4899' },
  aac: { Icon: VscMusic, color: '#EC4899' },
  // Archives
  zip: { Icon: VscFileZip, color: '#F59E0B' },
  tar: { Icon: VscFileZip, color: '#F59E0B' },
  gz: { Icon: VscFileZip, color: '#F59E0B' },
  tgz: { Icon: VscFileZip, color: '#F59E0B' },
  rar: { Icon: VscFileZip, color: '#F59E0B' },
  '7z': { Icon: VscFileZip, color: '#F59E0B' },
  bz2: { Icon: VscFileZip, color: '#F59E0B' },
  xz: { Icon: VscFileZip, color: '#F59E0B' },
  // Database
  db: { Icon: SiSqlite, color: '#003B57' },
  sqlite: { Icon: SiSqlite, color: '#003B57' },
  sqlite3: { Icon: SiSqlite, color: '#003B57' },
  sql: { Icon: SiMysql, color: '#4479A1' },
  // Source maps
  map: { Icon: VscMap, color: '#6B7280' },
  // Keys / certs
  pem: { Icon: VscKey, color: '#10B981' },
  key: { Icon: VscKey, color: '#10B981' },
  crt: { Icon: VscKey, color: '#10B981' },
  pub: { Icon: VscKey, color: '#10B981' },
  // GraphQL
  graphql: { Icon: SiGraphql, color: '#E10098' },
  gql: { Icon: SiGraphql, color: '#E10098' },
  // Terraform / IaC
  tf: { Icon: SiTerraform, color: '#7B42BC' },
  tfvars: { Icon: SiTerraform, color: '#7B42BC' },
  tfstate: { Icon: SiTerraform, color: '#7B42BC' },
  // Godot
  gd: { Icon: SiGodotengine, color: '#478CBF' },
  // Crystal
  cr: { Icon: SiCrystal, color: '#000000' },
  // CoffeeScript
  coffee: { Icon: SiCoffeescript, color: '#2F2614' },
}

// ── Special filenames (exact match, case-sensitive) ──────────────────────

const FILE_ICON_BY_NAME: Partial<Record<string, IconEntry>> = {
  'package.json': { Icon: SiNpm, color: '#CB3837' },
  'package-lock.json': { Icon: SiNpm, color: '#CB3837' },
  'pnpm-lock.yaml': { Icon: SiPnpm, color: '#F69220' },
  'yarn.lock': { Icon: SiYarn, color: '#2C8EBB' },
  'Cargo.lock': { Icon: SiRust, color: '#DEA584' },
  'Cargo.toml': { Icon: SiRust, color: '#DEA584' },
  'go.sum': { Icon: SiGo, color: '#00ADD8' },
  'go.mod': { Icon: SiGo, color: '#00ADD8' },
  'composer.json': { Icon: SiComposer, color: '#885630' },
  'composer.lock': { Icon: SiComposer, color: '#885630' },
  '.gitignore': { Icon: SiGit, color: '#F05032' },
  '.gitattributes': { Icon: SiGit, color: '#F05032' },
  '.gitmodules': { Icon: SiGit, color: '#F05032' },
  'LICENSE': { Icon: VscBook, color: '#6B7280' },
  'LICENSE.md': { Icon: VscBook, color: '#6B7280' },
  'README.md': { Icon: SiMarkdown, color: '#0844B8' },
  'Dockerfile': { Icon: SiDocker, color: '#2496ED' },
  'Dockerfile.dev': { Icon: SiDocker, color: '#2496ED' },
  'Dockerfile.prod': { Icon: SiDocker, color: '#2496ED' },
  'docker-compose.yml': { Icon: SiDocker, color: '#2496ED' },
  'docker-compose.yaml': { Icon: SiDocker, color: '#2496ED' },
  'Makefile': { Icon: SiCmake, color: '#064F8C' },
  '.env': { Icon: SiDotenv, color: '#ECD53F' },
  '.env.local': { Icon: SiDotenv, color: '#ECD53F' },
  '.env.development': { Icon: SiDotenv, color: '#ECD53F' },
  '.env.production': { Icon: SiDotenv, color: '#ECD53F' },
  'tsconfig.json': { Icon: SiTypescript, color: '#3178C6' },
  'tsconfig.base.json': { Icon: SiTypescript, color: '#3178C6' },
  'vite.config.ts': { Icon: SiVite, color: '#646CFF' },
  'vite.config.js': { Icon: SiVite, color: '#646CFF' },
  'vite.config.mts': { Icon: SiVite, color: '#646CFF' },
  'webpack.config.js': { Icon: SiWebpack, color: '#1C78C0' },
  'webpack.config.ts': { Icon: SiWebpack, color: '#1C78C0' },
  'rollup.config.js': { Icon: SiRollupdotjs, color: '#C3413D' },
  'rollup.config.mjs': { Icon: SiRollupdotjs, color: '#C3413D' },
  'esbuild.config.js': { Icon: SiEsbuild, color: '#FFCF00' },
  'next.config.js': { Icon: SiNextdotjs, color: '#000000' },
  'next.config.mjs': { Icon: SiNextdotjs, color: '#000000' },
  'next.config.ts': { Icon: SiNextdotjs, color: '#000000' },
  'nuxt.config.ts': { Icon: SiNuxt, color: '#00DC82' },
  'nuxt.config.js': { Icon: SiNuxt, color: '#00DC82' },
  'tailwind.config.js': { Icon: SiTailwindcss, color: '#06B6D4' },
  'tailwind.config.ts': { Icon: SiTailwindcss, color: '#06B6D4' },
  'playwright.config.ts': { Icon: VscSettings, color: '#2EAD33' },
  'playwright.config.js': { Icon: VscSettings, color: '#2EAD33' },
  'vitest.config.ts': { Icon: SiVitest, color: '#FCC00B' },
  'vitest.config.js': { Icon: SiVitest, color: '#FCC00B' },
  'jest.config.js': { Icon: SiJest, color: '#C21325' },
  'jest.config.ts': { Icon: SiJest, color: '#C21325' },
  'cypress.config.ts': { Icon: SiCypress, color: '#17202C' },
  'cypress.config.js': { Icon: SiCypress, color: '#17202C' },
  '.eslintrc.js': { Icon: SiEslint, color: '#4B32C3' },
  '.eslintrc.json': { Icon: SiEslint, color: '#4B32C3' },
  '.eslintrc.cjs': { Icon: SiEslint, color: '#4B32C3' },
  '.prettierrc': { Icon: SiPrettier, color: '#F7B93E' },
  '.prettierrc.json': { Icon: SiPrettier, color: '#F7B93E' },
  '.prettierrc.js': { Icon: SiPrettier, color: '#F7B93E' },
  'babel.config.js': { Icon: SiBabel, color: '#F9DC3D' },
  '.babelrc': { Icon: SiBabel, color: '#F9DC3D' },
  'postcss.config.js': { Icon: SiPostcss, color: '#DD3A8C' },
  'schema.prisma': { Icon: SiPrisma, color: '#5D8AA8' },
  'CMakeLists.txt': { Icon: SiCmake, color: '#064F8C' },
  '.dockerignore': { Icon: SiDocker, color: '#2496ED' },
  '.npmignore': { Icon: SiNpm, color: '#CB3837' },
  'turbo.json': { Icon: SiTurbo, color: '#6DD3C6' },
  'nx.json': { Icon: SiNx, color: '#14305F' },
  'lerna.json': { Icon: SiLerna, color: '#9333EA' },
  'biome.json': { Icon: SiBiome, color: '#60A5FA' },
  '.nvmrc': { Icon: SiNodedotjs, color: '#339933' },
  '.node-version': { Icon: SiNodedotjs, color: '#339933' },
  '.ruby-version': { Icon: SiRuby, color: '#CC342D' },
  '.python-version': { Icon: SiPython, color: '#3776AB' },
  'Gemfile': { Icon: SiRuby, color: '#CC342D' },
  'Gemfile.lock': { Icon: SiRuby, color: '#CC342D' },
  'Rakefile': { Icon: SiRuby, color: '#CC342D' },
  'requirements.txt': { Icon: SiPython, color: '#3776AB' },
  'setup.py': { Icon: SiPython, color: '#3776AB' },
  'pyproject.toml': { Icon: SiPython, color: '#3776AB' },
  'manage.py': { Icon: SiDjango, color: '#092E20' },
  'Procfile': { Icon: SiNodedotjs, color: '#339933' },
  'vercel.json': { Icon: SiNextdotjs, color: '#000000' },
  'tauri.conf.json': { Icon: SiTauri, color: '#FFC131' },
  'docusaurus.config.js': { Icon: SiDocusaurus, color: '#3ECCF4' },
  'docusaurus.config.ts': { Icon: SiDocusaurus, color: '#3ECCF4' },
}

// ── Special folder colors ───────────────────────────────────────────────

/** Folder name → tint color (applied to VscFolder / VscFolderOpened). */
const FOLDER_COLOR: Record<string, string> = {
  node_modules: '#CB3837',
  src: '#3178C6',
  '.git': '#F05032',
  public: '#42B883',
  static: '#42B883',
  dist: '#E34F26',
  build: '#E34F26',
  out: '#E34F26',
  test: '#F7DF1E',
  tests: '#F7DF1E',
  __tests__: '#F7DF1E',
  spec: '#F7DF1E',
  specs: '#F7DF1E',
  '.vscode': '#3178C6',
  '.idea': '#3178C6',
  assets: '#A855F7',
  images: '#A855F7',
  img: '#A855F7',
  icons: '#A855F7',
  fonts: '#A855F7',
  styles: '#CC6699',
  stylesheets: '#CC6699',
  css: '#CC6699',
  components: '#42B883',
  composables: '#42B883',
  hooks: '#42B883',
  lib: '#6B7280',
  libs: '#6B7280',
  vendor: '#6B7280',
  docs: '#0844B8',
  documentation: '#0844B8',
  scripts: '#4EAA25',
  bin: '#4EAA25',
  config: '#F7B500',
  configs: '#F7B500',
  '.config': '#F7B500',
  locales: '#F7B500',
  i18n: '#F7B500',
  translations: '#F7B500',
  pages: '#3178C6',
  views: '#3178C6',
  routes: '#3178C6',
  router: '#3178C6',
  store: '#A855F7',
  stores: '#A855F7',
  state: '#A855F7',
  utils: '#6B7280',
  helpers: '#6B7280',
  types: '#3178C6',
  typings: '#3178C6',
  mocks: '#F7DF1E',
  fixtures: '#F7DF1E',
  e2e: '#F7DF1E',
  cypress: '#17202C',
  '.github': '#F05032',
  '.husky': '#F05032',
  coverage: '#42B883',
  '.next': '#000000',
  '.nuxt': '#00DC82',
  '.svelte-kit': '#FF3E00',
  '.astro': '#FF5E00',
}

// ── Public lookup functions ──────────────────────────────────────────────

/**
 * Pick a colored, type-specific icon for one filename: exact-name match
 * first (so `package.json` beats the `.json` extension), then extension,
 * then the generic file glyph. Directories are handled by {@link folderIcon}.
 */
export function fileIcon(name: string): ReactNode {
  const byName = FILE_ICON_BY_NAME[name]
  if (byName !== undefined) return colored(byName)
  const dot = name.lastIndexOf('.')
  const ext = dot >= 0 ? name.slice(dot + 1).toLowerCase() : ''
  const byExt = ext !== '' ? FILE_ICON_BY_EXT[ext] : undefined
  if (byExt !== undefined) return colored(byExt)
  return <VscFile size={14} />
}

/**
 * Pick a (possibly colored) folder icon for one directory name. Special
 * folders (node_modules, src, .git, …) get a tinted folder glyph; regular
 * folders follow the theme's label color (no override).
 */
export function folderIcon(name: string, isOpen: boolean): ReactNode {
  const tint = FOLDER_COLOR[name]
  const Icon = isOpen ? VscFolderOpened : VscFolder
  if (tint !== undefined) return <Icon size={14} style={{ color: tint }} />
  return <Icon size={14} />
}

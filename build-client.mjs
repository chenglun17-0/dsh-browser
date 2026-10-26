import { build } from 'esbuild'

const id = '@chenglun17-0/dsh-browser'

await build({
  entryPoints: ['src/client.jsx'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  jsx: 'automatic',
  target: 'es2022',
  external: ['react', 'react/jsx-runtime'],
  outfile: 'client.js',
  banner: {
    js: `window.__ModuleLoader__.load({\n  id: ${JSON.stringify(id)},\n  factory: (require) => {\n    var module = { exports: {} };\n    var exports = module.exports;\n`,
  },
  footer: {
    js: `    return module.exports;\n  },\n});`,
  },
  logLevel: 'info',
})

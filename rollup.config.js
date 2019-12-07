import resolve from 'rollup-plugin-node-resolve'

const BACKGROUND = {
  input: 'src/background/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/background.js'
  },
  name: 'background'
}

const POPUP = {
  input: 'src/popup/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/script.js'
  },
  name: 'script',
  plugins: [resolve()]
}

const OPTIONS = {
  input: 'src/options/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/options.js'
  },
  name: 'options'
}

export default [BACKGROUND, POPUP, OPTIONS]

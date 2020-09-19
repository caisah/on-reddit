import resolve from 'rollup-plugin-node-resolve'

const BACKGROUND = {
  input: 'src/background/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/background.js'
  }
}

const POPUP = {
  input: 'src/popup/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/popup.js'
  },
  plugins: [resolve()]
}

const OPTIONS = {
  input: 'src/options/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/options.js'
  }
}

export default [BACKGROUND, POPUP, OPTIONS]

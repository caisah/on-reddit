import resolve from 'rollup-plugin-node-resolve';

const BACKGROUND = {
  input: 'src/background/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/background.js',
  },
  name: 'background',
};

const POPUP = {
  input: 'src/popup/script.js',
  output: {
    format: 'iife',
    file: 'build/addon/script.js',
  },
  name: 'script',
  plugins: [resolve()],
};

export default [BACKGROUND, POPUP];

const BACKGROUND = {
  input: 'src/background/index.js',
  output: {
    format: 'iife',
    file: 'build/addon/background.js',
  },
  name: 'background',
  sourcemap: true,
};

const POPUP = {
  input: 'src/popup/script.js',
  output: {
    format: 'iife',
    file: 'build/addon/script.js',
  },
  name: 'script',
  sourcemap: true,
};

export default [BACKGROUND, POPUP];

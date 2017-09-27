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
};

export default [BACKGROUND, POPUP];

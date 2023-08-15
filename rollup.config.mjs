import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import run from '@rollup/plugin-run';
import { babel } from '@rollup/plugin-babel';

//
//

export default {
  input: './src/index.tsx',
  output: {
    dir: './dist',
    format: 'es',
    sourcemap: false,
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return 'vendor';
      }
      return 'index';
    },
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
    assetFileNames: `[name].[ext]`,
  },
  watch: {
    clearScreen: false,
    include: 'src/**',
  },
  plugins: [
    esbuild({
      sourceMap: false,
      minify: false,
    }),
    babel({
      extensions: ['.tsx'],
      babelHelpers: 'bundled',

      presets: [
        [
          'solid',
          {
            generate: 'ssr',
            hydratable: true,
          },
        ],
      ],
    }),
    commonjs(),
    nodeResolve({ jsnext: true }),
    run({ allowRestarts: true }),
  ],
};

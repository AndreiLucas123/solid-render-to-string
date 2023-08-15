import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

//
//

export default {
  input: './src/index.tsx',
  output: {
    dir: './dist',
    format: 'es',
    sourcemap: false,
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
  ],
};

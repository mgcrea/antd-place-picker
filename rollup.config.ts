import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json';

const sourcemap = true;

const config = {
  input: 'src/index.ts',
  output: [
    {
      exports: 'named',
      file: `${packageJson.main}`,
      format: 'umd',
      name: 'antd-place-picker',
      sourcemap,
    },
    {
      exports: 'named',
      dir: path.dirname(packageJson.module),
      format: 'esm',
      sourcemap,
      preserveModules: true,
      preserveModulesRoot: 'src/',
      sourcemapPathTransform: (relativeSourcePath, _sourcemapPath) => {
        return relativeSourcePath.replace(/^\.\.\//, '');
      },
    },
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    typescript({outDir: path.dirname(packageJson.module), declaration: true}),
    resolve(),
    commonjs(),
    postcss({
      // minimize: true,
      modules: true,
      use: {
        sass: null,
        stylus: null,
        less: {javascriptEnabled: true},
      },
      extract: true,
    }),
    copy({
      targets: [{src: 'src/**/*.less', dest: 'lib/esm'}],
      flatten: false,
    }),
  ],
};

export default config;

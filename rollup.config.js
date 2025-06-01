/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import summary from 'rollup-plugin-summary';

export default [
  {
    input: 'dist/index.js',
    output: {
      file: 'docs/digit-spinner.bundled.js',
      format: 'esm',
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
      resolve(),
      /**
       * This minification setup serves the static site generation.
       * For bundling and minification, check the README.md file.
       */
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  },
  {
    input: 'docs-src/playground.js',
    output: {
      file: 'docs/playground.bundled.js',
      format: 'esm',
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
      resolve(),
      /**
       * This minification setup serves the static site generation.
       * For bundling and minification, check the README.md file.
       */
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  },
];

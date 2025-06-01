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
  // For the static site, bundles the digit spinner and its dependencies.
  {
    input: 'dist/index.js',
    output: {
      file: 'docs/js/digit-spinner.bundled.js',
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
  // For the static site, bundles the playground and its dependencies.
  {
    input: 'docs-src/js/playground.js',
    output: {
      file: 'docs/js/playground.bundled.js',
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

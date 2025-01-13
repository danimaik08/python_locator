import webpack from 'webpack';
import 'webpack-dev-server';
import path from 'path';

import buildWebpack from './config/build/buildWebpack';

type Env = {
  mode?: 'development' | 'production';
  port?: string;
};

export default (env: Env): webpack.Configuration => {
  const configuration: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: +(env.port ?? 3000),
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      output: path.resolve(__dirname, 'dist'),
      src: path.resolve(__dirname, 'src'),
    },
  });

  return configuration;
};

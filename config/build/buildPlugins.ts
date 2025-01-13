import webpack from 'webpack';

type Options = {
  mode: 'development' | 'production';
};

export default function buildPlugins(
  options: Options
): webpack.Configuration['plugins'] {
  const isDev = options.mode === 'development';

  return [
    isDev && new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ].filter(Boolean);
}

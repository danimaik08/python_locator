import webpack from 'webpack';

type Options = {
  src: string;
};

export default function buildResolve(
  options: Options
): webpack.Configuration['resolve'] {
  return {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': options.src,
    },
  };
}

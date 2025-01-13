import webpack from 'webpack';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import PostcssCustomProperties from 'postcss-custom-properties';
import tailwindCSS from 'tailwindcss';

type Options = {
  mode: 'development' | 'production';
};

export default function buildLoaders(
  options: Options
): webpack.Configuration['module'] {
  const isDev = options.mode === 'development';

  const tsLoader = {
    test: /\.tsx?$/i,
    loader: 'ts-loader',
    options: {
      getCustomTransformers: () => ({
        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
      }),
      transpileOnly: !isDev,
    },
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [PostcssCustomProperties(), tailwindCSS()],
          },
        },
      },
    ],
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
    exclude: /node_modules/,
  };

  const pngLoader = {
    test: /\.png$/i,
    type: 'asset/resource',
    exclude: /node_modules/,
  };

  const jpgLoader = {
    test: /\.jpe?g/i,
    type: 'asset/resource',
    exclude: /node_modules/,
  };

  return {
    rules: [tsLoader, cssLoader, svgLoader, pngLoader, jpgLoader],
  };
}

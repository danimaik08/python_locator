import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Options = {
  port: number;
};

export default function buildDevServer(
  options: Options
): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}

import type { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import getEnv, { str } from '@webpack-typescript-references/env'

const env = getEnv({
  dotEnvFilePath: process.env.NODE_ENV === 'DEV' ? path.join(__dirname, '../.env') : '',
  specs: {
    NODE_ENV: str({
      desc: 'The environment the WebServer will run in',
      default: 'development',
      choices: ['development', 'production'],
    }),
  },
})

const config: Configuration = {
  stats: 'errors-only',
  mode: env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/build'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: {
          loader: 'ts-loader',
          options: {
            projectReferences: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devtool: env.NODE_ENV === 'production' ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
}

export default config

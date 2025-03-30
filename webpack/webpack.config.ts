import path from 'path'
import { Configuration } from 'webpack'
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { buildLoaders } from './build-loaders'
import { buildResolvers } from './build-resolvers'

interface Env {
	mode: 'development' | 'production'
}

export default (env: Env): Configuration | DevServerConfiguration => {
	return {
		mode: env.mode,
    entry: path.resolve(__dirname, '../index.tsx'),
    watch: env.mode === 'development',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
		plugins: [
			new HtmlWebpackPlugin({ 
				template: path.resolve(__dirname, '../public', 'index.html'), 
				favicon: path.resolve(__dirname, '../public', 'favicon.ico')}),
		],
		module: buildLoaders(),
		resolve: buildResolvers(),
		devtool: 'inline-source-map',
		devServer: {
			port: 3000,
			historyApiFallback: true,
			open: true
		}
	}
}
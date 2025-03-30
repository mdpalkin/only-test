import path from 'path'
import {Configuration} from 'webpack'

export const buildResolvers = (): Configuration['resolve'] => {
	
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  }
}
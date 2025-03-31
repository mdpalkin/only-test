import path from 'path'
import { Configuration } from 'webpack'

export const buildResolvers = (): Configuration['resolve'] => {
  const baseSrcPath = path.resolve(__dirname, '../src')
  
  return {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': baseSrcPath,
    }
  }
}
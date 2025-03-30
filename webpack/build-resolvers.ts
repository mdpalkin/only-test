import path from 'path'
import { Configuration } from 'webpack'

export const buildResolvers = (): Configuration['resolve'] => {
  const baseSrcPath = path.resolve(__dirname, '../src')
  
  return {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': baseSrcPath,
      '@/app': path.resolve(baseSrcPath, 'app'),
      '@/pages': path.resolve(baseSrcPath, 'pages'),
      '@/widgets': path.resolve(baseSrcPath, 'widgets'),
      '@/features': path.resolve(baseSrcPath, 'features'),
      '@/entities': path.resolve(baseSrcPath, 'entities'),
      '@/shared': path.resolve(baseSrcPath, 'shared'),
    }
  }
}
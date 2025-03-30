import { ModuleOptions } from 'webpack'

export const buildLoaders = (): ModuleOptions => {
  const swcLoader = {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              useBuiltins: true,
            },
          },
          target: 'es2015',
        },
        module: {
          type: 'es6',
        },
      },
    },
  }

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const sassLoader = {
    test: /\.s[ca]ss$/i,
    use: ['style-loader', 'css-loader', "sass-loader"],
  }

  return {
    rules: [
      swcLoader,
      assetsLoader,
      sassLoader,
    ]
  }
}
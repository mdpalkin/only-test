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
          },
          transform: {
            react: {
              runtime: 'automatic',
              useBuiltins: true,
            },
          },
          target: 'es2022',
        },
      },
    },
  }

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/[hash][ext][query]'
    }
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        auto: (path: string) => path.includes('.module.'),
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
  }

  const sassLoader = {
    test: /\.s[ca]ss$/i,
    use: [
      'style-loader',
      cssLoaderWithModules,
      'sass-loader',
    ],
  }

  const cssLoader = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
    exclude: /\.module\.css$/,
  }

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]'
    }
  }

  return {
    rules: [
      swcLoader,
      assetsLoader,
      fontsLoader,
      {
        oneOf: [
          sassLoader,
          cssLoader
        ]
      }
    ]
  }
}
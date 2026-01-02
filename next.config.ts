import path from 'path'
import process from 'process'
import type { NextConfig } from 'next'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import type { Configuration, WebpackPluginInstance } from 'webpack'

const root = process.cwd()
const joinRoot = (...p: string[]) => path.join(root, ...p)

const nextConfig: NextConfig = {
  // Silences Turbopack warning when you intentionally use webpack config
  turbopack: {},
  reactStrictMode: false,
  // Optional: centralize base url for your app usage
  env: {
    NEXT_PUBLIC_CESIUM_BASE_URL: '/cesium'
  },

  webpack: (config: Configuration, ctx) => {

    const { isServer, webpack } = ctx

    // Ensure plugins array exists
    config.plugins = (config.plugins || []) as WebpackPluginInstance[]

    // Copy Cesium static assets ONLY for client bundle
    if (!isServer) {
      const cesiumBuild = joinRoot('node_modules', 'cesium', 'Build', 'Cesium')
      const publicCesium = joinRoot('public', 'cesium')

      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(cesiumBuild, 'Workers'),
              to: path.join(publicCesium, 'Workers'),
              info: { minimized: true }
            },
            {
              from: path.join(cesiumBuild, 'ThirdParty'),
              to: path.join(publicCesium, 'ThirdParty'),
              info: { minimized: true }
            },
            {
              from: path.join(cesiumBuild, 'Assets'),
              to: path.join(publicCesium, 'Assets'),
              info: { minimized: true }
            },
            {
              from: path.join(cesiumBuild, 'Widgets'),
              to: path.join(publicCesium, 'Widgets'),
              info: { minimized: true }
            },
            // (Tuỳ chọn) Nếu bạn muốn public/cesium/Cesium.js
            {
              from: path.join(cesiumBuild, 'Cesium.js'),
              to: path.join(publicCesium, 'Cesium.js'),
              info: { minimized: true }
            }
          ]
        })
      )

      // If you still want a compile-time constant in your bundle:
      config.plugins.push(
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('/cesium')
        })
      )

      config.resolve = config.resolve || {}
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        cesium: joinRoot('node_modules', 'cesium')
      }
    }

    return config
  },

  output: 'standalone'
}

export default nextConfig

import express from 'express'
import { Request, Response, NextFunction } from 'express'
import path from 'path'

// connect webpack to express server
import webpack from 'webpack'
// webpack configuration file
import webpackConfig from './webpack.config'
// webpack server
import webpackDevMiddleware from 'webpack-dev-middleware'
// updates components in real-time
import webpackHotMiddleware from 'webpack-hot-middleware'
// provides history object to go to different routes in react router
import historyApiFallback from 'connect-history-api-fallback'

const app = express()

// determine environment
const isDev = process.env.NODE_ENV !== 'production'

// setup port
const port = parseInt(process.env.PORT) || 3222
app.set('port', port)

if (isDev) {
  // stores tailored webpack config to variable
  const compiler = webpack(webpackConfig)

  /* 
  when using the html5 history api, you will want index.html to be served in 
  place of 404 repsonses. The window object exposes a history object with its own 
  properties and methods is the very history object that react router uses for 
  single page navigation. It is set to true at the bottom of the webpack.config.
  */
  app.use(
    historyApiFallback({
      // when set to true, will print redirects to console i.e.:
      // Rewriting GET /practice/1 to /index.html
      verbose: false
    })
  )

  // force webpackdev to use webpack config
  // ??
  app.use(
    webpackDevMiddleware(compiler, {
      // tells server where to serve bundles from and takes precedence
      // bundled files will be available in browser on localhost:port
      publicPath: webpackConfig.output.publicPath,

      // hmr
      hot: true,

      // tells server where to serve content (static files) from
      // will current dir as base but can be changed
      contentBase: path.resolve(__dirname, './client/public'),
      stats: {
        // renders various colored text output during webpack build
        colors: true,
        // adds the hash of the build
        hash: false,
        // adds timing info: "Time: 17007ms"
        timings: true,
        // would display chunk info
        chunks: false,
        // would display built modules info to chuck info
        chunkModules: false,
        // would display built modules info
        modules: false
      }
    } as any)
  )

  // force webpackhot to use webpack config file
  app.use(webpackHotMiddleware(compiler))

  // ?
  app.use(express.static(path.resolve(__dirname, './dist')))
} else {
  app.use(express.static(path.resolve(__dirname, './dist')))

  // routes every request to index file in dist folder
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'))
    res.end()
  })
}

// start app
app.listen(port, '0.0.0.0', err => {
  if (err) console.error(err)

  console.info(
    `>>> Connected to 🌎 . Open http://localhost:${port} in your browser.`
  )
})

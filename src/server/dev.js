import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import 'ignore-styles';

import devConfig from '../../webpack.dev.config';

const compiler = webpack(devConfig);
const app = express();

app.use(
  devMiddleware(compiler, {
    serverSideRender: true
  })
);

app.use(
  hotMiddleware(compiler, {
    serverSideRender: true
  })
);

app.listen(3000, () => console.log('Development server is running on!'));

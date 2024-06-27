import { Application } from './core/index.js';
import {
    usersRouter,
} from './src/routers/index.js';

const server = new Application();

server.addRouter(usersRouter);

server.listen(8080);
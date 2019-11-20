import App from './app';
import controllers from './app/controllers';

const app = new App(controllers);

app.listen();

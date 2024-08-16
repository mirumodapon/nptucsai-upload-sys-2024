import App from '@/app';
import { APP_PORT } from '@/config';

const app = new App({ routes: [] });
app.listen(APP_PORT);

import App from '@/app';
import UsersAuthRoute from '@/routes/usersAuth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import CartsRoutes from './routes/carts.route';
import ItemsRoutes from './routes/items.route';
import OrdersRoutes from './routes/orders.route';
import OwnersAuthRoute from './routes/ownersAuth.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersAuthRoute(), new OwnersAuthRoute(), new ItemsRoutes(), new CartsRoutes(), new OrdersRoutes()]);

app.listen();

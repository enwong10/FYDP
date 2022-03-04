import App from '@/app'
import SunlightRoute from '@/routes/sunlight.route'
import IndexRoute from '@routes/index.route'
import validateEnv from '@utils/validateEnv'

validateEnv()

const app = new App([new IndexRoute(), new SunlightRoute()])

app.listen()

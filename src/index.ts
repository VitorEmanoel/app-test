import Application from './lib/nvERP';
import Routers from "./pages";
import './styles/base/base.scss'

const app = Application()
app.routers(Routers)
app.run()

declare const module: any;


if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
        app.dispose()
    })
}

import Home from "./Home";
import {RoutersConfig} from "../lib/nvERP";
import NotFound from "./NotFound";

const Routers: RoutersConfig = {
    routers: {
        "home": {
            path: "/",
            component: Home,
        },
        "404": {
            component: NotFound
        }
    },

    initialRoute: "home",
}

export default Routers;

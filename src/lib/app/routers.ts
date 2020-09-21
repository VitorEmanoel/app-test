import {Component, initComponent} from "./component";
import {Disposable} from "./disposable";
import {OnInitializeEvent, OnRenderedEvent} from "./events/events";

export interface IRouterManager extends Disposable{
    load(router: Router): void;
    setRouters(routers: MappedRouter): void;
    setup(): void;
}

const RouterManager = (routers: MappedRouter): IRouterManager => {

    let localRouters = routers;

    const self: IRouterManager = {
        load(router: Router): void {
            const component = initComponent()
            const routerComponent = router.component.call(component.context)
            component.callEvent(OnInitializeEvent)
            document.body.innerHTML = routerComponent;
            component.callEvent(OnRenderedEvent)
            window.history.pushState({}, "", router.path);
        },
        setRouters(routers: MappedRouter): void {
            localRouters = routers;
        },
        setup(): void {
            const path = window.location.pathname;
            let foundRouter = false;
            Object.keys(localRouters).forEach(key => {
                const router = localRouters[key]
                if (router.path === path) {
                    self.load(router)
                    foundRouter = true;
                }
            })
            if (!foundRouter) {
                const notFound = localRouters["404"];
                notFound && self.load(notFound);
            }
        },
        dispose() {
            localRouters = {}
        }
    };
    return self;
};

export default RouterManager

export interface MappedRouter {
    [name: string]: Router;
}

export interface Router {
    path?: string;
    component: Component;
}

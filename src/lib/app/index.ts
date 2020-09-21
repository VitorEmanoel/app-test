import RouterManager, {MappedRouter} from "./routers";
import {Disposable} from "./disposable";

export interface IApplication extends Disposable{
    routers(config: RoutersConfig): void
    run(): void
}

export interface RoutersConfig {
    routers: MappedRouter,
    initialRoute?: string;
}

const Application = (): IApplication => {
    let routersConfig: RoutersConfig = {routers: {}};

    const routerManager = RouterManager(routersConfig.routers);

    return {
        routers(config:RoutersConfig ) {
            routersConfig = config;
            routerManager.setRouters(routersConfig.routers);
        },
        run() {
            routerManager.setup()
        },
        dispose() {
            routerManager.dispose()
            routersConfig = {routers: {}}
        }
    }
}

export default Application;

import {IStackNavigation, StackRouters} from "./types";
import {Component} from "../../component";


export const StackNavigation = (element: HTMLElement, routers: StackRouters): IStackNavigation => {

    const routerStack: Component[] = [];

    const render = (name: string) => {

    }

    return {
        pop(): void {
            const component = routerStack.pop()
            if (!component)
                return

        },
        push(name: string): void {
            if (!routers[name])
                return
            const component = routers[name]
            routerStack.push(component)
            render(name)
        }
    }
}

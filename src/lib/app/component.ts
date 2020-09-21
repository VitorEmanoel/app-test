import {EventManager, IEventManager} from "./events/eventManager";
import {OnInitializeEvent, OnRenderedEvent} from "./events/events";

export interface ComponentContext {
    onInitialize(executor: () => void): void;
    onRendered(executor: () => void): void;
}

export type Component = (this: ComponentContext) => string ;

export interface ComponentManager extends IEventManager {
    context: ComponentContext;
}
const createComponentContext = (eventManager: IEventManager): ComponentContext => {
    return {
        onRendered(executor: () => void) {
            eventManager.registerEvent(OnRenderedEvent, executor)
        },
        onInitialize(executor: () => void) {
            eventManager.registerEvent(OnInitializeEvent, executor)
        }
    }
}

export const initComponent = (): ComponentManager => {
    const eventManager = EventManager()
    return {
        context: createComponentContext(eventManager),
        ...eventManager
    }
}

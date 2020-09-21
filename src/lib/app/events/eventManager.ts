import {Disposable} from "../disposable";

export interface Event {
    type: string;
}

export interface IEventManager extends Disposable{
    registerEvent: (event: Event, executor: () => void) => void
    callEvent: (event: Event) => void;
}
export type Executor = () => void;

interface EventsRegisters {
    [eventType: string]: Executor[];
}

export const EventManager = (): IEventManager => {

    let eventsRegister: EventsRegisters = {}

    return {
        registerEvent: (event: Event, executor: () => void) => {
            const { type } = event;
            if (!eventsRegister[type])
                eventsRegister[type] = []
            eventsRegister[type].push(executor)
        },
        callEvent: (event: Event) => {
            const { type } = event;
            const registeredEvents = eventsRegister[type]
            if (!registeredEvents)
                return
            registeredEvents.forEach(executor => {
                executor()
            })
        },
        dispose: () => {
            eventsRegister = {}
        }
    }
}

import {Component} from "../../component";
import {BaseNavigation} from "../navigation";

export interface StackRouters {
    [name: string]: Component
}

export interface IStackNavigation extends BaseNavigation {
    push(name: string): void;
    pop(): void;
}

import HomeTemplate from "./home.html";
import "./styles.scss"
import {Component } from "../../lib/app/component";
const Home: Component = function() {

    this.onInitialize(() => {
        console.log("Initialized component")
    })

    this.onRendered(() => {
        console.log("Rendered component")
    })

    return HomeTemplate;
}

export default Home;

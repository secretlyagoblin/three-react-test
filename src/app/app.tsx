import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CubeScene} from "./cubescene/myScene";
import {Scene} from "./webunity/webunity";

const style = {
    height: 500 // we can control scene size by setting container dimensions
};



class App extends Component {

  mount:any;

  scene:Scene;

    componentDidMount() {
        this.scene.preStart();
        console.log("Scene Setup");
        this.scene.provision();
        console.log("Scene Provisioned");
        this.scene.start();
        console.log("Scene First Frame Rendered");
        this.scene.update();
        console.log("Scene Update Loop Started");
    }

    componentWillUnmount() {

    }

    render(){
        return <div style={style} ref={ref => (this.mount = ref)} />;
    };
}

class BoxApp extends App{
    componentDidMount(){
        this.scene = new CubeScene(this.mount, window);
        super.componentDidMount();
    }
}

class Container extends React.Component {
    state : {isMounted: true} = {isMounted: true};

    render() {
        const {isMounted = true} = this.state;
        return (
            <>
                <button onClick={() => this.setState(state => ({isMounted: !this.state.isMounted}))}>
                    {isMounted ? "Unmount" : "Mount"}
                </button>
                {isMounted && <BoxApp />}
                {isMounted && <div>Scroll to zoom, drag to rotate</div>}
            </>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);
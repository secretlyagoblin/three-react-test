import * as THREE from 'three';
import React, { Component } from "react";

export abstract class AbstractScene{

    _mount:any;
    _requestID:any;
    _style:any;

    _camera:THREE.PerspectiveCamera;
    _scene:THREE.Scene;
    _renderer:THREE.Renderer;

    constructor(protected mount: any, protected requestId: any, protected style:any) { }

    preStart = () => {
        // get container dimensions and use them for scene sizing
        const width = this._mount.clientWidth;
        const height = this._mount.clientHeight;

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this._camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize( width, height );
        this._mount.appendChild( this._renderer.domElement ); // mount using React ref
    };

    start = () =>{

    }

    postStart = () => {
        this._renderer.render( this._scene, this._camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this._requestID = window.requestAnimationFrame(this.postStart);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this._renderer.setSize( width, height );
        this._camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this._camera.updateProjectionMatrix();
    };

    render() {
        return <div style={this._style} ref={ref => (this.mount = ref)} />;
    }
}
import * as THREE from 'three';
import {Scene, GameObject, Monobehaviour} from '../webunity/webunity';
import {Rotate} from './monobehaviours';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { Object3D } from 'three';

export class CubeScene extends Scene{
    
    controls:OrbitControls;

    provision(){
        super.provision();

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        });

        for(var x = 0;x <20; x++){
            var cube = new GameObject(new THREE.Mesh(geometry,material),"Cube",this);
            cube.obj.position.add(new THREE.Vector3(
                Math.random()*20-10,
                Math.random()*10-5,
                Math.random()*10-5
            ));
            cube.addBehaviour(new Rotate());
            this.appendChildToRoot(cube);
        }



        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );

    }

    start(){
        super.start();
        this.controls = new OrbitControls( this.camera, this.mount );
    };

    dispose(){
        super.dispose();
        this.controls.dispose();
    }

 
}
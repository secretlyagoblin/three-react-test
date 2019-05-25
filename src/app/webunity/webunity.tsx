import * as THREE from 'three';

export class Scene{

    mount:any;
    requestId:number = 0;
    window:Window;

    camera:THREE.PerspectiveCamera;
    scene:THREE.Scene;
    renderer:THREE.Renderer;

    deltaTime:number = 0;
    private clock:THREE.Clock = new THREE.Clock();

    gameObjects:GameObject[] = [];

    constructor(mount: any, window: Window) {
        this.mount = mount;
        this.window = window;
     }

    provision(){

    };

    preStart(){
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref
    };

    start(){
        this.clock.start();
        this.gameObjects.forEach(x => x.cycle());
        window.addEventListener('resize', this.handleWindowResize);
    }

    postStart(){
        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        //this.requestId = window.requestAnimationFrame(this.update);
    };

    update(){

        this.deltaTime = this.clock.getDelta();
        this.gameObjects.forEach(x => x.cycle());

        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestId = window.requestAnimationFrame(() =>{this.update()});
    };

    dispose(){
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestId);
    };

    handleWindowResize(){
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    protected appendChild(parent:GameObject, child:GameObject){
        parent.obj.add(child.obj);
        this.gameObjects.push(child);
    };

    protected appendChildToRoot(child:GameObject){
        this.scene.add(child.obj);
        this.gameObjects.push(child);
    };
}

export class GameObject{

    name:string = "";
    obj:THREE.Object3D;
    scene:Scene;
    private monobehaviours:Monobehaviour[] = [];
    private state:GameObjectState;

    constructor(obj:THREE.Object3D, name:string, scene:Scene){
        this.obj = obj;        
        this.name = name;
        this.scene = scene;
    }

    cycle(){
        this.monobehaviours.forEach(x => x.cycle());
    }    

    addBehaviour(behaviour:Monobehaviour){
        behaviour.gameObject = this;
        behaviour.three = this.obj;
        this.monobehaviours.push(behaviour);
    }
}



export abstract class Monobehaviour{

    gameObject:GameObject;
    three:THREE.Object3D;

    private state:MonobehaviourState = MonobehaviourState.AwaitingStart;

    cycle(){
        if(this.state == MonobehaviourState.AwaitingStart){
            this.start();
            this.state = MonobehaviourState.Updating;
        } else if(this.state == MonobehaviourState.Updating){
            this.update();
        } else{

        }
    }
    
    protected start(){
    };

    protected update(){
    };
}

enum MonobehaviourState {
    AwaitingStart,
    Updating
}

enum GameObjectState {
    AwaitingStart,
    Updating
}
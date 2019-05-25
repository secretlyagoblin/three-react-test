import {AbstractScene, GameObject, Monobehaviour} from './scene'

export class Rotate extends Monobehaviour{

    start(){
        this.three.rotation.x += Math.random()*1000;
        this.three.rotation.y += Math.random()*1000;
    }

    update(){
        this.three.rotation.x += 0.01;
        this.three.rotation.y += 0.01;
    }
}
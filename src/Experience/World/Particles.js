import Experience from "../Experience"
import * as THREE from "three"
import particlesVertexShader from "../Shaders/Particles/particles.vs?raw"
import particlesFragmentShader from "../Shaders/Particles/particles.fs?raw"
import Simulation from "./Simulation"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default class Particles extends Simulation {
    constructor() {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes

        this.params = {}
        this.params.count = Math.pow(2, 16)
        this.params.perimeterCount = Math.sqrt(this.params.count)
        this.params.perimeterLength = 100000
        this.params.size = 0.005
        this.params.color = '#ffffff'

        this.geometry = null
        this.material = null
        this.points = null

        this.shouldUpdate = false;

        this.generateText();
    }

    generateText() {
        const loader = new FontLoader();
        loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
            const geometry = new TextGeometry( 'Prime Numbers', {
                font: font,
                size: 300,
                height: 100,
                curveSegments: 100,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const text = new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial()
            )
            text.position.set(-1250, 0, 0);

            this.shouldUpdate = true;
            this.generateParticles(text.geometry.attributes.position);
    
            // this.scene.add(text);
        })

    }

    generateParticles(textData) {

        function getRandomData(count, size ){
            var data = new Float32Array(count * 4)
            for(let i = 0; i < count * 4; i++) {
                data[i + 0] = (Math.random() * 2 - 1) * size * 0.5;
                data[i + 1] = (Math.random() * 2 - 1) * size * 0.5;
                data[i + 2] = 0;
                data[i + 3] = 0;
            }

            return data;
        }

        const spherePositions = getRandomData(this.params.perimeterLength, 1000);
        // console.log(spherePositions);
        
        if(this.points !== null) {
            this.geometry.dispose();
            this.material.dispose();
            this.scene.remove(this.points);
        }

        this.geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.params.count * 3);

        for(let i = 0; i < this.primeNumbers.length; i++) {
            let i2 = i * 2
            let i3 = i * 3
            positions[i3 + 0] = this.cartesianCoordsArray[i2 + 0]
            positions[i3 + 1] = this.cartesianCoordsArray[i2 + 1]
            positions[i3 + 2] = 0

            // console.log(positions[i3 + 0], positions[i3 + 1], positions[i3 + 2]);
        }
        // console.log(positions.length);

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('spherePosition', new THREE.BufferAttribute(spherePositions, 3))

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:
            {
                uTime: { value: null},
                uSize: { value: 5 * this.sizes.pixelRatio }
            },    
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader
        }) 

        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    update() {
        if(this.shouldUpdate) {
            const elapsedTime = this.time.elapsed * 0.001;
            this.material.uniforms.uTime.value = elapsedTime;
        }
    }
}
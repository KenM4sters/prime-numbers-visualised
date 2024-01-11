import Experience from "../Experience"
import * as THREE from "three"
import particlesVertexShader from "../Shaders/Particles/particles.vs?raw"
import particlesFragmentShader from "../Shaders/Particles/particles.fs?raw"
import Simulation from "./Simulation"

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
        this.params.perimeterLength = 100
        this.params.size = 0.005
        this.params.color = '#ffffff'

        this.geometry = null
        this.material = null
        this.points = null

        this.generateParticles()
    }

    generateParticles() {
        
        if(this.points !== null) {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.points)
        }

        this.geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(this.params.count * 3)

        for(let i = 0; i < this.primeNumbers.length; i++) {
            let i2 = i * 2
            let i3 = i * 3
            positions[i3 + 0] = this.primeNumbers[i2 + 0]
            positions[i3 + 1] = this.primeNumbers[i2 + 1]
            positions[i3 + 2] = 0

        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:
            {
                uTime: { value: this.time },
                uSize: { value: 300 * this.sizes.pixelRatio }
            },    
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader
        }) 

        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)

    }
}
import Experience from "../Experience";
import * as THREE from "three"
import PolarToCartesian from "../Utils/Coordinates";

export default class Simulation {
    constructor() {

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.polar = new PolarToCartesian();
        this.cartesianCoordsArray = []

        // Creating the Meshes
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({wireframe: true})
        )

        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(2, 10, 10),
            new THREE.MeshBasicMaterial({wireframe: true})
        )
        
        // Modifying positions as needed
        this.cube.position.x = 10


        // Add to the scene
        // this.scene.add(this.cube)
        // this.scene.add(this.sphere)

        this.primeNumbers = this.collectPrimes(10000)

        for(let i = 0; i < this.primeNumbers.length; i++) {

            this.cartesianCoordsArray.push(this.polar.convertCoords(this.primeNumbers[i]).xCoord)
            this.cartesianCoordsArray.push(this.polar.convertCoords(this.primeNumbers[i]).yCoord)
        }

    

         
    }

    collectPrimes(n) {
            // Eratosthenes algorithm to find all primes under n
            var array = [], upperLimit = Math.sqrt(n), output = [];
        
            // Make an array from 2 to (n - 1)
            for (var i = 0; i < n; i++) {
                array.push(true);
            }
        
            // Remove multiples of primes starting from 2, 3, 5,...
            for (var i = 2; i <= upperLimit; i++) {
                if (array[i]) {
                    for (var j = i * i; j < n; j += i) {
                        array[j] = false;
                    }
                }
            }
        
            // All array[i] set to true are primes
            for (var i = 2; i < n; i++) {
                if(array[i]) {
                    output.push(i);
                }
            }
        
            return output;
        }
    }   

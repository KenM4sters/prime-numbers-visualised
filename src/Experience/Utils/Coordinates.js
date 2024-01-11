
export default class PolarToCartesian {
    constructor() {
        this.topLeft = false;
        this.topRight = false;
        this.bottomLeft = false;
        this.bottomRight = false;

        this.cartesianCoord = {}
        this.cartesianCoord.xCoord = 0
        this.cartesianCoord.yCoord = 0
    }

    convertCoords(polarCoord) {
        let angleDeg = this.radsToDegrees(polarCoord)
        // console.log(polarCoord)
        // console.log(angleDeg);

        this.cartesianCoord.xCoord = polarCoord * Math.cos(angleDeg)
        this.cartesianCoord.yCoord = polarCoord * Math.sin(angleDeg)

        // console.log(this.cartesianCoord.xCoord)
        // console.log(this.cartesianCoord.yCoord)

        if(this.topLeft)
            this.cartesianCoord.xCoord *= -1

        if(this.bottomLeft) {
            this.cartesianCoord.xCoord *= -1
            this.cartesianCoord.yCoord *= -1
        }

        if(this.bottomRight) {
            this.cartesianCoord.yCoord *= -1
        }

        this.topLeft = false
        this.topRight = false
        this.bottomLeft = false
        this.bottomRight = false

        return this.cartesianCoord
    }

    radsToDegrees(polarCoord) {
        let angle = polarCoord * (180 / Math.PI)

        while(angle > 360) {
            // console.log(angle);
            angle -= 360
        }
        // console.log(angle);

        if(angle > 0 && angle < 90)
            this.topRight = true
        
        if(angle > 90 && angle < 180)
            this.topLeft = true
        
        if(angle > 180 && angle < 270)
            this.bottomLeft = true

        if(angle < 270 && angle < 360)
            this.bottomRight = true

        return angle
    }

}

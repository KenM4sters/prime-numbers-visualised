uniform float uSize;
uniform float uTime;
attribute vec3 spherePosition;

void main() {

    vec3 mixedPositions = mix(spherePosition, position, min(uTime * 0.4, 1.0));

    vec4 modelPosition = modelMatrix * vec4(mixedPositions, 1.0);
    modelPosition.y += sin(modelPosition.x) * cos(modelPosition.z);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize;


}
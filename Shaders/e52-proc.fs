/* Procedural shading example for Exercise 5-2 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform vec3 colorA;
uniform vec3 colorB;
uniform float flowers;
void main()
{
    float x = v_uv.x * flowers;
    float y = v_uv.y * flowers;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x - xc - 0.5;
    float dy = y - yc - 0.5;

    float r = length(vec2(dx, dy)) * 3.0;
    float a = atan(dx, dy);
    float f = abs(sin(a * 8.0));
    vec3 color = vec3(step(f + 0.1, r));
    
    gl_FragColor = vec4(mix(colorA, colorB, color), 1.0);
}

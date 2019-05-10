/* a simple procedural texture for exercise 5-1 */
/* the student should change this to implement a checkerboard */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    vec2 st = vec2(v_uv.x * checks, v_uv.y * checks);
    st = fract(st);

    vec2 aa = vec2(0.01 * 0.5);
    vec2 size = vec2(0.5);
    
    vec2 fcx = smoothstep(size, size + aa, st);
    vec2 fcy = smoothstep(size, size + aa, vec2(1.0) - st);
    float dc = fcx.x * fcx.y + fcy.x * fcy.y;

    gl_FragColor = vec4(mix(light,dark,dc), 1.);
}

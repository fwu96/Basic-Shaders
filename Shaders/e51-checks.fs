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
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x - xc - 0.5;
    float dy = y - yc - 0.5;

    float d = sqrt(dx * dy);

    float dc = step(d, 0.7);
    //float dc = .5;

    gl_FragColor = vec4(mix(light,dark,dc), 1.);
}

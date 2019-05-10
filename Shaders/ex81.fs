/* Procedural shading example for Exercise 8-1 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 v_normal;
const vec3 drLight = vec3(0, 1, 1);
void main()
{
    float x = v_uv.x * 3.0;
    float y = v_uv.y * 3.0;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x - xc - 0.5;
    float dy = y - yc - 0.5;

    float d = sqrt(dx * dx + dy * dy);
    float dc = step(d, 0.3);

    vec3 colorA = vec3(0.5, 0.5, 0.0);
    vec3 colorB = vec3(0.1, 0.4, 0.8);
    vec3 nhat = normalize(v_normal);
    float light = abs(dot(nhat, drLight));
    gl_FragColor = vec4(mix(colorA, colorB, dc) * light, 1.0);
    //gl_FragColor = vec4(.5, .5, 0 , 1.);
}

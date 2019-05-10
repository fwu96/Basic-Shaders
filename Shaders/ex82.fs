/* Procedural shading example for Exercise 8-2 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 v_normal;
const vec3 drLight = vec3(0, 2, 2);
uniform sampler2D texture;
void main()
{
    vec4 image = texture2D(texture, v_uv);
    vec3 nhat = normalize(v_normal);
    float light = abs(dot(nhat, drLight));
    gl_FragColor = vec4(image.rgb * light, image.a);
}

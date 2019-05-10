/* Procedural shading example for Exercise 8-3 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 v_normal;
uniform vec3 dirLight;
uniform vec3 worldLight;
uniform float colorR;
uniform float colorG;
uniform float colorB;
uniform float flowers;
uniform float fcolorR;
uniform float fcolorG;
uniform float fcolorB;
uniform float flength;
uniform float petals;
void main()
{
    //vec3 color = vec3(.5, .5, 0);
    vec3 nhat = normalize(v_normal);
    float light1 = abs(dot(nhat, dirLight));
    vec3 dirLight2 = normalize(viewMatrix * vec4(worldLight, 0)).xyz;
    float light2 = abs(dot(nhat, dirLight2));
    float x = v_uv.x * flowers;
    float y = v_uv.y * flowers;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x - xc - 0.5;
    float dy = y - yc - 0.5;

    float r = length(vec2(dx, dy)) * flength;
    float a = atan(dx, dy);
    float f = abs(sin(a * petals));

    vec3 baseColor = vec3(colorR, colorG, colorB);
    vec3 color = vec3(step(f + 0.1, r));
    vec3 fColor = vec3(fcolorR, fcolorG, fcolorB);
    gl_FragColor = vec4(mix(fColor, baseColor, color) * light2 * light1, 1.);
}

/*jshint esversion: 6 */
// @ts-check

/* this is the driver program for Exercise 5-1 (Page 5, box 3)
 * you shouldn't need to modify it, but you are allowed to
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// get things we need
import { GrWorld } from "./Framework/GrWorld.js";
import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import * as InputHelpers from "./Libs/inputHelpers.js";
import * as SimpleObjects from "./Framework/SimpleObjects.js";
import {shaderMaterial} from "./Framework/shaderHelper.js";

function test() {
    let mydiv = document.getElementById("5-4");

    let world = new GrWorld({width:(mydiv ? 600:800), where:mydiv});

    let objs = [];
    let dx = -6;

    let shaderMat = shaderMaterial("./Shaders/e52-proc.vs","./Shaders/e52-proc.fs",
        {
            side:T.DoubleSide,
            uniforms: {
                colorA: {type: 'vec3', value: new T.Color(0x64B5F6)},
                colorB: {type: 'vec3', value: new T.Color(0xF8BBD0)},
                flowers: {value: 1.0}
            }
        });

    let s1 = new InputHelpers.LabelSlider("Flowers", {width: 400, min: 1, max: 5, step: 0.5, initial: 1, where: mydiv});
    function onchange()
    {
        shaderMat.uniforms.flowers.value = s1.value();
    }
    s1.oninput = onchange;
    onchange();
    world.add(new SimpleObjects.GrSphere({x:-2,y:1, material:shaderMat}));
    world.add(new SimpleObjects.GrSquareSign({x:2,y:1,size:1,material:shaderMat}));

    world.go();
}
Helpers.onWindowOnload(test);

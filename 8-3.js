/*jshint esversion: 6 */
// @ts-check

/* this is the driver program for Exercise 8-3 (Page 8, box 3)
 * you are allowed to modify it
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
    let mydiv = document.getElementById("8-3");

    let world = new GrWorld({width:(mydiv ? 600:800), where:mydiv});

    let objs = [];
    let dx = -6;

    let shaderMat = shaderMaterial("./Shaders/ex83.vs","./Shaders/ex83.fs",
        {
            side:T.DoubleSide,
            uniforms: {
                colorR: {value: 0.0},
                colorG: {value: 0.0},
                colorB: {value: 0.0},
                flowers: {value: 1.0},
                fcolorR: {value: 1.0},
                fcolorG: {value: 0.0},
                fcolorB: {value: 0.0},
                worldLight: {value: new T.Vector3(0, 0, 3)},
                dirLight: {value: new T.Vector3(0, 3, 0)},
                flength: {value: 2.0},
                petals: {value: 4.0}
            }
        });
    let s1 = new InputHelpers.LabelSlider("R", {width: 400, min: 0.0, max: 1.0, initial: 0.0, step: 0.1, where: mydiv});
    let s2 = new InputHelpers.LabelSlider("G", {width: 400, min: 0.0, max: 1.0, initial: 0.0, step: 0.1, where: mydiv});
    let s3 = new InputHelpers.LabelSlider("B", {width: 400, min: 0.0, max: 1.0, initial: 0.0, step: 0.1, where: mydiv});
    let s4 = new InputHelpers.LabelSlider("Flower", {width: 400, min: 1.0, max: 4.0, initial: 1.0, step: 0.5, where: mydiv});
    let s5 = new InputHelpers.LabelSlider("flength", {width: 400, min: 2.2, max: 8.0, initial: 3.0, step: 0.1, where: mydiv});
    let s6 = new InputHelpers.LabelSlider("Petals", {width: 400, min: 4.0, max: 8.0, initial: 5.0, step: 0.5, where: mydiv});
    let initialBR, initialBG, initialBB, initialLG, initialP;
    // sliders control color
    function onchange()
    {
        shaderMat.uniforms.colorR.value = s1.value();
        shaderMat.uniforms.colorG.value = s2.value();
        shaderMat.uniforms.colorB.value = s3.value();
        shaderMat.uniforms.flowers.value = s4.value();
        shaderMat.uniforms.fcolorR.value = 1.0 - s1.value();
        shaderMat.uniforms.fcolorG.value = 1.0 - s2.value();
        shaderMat.uniforms.fcolorB.value = 1.0 - s3.value();
        initialBR = s1.value();
        initialBG = s2.value();
        initialBB = s3.value();
        initialLG = s5.value();
        initialP = s6.value();
        shaderMat.uniforms.flength.value = s5.value();
        shaderMat.uniforms.petals.value = s6.value();
    }
    s1.oninput = onchange;
    s2.oninput = onchange;
    s3.oninput = onchange;
    s4.oninput = onchange;
    s5.oninput = onchange;
    s6.oninput = onchange;
    onchange();
    let b1 = new InputHelpers.makeButton("Automatically", mydiv);
    let b2 = new InputHelpers.makeButton("Manually", mydiv);
    let speedR = 0, speedG = 0, speedB = 0, speedLG = 0, speedP = 0;
    let changeR = 0, changeG = 0, changeB = 0, changeLG = 0, changeP = 0;
    // auto change color
    function auto()
    {
        let new_value1 = (initialBR + speedR) % 100;
        let new_value2 = (initialBG + speedG) % 100;
        let new_value3 = (initialBB + speedB) % 100;
        let new_value4 = (initialLG + speedLG) % 100;
        let new_value5 = (initialP + speedP) % 100;
        if (new_value1 >= 0.99) changeR = 1;
        if (new_value1 <= 0) changeR = 0;
        if (new_value2 >= 0.99) changeG = 1;
        if (new_value2 <= 0) changeG = 0;
        if (new_value3 >= 0.99) changeB = 1;
        if (new_value3 <= 0) changeB = 0;
        if (new_value4 >= 7.99) changeLG = 1;
        if (new_value4 <= 2.2) changeLG = 0;
        if (new_value5 >= 7.99) changeP = 1;
        if (new_value5 <= 4.0) changeP = 0;
        if (changeR === 1) new_value1 = (initialBR - speedR) % 100;
        else new_value1 = (initialBR + speedR) % 100;
        if (changeG === 1) new_value2 = (initialBG - speedG) % 100;
        else new_value2 = (initialBG + speedG) % 100;
        if (changeB === 1) new_value3 = (initialBB - speedB) % 100;
        else new_value3 = (initialBB + speedB) % 100;
        if (changeLG === 1) new_value4 = (initialLG - speedLG) % 100;
        else new_value4 = (initialLG + speedLG) % 100;
        if (changeP === 1) new_value5 = (initialP - speedP) % 100;
        else new_value5 = (initialP + speedP) % 100;
        initialBR = new_value1;
        initialBG = new_value2;
        initialBB = new_value3;
        initialLG = new_value4;
        initialP = new_value5;
        shaderMat.uniforms.colorR.value = initialBR;
        shaderMat.uniforms.colorG.value = initialBG;
        shaderMat.uniforms.colorB.value = initialBB;
        shaderMat.uniforms.fcolorR.value = 1.0 - initialBR;
        shaderMat.uniforms.fcolorG.value = 1.0 - initialBG;
        shaderMat.uniforms.fcolorB.value = 1.0 - initialBB;
        shaderMat.uniforms.flength.value = initialLG;
        shaderMat.uniforms.petals.value = initialP;
        window.requestAnimationFrame(auto);
    }
    auto();
    // two different effects when clicking each button
    b1.onclick = function()
    {
        speedR = 0.006;
        speedG = 0.008;
        speedB = 0.01;
        speedLG = 0.04;
        speedP = 0.05;
    };
    b2.onclick = function()
    {
        speedR = 0;
        speedG = 0;
        speedB = 0;
        speedLG = 0;
        speedP = 0;
    };
    let sphere = new SimpleObjects.GrSphere({x: -3, y:1, material: shaderMat});
    world.add(sphere);
    let sign = new SimpleObjects.GrSquareSign({x: 3, y: 1, size: 1, material: shaderMat});
    world.add(sign);
    let cube = new SimpleObjects.GrCube({x: 0, y: 1.5, size: 1.5, material: shaderMat, color: "white"});
    world.add(cube);
    // Let three objects rotate
    sphere.advance = function(delta, timeOfDay)
    {
        sphere.objects[0].rotateY(0.0008 * delta);
        sign.objects[0].rotateY(0.0008 * delta);
        cube.objects[0].rotateX(0.0008 * delta);
        cube.objects[0].rotateY(0.0008 * delta);
    };
    world.go();
}
Helpers.onWindowOnload(test);

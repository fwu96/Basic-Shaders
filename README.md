# README file for Workbook (Assignment) 8

It is the student's responsibility to fill this in.
See <https://graphics.cs.wisc.edu/WP/cs559-sp2019/workbooks/#README_files>

## please answer these first three required questions "inline" (as in the instructions)

Name: Feifan Wu

WiscID: fwu62

GitHub Login: fwu96

## please answer these next (optional) questions on a line following the questions

Attributions: 

http://texturify.com/category/environment-panoramas.html

Parts of the Assignment you did (or did not) do:

Did you do any bonus parts?

Did you add any texture or object files?

Notes to the Grader:
- 5-2
    - I make my own pattern, the slider will change the number of flower
    - The pattern is similar with the previous box, which will make nxn patter with the number change
    - I get the idea of the shape flower from Book of Shaders
- 6-1
    - I tried to make the Anti-Aliased Checkerboard exercise
- 8-2
    - The texture I used in 8-2 is found online, for which the link is in the attribution
- 8-3:
    - There are four sliders, the R, G, B sliders control the base color of two objects
    - The Flowers slider control the number of flowers
    - The R, G, B sliders also control the color of flowers, the flowers color will change with the base color changing
    - I add two buttons under four sliders
        - The button `Automatically` will make those three objects (I added a cube) color automatically when clicked
        - The button `manually` will make the color stop changing automatically when clicked
    - In the shader, I add two light into the world, and those two lights are passed from the host program
        - One of the light changes position with the changing of camera, which should be located at the top of object
        - The other one is fixed-position light, which located at the front of the objects
        - With shadow in the sphere might make it clear to see that there are two lights, and one of the moving with camera
    - I make those three objects rotating
    - I add two more uniforms in the host program, which also are passed to fragment shader
        - One of them is the length of the flower, and the other one is the number of petal of the flowers
        - There are two more sliders, one controls the length and the other controls the number of petal
        - When hit the button `Automatically`, besides the effects described above, the length and number petal will automatically changing as well
    
        
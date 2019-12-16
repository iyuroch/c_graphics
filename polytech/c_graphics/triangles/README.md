## Development
### live server - please refer to live-server npm module
live-server
### watch rebuild - install typescript
tsc -w
### this is to check number of lines
find . -name '*.ts' | xargs wc -l

## Using
For trying out this build check the build folder
and place in field.json all description for triangle

{
    // single segment - number to scale x and y
    "single_segment": 3,
    // list of triangles we will draw
    "triangles": [
        {
            // center of triangle
            "center": [50, 50],
            // direction of top vertex
            "direction": 90,
            // distance from center to vertex
            "length": 20,
            // color to fill inside of triangle
            "fillcolor": "green",
            // line color
            "line_style": "red",
            // figure to put on vertex of triangle
            // is optional
            // 3 possible options:
            // rectangle, triangle and dot
            "figure": "rectangle"
        },
        {
            "center": [90, 90],
            "direction": 70,
            "length": 10,
            "fillcolor": "red",
            "line_style": "green",
            "figure": "triangle"
        },
        {
            "center": [70, 70],
            "direction": 119,
            "length": 30,
            "fillcolor": "black",
            "line_style": "green",
            "figure": "dot"
        }
    ]
}

var fs = require('fs')
var { stringify } = require('svgson')


const pathToIndexJson = __dirname + "/index.json"

const pathToDefaultOutput = __dirname + "/../src/symbols/default.ts"
const pathToIconOutput = __dirname + "/../src/symbols/icon.ts"

const indexObj = JSON.parse(fs.readFileSync(pathToIndexJson))

const deepClone = obj => JSON.parse(JSON.stringify(obj))

const stringifiedDefaultIndex = Object
    .entries(deepClone(indexObj))
    .reduce((acc, [key, val]) => {

        val.attributes = {
            transform: '@TR'
        }

        val.children.forEach((child => {
            if (typeof child.attributes.stroke !== 'undefined') {
                child.attributes['stroke-width'] = '@SW'
                // child.attributes['vector-effect'] = 'non-scaling-stroke'

            }

            // if (child.type === 'line')

            delete child.attributes.dataisgeon
        }))

        acc[key] = stringify(val)
            .replace(/"/g, "'");
        return acc
    }, {})

fs.writeFileSync(
    pathToDefaultOutput,
    "const index = " + JSON.stringify(stringifiedDefaultIndex).replace(/"([^"]+)":/g, '$1:') + "; export default index"
    )


const stringifiedIconIndex = Object
    .entries(deepClone(indexObj))
    .reduce((acc, [key, val]) => {

        val.attributes = {
            transform: '@TR'
        }

        val.children = val.children.filter((child => {
            // console.log(child.attributes)
            return child.attributes.dataisgeon === 'true' 
        }))

        val.children.forEach((child => {
            if (typeof child.attributes['stroke-width'] !== 'undefined') {
                child.attributes['stroke-width'] = '@SW'
                // child.attributes['vector-effect'] = 'non-scaling-stroke'
            }


            delete child.attributes.dataisgeon
        }))

        acc[key] = stringify(val)
            .replace(/"/g, "'");
        return acc
    }, {})

fs.writeFileSync(
    pathToIconOutput,
    "const index = " + JSON.stringify(stringifiedIconIndex).replace(/"([^"]+)":/g, '$1:') + "; export default index"
)
const { sigil, stringRenderer } = require('../dist/index')
const svgson = require('svgson')

const ast = {
  name: 'svg',
  attributes: {
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    },
    viewBox:`0 0 128 128`,
    preserveAspectRatio: "xMidYMid meet",
    width: `128px`,
    height: `128px`,
    version:'1.1',
    xmlns:"http://www.w3.org/2000/svg",
    className: '',
  },
  children: [
    {
      name: 'rect',
      attributes: {
        fill: 'black',
        width: `128px`,
        height: `128px`,
        x: '#FFF',
        y: '#FFF',
      },
      children: [],
    },
    {
      "name": "g",
      "value": "",
      "attributes": {},
      "children": [
        {
          "name": "g",
          "value": "",
          "attributes": {
            "fill": "none"
          },
          "children": [
            {
              "name": "path",
              "value": "",
              "attributes": {
                "d": "M0 0C0 70.6925 57.3075 128 128 128V0H0Z",
                "fill": '#000'
              },
              "children": []
            },
            {
              "name": "line",
              "value": "",
              "attributes": {
                "x1": "-0.0029152",
                "x2": "127.983",
                "y2": "127.986",
                "stroke": '#FFF',
                "stroke-linecap": "square",
                "fill": "none",
                "vector-effect": "non-scaling-stroke"
              },
              "children": []
            },
            {
              "name": "circle",
              "value": "",
              "attributes": {
                "cx": "64",
                "cy": "64",
                "r": "11.5",
                "fill": '#000',
                "stroke": '#000',
                "vector-effect": "non-scaling-stroke"
              },
              "children": []
            },
            {
              "name": "circle",
              "value": "",
              "attributes": {
                "cx": "64",
                "cy": "64",
                "r": "9",
                "fill": '#FFF',
                "stroke": '#FFF',
                "stroke-width": "2",
                "vector-effect": "non-scaling-stroke"
              },
              "children": []
            },
            {
              "name": "circle",
              "value": "",
              "attributes": {
                "cx": "16",
                "cy": "112",
                "r": "11.5",
                "fill": '#FFF',
                "stroke": '#FFF',
                "vector-effect": "non-scaling-stroke"
              },
              "children": []
            },
            {
              "name": "circle",
              "value": "",
              "attributes": {
                "cx": "16",
                "cy": "112",
                "r": "9",
                "fill": '#000',
                "stroke": '#000',
                "stroke-width": "2",
                "vector-effect": "non-scaling-stroke"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}


test('String Renderer has output', () => {
  expect( () => { stringRenderer(ast) }).not.toThrow()
})

test('stringRenderer has valid output', () => {
  expect(() => { svgson.parseSync(stringRenderer(ast))}).not.toThrow()
})

import React from 'react'
import { get, map } from 'lodash'

const appendChildNodes = (p, svgNode) => {
  map(get(p, 'children', []), child => SVGComponents[child.tag](child)).forEach(c => {
    svgNode.appendChild(c);
  });
  return svgNode;
};

const createChildNode = (p, nodeName) => {
  let node = document.createElement(nodeName);
  Object.keys(p.attr).forEach(k => { 
    node.setAttribute(k, p.attr[k]);
  });
  return appendChildNodes(p, node);
};

const SVGComponents = {
  svg: p => {
    let node = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    node.setAttribute("version", "1.1");
    node.setAttribute("xlmns", "http://www.w3.org/2000/svg");
    Object.keys(p.attr).forEach(k => { 
      node.setAttribute(k, p.attr[k]);
    });
    return appendChildNodes(p, node);
  },
  circle: p => {
    return createChildNode(p, "circle");
  },
  rect: p => {
    return createChildNode(p, "rect");
  },
  path: p => {
    return createChildNode(p, "path");
  },
  g: p => {
    return createChildNode(p, "g");
  },
  polygon: p => {
    return createChildNode(p, "polygon");
  },
  line: p => {
    return createChildNode(p, "line");
  },
  polyline: p => {
    return createChildNode(p, "polyline");
  }
}

export default SVGComponents

import * as React from "react";
import ob from 'urbit-ob'
import {
  Box,
  Row,
  Rule,
  Text,
  Col,
  Center,
  ItemRow,
  Space,
  Code,
  Icon,
  Anchor,
  styleAnchor,
} from "@tlon/indigo-react";

import { sigil, reactRenderer } from 'sigil-js'
import * as prev from '@tlon/sigil-js'
// import { sigil, reactRenderer } from '../../../dist/index.js'
const compose = (...fs) => {
  return fs.reduceRight((f, g) => (...args) => g(f(...args)), (v) => v)
}
const randInt = max => Math.floor(Math.random() * Math.floor(max));

const noSig = str => str.replace(/~+/g, '');

const sequence = num => Array.from(Array(num), (_, i) => i);

const COMET = 'COMET'
const MOON = 'MOON'
const PLANET = 'PLANET'
const STAR = 'STAR'
const GALAXY = 'GALAXY'


const randPatp = k => {
  let b = 8;
  if (k === COMET) b = 128;
  if (k === MOON) b = 64;
  if (k === PLANET) b = 32;
  if (k === STAR) b = 16;
  if (k === GALAXY) b = 8;
  return randInt(Math.pow(2, b) - 1);
}


const randPlanet = () => compose(noSig, ob.patp, randPatp)(PLANET);


export default class Home extends React.Component {

  render() {
    const random = randPlanet()
    return (
      <Box>
        <button onClick={() => this.setState({})}>Render</button>
        {
            sigil({
              patp: random,
              renderer: reactRenderer,
              colors: ['white', 'black'],
              size: 128,
            })
        }
        {
            sigil({
              patp: random,
              renderer: reactRenderer,
              colors: ['white', 'black'],
              width: 32,
              height: 32,
              icon: true,
            })
        }
        {
            prev.sigil({
              patp: random,
              renderer: reactRenderer,
              colors: ['white', 'black'],
              size: 128,
            })
        }
        {
            prev.sigil({
              patp: random,
              renderer: reactRenderer,
              colors: ['white', 'black'],
              width: 32,
              height: 32,
              icon: true,
            })
        }
        {
          sigil({
            patp: '~ridlur-figbud',
            renderer: reactRenderer,
            colors: ['white', 'black'],
            width: 16,
            height: 16,
            icon: true,
          })
        }
        {
          sigil({
            patp: '~ravmel-ropdyl',
            renderer: reactRenderer,
            colors: ['white', 'black'],
            width: 16,
            height: 16,
            icon: true,
          })
        }
        {
          sigil({
            patp: '~fabled-faster',
            renderer: reactRenderer,
            colors: ['white', 'black'],
            width: 16,
            height: 16,
            icon: true,
          })
        }
        {
          sigil({
            patp: '~fallyn-balfus',
            renderer: reactRenderer,
            colors: ['white', 'black'],
            width: 16,
            height: 16,
            icon: true,
          })
        }
        {
          sigil({
            patp: '~ridlur-figbud',
            renderer: reactRenderer,
            width: 64,
            height: 64
          })
        }
        {
          sigil({
            patp: '~ridlur-figbud',
            renderer: reactRenderer,
            size: 64,
          })
        }
        {
          sigil({
            patp: '~ridlur-figbud',
            renderer: reactRenderer,
            size: 64,
            margin: false,
          })
        }
        {
          sigil({
            patp: '~figbud',
            renderer: reactRenderer,
            size: 64,
          })
        }
        {
          sigil({
            patp: '~ridlur',
            renderer: reactRenderer,
            width: 128,
            height: 64,
            margin: false,
          })
        }
        {
          sigil({
            patp: '~wet',
            renderer: reactRenderer,
            width: 64,
            height: 64
          })
        }
      </Box>
    )
  }
}

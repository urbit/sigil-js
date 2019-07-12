import React, { Component } from "react";
import {sigil, reactRenderer} from '../../../../lib/dist/index'
import ob from 'urbit-ob';

const compose = (...fs) => {
  return fs.reduceRight((f, g) => (...args) => g(f(...args)), (v) => v)
}

const randInt = max => Math.floor(Math.random() * Math.floor(max));

const noSig = str => str.replace(/~+/g, '');
const sequence = num => Array.from(Array(num), (_, i) => i);

const SHIP_TYPES = {
  COMET: 'COMET',
  MOON: 'MOON',
  PLANET: 'PLANET',
  STAR: 'STAR',
  GALAXY: 'GALAXY',
}

const randShip = k => {
  let b = 8;
  if (k === SHIP_TYPES.COMET) b = 128;
  if (k === SHIP_TYPES.MOON) b = 64;
  if (k === SHIP_TYPES.PLANET) b = 32;
  if (k === SHIP_TYPES.STAR) b = 16;
  if (k === SHIP_TYPES.GALAXY) b = 8;
  return randInt(Math.pow(2, b) - 1);
}

const randomShip = (classOf) => {
  return compose(noSig, ob.patp, randShip)(classOf);
};


class Main extends Component {


  render() {

    const patps = [
    'noslec-hopsyx',
    'noslec-hopbyl',
    'noslec-hoppyl',
    'bus',
    'binzod',
    'sabbus',
    'listen',
    'ridnul-fignul',
    'ridlur-figbud',
    'littel-ponnys',
    'palfun-folsop',
    '~mignyt-mogseb',
    '~poldec-tonteg',
    '~master-morzod',
    '~pitmug-roptec',
    'ligrun-rilbus',
    'roslet-tanner',
    'ponnys-podfer',
    '~patnes-rigtyn',
    '~ravmel-ropdyl',
    '~novlud-padtyv',
    '~fallyn-balfus',
    '~tacryt-socryp',
    '~hidrel-fabtel',
  ]

  const randoms = sequence(312).map(() => randomShip('PLANET'))

    return (
      <div className="bg-black">
        <div className="p8 flex flex-wrap">
          <p className="mono">Glyph Toolkit</p>

          {
            // Object
            //   .entries(index)
            //   .map(([k, v], i) => {
            //     return (
            //       <div className="flex-center flex-col bg-black p1 m1">
            //         {
            //           glyph({
            //             patp: k,
            //             index: index,
            //             size: 512,
            //             // margin:0,
            //             renderer: ReactSVGRenderer,
            //             className: "mr1 mt1",
            //             colors: ['white', 'black'].reverse(),
            //           })
            //         }
            //         <div class="white">{k}</div>
            //       </div>
            //     )
            // })
          }

          <div className="flex flex-wrap mono">
          {
            randoms.map((p, i) => {
              return (
                <div key={i} className='flex mono'>
                  {
                    sigil({
                      patp: p,
                      // index: index,
                      size: 128,
                      renderer: reactRenderer,
                      // className: "mr1 mt1",
                      // iconMode: true,
                      // margin: -17,
                      colors: ['white', 'black'].reverse(),
                    })
                  }
                  {
                    // sigil({
                    //   patp: p,
                    //   index: index,
                    //   size: 64,
                    //   // margin:0,
                    //   renderer: ReactSVGRenderer,
                    //   className: "mr1 mt1",
                    //   colors: ['white', 'black'].reverse(),
                    // })
                  }
                  {
                    // sigil({
                    //   patp: p,
                    //   index: index,
                    //   size: 128,
                    //   // margin:0,
                    //   renderer: ReactSVGRenderer,
                    //   className: "mr1 mt1",
                    //   colors: ['white', 'black'].reverse(),
                    // })
                  }
                  {
                    // sigil({
                    //   patp: p,
                    //   index: index,
                    //   size: 512,
                    //   // margin:0,
                    //   renderer: ReactSVGRenderer,
                    //   className: "mr1 mt1",
                    //   colors: ['white', 'black'].reverse(),
                    // })
                  }
                </div>
              )
            }
          )
          }
          </div>

        </div>
      </div>
    );
  }
}

export default Main;

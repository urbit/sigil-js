const _jsxFileName = "/Users/gavinatkinson/tlon/sigil-js/toolkit/preview/src/js/Main.js";import React, { Component } from "react";
import {sigil, reactRenderer, stringRenderer, reactImageRenderer} from '../../../../lib/dist/index'
import ob from 'urbit-ob';
import FileSaver from 'file-saver';

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

  downloadSVG() {
    const config = {
      patp:'noslec-hopsyx',
      renderer: stringRenderer,
      size: 32,
      colors: ['white', 'black'].reverse(),
    };

    const s = sigil(config);

    const b = new Blob([s], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(b, `sigljstest.svg`);
  }

  // downloadPNG() {
  //   const { patp, pngSize, colors } = this.state;
  //
  //   const _size = pngSize / window.devicePixelRatio;
  //
  //   console.log(window.devicePixelRatio, _size, pngSize);
  //
  //   // initialize canvas element
  //   this.canvas = initCanvas(this.scr_ref, { x: _size, y: _size });
  //   const ctx = this.canvas.getContext('2d');
  //
  //   // make sigil svg and encoded into base64
  //   const svg = sigil({
  //     patp:'noslec-hopsyx',
  //     renderer: stringRenderer,
  //     size: 32,
  //     colors: ['white', 'black'].reverse(),
  //     // margin: (54 / 256) * _size,
  //   });
  //   const svg64 = btoa(svg);
  //   const image64 = DATA_URI_PREFIX + svg64;
  //
  //   // load this image, then
  //   loadImg(image64, img => {
  //     // draw into canvas context, convert canvas context to blob and download
  //     ctx.drawImage(img, 0, 0, _size, _size);
  //     const png = dataURItoBlob(this.canvas.toDataURL("image/png"));
  //     saveAs(png, `${this.state.patp}.png`);
  //     ctx.clearRect(0, 0, pngSize, pngSize);
  //
  //   });
  //
  //   return;
  // }


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

  // const randoms = sequence(312).map(() => randomShip('STAR'))

  const sizes = [32, 64, 72, 128, 256]

  const s = 32
  const r = reactImageRenderer

  const configs = [
    {
      patp: 'ridlur-figbud',
      size: s,
      renderer: r,
      style: { border: '1px solid blue' },
      class: 'm2',
      margin: false,
      colors: ['white', 'black'],
    },
    {
      patp: 'ridlur-figbud',
      size: s,
      renderer: r,
      style: { border: '1px solid blue' },
      class: 'm2',
      margin: true,
      colors: ['white', 'black'],
    },
    {
      patp: 'ridlur',
      size: s,
      renderer: r,
      style: { border: '1px solid blue' },
      class: 'm2',
      margin: false,
      colors: ['white', 'black'],
    },
    {
      patp: 'ridlur',
      size: s,
      renderer: r,
      style: { border: '1px solid blue' },
      class: 'm2',
      margin: true,
      colors: ['white', 'black'],
    },
    {
      patp: 'rid',
      size: s,
      renderer: r,
      style: { border: '1px solid blue' },
      class: 'm2',
      margin: false,
      colors: ['white', 'black'],
    },
    {
      patp: 'rid',
      size: s,
      renderer: r,
      style: { border: '1px solid blue' },
      class: 'm2',
      margin: true,
      colors: ['white', 'black'],
    },
  ]

    return (
      React.createElement('div', { className: "bg-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
        , React.createElement('button', { onClick: ()=>this.downloadSVG(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}, "Download Test SVG"  )
        
          // <button onClick={()=>this.downloadPNG()}>Download Test PNG</button>
        

        , React.createElement('div', { className: "p8 flex flex-col"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
          , React.createElement('p', { className: "mono", __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}, "Glyph Toolkit" )

          , React.createElement('span', { class: "flex flex-wrap" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
          , 
            configs.map((config, i) => {
              return (
                React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
                  , 
                    sigil(config)
                  
                  , React.createElement('pre', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
                    , 
                      JSON.stringify(config, null, '  ')
                    
                  )
                )
              )
            })

          
          )
          
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
          

          , React.createElement('div', { className: "flex flex-wrap mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}
          
          //   randoms.map((p, i) => {
          //     return (
          //       <div key={i} className='flex mono p1'>
          //         {
          //           sigil({
          //             patp: p,
          //             // index: index,
          //             size: 128,
          //             renderer: reactRenderer,
          //             // className: "mr1 mt1",
          //             // iconMode: true,
          //             // margin: 1,
          //             colors: ['black', 'white'],
          //           })
          //         }
          //         {
          //           // sigil({
          //           //   patp: p,
          //           //   index: index,
          //           //   size: 64,
          //           //   // margin:0,
          //           //   renderer: ReactSVGRenderer,
          //           //   className: "mr1 mt1",
          //           //   colors: ['white', 'black'].reverse(),
          //           // })
          //         }
          //         {
          //           // sigil({
          //           //   patp: p,
          //           //   index: index,
          //           //   size: 128,
          //           //   // margin:0,
          //           //   renderer: ReactSVGRenderer,
          //           //   className: "mr1 mt1",
          //           //   colors: ['white', 'black'].reverse(),
          //           // })
          //         }
          //         {
          //           // sigil({
          //           //   patp: p,
          //           //   index: index,
          //           //   size: 512,
          //           //   // margin:0,
          //           //   renderer: ReactSVGRenderer,
          //           //   className: "mr1 mt1",
          //           //   colors: ['white', 'black'].reverse(),
          //           // })
          //         }
          //       </div>
          //     )
          //   }
          // )
          
          )

        )
      )
    );
  }
}

export default Main;

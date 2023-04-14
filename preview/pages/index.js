import Head from 'next/head'
import { useState } from 'react'
import ob from 'urbit-ob'
import '../lib/index'

const sequence = num => Array.from(Array(num), (_, i) => i);

const compose = (...fs) => {
  return fs.reduceRight((f, g) => (...args) => g(f(...args)), (v) => v)
}
const randInt = max => Math.floor(Math.random() * Math.floor(max));

const noSig = str => str.replace(/~+/g, '');

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

export default function Home() {
  // console.log(sigil)

  const [point, setPoint] = useState('ridlur-figsun')
  const [size, setSize] = useState(150)
  const [qty, setQty] = useState(1)
  const [detail, setDetail] = useState('default')
  const [space, setSpace] = useState('large')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <Head>
        <title>Sigil Preview</title>
      </Head>

      <main className="flex flex-wrap items-center justify-center w-full flex-1 px-20 text-center">

        {
          sequence(qty).map(() => {
            return (
              <urbit-sigil point={point} size={size} detail={detail} space={space} bg="#010101" fg="yellow" />
            )
          })
        }

        <div 
          style={{ width: "220px" }}
          className="hidden md:flex absolute top-0 left-0 m-4 flex-col">
          <div className="bg-white p-4 rounded-2xl flex flex-col">
            <h4 className="text-lg font-bold">Sigil-js V2.0</h4>

            <button
              className="mt-2"
              onClick={() => setPoint(randPlanet())}
            >
              Random
            </button>

            <button
              className="mt-2"
              onClick={() => setPoint('ridlur-figbud')}
            >
              ~ridlur-figbud
            </button>

            <button
              className="mt-2"
              onClick={() => setPoint('marzod')}
            >
              ~marzod
            </button>

            <button
              className="mt-2"
              onClick={() => setPoint('tyl')}
            >
              ~tyl
            </button>

            <button
              className="mt-2"
              onClick={() => setPoint('binbin-binbin')}
            >
              ~binbin-binbin
            </button>

            <button
              className="mt-2"
              onClick={() => setPoint('binbin')}
            >
              ~binbin
            </button>

            <button
              className="mt-2"
              onClick={() => setPoint('bin')}
            >
              ~bin
            </button>

            <hr className="mt-4 mb-2 p-0 -mx-4" />
            <b>Space</b>
            <button
              className="mt-2"
              onClick={() => setSpace('none')}
            >
              None
            </button>
            <button
              className="mt-2"
              onClick={() => setSpace('default')}
            >
              Default
            </button>
            <button
              className="mt-2"
              onClick={() => setSpace('large')}
            >
              Large
            </button>
            <hr className="mt-4 mb-2 p-0 -mx-4" />

            <hr className="mt-4 mb-2 p-0 -mx-4" />
            <b>Size</b>
            <button
              className="mt-2"
              onClick={() => setSize(500)}
            >
              500
            </button>
            <button
              className="mt-2"
              onClick={() => setSize(100)}
            >
              100
            </button>
            <button
              className="mt-2"
              onClick={() => setSize(32)}
            >
              32
            </button>

            <button
              className="mt-2"
              onClick={() => setSize(24)}
            >
              24
            </button>

            <button
              className="mt-2"
              onClick={() => setSize(12)}
            >
              12
            </button>

            <b>Detail Mode</b>
            <button
              className="mt-2"
              onClick={() => setDetail('default')}
            >
              Default
            </button>
            <button
              className="mt-2"
              onClick={() => setDetail('icon')}
            >
              Icon
            </button>

            <p>
              Viewing <b>{point}</b>
            </p>

          </div>
        </div>
      </main>
    </div>
  )
}

import Head from 'next/head'
import { useState } from 'react'
import sigil from '../lib/index'

const sequence = num => Array.from(Array(num), (_, i) => i);

export default function Home() {
  // console.log(sigil)

  const [point, setPoint] = useState('zod')


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <Head>
        <title>Sigil Preview</title>
      </Head>

      <main className="flex flex-wrap items-center justify-center w-full flex-1 px-20 text-center">

        {
          sequence(2000).map(() => {
            return <div className="p-1 bg-white" dangerouslySetInnerHTML={{ __html: sigil({point: point, size:16, background:'white', foreground:'black', mode:'icon'}) }} />
          })
        }

        

        <aside className="absolute left-4 top-4 bg-white rounded-xl p-4">
            <button onClick={() => setPoint('ridlur-figbud')}>ridlur-figbud</button>

        </aside>
      </main>
    </div>
  )
}

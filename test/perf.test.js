const sigil = require('../dist/index').default;
const oldLib = require('@tlon/sigil-js');

console.log(sigil)


const config = {
  point: '~ridlur-figbud',
};

const old_config = {
  patp: '~ridlur-figbud',
};


test('1000 zods', async () => {
  expect(() => {

    var iterations = 10000;
    console.time('ten-thousand-zods');
    
    for(var i = 0; i < iterations; i++ ){
      sigil(config);
    };

    console.timeEnd('ten-thousand-zods')

    var iterations = 10000;
    console.time('ten-thousand-zods-old');
    
    for(var i = 0; i < iterations; i++ ){
      oldLib.sigil(old_config);
    };

    console.timeEnd('ten-thousand-zods-old')

  }).not.toThrow();
});

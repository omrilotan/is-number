const { Suite } = require('benchmark');
const cursor = require('ansi')(process.stdout);
const fixtures = require('./fixtures');

const cycle = (e, nl) => {
  cursor.eraseLine();
  cursor.horizontalAbsolute();
  cursor.write('' + e.target);
  if (nl) cursor.write('\n');
};

function bench(name) {
  const suite = new Suite()
    .on('start', () => console.log(`# ${name}`))
    .on('complete', function(e) {
      const fastest = this.filter('fastest').map('name').toString();
      console.log(`fastest is '${fastest}'`);
      console.log();
    })

  const res = {
    run: suite.run.bind(suite),
    add(key, fn) {
      suite.add(key, {
        onCycle: e => cycle(e),
        onComplete: e => cycle(e, true),
        fn
      });
      return res;
    }
  };
  return res;
}

function run(fn, prop = 'all') {
  [].concat(fixtures[prop]).forEach(val => fn(val));
}

bench('all')
  .add('v6.2', () => run(isNumber62))
  .add('v6.1', () => run(isNumber61))
  .add('parseFloat', () => run(isNumberParseFloat))
  .run()

bench('string')
  .add('v6.2', () => run(isNumber62, 'string'))
  .add('v6.1', () => run(isNumber61, 'string'))
  .add('parseFloat', () => run(isNumberParseFloat, 'string'))
  .run()

bench('number')
  .add('v6.2', () => run(isNumber62, 'number'))
  .add('v6.1', () => run(isNumber61, 'number'))
  .add('parseFloat', () => run(isNumberParseFloat, 'number'))
  .run()

function isNumberParseFloat(n) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string') {
    return (num - parseFloat(num)) > -1;
  }
  return false;
}

function isNumber61(val) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
}

function isNumber62(val) {
  if (typeof num === 'number' || num instanceof Number) {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
}


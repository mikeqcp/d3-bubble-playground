import _ from 'lodash';

let idCounter = 0;

export function generateItems() {
  return _.times(
    _.random(5, 20),
    () => {
      return {
        id: ++idCounter,
        x: _.random(0, 100),
        y: _.random(0, 100),
        color: '#' + ((1<<24) * Math.random()|0).toString(16),
        size: _.random(1, 10),
        label: `Item no. ${idCounter}`
      };
    });
}


export function reset() {
  idCounter = 0;
}

export function modifyPositions(data) {
  return data.map(d => {
    d.x = _.clamp(d.x + _.random(-10, 10), 0, 100);
    d.y = _.clamp(d.y + _.random(-10, 10), 0, 100);
    return d;
  });
}

export function modifySizes(data) {
  return data.map(d => {
    d.size = Math.max(1, d.size + _.random(-3, 3));
    return d;
  });
}

export function removeRandom(data) {
  return data.filter(() => Math.random() > .3);
}

export function updateColors(data) {
  return data.map(d => {
    d.color = '#' + ((1<<24) * Math.random()|0).toString(16);
    return d;
  });
}

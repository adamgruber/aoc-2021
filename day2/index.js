import { getExampleInput, getInput } from '../utils.js';
import Submarine from './sub.js';

const transformer = str => str.split('\n').map(line => line.split(' '));

const exampleCourse = getExampleInput(2, transformer);
const course = getInput(2, transformer);

const exampleSub = new Submarine(exampleCourse);
const examplePos = exampleSub.run();
console.log(examplePos[0] * examplePos[2]);

const sub = new Submarine(course);
const pos = sub.run();
console.log(pos[0] * pos[2]);

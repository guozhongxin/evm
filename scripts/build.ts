import * as fs from 'fs';
const web3 = require('web3');

import * as functions from '../data/functions.json';
import * as events from '../data/events.json';

functions.sort((a, b) => a.localeCompare(b));
events.sort((a, b) => a.localeCompare(b));

const functionHashes: any = functions.reduce((map: any, functionName: any) => {
    const sig = web3.utils.sha3(functionName).substring(2, 10);
    if (sig in map) {
        map[sig] = map[sig] + '|' + functionName;
    } else {
        map[sig] = functionName;
    }
    return map;
}, {});

const eventHashes: any = events.reduce((map: any, eventName: any) => {
    const sig = web3.utils.sha3(eventName).substring(2);
    if (sig in map) {
        map[sig] = map[sig] + '|' + eventName;
    } else {
        map[sig] = eventName;
    }
    return map;
}, {});

fs.writeFileSync('./data/functionHashes.json', JSON.stringify(functionHashes, null, 4));
fs.writeFileSync('./data/functions.json', JSON.stringify(functions, null, 4));
fs.writeFileSync('./data/eventHashes.json', JSON.stringify(eventHashes, null, 4));
fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 4));

console.log('Updated hashes successfully');

const uuidv4 = require('uuid/v4'); // random uuid 

export default function createIdGenerator() {
    return uuidv4;
}

const getKey = () => {
    return Math.random() + '_' + Math.random();
};

const testSearch = (count) => {
    testListSearch(count);
    testObjSearch(count);
    testStrSearch(count);
};


const testListSearch = (count) => {
    const list = [];
    const prepareStart = Date.now();
    for (let i = 0; i < count; i++) {
        list.push(getKey());
    }
    console.log('list prepare cost:', Date.now() - prepareStart);
    const searchStart = Date.now();
    for (let i = 0; i < count; i++) {
        list.includes(getKey());
    }
    console.log('list search cost:', Date.now() - searchStart);
};


const testObjSearch = (count) => {
    const obj = {};
    const prepareStart = Date.now();
    for (let i = 0; i < count; i++) {
        obj[getKey()] = 1;
    }
    console.log('obj prepare cost:', Date.now() - prepareStart);
    const searchStart = Date.now();
    for (let i = 0; i < count; i++) {
        obj[getKey()];
    }
    console.log('obj search cost:', Date.now() - searchStart);
};


const testStrSearch = (count) => {
    let str = '';
    const prepareStart = Date.now();
    for (let i = 0; i < count; i++) {
        str += getKey();
    }
    console.log('str prepare cost:', Date.now() - prepareStart);
    const searchStart = Date.now();
    for (let i = 0; i < count; i++) {
        str.includes(getKey());
    }
    console.log('str search cost:', Date.now() - searchStart);
};

testSearch(10000);


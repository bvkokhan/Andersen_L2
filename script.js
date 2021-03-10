function makeObjectDeepCopy(obj) {
    const clonedObj = {};
    for (let i in obj) {
        if (obj[i] instanceof Object) {
            clonedObj[i] = makeObjectDeepCopy(obj[i]);
            continue;
        }
        clonedObj[i] = obj[i];
    }
    return clonedObj;
}



function selectFromInterval(array, min, max) {
    let lower = min,
        upper = max;

    if (typeof lower !== 'number' || typeof upper !== 'number') {
        throw new Error('Limits of interval is not correct');
    }
    if (upper < lower) {
        let tmp = lower;
        lower = upper;
        upper = tmp;
    }
    let range = {};
    range.lower = lower;
    range.upper = upper;

    function isInRange(value) {
        return value >= this.lower && value <= this.upper;
    }

    if (Array.isArray(array)) {
        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] !== 'number') {
                throw new Error('Not only numbers in array');
            }
        }
        const filteredArr = array.filter(isInRange, range);
        return filteredArr;
    } else {
        throw new Error('It is not array');
    }
}


let myIterable = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        return this;
    },

    next() {
        if (typeof this.from !== 'number' || typeof this.to !== 'number') {
            return {
                done: true,
                value: console.error('Invalid type of arguments')
            };
        }
        if (this.to < this.from) {
            return {
                done: true,
                value: console.error('Wrong order of arguments')
            };
        }
        if (this.current === undefined) {
            this.current = this.from;
        }

        if (this.current <= this.to) {
            return {
                done: false,
                value: this.current++
            };
        } else {
            delete this.current;
            return {
                done: true
            };
        }
    }
};
'use strict';

const assertTransform = require('assert-transform');
const babel = require('babel-core');
const path = require('path');
const assert = require('assert');

const getBabelOps = pluginOps => {
    return {
        plugins: [[path.resolve(__dirname, '../index.js'), pluginOps]]
    };
};

const babelOps = getBabelOps();

describe('function test', () => {
    it('import test', () => {
        return assertTransform(
            path.join(__dirname, './function/import.actual.js'),
            path.join(__dirname, './function/import.expected.js'),
            babelOps
        )
    })

    it('export default test', () => {
        return assertTransform(
            path.join(__dirname, './function/exportDefault.actual.js'),
            path.join(__dirname, './function/exportDefault.expected.js'),
            babelOps
        )
    })

    it('export test', () => {
        return assertTransform(
            path.join(__dirname, './function/export.actual.js'),
            path.join(__dirname, './function/export.expected.js'),
            babelOps
        )
    })
})

describe('ignore test', () => {
    it('ignore typical nej file', () => {
        return assertTransform(
            path.join(__dirname, './ignore/typical-nej.js'),
            path.join(__dirname, './ignore/typical-nej.js'),
            babelOps
        )
    })

    it('ignore nej with named callback', () => {
        return assertTransform(
            path.join(__dirname, './ignore/nej-with-named-callback.js'),
            path.join(__dirname, './ignore/nej-with-named-callback.js'),
            babelOps
        )
    })
})
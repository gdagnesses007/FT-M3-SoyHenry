'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

const PENDING_STATE = 'pending'
const FULFILLED_STATE = 'fulfilled'
const REJECTED_STATE = 'rejected'

function $Promise(executor) {
    if (typeof (executor) !== 'function') {
        throw new TypeError(/executor.+function/i)
    }
    this._state = PENDING_STATE
    this._value = undefined
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}

$Promise.prototype._internalResolve = function (data) {
    if (this._state === PENDING_STATE) {
        this._value = data
        this._state = FULFILLED_STATE
    }
}

$Promise.prototype._internalReject = function (data) {
    if (this._state === PENDING_STATE) {
        this._value = data
        this._state = REJECTED_STATE
    }
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

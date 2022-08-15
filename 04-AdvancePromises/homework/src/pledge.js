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
    this._handlerGroups = []
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}

$Promise.prototype._internalResolve = function (data) {
    if (this._state === PENDING_STATE) {
        this._value = data
        this._state = FULFILLED_STATE
    }
    this._callHandlers()
}

$Promise.prototype._internalReject = function (data) {
    if (this._state === PENDING_STATE) {
        this._value = data
        this._state = REJECTED_STATE
    }
}

$Promise.prototype.then = function (successCb, errorCb) {
    const handler = {
        successCb: typeof (successCb) === 'function' ? successCb : false,
        errorCb: typeof (errorCb) === 'function' ? errorCb : false
    }
    this._handlerGroups.push(handler)
    this._callHandler(handler)
}

$Promise.prototype._callHandler = function (handler) {
    if (this._state === FULFILLED_STATE) {
        handler.successCb(this._value)
    } else if (this._state === REJECTED_STATE) {
        handler.errorCb(this._value)
    }
}

$Promise.prototype._callHandlers = function () {
    this._handlerGroups.forEach(handler => {
        this._callHandler(handler)
    })
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

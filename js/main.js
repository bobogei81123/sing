(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_questions2.default);
class Machine {
    constructor() {
        this.question_html = $('#question-para');
        this.answer_html = $('#answer-para');
        this.question_n = _questions2.default.length;
        this.state = 0;
    }

    refresh_question() {
        let a = [];
        console.log(a);
        const rd = Math.floor(Math.random() * this.question_n);
        this.question = _questions2.default[rd];
        this.question_html.text(this.question.question);
        this.answer_html.text('');
    }

    show_answer() {
        this.answer_html.text(this.question.answer);
    }

    next() {
        if (!this.state) {
            this.state = 1;
            this.show_answer();
        } else {
            this.state = 0;
            this.refresh_question();
        }
    }

    init() {
        this.refresh_question();
        $('body').click(() => this.next());
    }
}

const machine = new Machine();
machine.init();

},{"./questions":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let questions = [{
    question: '御三家',
    answer: `尾張、紀伊、水戶家`,
    level: 4
}, {
    question: '123',
    answer: `234`,
    level: 3
}, {
    question: 'abc',
    answer: `def`,
    level: 3
}];
exports.default = questions;

},{}]},{},[1]);

// ==UserScript==
// @name         Stack Overflow Age Highlighter
// @namespace    stackoverflow
// @version      0.1
// @description  Make it really obvious when you're looking at old questions
// @author       Scott Martin (https://github.com/scottdotjs)
// @match        *://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

(function (d) {
    'use strict';

    let style = `
    #createdDate {
        display: inline-block;
        padding: 0 0.5em;
    }

    .body-slightlyOld {
        background-image: linear-gradient(
            to right,
            rgba(255, 255, 0, 1) 0%,
            rgba(255, 255, 0, 1) 206px,
            rgba(255, 255, 255, 1) 207px,
            rgba(255, 255, 255, 1) 100%
        );
    }

    .body-quiteOld {
        background-image: linear-gradient(
            to right,
            rgba(255, 153, 51, 1) 0%,
            rgba(255, 153, 51, 1) 206px,
            rgba(255, 255, 255, 1) 207px,
            rgba(255, 255, 255, 1) 100%
        );
    }

    .body-veryOld {
        background-image: linear-gradient(
            to right,
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 0, 0, 1) 206px,
            rgba(255, 255, 255, 1) 207px,
            rgba(255, 255, 255, 1) 100%
        );
    }

    .slightlyOld {
        background: rgba(255, 255, 0, 0.75);
        color: rgba(0, 0, 0, 1);
    }

    .quiteOld {
        background: rgba(255, 153, 51, 0.75);
        color: rgba(0, 0, 0, 1);
    }

    .veryOld {
        background: rgba(255, 0, 0, 0.75);
        color: rgba(255, 255, 255, 1);
    }`;

    const dateCreatedField = document.querySelector('time[itemprop="dateCreated"]');
    const dateCreated = new Date(dateCreatedField.getAttribute('datetime'));
    const timeElapsed = new Date() - dateCreated;

    const yearLength = 1000 * 60 * 60 * 24 * 365;
    const slightlyOldThreshold = 3 * yearLength;
    const quiteOldThreshold = 5 * yearLength;
    const veryOldThreshold = 7 * yearLength;

    function flagQuestion (type) {
        const s = d.createElement('style');
        s.textContent = style;
        d.head.appendChild(s);

        dateCreatedField.setAttribute('id', 'createdDate');
        dateCreatedField.setAttribute('class', type);

        document.querySelector('body').setAttribute('class', 'body-' + type);
    }

    let warningType =
        timeElapsed >= veryOldThreshold ? 'veryOld'
        : timeElapsed >= quiteOldThreshold ? 'quiteOld'
        : timeElapsed >= slightlyOldThreshold ?'slightlyOld'
        : undefined;

    warningType && flagQuestion(warningType);
})(document);

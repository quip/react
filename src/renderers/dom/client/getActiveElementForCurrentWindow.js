/**
 * Copyright Quip 2017
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getActiveElementForCurrentWindow
 * @typechecks
 */


/**
 * Re-implementation of getActiveElement from fbjs that uses ReactCurrentWindow
 * to get the active element in the window that the currently executing component
 * is rendered into.
 */
'use strict';

var ReactCurrentWindow = require('ReactCurrentWindow');

function getActiveElement() /*?DOMElement*/{
  var currentWindow = ReactCurrentWindow.currentWindow();
  var document = currentWindow.document;
  if (typeof document === 'undefined') {
    return null;
  }
  try {
    return document.activeElement || document.body;
  } catch (e) {
    return document.body;
  }
}

module.exports = getActiveElement;

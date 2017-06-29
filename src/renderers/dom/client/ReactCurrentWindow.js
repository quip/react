/**
 * Copyright 2017 Quip
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentWindow
 */

'use strict';

var ReactDOMComponentTree = require('ReactDOMComponentTree');
var ReactInstanceMap = require('ReactInstanceMap');
var ReactLastActiveThing = require('ReactLastActiveThing');

var getHostComponentFromComposite = require('getHostComponentFromComposite');

var lastCurrentWindow;

function warn(message) {
  if (__DEV__) {
    console.warn(message);
  }
}

function windowFromNode(node) {
  if (node.ownerDocument) {
    return node.ownerDocument.defaultView ||
        node.ownerDocument.parentWindow;
  }
  return null;
}

function extractCurrentWindow() {
  var thing = ReactLastActiveThing.thing;
  if (!thing) {
    warn('No active thing.');
    return null;
  }

  // We can't use instanceof checks since the object may be from a different
  // window and thus have a different constructor (from a different JS
  // context).
  if (thing.window === thing) {
    // Already a window
    return thing;
  }

  if (typeof thing.nodeType !== 'undefined') {
    // DOM node
    var nodeParentWindow = windowFromNode(thing);
    if (nodeParentWindow) {
      return nodeParentWindow;
    } else {
      warn('Could not determine node parent window.');
      return null;
    }
  }

  if (thing.getPublicInstance) {
    // Component
    var component = thing.getPublicInstance();
    if (!component) {
      warn('Could not get component public instance.');
      return null;
    }
    var inst = ReactInstanceMap.get(component);
    if (!inst) {
      warn('Component is not in the instance map.');
      return null;
    }
    inst = getHostComponentFromComposite(inst);
    if (!inst) {
      warn('Cannot get host component.');
      return null;
    }
    var componentNode = ReactDOMComponentTree.getNodeFromInstance(inst);
    if (!componentNode) {
      warn('Could not get node from component.');
      return null;
    }
    var componentParentWindow = windowFromNode(componentNode);
    if (componentParentWindow) {
      return componentParentWindow;
    }
    warn('Could not determine component node parent window.');
    return null;
  }

  warn('Fallthrough, unexpected active thing type');
  return null;
}

var ReactCurrentWindow = {
  currentWindow: function() {
    if (window.top === window) {
      // Fast path for non-frame cases.
      return window;
    }

    var currentWindow = extractCurrentWindow();
    if (currentWindow) {
      lastCurrentWindow = ReactLastActiveThing.thing = currentWindow;
      return currentWindow;
    }
    if (lastCurrentWindow) {
      warn('Could not determine current window, using the last value');
      return lastCurrentWindow;
    }
    warn('Could not determine the current window, using the global value');
    return window;
  },
};

module.exports = ReactCurrentWindow;

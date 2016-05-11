/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactWithAddons
 */

/**
 * This module exists purely in the open source project, and is meant as a way
 * to create a separate standalone build of React. This build has "addons", or
 * functionality we've built and think might be useful but doesn't have a good
 * place to live inside React core.
 */

'use strict';

var React = require('React');
var ReactCSSTransitionGroup = require('ReactCSSTransitionGroup');
var ReactFragment = require('ReactFragment');

React.addons = {
  CSSTransitionGroup: ReactCSSTransitionGroup,
  createFragment: ReactFragment.create,
};


module.exports = React;

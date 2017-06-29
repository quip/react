/**
 * Copyright 2017 Quip
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactLastActiveComponent
 */

'use strict';

/**
 * Stores a reference to the most recently component DOM container (for the
 * initial render) or updated component (for updates). Meant to be used by
 * {@code ReactCurrentWindow} to determine the window that components are
 * currently being rendered into.
 */
var ReactLastActiveThing = {
  /**
   * @type {Window|DOMElement|ReactComponent|null}
   */
  thing: null,

};

module.exports = ReactLastActiveThing;

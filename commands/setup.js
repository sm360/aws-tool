#!/usr/bin/env node

'use strict';

var io = require('../lib/io');
var authConfig = require('../config/auth');

io.promptSetup()
    .then(authConfig.update);

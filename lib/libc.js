/*
 * @Author: lkspc 
 * @Date: 2017-10-02 00:50:23 
 * @Last Modified by: lkspc
 * @Last Modified time: 2017-10-10 14:29:03
 */

'use strict';

const ffi = require('ffi');
const ref = require('ref');

const void_t = ref.types.void;
const void_ptr = ref.refType(void_t);
const size_t = ref.types.size_t;
const ptr_t = process.arch === 'x64' ? ref.types.uint64 : ref.types.uint32;

/**
 * common c functions
 */
module.exports = ffi.Library(
  process.platform === 'win32' ? 'msvcrt' : 'libc', {
    malloc: [void_ptr, [size_t]],
    free: [void_t, [void_ptr]],
    memcpy: [void_ptr, [ptr_t, ptr_t, size_t]]
  }
);
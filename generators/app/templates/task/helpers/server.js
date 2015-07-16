import browserSync from 'browser-sync';

export const dev = browserSync.create('dev');
export const test = browserSync.create('test');
export const prod = browserSync.create('prod');

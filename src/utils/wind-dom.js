/**
 * Created by ss on 18/3/8.
 */
import {inBrowser} from './browser';

export const once = inBrowser ? require('wind-dom/src/event').once : undefined;

export const addClass = inBrowser ? require('wind-dom/src/class').addClass : undefined;

export const removeClass = inBrowser ? require('wind-dom/src/class').removeClass : undefined;

export const setStyle = inBrowser ? require('wind-dom/src/style').setStyle : undefined;

export const getStyle = inBrowser ? require('wind-dom/src/style').getStyle : undefined;

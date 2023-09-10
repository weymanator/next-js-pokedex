export const safeStr = str => typeof str === 'string' ? str : (str !== null && typeof str.toString === 'function' ? str.toString() : '')

export const capital = str => safeStr(str).replace(/^(.)/, match => match.toUpperCase())
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneFormatter = exports.moneyFormatter = exports.nameFormatter = void 0;
const nameFormatter = (value) => {
    let str = value;
    let result = true;
    const re = /^[a-zA-Z]+$/;
    for (let i = 0; i < str.split("").length; i += 1) {
        result = re.test(str.split("")[i]);
        if (!result) {
            str = str.split("");
            str.splice(i, 1);
            str = str.join("");
            return str;
        }
    }
    if (!str) {
        str = "";
        return str;
    }
    str = str.toLowerCase();
    str = str[0].toUpperCase() + str.slice(1);
    return str;
};
exports.nameFormatter = nameFormatter;
const moneyFormatter = (money, isFormat1000 = false) => {
    let equal = 10000;
    if (isFormat1000) {
        equal = 1000;
    }
    if (Number(money) >= equal) {
        money = String(parseInt(money).toLocaleString("en-US")).replaceAll(",", " ");
    }
    return money;
};
exports.moneyFormatter = moneyFormatter;
const phoneFormatter = (number, preset = [3, 7, 10]) => {
    let arr = String(number).split("");
    let stroke = "-";
    arr.splice(preset[0], 0, stroke);
    arr.splice(preset[1], 0, stroke);
    arr.splice(preset[2], 0, stroke);
    const string = "+" + arr.join("");
    return string;
};
exports.phoneFormatter = phoneFormatter;

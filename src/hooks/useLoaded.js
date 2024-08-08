"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_uuid_1 = __importDefault(require("react-uuid"));
const useLoaded = (props) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(props?.defaultLoadingState || false);
    const timeout = (0, react_1.useRef)(null);
    const emitFetching = (callback) => {
        setIsLoading(true);
        callback?.((0, react_uuid_1.default)());
        if (!props.enableTimeout)
            return;
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };
    const emitLoaded = (callback) => {
        setIsLoading(false);
        callback?.((0, react_uuid_1.default)());
        clearTimeout(timeout.current);
    };
    return {
        emitFetching,
        emitLoaded,
        isLoading,
    };
};
exports.default = useLoaded;

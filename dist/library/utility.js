"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempFile = tempFile;
const os_1 = __importDefault(require("os"));
const node_path_1 = __importDefault(require("node:path"));
function tempFile(name = "temp.txt") {
    if (!name) {
        throw new Error("name is required");
    }
    const tmpdir = os_1.default.tmpdir();
    return node_path_1.default.join(tmpdir, name);
}
//# sourceMappingURL=utility.js.map
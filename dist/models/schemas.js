"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorSchema = void 0;
const parquetjs_1 = __importDefault(require("parquetjs"));
/**
 * library owner schema
 */
exports.vendorSchema = new parquetjs_1.default.ParquetSchema({
    name: { type: 'UTF8' },
    quantity: { type: 'INT64' },
    price: { type: 'DOUBLE' },
    date: { type: 'TIMESTAMP_MILLIS' },
    in_stock: { type: 'BOOLEAN' }
});
//# sourceMappingURL=schemas.js.map
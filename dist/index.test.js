"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Requires
 */
const globals_1 = require("@jest/globals");
const parquetjs_1 = __importDefault(require("parquetjs"));
const schemas_1 = require("./models/schemas");
const utility_1 = require("./library/utility");
(0, globals_1.describe)("write, read", () => {
    (0, globals_1.test)("Vendor-ironSource", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new Date();
        const filename = (0, utility_1.tempFile)("fruits.parquet");
        console.log(filename);
        /* WRITE */
        var writer = yield parquetjs_1.default.ParquetWriter.openFile(schemas_1.vendorSchema, filename);
        yield writer.appendRow({
            name: "apples",
            quantity: 10,
            price: 2.5,
            date: ds,
            in_stock: true,
        });
        yield writer.appendRow({
            name: "oranges",
            quantity: 10,
            price: 2.5,
            date: ds,
            in_stock: true,
        });
        // Close! Bad things happen we we don't
        yield writer.close();
        /* READ */
        let reader = yield parquetjs_1.default.ParquetReader.openFile(filename);
        // create a new cursor
        let cursor = reader.getCursor();
        // read all records from the file and print them
        let record;
        while ((record = yield cursor.next())) {
            console.log(record);
        }
        // Close! Bad things happen when we don't
        yield reader.close();
    }));
});
//# sourceMappingURL=index.test.js.map
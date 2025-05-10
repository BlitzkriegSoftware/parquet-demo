"use strict";

/**
 * Requires
 */
import { describe, test, expect } from "@jest/globals";

import parquet from "parquetjs";

import { vendorSchema } from "./models/schemas";
import { tempFile } from "./library/utility";

describe("write, read", () => {
  test("Vendor", async () => {
    const filename = tempFile("fruits.parquet");

    var writer = await parquet.ParquetWriter.openFile(vendorSchema, filename);

    // append a few rows to the file
    await writer.appendRow({
      name: "apples",
      quantity: 10,
      price: 2.5,
      date: new Date(),
      in_stock: true,
    });

    await writer.appendRow({
      name: "oranges",
      quantity: 10,
      price: 2.5,
      date: new Date(),
      in_stock: true,
    });

    await writer.close();

    let reader = await parquet.ParquetReader.openFile(filename);

    // create a new cursor
    let cursor = reader.getCursor();

    // read all records from the file and print them
    let record;
    while ((record = await cursor.next())) {
      console.log(record);
    }

    await reader.close();
  });
});

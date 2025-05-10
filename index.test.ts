"use strict";

/**
 * Requires
 */
import { describe, test, expect } from "@jest/globals";

import parquet from "parquetjs";

import { vendorSchema } from "./models/schemas";
import { tempFile } from "./library/utility";

describe("write, read", () => {
  test("Vendor-ironSource", async () => {
    const ds = new Date();
    const filename = tempFile("fruits.parquet");
    console.log(filename);

    /* WRITE */
    var writer = await parquet.ParquetWriter.openFile(vendorSchema, filename);

    await writer.appendRow({
      name: "apples",
      quantity: 10,
      price: 2.5,
      date: ds,
      in_stock: true,
    });

    await writer.appendRow({
      name: "oranges",
      quantity: 10,
      price: 2.5,
      date: ds,
      in_stock: true,
    });

    // Close! Bad things happen we we don't
    await writer.close();

    /* READ */

    let reader = await parquet.ParquetReader.openFile(filename);
    // create a new cursor
    let cursor = reader.getCursor();

    // read all records from the file and print them
    let record;
    while ((record = await cursor.next())) {
      console.log(record);
    }

    // Close! Bad things happen when we don't
    await reader.close();
  });
});

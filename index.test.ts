"use strict";

/**
 * Requires
 */
import { describe, test, expect } from "@jest/globals";

import parquet from "parquetjs";

import { Fruit, vendorSchema } from "./models/schemas";
import { tempFile } from "./library/utility";
import { RowInterface } from "parquetjs/lib/row.interface";

describe("write, read", () => {
  test("Vendor-ironSource", async () => {
    const ds = new Date();

    const data: Array<Fruit> = [
      {
        name: "apples",
        quantity: 10,
        price: 2.5,
        date: ds,
        in_stock: true,
      },
      {
        name: "oranges",
        quantity: 10,
        price: 2.5,
        date: ds,
        in_stock: true,
      },
    ];

    const filename = tempFile("fruits.parquet");
    console.log(filename);

    /* WRITE */
    const writer = await parquet.ParquetWriter.openFile(vendorSchema, filename);

    data.forEach(async (d) => {
      await writer.appendRow(d);
    });

    // Close! Bad things happen we we don't
    await writer.close();

    /* READ */

    const reader = await parquet.ParquetReader.openFile(filename);
    // create a new cursor
    const cursor = reader.getCursor();

    // read all records from the file and print them
    let record: RowInterface;
    while ((record = await cursor.next())) {
      const f = record as Fruit;
      expect(f).not.toBeNull();
      console.log(f);
      const result = data.find((d) => d.name == f.name);
      expect(result).toBeDefined();
    }

    // Close! Bad things happen when we don't
    await reader.close();
  });
});

"use strict";

import parquet from "parquetjs";

export type Fruit = {
  name: string;
  quantity: number;
  price: number;
  date: Date;
  in_stock: boolean;
};

export const vendorSchema = new parquet.ParquetSchema({
  name: { type: "UTF8" },
  quantity: { type: "INT64" },
  price: { type: "DOUBLE" },
  date: { type: "TIMESTAMP_MILLIS" },
  in_stock: { type: "BOOLEAN" },
});


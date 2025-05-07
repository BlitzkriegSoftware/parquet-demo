"use strict";

import parquet from 'parquetjs';

/**
 * library owner schema
 */
export const vendorSchema = new parquet.ParquetSchema({
  name: { type: 'UTF8' },
  quantity: { type: 'INT64' },
  price: { type: 'DOUBLE' },
  date: { type: 'TIMESTAMP_MILLIS' },
  in_stock: { type: 'BOOLEAN' }
});
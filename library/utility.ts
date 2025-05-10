"use strict";

import os from "os";
import path from "node:path";

export function tempFile(name: string = "temp.txt") {
  if (!name) {
    throw new Error("name is required");
  }
  const tmpdir = os.tmpdir();
  return path.join(tmpdir, name);
}

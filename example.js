import fs from "fs";
import lexrank from "./src/lexrank.js";

const text = fs.readFileSync("./fixtures/test.txt", "utf-8");
const result = lexrank(text);

console.log(JSON.stringify(result, null, 2));

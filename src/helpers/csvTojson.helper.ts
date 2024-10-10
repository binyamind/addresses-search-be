import csv from "csvtojson";
import * as path from "path";
import { Address } from "../models/Address";

export async function convertCsvToJson():Promise<Array<Address>> {
  const filePath = path.resolve(__dirname, "./address.csv");
  return renameProps(await csv().fromFile(filePath));
}
function renameProps(jsonObj: Array<{ [key: string]: any }>):Array<Address> {
  const arr: Array<Address> = [];
  for (let item of jsonObj) {
    const keys = Object.keys(item);
    arr.push({
      main: item[keys[0]],
      description: item[keys[1]],
      secondary: item[keys[2]] ? item[keys[2]] : null,
      group: item[keys[3]],
      extraGroup: item[keys[4]] ? item[keys[4]] : null,
      type: item[keys[5]],
      code: item[keys[6]] ? parseInt(item[keys[6]]) : null,
      neighbourhood: item[keys[7]],
    
    });
  }
  return arr;
}

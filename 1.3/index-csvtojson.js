import fs from "fs";
import path from "path";
import csv from "csvtojson";

process.stdout.write("Enter filename from csv directory (default file1):");
process.stdin.setEncoding("utf-8");
process.stdin.on("data", (data) => {
  const incoming = data.trim() || "file1";
  const csvPath = path.resolve(__dirname, `${incoming}.csv`);

  fs.access(csvPath, fs.constants.R_OK, (err) => {
    if (err) {
      console.log("No such file, please try again :(");
      return;
    }
    const readStream = fs.createReadStream(csvPath, {
      encoding: "utf-8",
    });
    const writeStream = fs.createWriteStream(
      path.resolve(__dirname, `${incoming}.json`)
    );
    readStream.pipe(csv()).pipe(writeStream);
  });
});

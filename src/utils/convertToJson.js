const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const { sampleFileName, sampleConvertName } = require("../config");

const convertToJson = (sampleFileName, sampleConvertName) => {
  try {
    const sampleFilePath = path.join(
      __dirname,
      "../../sample/" + sampleFileName
    );
    const sampleConvertPath = path.join(
      __dirname,
      "../../sample/" + sampleConvertName
    );
    const results = [];
    fs.createReadStream(sampleFilePath)
      .pipe(csv())
      .on("data", (data) => {
        const message = data[Object.keys(data)[0]];
        const language = data[Object.keys(data)[1]];
        const expected_entity_type = data[Object.keys(data)[2]];
        const expected_code = data[Object.keys(data)[3]];
        const expected_value = data[Object.keys(data)[4]];
        const expected_raw = data[Object.keys(data)[5]];

        const newData = {
          message,
          language,
          expected_entity_type,
          expected_code,
          expected_value,
          expected_raw,
        };
        return results.push(newData);
      })
      .on("end", () => {
        const jsonData = JSON.stringify(results);
        fs.writeFileSync(sampleConvertPath, jsonData);
        console.log("Tạo sample.json thành công!");
        return jsonData;
      });
  } catch (err) {
    console.log("Lỗi tạo sample.json!");
    return {};
  }
};

convertToJson(sampleFileName, sampleConvertName);

module.exports = convertToJson;

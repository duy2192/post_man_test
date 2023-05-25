const sampleJson = require("../sample/sample.json");
const convertToExcel = require("./utils/convertToExcel");
const { test } = require("./utils/test_func");

//Số lượng request tối đa
const MAX_REQUEST = 1;

const main = async () => {
  const listRequest = [];

  const length =
    sampleJson.length > MAX_REQUEST ? MAX_REQUEST : sampleJson.length;

  for (let i = 0; i < length; i++) {
    const element = sampleJson[i];
    const body = {
      message: element.message,
      language: element.language,
    };

    const expect = {
      type: element.expected_entity_type,
      code: element.expected_code,
      value: element.expected_value,
    };

    listRequest.push(() => test(body, expect));
  }

  const result = await Promise.all(
    listRequest.map((request) => {
      return request();
    })
  );

  //Chuyển kết quả về dạng file excel
  await convertToExcel(result);
};

main();

const { apiUrl, token } = require("../config.js");

const toEqual = (actual, expect) => {
  if (expect == null || expect == undefined) return true;

  let actualStr = actual.toString().toLowerCase().trim();
  let expectStr = expect.toString().toLowerCase().trim();

  return actualStr == expectStr;
};

const toLabel = (status) => {
  return status ? "PASS" : "FAILED";
};

const test = async (body, expect) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(apiUrl, request);
    let data = await response.json();

    if (Array.isArray(data)) {
      data = data[0];
    }
    console.log(data);
    console.log("====================================");
    const actual_code = response.status;
    const actual_type = data?.entity_type ?? "";
    const actual_value = data?.entity_value ?? "";
    const actual_raw = data?.entity_raw ?? "";

    const expect_code = expect.code;
    const expectType = expect.type;
    const expectValue = expect.value;
    const expectRaw = expect.raw;

    let result = true;

    const checkType = toEqual(actual_type, expectType);
    // const checkCode = toEqual(actual_code, expect_code);
    const checkValue = toEqual(actual_value, expectValue);
    const checkRaw = toEqual(actual_raw, expectRaw);

    // if (!checkValue) result = false;
    if (!checkType) result = false;
    if (!checkRaw) result = false;

    return {
      Message: body.message,
      Language: body.language,
      Expected_Entity_Type: expectType,
      Actual_Entity_Type: actual_type || "",
      Expected_Entity_Value: expectValue,
      Actual_Entity_Value: actual_value || "",
      Expected_Entity_Raw: expectRaw,
      Actual_Entity_Raw: actual_raw || "",
      Result: toLabel(result),
    };
  } catch (err) {
    console.log("Lỗi ====================================");
    console.log(err);
    return {
      Message: body.message,
      Language: body.language,
      Expected_Entity_Type: expect.type,
      Actual_Entity_Type: "",
      Expected_Entity_Value: expect.value,
      Actual_Entity_Value: "",
      Expected_Entity_Raw: expect.raw,
      Actual_Entity_Raw: "",
      Result: toLabel(false),
    };
  }
};

module.exports = {
  toEqual,
  toLabel,
  test,
};

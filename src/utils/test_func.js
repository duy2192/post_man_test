const { apiUrl, token } = require("../config.js");

const toEqual = (actual, expect) => {
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
    console.log(data);
    if (Array.isArray(data)) {
      data = data[0];
    }

    const actual_code = response.status;
    const actual_type = data?.entity_type ?? "";
    const actual_value = data?.entity_value ?? "";

    const expect_code = expect.code;
    const expectType = expect.type;
    const expectValue = expect.value;

    let result = true;

    // const checkType = toEqual(actual_type, expectType);
    // const checkCode = toEqual(actual_code, expect_code);

    const checkValue = toEqual(actual_value, expectValue);

    if (!checkValue) result = false;
    // if (!checkType) result = false;

    return {
      Message: body.message,
      Language: body.language,
      Expected_Entity_Value: expect.value,
      Actual_Entity_Value: actual_value || "",
      Result: toLabel(result),
    };
  } catch (err) {
    console.log("Lỗi");
    console.log(err);
    return {
      Message: body.message,
      Language: body.language,
      Expected_Entity_Value: expect.value,
      Actual_Entity_Value: "",
      Result: toLabel(false),
    };
  }
};

module.exports = {
  toEqual,
  toLabel,
  test,
};

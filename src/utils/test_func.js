const { apiUrl, token } = require("./config.js");

const toEqual = (actual, expect) => {
  return actual === expect;
};

const toLabel = (status) => {
  return status ? "PASS" : "FAILED";
};

const test = async (body, expect) => {
  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
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

    const entityJob = data?.entity_job || "";

    const actual_code = response.status;
    const actual_type = data?.entity_type ?? "";

    const expect_code = expect.code;
    const expectType = expect.type;

    let result = true;

    const checkType = toEqual(actual_type, expectType);
    const checkCode = toEqual(actual_code, expect_code);

    if (!checkCode) result = false;
    if (!checkType) result = false;

    return {
      message: body.message,
      language: body.language,
      job: entityJob || "",
      expectedEntityType: expect.type,
      expectedCode: expect.code,
      actualEntityType: null,
      actualCode: null,
      result: toLabel(result),
    };
  } catch (err) {
    return {
      message: body.message,
      language: body.language,
      job: "",
      expectedEntityType: expect.type,
      expectedCode: expect.code,
      actualEntityType: "",
      actualCode: "",
      result: toLabel(false),
    };
  }
};

module.exports = {
  toEqual,
  toLabel,
  test,
};

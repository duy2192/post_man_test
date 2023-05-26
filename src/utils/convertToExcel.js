const json2xls = require("json2xls");
const fs = require("fs");
const path = require("path");

const convertToExcel = async (json) => {
  try {
    const xls = json2xls(json, {
      fields: [
        "Message",
        "Language",
        "Expected_Entity_Type",
        "Actual_Entity_Type",
        "Expected_Entity_Value",
        "Actual_Entity_Value",
        "Expected_Entity_Raw",
        "Actual_Entity_Raw",
        "Result",
      ],
    });

    const fileName = "result.xlsx";
    const filePath = path.join(__dirname, "../../result/" + fileName);
    await fs.writeFileSync(filePath, xls, "binary");
    console.log("Tạo file excel thành công! ==>" + fileName);
  } catch (err) {
    console.log("Lỗi tạo file excel!");
  }
};
module.exports = convertToExcel;

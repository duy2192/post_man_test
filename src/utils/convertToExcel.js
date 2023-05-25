const json2xls = require("json2xls");
const fs = require("fs");
const path = require("path");

const convertToExcel = async (json) => {
  try {
    const xls = json2xls(json, {
      fields: [
        "message",
        "language",
        "expectedEntityType",
        "expectedCode",
        "actualEntityType",
        "actualCode",
        "result",
      ],
    });

    const fileName = "result" + new Date().getTime() + ".xlsx";
    const filePath = path.join(__dirname, "../../result/" + fileName);
    await fs.writeFileSync(filePath, xls, "binary");
    console.log("Tạo file excel thành công! ==>" + fileName);
  } catch (err) {
    console.log("Lỗi tạo file excel!");
  }
};
module.exports = convertToExcel;

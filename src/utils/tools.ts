import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
// 图片上传前的处理
export const beforeLOGOUpload: UploadProps["beforeUpload"] = (rawFile) => {
  /*
    rawFile 上传图片文件
      type 图片类型
      size 图片大小
  */
  const validImageTypes = ["image/jpeg", "image/png"];
  // 判断文件类型，MIME 类型
  if (!validImageTypes.includes(rawFile.type)) {
    ElMessage.error("图片必须为png或jpg格式！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小超过2MB");
    return false;
  }
  return true;
};

/** 邮箱格式验证 */
export const isEmail = (val: string) =>
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val)

/** 密码强度验证：8-15位字母+数字 */
export const isStrongPassword = (val: string) =>
  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/.test(val)

// @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// 信息响应 (100-199)
// 成功响应 (200-299)
// 重定向消息 (300-399)
// 客户端错误响应 (400-499)
// 服务器错误响应 (500-599)

export enum HttpStatusCode {
  // 客户端应继续请求或忽略此响应
  Continue = 100,
  // 服务器正在切换协议
  Switching_Protocols = 101,
  // 用于预加载资源
  Early_Hints = 103,
  // 请求成功
  OK = 200,
  // 已创建新资源
  Created = 201,
  // 请求已收到但尚未处理
  Accepted = 202,
  // 返回的元数据来自本地或第三方副本
  Non_Authoritative_Information = 203,
  // 请求成功但无返回内容
  No_Content = 204,
  // 要求用户代理重置文档
  Reset_Content = 205,
  // 返回部分资源内容
  Partial_Content = 206,
  // 多个可选的重定向目标
  Multiple_Choices = 300,
  // 资源 URL 已永久更改
  Moved_Permanently = 301,
  // 资源 URI 临时更改
  Found = 302,
  // 使用 GET 请求访问另一个 URI
  See_Other = 303,
  // 缓存未修改，可继续使用
  Not_Modified = 304,
  // 保持请求方法的临时重定向
  Temporary_Redirect = 307,
  // 保持请求方法的永久重定向
  Permanent_Redirect = 308,
  // 请求语法错误
  Bad_Request = 400,
  // 需要身份验证
  Unauthorized = 401,
  // 服务器拒绝访问，客户端身份已知
  Forbidden = 403,
  // 找不到请求的资源
  Not_Found = 404,
  // 请求方法不被目标资源支持
  Method_Not_Allowed = 405,
  // 无法返回符合客户端标准的内容
  Not_Acceptable = 406,
  // 需要代理身份验证
  Proxy_Authentication_Required = 407,
  // 请求超时
  Request_Timeout = 408,
  // 请求与服务器当前状态冲突
  Conflict = 409,
  // 请求的资源已永久删除
  Gone = 410,
  // 缺少 Content-Length 头字段
  Length_Required = 411,
  // 客户端先决条件不满足
  Precondition_Failed = 412,
  // 请求实体过大
  Payload_Too_Large = 413,
  // 请求的 URI 过长
  URI_Too_Long = 414,
  // 不支持的媒体格式
  Unsupported_Media_Type = 415,
  // 请求的范围无法满足
  Range_Not_Satisfiable = 416,
  // 服务器无法满足 Expect 头字段的要求
  Expectation_Failed = 417,
  // 我是茶壶 (RFC 2324)
  Im_A_Teapot = 418,
  // 请求格式正确但存在语义错误
  Unprocessable_Entity = 422,
  // 需要升级协议
  Upgrade_Required = 426,
  // 服务器要求有条件的请求
  Precondition_Required = 428,
  // 请求过于频繁（速率限制）
  Too_Many_Requests = 429,
  // 请求头字段过大
  Request_Header_Fields_Too_Large = 431,
  // 因法律原因无法提供资源
  Unavailable_ForLegal_Reasons = 451,
  // 服务器内部错误
  Internal_Server_Error = 500,
  // 服务器不支持该请求方法
  Not_Implemented = 501,
  // 网关收到无效响应
  Bad_Gateway = 502,
  // 服务不可用（维护或过载）
  Service_Unavailable = 503,
  // 网关响应超时
  Gateway_Timeout = 504,
  // 不支持的 HTTP 版本
  HTTP_Version_Not_Supported = 505,
  // 服务器内部配置错误
  Variant_Also_Negotiates = 506,
  // 服务器存储空间不足
  Insufficient_Storage = 507,
  // 服务器检测到无限循环
  Loop_Detected = 508,
  // 需要进一步扩展请求
  Not_Extended = 510,
  // 需要网络身份验证
  Network_Authentication_Required = 511
}

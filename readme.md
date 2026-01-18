# ComfyUI Random and int and float to Str节点
节点实现格式的转换

## 类别
Transform/typeChange

## 输入
节点名称	节点类型	节点描述	可选	默认值
maxValue	数据类型	输入参数说明 否	  [1000000]
minValue	数据类型	输入参数说明 否	  [0]
input_Int_value 数据类型  输入整型数据 是  [无]
input_Float_value 数据类型  输入整型数据 是  [无]



数据类型说明
String: text


功能描述
[基于本节点生成整型数据，然后转换成字符串]
[基于节点导入Int类型数据，然后转换成字符串]
[基于节点导入Float类型数据，然后转换成字符串]

# 示例代码或工作流描述

典型工作流

![alt text](https://github.com/fogyisland/ComfyUI_RandomTOStr_IntFloat_ToStr/blob/main/workflow/RandomTostring.png)

更新日志
v0.1.0 (2026-01-28)
初始版本发布

功能: [实现各类数据转字符串内容]


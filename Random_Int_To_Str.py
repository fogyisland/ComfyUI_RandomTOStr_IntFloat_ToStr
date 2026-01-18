import random
import numpy as np

class  RandomIntToStr:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "input_int_value": ("INT", {"forceInput": True}),
                "input_float_value": ("FLOAT", {"forceInput": True}),
            },
            "required": {
                "min_value": ("INT", {"default": 0, "step": 1}),
                "max_value": ("INT", {"default": 100, "step": 1}),
            },

        }
    RETURN_TYPES = ("STRING",)  # 添加返回类型
    RETURN_NAMES = ("输出字符串",)    # 添加返回名称
    FUNCTION = "float_int_to_str"
    CATEGORY = "Transform/typeChange"
    def float_int_to_str(self, input_int_value=None, input_float_value=None, min_value=0, max_value=100):
        if (input_int_value is not None and input_float_value is not None):
            return ("你连接了两条线，这是不正确的做法",)
        elif (input_int_value is not None) != (input_float_value is not None):
            return (str(input_int_value) if input_int_value is not None else str(input_float_value),)
        else:
            random_int = random.randint(min_value, max_value)
            return (str(random_int),)
    # 关键代码：强制每次运行都认为节点已改变
    @classmethod
    def IS_CHANGED(s, **kwargs):
        return float("NaN")
    
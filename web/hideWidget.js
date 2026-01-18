import { app } from "../../../scripts/app.js";

app.registerExtension({
    name: "Random_Int_Str.HideMaxOnConnect",
    async beforeRegisterNodeDef(nodeType, nodeData) {
        if (nodeData.name === "RandomIntToStr") {
            // 保存原始方法
            const originalOnConnectionsChange = nodeType.prototype.onConnectionsChange;
            
            nodeType.prototype.onConnectionsChange = function (type, index, connected, link_info) {
                // 调用原始方法
                const result = originalOnConnectionsChange?.apply(this, arguments);
                
                // 检查是否是目标输入
                if (type === 1 && this.inputs && this.inputs[index]) {
                    const inputName = this.inputs[index].name;
                    if (inputName === "input_int_value" || inputName === "input_float_value") {
                        console.log(`Toggle widgets for ${inputName}: ${connected ? 'hide' : 'show'}`);
                        
                        // 使用更可靠的方式查找和操作widgets
                        this.widgets?.forEach((widget, i) => {
                            if (widget.name === "max_value" || widget.name === "min_value") {
                                console.log(`Found widget ${widget.name} at index ${i}:`, widget);
                                
                                // 方法1: 使用ComfyUI的widget options
                                widget.options = widget.options || {};
                                
                                if (connected) {
                                    // 隐藏widget
                                    widget.hidden = true;
                                    // 如果widget有element属性
                                    if (widget.element) {
                                        widget.element.style.display = "none";
                                    }
                                    // 尝试更多可能的属性
                                    if (widget.inputEl) widget.inputEl.style.display = "none";
                                    if (widget.el) widget.el.style.display = "none";
                                    if (widget.groupEl) widget.groupEl.style.display = "none";
                                } else {
                                    // 显示widget
                                    widget.hidden = false;
                                    if (widget.element) {
                                        widget.element.style.display = "block";
                                    }
                                    if (widget.inputEl) widget.inputEl.style.display = "block";
                                    if (widget.el) widget.el.style.display = "block";
                                    if (widget.groupEl) widget.groupEl.style.display = "block";
                                }
                                
                                // 标记widget需要重新渲染
                                widget.changed = true;
                            }
                        });
                        
                        // 强制节点重新渲染
                        setTimeout(() => {
                            if (this.onWidgetsChanged) {
                                this.onWidgetsChanged();
                            }
                            this.setSize([this.size[0], this.computeSize()[1]]);
                            this.setDirtyCanvas(true, true);
                        }, 50);
                    }
                }
                
                return result;
            };
        }
    }
});
<template>
  <div class="dialog-demo">
    <h3>基础用法</h3>
    <div class="button-group">
      <el-button @click="openSimple">纯文本弹窗</el-button>
      <el-button type="primary" @click="openHtml">HTML 内容</el-button>
      <el-button type="success" @click="openForm">表单弹窗</el-button>
    </div>

    <h3>高级用法</h3>
    <div class="button-group">
      <el-button type="info" @click="openAsync">异步操作</el-button>
      <el-button type="warning" @click="openCustomFooter">自定义页脚</el-button>
      <el-button type="danger" @click="openBeforeClose">关闭前拦截</el-button>
    </div>

    <div v-if="result" class="result"><strong>操作结果：</strong>{{ result }}</div>
  </div>
</template>

<script setup>
import { h, ref } from "vue"
import { EasyDialog } from "easy-elplus"
import { ElButton, ElMessage, ElMessageBox, ElInput, ElForm, ElFormItem } from "element-plus"

const result = ref("")

// 简单文本弹窗
const openSimple = () => {
  EasyDialog("这是一个简单的提示信息，点击确认即可关闭。")
    .then(() => {
      result.value = "用户点击了确认"
    })
    .catch(() => {
      result.value = "用户取消了操作"
    })
}

// HTML 内容
const openHtml = () => {
  EasyDialog(
    {
      render: () =>
        h("div", [
          h("h3", { style: "color: var(--el-color-primary); margin-bottom: 10px" }, "HTML 内容示例"),
          h("p", { style: "line-height: 1.6" }, "这里可以使用 Vue 的渲染函数创建复杂的内容结构。"),
          h("ul", { style: "margin-top: 10px" }, [
            h("li", "支持任意 HTML 结构"),
            h("li", "支持 Vue 组件"),
            h("li", "支持样式定制")
          ])
        ])
    },
    {},
    { title: "渲染函数示例" }
  )
}

// 表单弹窗
const openForm = () => {
  const formData = ref({ name: "", email: "" })

  EasyDialog(
    {
      render: () =>
        h(ElForm, { model: formData.value }, () => [
          h(ElFormItem, { label: "姓名" }, () =>
            h(ElInput, {
              modelValue: formData.value.name,
              "onUpdate:modelValue": val => (formData.value.name = val),
              placeholder: "请输入姓名"
            })
          ),
          h(ElFormItem, { label: "邮箱" }, () =>
            h(ElInput, {
              modelValue: formData.value.email,
              "onUpdate:modelValue": val => (formData.value.email = val),
              placeholder: "请输入邮箱"
            })
          )
        ])
    },
    {},
    {
      title: "填写信息",
      width: "500px",
      onConfirm: () => {
        result.value = `姓名: ${formData.value.name}, 邮箱: ${formData.value.email}`
        ElMessage.success("提交成功")
      }
    }
  )
}

// 异步操作
const openAsync = () => {
  EasyDialog(
    "点击确认后将模拟异步操作（2秒）",
    {},
    {
      title: "异步操作演示",
      onConfirm: async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        result.value = "异步操作完成"
        ElMessage.success("操作成功")
      }
    }
  )
}

// 自定义页脚
const openCustomFooter = () => {
  EasyDialog(
    "这个弹窗使用了自定义页脚",
    {},
    {
      title: "自定义页脚",
      footer: ({ close, confirm, loading }) =>
        h("div", { style: "display: flex; justify-content: space-between; width: 100%" }, [
          h("span", { style: "color: #999; font-size: 13px" }, "自定义提示信息"),
          h("div", { style: "display: flex; gap: 10px" }, [
            h(ElButton, { onClick: close, size: "small" }, () => "取消"),
            h(
              ElButton,
              {
                type: "primary",
                loading: loading,
                onClick: confirm,
                size: "small"
              },
              () => "确认"
            )
          ])
        ])
    }
  )
}

// 关闭前拦截
const openBeforeClose = () => {
  EasyDialog(
    "尝试关闭此弹窗会触发二次确认",
    {},
    {
      title: "关闭前拦截",
      beforeClose: done => {
        ElMessageBox.confirm("确定要关闭吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            done()
            result.value = "用户确认关闭"
          })
          .catch(() => {
            result.value = "用户取消关闭"
          })
      }
    }
  )
}
</script>

<style scoped>
.dialog-demo {
  padding: 20px;
}

h3 {
  margin: 20px 0 10px;
  font-size: 16px;
  color: #303133;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.result {
  margin-top: 20px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  color: #409eff;
  font-size: 14px;
}
</style>

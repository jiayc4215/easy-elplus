<template>
  <div class="dialog-demo">
    <h3>基础用法</h3>
    <div class="button-group">
      <el-button @click="openSimple">纯文本弹窗</el-button>
      <el-button type="success" @click="openForm">表单弹窗</el-button>
    </div>

    <h3>高级用法</h3>
    <div class="button-group">
      <el-button type="warning" @click="openCustomFooter">自定义页脚</el-button>
      <el-button type="danger" @click="openBeforeClose">关闭前拦截</el-button>
    </div>

    <div v-if="result" class="result"><strong>操作结果：</strong>{{ result }}</div>
  </div>
</template>

<script setup>
import { h, ref } from "vue"
import { EasyDialog } from "easy-elplus"
import { ElButton, ElMessage, ElMessageBox } from "element-plus"
import DialogFormContent from "./DialogFormContent.vue"

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

// 表单弹窗
const openForm = () => {
  EasyDialog(
    DialogFormContent,
    {}, // 组件 props
    {
      title: "填写信息",
      width: "500px",

      // 可以在 onConfirm 中获取组件实例并调用其方法
      onConfirm: async instance => {
        instance.doSomethingInternal()
        const data = await instance.validateForm()
        result.value = `校验通过: 姓名: ${data.name}, 邮箱: ${data.email}`
        ElMessage.success("提交成功")
      }
    }
  ).catch(e => {
    if (e === "closed") return
    ElMessage.warning("表单校验失败")
  })
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

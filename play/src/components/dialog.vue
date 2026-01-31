<template>
  <div class="demo-container">
    <h1 class="demo-title">EasyDialog 命令式弹窗演示</h1>
    <p class="demo-desc">
      EasyDialog 是一个基于 Element Plus 的命令式弹窗工具，支持函数式调用、组件载入、状态继承、异步操作等特性。
    </p>

    <!-- 基础示例 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">基础用法</div>
      </template>
      <div class="btn-group">
        <el-button @click="openSimple">纯文本弹窗</el-button>
        <el-button type="info" @click="openHtml">HTML 字符串</el-button>
        <el-button type="warning" @click="openDraggable">不可拖拽 (默认开启)</el-button>
      </div>
    </el-card>

    <!-- 组件示例 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">组件载入 & 交互</div>
      </template>
      <div class="btn-group">
        <el-button type="primary" @click="openForm">载入复杂表单</el-button>
        <el-button type="success" @click="openAsync">异步操作 (Loading)</el-button>
        <el-button @click="openWithData">传递 Props 并获取结果</el-button>
      </div>
    </el-card>

    <!-- 定制演示 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">高级定制</div>
      </template>
      <div class="btn-group">
        <el-button @click="openCustomFooter">自定义页脚 (Render 函数)</el-button>
        <el-button @click="openNoFooter">隐藏底部按钮</el-button>
        <el-button @click="openBeforeClose">关闭前拦截</el-button>
        <el-button @click="openCustomWidth">自定义宽度 (80%)</el-button>
      </div>
    </el-card>

    <!-- 连续弹窗 -->
    <el-card class="demo-card">
      <template #header>
        <div class="card-header">其他场景</div>
      </template>
      <div class="btn-group">
        <el-button @click="openSequential">连续弹窗</el-button>
        <el-button @click="openNested">嵌套弹窗</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { h } from "vue"
import { EasyDialog } from "easy-elplus"
import { ElButton, ElMessage, ElMessageBox } from "element-plus"
import DialogContent from "../testComp/DialogContent.vue"
import AsyncDemo from "../testComp/AsyncDemo.vue"
import NestedDemo from "../testComp/NestedDemo.vue"

// 1. 基础用法 - 纯文本
const openSimple = () => {
  EasyDialog("这是一个最简单的字符串弹窗，点击确认即可关闭。")
}

// 2. 基础用法 - HTML
const openHtml = () => {
  EasyDialog(
    {
      render: () =>
        h("div", [
          h("h3", { style: "color: var(--el-color-primary)" }, "HTML 内容"),
          h("p", "您可以在这里使用 Vue 的渲染函数或返回组件定义。")
        ])
    },
    {},
    { title: "渲染函数示例" }
  )
}

// 3. 不可拖拽
const openDraggable = () => {
  EasyDialog(
    "这个弹窗设置了 draggable: false，因此无法通过标题栏拖拽移动。",
    {},
    {
      title: "禁用拖拽",
      draggable: false
    }
  )
}

// 4. 载入复杂表单
const openForm = () => {
  EasyDialog(
    DialogContent,
    {}, // props
    {
      title: "复杂表单演示",
      width: "700px",
      methodKey: "confirm", // 调用 DialogContent 暴露的 confirm 方法
      onConfirm: instance => {
        // instance 为组件实例，可以从其暴露的属性获取数据
        console.log("表单确认，数据：", instance.getFormData())
        ElMessage.success("表单数据获取成功，请查看控制台")
      }
    }
  )
}

// 5. 异步操作
const openAsync = () => {
  EasyDialog(
    AsyncDemo,
    {},
    {
      title: "异步提交演示",
      // methodKey 默认为 'submit'，AsyncDemo 暴露了 submit 且它是 async 的
      onConfirm: async instance => {
        // 这里也可以再做一些异步处理
        ElMessage.info("Dialog 已关闭，收到的数据: " + instance.userInput)
      }
    }
  )
    .then(res => {
      console.log("Promise Resolved:", res)
    })
    .catch(() => {
      console.log("User Cancelled")
    })
}

// 6. 传递 Props
const openWithData = () => {
  EasyDialog(
    DialogContent,
    {
      row: {
        name: "Antigravity",
        region: "shanghai",
        delivery: true,
        desc: "我是自带数据的"
      }
    },
    {
      title: "编辑模式 (Props 传递)",
      onConfirm: inst => {
        const data = inst.getFormData()
        ElMessage.success(`姓名已改为: ${data.name}`)
      }
    }
  )
}

// 7. 自定义页脚
const openCustomFooter = () => {
  EasyDialog(
    "演示如何使用 footer 渲染函数来自定义页脚布局。",
    {},
    {
      title: "自定义页脚",
      footer: ({ close, confirm, loading }) =>
        h(
          "div",
          {
            style: "display: flex; justify-content: space-between; align-items: center; width: 100%"
          },
          [
            h("span", { style: "color: #999; font-size: 13px" }, "这是一个完全自定义的页脚 ->"),
            h("div", [
              h(ElButton, { onClick: close, size: "small" }, () => "直接关闭"),
              h(
                ElButton,
                {
                  type: "danger",
                  loading: loading,
                  onClick: confirm,
                  size: "small"
                },
                () => "执行确认"
              )
            ])
          ]
        )
    }
  )
}

// 8. 隐藏页脚
const openNoFooter = () => {
  EasyDialog(
    "这个弹窗没有页脚按钮，只能通过右上角或点击遮罩层关闭。",
    {},
    {
      title: "隐藏页脚",
      showConfirmButton: false,
      showCancelButton: false
    }
  )
}

// 9. 关闭前回调
const openBeforeClose = () => {
  EasyDialog(
    "尝试关闭此弹窗，会触发 beforeClose 确认。",
    {},
    {
      title: "关闭前拦截",
      beforeClose: done => {
        ElMessageBox.confirm("确定要关闭吗？")
          .then(() => {
            done()
          })
          .catch(() => {})
      }
    }
  )
}

// 10. 自定义宽度
const openCustomWidth = () => {
  EasyDialog(
    "设置 width: '80%'",
    {},
    {
      title: "大尺寸弹窗",
      width: "80%"
    }
  )
}

// 11. 连续弹窗
const openSequential = async () => {
  try {
    await EasyDialog("第一步：确认开始", {}, { title: "步骤 1" })
    await EasyDialog("第二步：进行中", {}, { title: "步骤 2" })
    await EasyDialog("第三步：已完成", {}, { title: "步骤 3" })
    ElMessage.success("全部流程完成")
  } catch {
    ElMessage.info("流程已中断")
  }
}

// 12. 嵌套弹窗
const openNested = () => {
  EasyDialog(NestedDemo, {}, { title: "嵌套弹窗演示" })
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.demo-title {
  font-size: 28px;
  margin-bottom: 8px;
  color: #303133;
}
.demo-desc {
  color: #606266;
  margin-bottom: 30px;
  line-height: 1.6;
}
.demo-card {
  margin-bottom: 24px;
}
.card-header {
  font-weight: bold;
  font-size: 16px;
}
.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>

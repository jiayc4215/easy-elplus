<template>
  <div class="async-demo">
    <p>This component simulates a slow asynchronous operation.</p>
    <el-alert
      title="Note"
      type="info"
      description="Clicking 'Confirm' in the dialog will trigger a 2-second delay with a loading state."
      :closable="false"
    />
    <div style="margin-top: 20px">
      <el-input v-model="userInput" placeholder="Type something to return..." />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { ElAlert, ElInput } from "element-plus"

const userInput = ref("")

// This method will be called by EasyDialog because methodKey is set to 'submit'
const submit = async () => {
  console.log("AsyncDemo: starting submit...")
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log("AsyncDemo: submit complete!")
  return {
    value: userInput.value,
    timestamp: Date.now()
  }
}

defineExpose({
  submit,
  userInput
})
</script>

<style scoped>
.async-demo {
  padding: 10px 0;
}
</style>

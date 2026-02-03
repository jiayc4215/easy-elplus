<script setup>
import { useRouter } from "vue-router"
import { Menu, Grid, List, ChatDotSquare, UploadFilled, Document } from "@element-plus/icons-vue"

const router = useRouter()
const routes = [
  { path: "/button", name: "Button", icon: Grid },
  { path: "/descriptions", name: "Descriptions", icon: List },
  { path: "/table", name: "Table", icon: Menu },
  { path: "/dialog", name: "Dialog", icon: ChatDotSquare },
  { path: "/image-upload", name: "ImageUpload", icon: UploadFilled },
  { path: "/file-upload", name: "FileUpload", icon: Document }
]
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="240px">
      <div class="logo">
        <span class="logo-text">easy-elplus</span>
        <span class="logo-dot">.</span>
      </div>
      <el-menu :default-active="$route.path" router class="side-menu">
        <el-menu-item v-for="route in routes" :key="route.path" :index="route.path">
          <el-icon><component :is="route.icon" /></el-icon>
          <span>{{ route.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>{{ $route.name }} Demo</h2>
          <div class="header-actions">
            <el-button size="small" @click="router.push('/')">Reset</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
:root {
  --sidebar-bg: #f8fafc;
  --header-bg: #ffffff;
  --primary-color: #409eff;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.layout-container {
  height: 100vh;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: var(--sidebar-bg);
  border-bottom: 1px solid #e2e8f0;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.logo-dot {
  color: var(--primary-color);
  font-size: 24px;
  line-height: 1;
}

.side-menu {
  height: calc(100vh - 64px);
  border-right: none !important;
  background-color: var(--sidebar-bg) !important;
}

.el-header {
  background: var(--header-bg);
  border-bottom: 1px solid #e2e8f0;
  height: 64px !important;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-content h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #334155;
}

.el-main {
  background: #f1f5f9;
  padding: 24px !important;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Menu Customization */
.el-menu-item {
  margin: 4px 12px;
  border-radius: 8px;
  height: 44px !important;
  line-height: 44px !important;
}

.el-menu-item.is-active {
  background-color: #eff6ff !important;
  color: var(--primary-color) !important;
  font-weight: 600;
}

.el-menu-item:hover {
  background-color: #f1f5f9 !important;
}
</style>

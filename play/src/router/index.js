import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: "/button"
  },
  {
    path: "/button",
    name: "Button",
    component: () => import("../views/button.vue")
  },
  {
    path: "/descriptions",
    name: "Descriptions",
    component: () => import("../views/descriptions.vue")
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("../views/table.vue")
  },
  {
    path: "/dialog",
    name: "Dialog",
    component: () => import("../views/dialog.vue")
  },
  {
    path: "/image-upload",
    name: "ImageUpload",
    component: () => import("../views/image-upload.vue")
  },
  {
    path: "/file-upload",
    name: "FileUpload",
    component: () => import("../views/file-upload.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

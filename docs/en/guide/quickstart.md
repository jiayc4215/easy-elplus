# Quick Start

This section describes how to use easy-elplus in your project.

## Prerequisites

- Node.js 16.x or higher
- Vue 3.x
- Element Plus 2.x

## Full Import

If you are not concerned about bundle size, you can import all components fully.

```javascript
// main.js
import { createApp } from "vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import EasyElPlus from "easy-elplus"
import App from "./App.vue"

const app = createApp(App)

app.use(ElementPlus)
app.use(EasyElPlus)
app.mount("#app")
```

## On-demand Import

easy-elplus supports on-demand import to reduce bundle size.

### Manual Import

```javascript
// main.js
import { createApp } from "vue"
import { EasyButton, EasyTable } from "easy-elplus"
import App from "./App.vue"

const app = createApp(App)

app.component("EasyButton", EasyButton)
app.component("EasyTable", EasyTable)
app.mount("#app")
```

### Auto Import (Recommended)

If you use `unplugin-vue-components` in your project, you can configure a resolver as shown below to achieve automatic on-demand component importing.

First, define the resolver in your project:

```javascript
// easy-elplus-resolver.js
export function EasyElPlusResolver() {
  return {
    type: "component",
    resolve: name => {
      // Matches components starting with Easy or easy-
      if (name.match(/^(Easy[A-Z]|easy-[a-z])/)) {
        return {
          name,
          from: "easy-elplus"
        }
      }
    }
  }
}
```

Then, configure the plugin in `vite.config.ts` or `webpack.config.js`:

```typescript
// vite.config.ts
import { defineConfig } from "vite"
import Components from "unplugin-vue-components/vite"
import { EasyElPlusResolver } from "./easy-elplus-resolver" // Import your defined resolver

export default defineConfig({
  plugins: [
    // ...
    Components({
      resolvers: [EasyElPlusResolver()]
    })
  ]
})
```

Now, you can use components directly in your templates without manual imports:

```vue
<template>
  <easy-button type="primary"> Submit </easy-button>
</template>
```

### Manual Import in Components

```vue
<template>
  <div>
    <easy-button type="primary" :loading="loading"> Submit </easy-button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyButton } from "easy-elplus"

const loading = ref(false)
</script>
```

## Start Using

Now you can start using easy-elplus! Check the documentation for each component to learn more:

- [Button](/en/components/button)
- [Dialog](/en/components/dialog)
- [Table](/en/components/table)
- [Descriptions](/en/components/descriptions)
- [ImageUpload](/en/components/image-upload)
- [FileUpload](/en/components/file-upload)

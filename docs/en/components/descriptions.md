---
title: Descriptions
description: Enhanced descriptions component, supporting grouping, dynamic rendering, etc.
---

# Descriptions

EasyDescriptions is an enhanced version based on Element Plus Descriptions component, supporting grouping, dynamic components, conditional rendering, etc.

## Online Demo

<preview path="../../demo/descriptions-basic.vue" title="Descriptions Basic Example" description="Show various usages of Descriptions component"></preview>

## API

### Attributes

| Attribute            | Description        | Type   | Default |
| -------------------- | ------------------ | ------ | ------- |
| items                | Configuration list | Array  | []      |
| modelValue / v-model | Data object        | Object | {}      |

Inherits all attributes of Element Plus Descriptions, such as:

| Attribute | Description       | Type    | Default    |
| --------- | ----------------- | ------- | ---------- |
| column    | Number of columns | Number  | 3          |
| border    | With border       | Boolean | false      |
| direction | Direction         | String  | horizontal |
| size      | Size              | String  | default    |

### Items Configuration

#### Single Group Mode

```javascript
interface Item {
  label: string | object // Label text or configuration object
  value: string | object // Field name or configuration object
  hidden?: boolean | ((data) => boolean) // Whether to hide
  span?: number // Number of columns occupied
  // ... other Descriptions attributes
}
```

#### Group Configuration

```javascript
interface GroupItem {
  title?: string // Group title
  extra?: string // extra text
  items: Item[] // Field list of the group
  hidden?: boolean | ((data) => boolean) // Whether to hide the entire group
  column?: number // Number of columns for the group
  border?: boolean // Whether the group has a border
  // ... other DescriptionsItem attributes
}
```

#### Value Object Configuration

```javascript
interface ValueConfig {
  id: string // Field name
  components: string | Component // Component name or component
  props: Object // Component attributes
}
```

### Events

Inherits all events of Element Plus Descriptions.

### Slots

| Slot Name | Description          | Parameters   |
| --------- | -------------------- | ------------ |
| title     | Custom title         |              |
| extra     | Custom extra area    |              |
| [id]      | Custom field content | label｜value |

## Features

1. **Simple Display**: Use string configuration directly
2. **Form Editing**: Use component configuration to implement editable description lists
3. **Group Display**: Use group mode to organize complex data
4. **Conditional Display**: Use hidden function to implement dynamic display logic
5. **Custom Rendering**: Use slots to implement complex custom requirements

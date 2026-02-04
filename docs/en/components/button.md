---
title: Button
description: Enhanced button component, automatically managing loading state for async operations
---

# Button

EasyButton is an enhanced version based on Element Plus Button component, with the main feature of automatically handling the loading state of asynchronous operations.

## Online Demo

The core feature of EasyButton is automatic handling of async operations. When the click event returns a Promise, the button will automatically show a loading state until the Promise is completed.

<preview path="../../demo/button-basic.vue" title="Button Basic Example" description="Show various usages of Button component"></preview>

## API

### Attributes

EasyButton inherits all attributes of Element Plus Button. Common attributes are as follows:

| Attribute | Description                    | Type      | Accepted Values                                    | Default |
| --------- | ------------------------------ | --------- | -------------------------------------------------- | ------- |
| type      | Type                           | string    | primary / success / warning / danger / info / text | —       |
| size      | Size                           | string    | large / default / small                            | —       |
| plain     | Whether it's a plain button    | boolean   | —                                                  | false   |
| round     | Whether it's a round button    | boolean   | —                                                  | false   |
| circle    | Whether it's a circle button   | boolean   | —                                                  | false   |
| loading   | Loading state (manual control) | boolean   | —                                                  | false   |
| disabled  | Disabled state                 | boolean   | —                                                  | false   |
| icon      | Icon component                 | Component | —                                                  | —       |

### Events

| Event Name | Description                          | Callback Parameters                            |
| ---------- | ------------------------------------ | ---------------------------------------------- |
| click      | Click event, supports async function | (event: MouseEvent) => void \| Promise\<void\> |

### Slots

| Slot Name | Description    |
| --------- | -------------- |
| default   | Button content |

## Features

EasyButton detects if the `click` event handler returns a Promise. If a Promise is returned, the button will:

1. Immediately enter loading state (show loading icon)
2. Wait for the Promise to complete
3. Automatically restore to normal state

This prevents repeated submissions caused by repeated clicks.

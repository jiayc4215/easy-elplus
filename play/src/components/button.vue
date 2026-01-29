<script setup>
import { EasyButton } from "easy-elplus"

const onClick = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<template>
  <div>
    <EasyButton @click="onClick">Default</EasyButton>
    <EasyButton type="primary" @click="onClick">Primary</EasyButton>
    <EasyButton type="success" @click="onClick">Success</EasyButton>
    <EasyButton type="info" @click="onClick">Info</EasyButton>
    <EasyButton type="warning" @click="onClick">Warning</EasyButton>
    <EasyButton type="danger" @click="onClick">Danger</EasyButton>
  </div>
</template>

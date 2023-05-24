<script setup lang="ts">
import { CButton } from '@chakra-ui/c-button'
import { CFlex } from '@chakra-ui/c-flex'
import { ref } from 'vue'

const counter = ref(0)

const minusCount = (): void => {
  counter.value--
}

const addCount = (): void => {
  counter.value++
}
</script>

<template>
  <CFlex align-items="center" gap="1rem">
    <CButton @click="minusCount">minus</CButton>
    <div>{{ counter }}</div>
    <CButton @click="addCount">add</CButton>
  </CFlex>
</template>

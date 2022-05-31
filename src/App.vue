<template>
  <app-header />

  <router-view />
</template>

<script>

import appHeader from './components/Header/Index_comp.vue';
export default {

  components: {
    appHeader
  }
}
</script>

<style>
@import './assets/style.css';
</style>

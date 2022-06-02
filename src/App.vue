<template>
  <app-header />

  <router-view v-if="!Isloading" />

  <div class="page_loader" v-else>
    <app-loader></app-loader>
  </div>
</template>

<script>

import appHeader from './components/Header/Index_comp.vue';
import appLoader from './components/Utils/Loader_comp.vue';
import { mapGetters } from 'vuex';
export default {

  components: {
    appHeader,
    appLoader

  }, computed: {
    ...mapGetters({
      toastMsg: 'notify/getToastMsg',
      Isloading: 'notify/isLoading'
    })
  },
  watch: {
    toastMsg(toastMsg) {
      if (toastMsg[0] === true) {
        if (toastMsg[2] === 'error') {
          this.$toast.error(toastMsg[1], {
            position:
              "top"
          });
        }
        if (toastMsg[2] === 'success') {
          this.$toast.success(toastMsg[1], {
            position:
              "top"
          });
        }
      }
    }
  }
}
</script>

<style>
@import './assets/style.css';
</style>

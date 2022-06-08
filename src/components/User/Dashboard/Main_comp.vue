
   
<template>
    <dashboard-title title="Dashboard" />
    <!-- <div v-if="adminArticles">
        <a-card :title="adminArticles.length + ' Articles Posted'" style="width: 300px">
            <template #extra><a href="/"></a></template>
           
        </a-card>
    </div>
    <div v-else>
        <Loader />
    </div> -->
</template>

<script>

import DashboardTitle from '../../Utils/dashTitle.vue';
// import { mapActions } from 'vuex'
// import Loader from '../../Utils/Loader_comp.vue';
export default {
    components: {
        DashboardTitle,
        // Loader
    },

}
</script>
<template>
    <dashboard-title title="Articles" />

    <div v-if="adminArticles">

        <a-table :columns="columns" :data-source="adminArticles" :row-key="record => record.id" bordered
            :pagination="{ pageSize: 4 }">
            <template #title>
                <router-link :to="{ name: 'admin_add' }">
                    <a-button type="primary" style=" font-size:15px">
                        <template #icon>
                            <plus-outlined style="color:blue;font-size:20px" />

                        </template>
                        Article
                    </a-button>

                </router-link>
            </template>
            <template #name="{ text }">
                <a>{{ text }}</a>
            </template>

            <template #game="{ record }">
                <router-link :to="{ name: 'article', params: { id: record.id } }" target="_blank">
                    {{ record.game }}
                </router-link>
            </template>

            <template #owner="{ record }">
                <span>
                    {{ record.owner.firstname }} {{ record.owner.lastname }}
                </span>
            </template>

            <template #time="{ record }">
                <span>
                    {{ record.timestamp.toDate().toDateString() }}
                </span>
            </template>


            <template #delete="{ record }">


                <a-popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No" @confirm="removeById(record.id)">
                    <a-button style=" font-size:15px">
                        <template #icon>
                            <delete-outlined style="color:red;font-size:25px" @click="alert('Enter')" />
                        </template>

                    </a-button>
                </a-popconfirm>
            </template>


        </a-table>

    </div>
    <div v-else>
        <Loader />
    </div>

</template>


<script>
import DashboardTitle from '../../../Utils/dashTitle.vue';
import Loader from '../../../Utils/Loader_comp.vue';
import { mapActions } from 'vuex'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
export default {
    components: {
        DashboardTitle,
        DeleteOutlined,
        PlusOutlined, Loader
    },
    data() {
        return {
            columns
        }
    },
    computed: {
        adminArticles() {
            return this.$store.getters['articles/getAdminArticles']
        }
    },
    mounted() {
        const reload = this.$route.params.reload;
        if (!this.adminArticles || reload) {
            this.getAdminArticles({ limit: 1 })
        }
    },
    methods: {
        ...mapActions('articles', [
            'getAdminArticles',
            'removeById'
        ])
    }
}
const columns = [
    {
        title: 'Game',
        slots: { customRender: 'game' }
    },
    {
        title: 'Owner',
        slots: { customRender: 'owner' }
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
    },
    {
        title: 'Created at',
        slots: { customRender: 'time' }
    },
    {
        title: 'Action',
        slots: { customRender: 'delete' }
    }
]
</script>
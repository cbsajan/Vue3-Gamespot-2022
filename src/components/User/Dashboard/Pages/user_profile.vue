<template>
    <dashboard-title title="Profile" />
    <div v-if="updateUser">
        <div v-if="userData">
            <Form @submit="onSubmit" :validation-schema="formSchema">
                <div class="form-group">
                    <Field name="firstname" v-model="userData.firstname" v-slot="{ field, errors, errorMessage }">
                        <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                            type="text" placeholder="First Name" />
                    </Field>
                </div>
                <br>
                <div class="form-group">
                    <Field name="lastname" v-model="userData.lastname" v-slot="{ field, errors, errorMessage }">
                        <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                            type="text" placeholder="Last Name" />
                    </Field>
                </div>
                <br>

                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">Update User
                    </button>
                    &nbsp;
                    &nbsp;
                    <button type="button" class="btn btn-primary" @click="updateUser_btn">Cancel
                    </button>
                </div>

            </Form>
        </div>
    </div>
    <div v-else>
        <div v-if="userData">
            <a-descriptions title="User Info" :column="1">
                <template #extra>
                    <a-button type="primary" @click="updateUser_btn">Edit</a-button>
                </template>
                <a-descriptions-item label="User Id">
                    {{ userData.uid }}
                </a-descriptions-item>
                <a-descriptions-item label="Firstname">{{ userData.firstname }}</a-descriptions-item>
                <a-descriptions-item label="Lastname">{{ userData.lastname }}</a-descriptions-item>

                <a-descriptions-item label="Email">
                    {{ userData.email }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>

<script>
import DashboardTitle from '../../../Utils/dashTitle.vue';
import { Field, Form } from 'vee-validate';
import FormElement from '../../../Utils/form_elements.vue';
import * as yup from 'yup'
export default {
    components: {
        DashboardTitle,
        FormElement,
        Form,
        Field
    },
    data() {
        return {

            formSchema: {
                firstname: yup.string(),
                lastname: yup.string()
            },
            updateUser: false,
        }
    },
    computed: {
        userData() {
            return JSON.parse(JSON.stringify(this.$store.getters['auth/getUserData']));
        }
    },
    methods: {
        onSubmit(values) {


            this.$store.dispatch('auth/updateProfile', values).finally(() => {
                this.updateUser_btn( )
            })

        },
        updateUser_btn() {
            this.updateUser = this.updateUser = !this.updateUser
        }
    }
}
</script>
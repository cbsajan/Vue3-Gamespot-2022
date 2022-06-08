<template>
    <dashboard-title title="Profile" />
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
            <button type="submit" class="btn btn-primary">
                Update User
            </button>
        </Form>
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
            }
        }
    },
    computed: {
        userData() {
            return JSON.parse(JSON.stringify(this.$store.getters['auth/getUserData']));
        }
    },
    methods: {
        onSubmit(values) {


            console.log(values)

        },
    }
}
</script>
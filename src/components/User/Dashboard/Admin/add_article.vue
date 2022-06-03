<template>
    <dashboard-title title="Add article" />

    <Form @submit="onSubmit" :validation-schema="formSchema">

        <div class="form-group">
            <Field name="game" v-slot="{ field, errors, errorMessage }">
                <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input" type="text"
                    placeholder="Name of the game" />
            </Field>
        </div>

        <br />

        <div class="form-group">
            <Field name="title" v-slot="{ field, errors, errorMessage }">
                <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input" type="text"
                    placeholder="Title of the article" />
            </Field>
        </div>


        <br />

        <div class="form-group">
            <Field name="excerpt" v-slot="{ field, errors, errorMessage }">
                <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="textarea"
                    placeholder="Add an excerpt" :rows="3" />
            </Field>
        </div>

        <br />

        <div class="form-group">
            <Field name="rating" v-slot="{ field, errors, errorMessage }">
                <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="rating">
                    <!-- <option value="Select a rating" selected>Select a rating</option>
                    <option v-for="rating in ratings" :key="rating" :value="rating">
                        {{ rating }}
                    </option> -->
                    <input data-role="rating" v-model="rating" id="rating-methods" data-on-star-click="
        window.localStorage.setItem('rating',arguments[0])
        
    " @click="getRatingandStore">
                    <div>

                    </div>
                    <!-- <star-rating star-size=30 :show-rating="false" increment="0.5" @update:rating="getRating"
                        :rating="field" /> -->
                </form-element>
            </Field>
        </div>

        <br />

        <div class="form-group">
            <Field name="img" v-slot="{ field, errors, errorMessage }">
                <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input" type="text"
                    placeholder="Add the source of the img" />
            </Field>
        </div>

        <br />

        <button type="submit" class="btn btn-primary">
            Add article
        </button>
    </Form>

</template>

<script>
/* eslint-disable */
import FormElement from '../../../Utils/form_elements.vue';
import { addArticleSchema } from '../../../Tools/schemas.js';
import DashboardTitle from '../../../Utils/dashTitle.vue';
import { Field, Form } from 'vee-validate';
export default {
    components: {
        DashboardTitle,
        Field,
        Form,
        FormElement
    },
    data() {
        return {

            rating: 0,
            formSchema: addArticleSchema
        }
    },

    methods: {
        getRatingandStore() {

            this.rating = parseInt(localStorage.getItem('rating'))
        },
        onSubmit(values) {
            this.getRatingandStore()
            values.rating = this.rating
            console.log(values);

        },
        getRating(rating) {
            this.rating = rating;
            console.log(rating)
        }
    }
}
</script>
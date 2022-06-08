<template>
    <dashboard-title title="Edit article" />

    <div v-if="article">
        <Form @submit="onSubmit" :validation-schema="formSchema">

            <div class="form-group">
                <Field name="game" v-model="article.game" v-slot="{ field, errors, errorMessage }">
                    <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                        type="text" placeholder="Name of the game" />
                </Field>
            </div>

            <br />

            <div class="form-group">
                <Field name="title" v-model="article.title" v-slot="{ field, errors, errorMessage }">
                    <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                        type="text" placeholder="Title of the article" />
                </Field>
            </div>

            <br />

            <div class="form-group">
                <Field name="excerpt" v-model="article.excerpt" v-slot="{ field, errors, errorMessage }">
                    <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="textarea"
                        placeholder="Add an excerpt" :rows="3" />
                </Field>
            </div>

            <br />

            <wysiwyg @update="updateEditor" :content="article.editor" />
            <Field name="editor" v-model="veditor" v-slot="{ field, errors, errorMessage }">
                <input type="hidden" id="veditor" v-bind="field" />
                <div class="alert alert-danger" v-if="errors.length !== 0">
                    {{ errorMessage }}
                </div>
            </Field>


            <br />

            <div class="form-group">
                <h3>Rating</h3>
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
                <Field name="img" v-model="article.img" v-slot="{ field, errors, errorMessage }">
                    <form-element :field="field" :errors="errors" :errorMessage="errorMessage" element="input"
                        type="text" placeholder="Add the source of the img" />
                </Field>
            </div>

            <br />

            <button type="submit" class="btn btn-primary" :disabled="loading">
                Edit article
            </button>
        </Form>
    </div>
</template>

<script>
/* eslint-disable */
import wysiwyg from '../../../Utils/wysiwyg_comp.vue';
import FormElement from '../../../Utils/form_elements.vue';
import { addArticleSchema } from '../../../Tools/schemas.js';
import DashboardTitle from '../../../Utils/dashTitle.vue';
import { Field, Form } from 'vee-validate';
export default {
    components: {
        DashboardTitle,
        Field,
        Form,
        FormElement,
        wysiwyg
    },
    data() {
        return {
            article: null,
            loading: false,
            veditor: '',
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
            console.log(values)
            //  this.loading = true;
            //  this.$store.dispatch('articles/addArticle',values).finally(()=>{
            //     this.loading = false;
            //  })
        },
        updateEditor(value) {
            this.veditor = value;
        }
    },
    mounted() {
        this.$store.dispatch('articles/getArticle', this.$route.params.id)
            .then((article) => {
                if (article) {
                    this.article = article;
                    console.log(parseInt(article.rating))
                    this.rating = parseInt(article.rating)
                } else {
                    this.$router.push({ name: '404' })
                }
            })
    }
}
</script>
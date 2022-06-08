<template>
    <div class="container p_top article_page" v-if="article">

        <div class="game_tag">
            {{ article.game }}
        </div>
        <br>
        <br>
        <div class="article_featured" :style="{ backgroundImage: `url(${article.img})` }"></div>

        <div class="article_content">
            <star-rating v-model:rating="article.rating" read-only="true" star-size="20" :show-rating="false"
                increment="0.5" />
            <div class="owner">
                Article written by <b>{{ article.owner.firstname }} {{ article.owner.lastname }} </b>
            </div>
            <hr />
            <h1>{{ article.title }}</h1>
            <div class="editor" v-html="article.editor"></div>
        </div>

        <hr />



    </div>
</template>


<script>
export default {
    data() {
        return {
            article: null
        }
    }, mounted() {
        this.$store.dispatch('articles/getArticle', this.$route.params.id).then((article) => {
            if (article) {
                this.article = article
            } else {
                this.$router.push({ name: '404' })
            }
        })
    }
}
</script>
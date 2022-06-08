<template>
    <center>
        <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
            <template #extra>
                <a-button type="primary">Back Home</a-button>
            </template>
        </a-result>
    </center>
</template>
<style scoped>
.ant-result {
    padding: 200px 32px !important
}
</style>
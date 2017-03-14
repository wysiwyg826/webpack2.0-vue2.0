<style lang="scss" scoped>
    #index {
        section {
            height: 600px;
            font-size: 30px;
            color: #3ea;
        }
    }
</style>
<template>
    <div id="index" class="index">
        <section class="container">
            {{msg}}
        </section>
        <input type="text" v-model="post.data.name" :placeholder="input.searchName.placeholder" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: '我是index',
            }

        },
        //组件注册
        components: {
        },
        //方法
        methods: {

        },
        created() {

        },
    }
</script>

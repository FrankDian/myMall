<template>
    <div>
        购物车页面
        <br>
        <span>{{ $route.query.param }}</span>
    </div>
</template>

<style>
</style>

<script>

    export default {
        data () {
            return {
                msg: 'Hi vue！'
            }
        }
    }
</script>
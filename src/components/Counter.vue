<template>
    <div>
        <button v-on:click="increament">+</button>
        <button v-on:click="decreament">-</button>
        <p><span>{{ num }}</span></p>
    </div>
</template>
<style>

</style>

<script>
    export default {
        props:[ 'num' ],
        data () {
            return {
                num: '0'
            }
        },
        methods:{
            increament(){
                this.$emit("incre");
            },
            decreament(){
                this.$emit("decre");
            }
        }
    }
</script>
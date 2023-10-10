<template>
    <input
    class=form-input
    type=text
    name=name
    minlength="2"
    required
    autocomplete=off
    :value="value"
    placeholder='Введіть імя' />
</template>

<script>export default {
    props: ["value"],

};</script>

<style scoped>
.form-input{
border-radius: 10px 0 0 10px;
padding-left: 20px;
border-right: none;
}

</style>
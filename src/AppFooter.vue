
<template><div class="name-box">
    
    <Title :textValue="showText()"></Title>
  </div></template>

<script setup>
import  {store}  from "./store.mjs";
</script>
  <script>
import Title from "./components/Title.vue";

console.log(store.name);
export default{
components: {
      Title,
  },
  methods: {
    showText(){
      if(store.name.trim()===''){
        return "Ведіть ваше імя в спеціальному полі"
      }
     return "Доброго дня "+store.name
    }
  }
}
</script>

<style scoped>
.name-box{
    display: flex;
    align-items: center;
}</style>

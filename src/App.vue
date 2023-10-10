
<template><div class="name-box">
      <SearchForm :nameProp="name" @setNameProp = 'setCity'/>
      <Title :textValue="titleValue"></Title>
    </div></template>
    <script>
import Title from "./components/Title.vue";
import SearchForm from "./components/SearchForm.vue";

export default{
components: {
        Title,
        SearchForm,
    },
    data(){
        return {
            name: "",
        };
    },
    methods: {
        setCity(name){
this.name=name
        }
    },
    computed: {
        titleValue() {
            if (this.name.trim() !== "") {
                return `Привіт `+this.name;
            }
        },
    },
    
}
</script>
<style scoped>
.name-box{
    display: flex;
    align-items: center;
}</style>

<template>
   <form class=form-name>
        <SearchInput :value="inputValue" @input="getInputValue"/>
        <SearchButton @click.prevent='searchCitys'></SearchButton> 
    </form> 
</template>


<script>
import SearchInput from "./SearchInput.vue";
import SearchButton from "./SearchButton.vue";
    export default {
    props: ["nameProp"],
    data(){
      return { inputValue:'',} 
    },
    components: { SearchInput, SearchButton },
    methods: {
        getInputValue(e){
           this.inputValue=e.target.value.replace(/[{}[\]\%/\\&\?\,\'\;:+!@#\$\^*)(]/g, "")
           e.target.value=this.inputValue
        },
        searchCitys(){
           
            this.$emit('setNameProp',this.inputValue),
             this.inputValue = ''
        }
    }
};</script>

<style scoped>
.form-name{
  display: flex;
    justify-content: center;
    height: 30px;
    padding: 0;
    margin-right: 10px;
}
</style>
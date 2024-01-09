<template>
  <header>
    <div class="app" :class="mode">
      <Header :mode="mode" @toggle="toggle"/>

      <div class="wrapper">
        <h1>Plant App</h1>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import toggle from "@/components/Toggle.vue";

export default {
  name: 'app',
    data() {return {mode: 'light'}},
  components: {Header},
  methods:{
    toggle(){
      if (this.mode === 'dark'){
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
.app{
  width: 100vw;
  min-height: 100vh;
  background-color: #F3F3F3;
  color: #15202B;
  transition: background 0.5s ease-in-out;
}

.dark{
  background-color: #192734;
  color: #F3F3F3;
}
</style>

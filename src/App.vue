<template>
  <header>
    <div class="app" :class="mode">
      <Header :mode="mode" @toggle="toggle"/>
      <h1>Plant App</h1>
      <router-view />
    </div>
  </header>
</template>

<script>
import Header from "@/components/Header.vue";

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
  color: #15202F;
  transition: background 0.5s ease-in-out;
}

.dark{
  background-color: #192734;
  color: #F3F3F3;
}
h1{
  text-align: center;
  padding: 20px;
  font-size: 2.5rem;
  font-weight: 500;
}
</style>

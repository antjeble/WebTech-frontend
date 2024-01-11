<template>
  <header>
    <h1> {{mode}} </h1>
    <Toggle :mode="mode" @toggle="$emit('toggle')"/>
      <nav>
        <ul>
          <li class="nav-link"><router-link to="/landing">Home</router-link></li>
          <li class="nav-link"><router-link to="/">Plants</router-link></li>
          <li class="nav-link"><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
  </header>
</template>

<script>

import Toggle from "@/components/Toggle.vue";

export default {
  components: {Toggle},
  props: ['mode']}

</script>


<style scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  height: 50px;
  background-color: #C3C3C3;
  transition: background 0.5s ease-in-out;
}
.dark header{
  background-color: #15202B;
}
header h1{
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 600;
}
header nav{
  display: flex;
  height: 50px;
}
header nav .nav-link{
  display: flex;
  align-items: center;
  padding: 0 15px;
}
header nav .nav-link:hover{
  background-color: #B0B0B0;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
</style>
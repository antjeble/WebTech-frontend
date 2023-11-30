<template>
  <h3> {{ title }}</h3>
  <div>
    <input v-model="nameField" placeholder="Name">
    <input v-model="durationField" placeholder="Dauer">
    <button type="button" @click="save()">"Speichern"</button>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dauer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="2">Noch keine Pflanzen hinzugefügt</td>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.duration}}</td>
        </tr>
        <tr>
          <td>{{ nameField }}</td>
          <td>{{ durationField }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from "vue";
  import { Ref } from 'vue'
  import axios from "axios";


  defineProps<{
   title: string }>()

  type Plant = {id: number, name: string, duration: number}

  const items: Ref<Plant[]> = ref([])
  const nameField = ref('')
  const durationField = ref(0)

  function loadPlants() {
    axios.get('http://localhost:8080/plants')
           .then(response => {
             response.data.forEach((plant: Plant) => {
               items.value.push(plant)
             })
           })
           .catch(error => console.log('error', error))
  }


  function save () {
    axios.post('http://localhost:8080/plants', {
      name: nameField.value,
      duration: durationField.value
    })
        .then(response => {
          console.log(response)
          items.value.push(response.data)
        })
        .catch(error => console.log('error', error))
  }


  // Lifecycle hooks
  onMounted(() => {
    loadPlants()
  })
</script>

<style scoped>
h3 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
button {
  color: green;
}

</style>
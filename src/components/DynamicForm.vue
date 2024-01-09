<template>
  <div class="plant-container">
    <h3> {{ title }}</h3>
    <div class="form-container">
      <input v-model="nameField" placeholder="Name">
      <input v-model="durationField" placeholder="Dauer">
      <button type="button" @click="save()">"Speichern"</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>schon gegossen?</th>
            <th>Name</th>
            <th>Dauer</th>
            <th>Löschen</th>
            <th>Bearbeiten</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="plants.length === 0">
            <td colspan="2">Noch keine Pflanzen hinzugefügt</td>
          </tr>
          <tr v-for="plant in plants" :key="plant.id">
            <td><input type="checkbox"></td>
            <td>{{plant.name}}</td>
            <td>{{plant.duration}}</td>
            <td><button @click="deletePlant(plant.id)">X</button></td>

          </tr>
          <tr>
            <td>{{ nameField }}</td>
            <td>{{ durationField }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from "vue";
  import { Ref } from 'vue'
  import axios from "axios"
  import {AxiosResponse} from "axios"
  import {defineProps} from "vue"

  defineProps<{
   title: string }>()

  type Plant = {id: number, name: string, duration: number}

  const plants: Ref<Plant[]> = ref([])
  const nameField = ref('')
  const durationField = ref()

  async function loadPlants () {
    //@ts-ignore
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const endpoint = baseUrl + '/plants'
    const response: AxiosResponse = await axios.get(endpoint);
    const responseData: Plant[] = response.data;
    responseData.forEach((plant: Plant) => {
      plants.value.push(plant)
    })
  }

  async function save () {
    //@ts-ignore
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const endpoint = baseUrl + '/plants'
    const data = {
      name: nameField.value,
      duration: durationField.value
    }
    const response: AxiosResponse = await axios.post(endpoint, data);
    const responseData: Plant = response.data;
    console.log('Success: ', responseData)
    plants.value.push(responseData)
    nameField.value = '';
    durationField.value= '';
  }

  async function deletePlant(id?: number) {
    if (id) {
      //@ts-ignore
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const endpoint = baseUrl + '/plants/' + id;
      console.log('Deleting plant at endpoint:', endpoint);
      try {
        await axios.delete(endpoint);
        plants.value = plants.value.filter((plant) => plant.id !== id);
        console.log('Plant deleted successfully.');
      } catch (error) {
        console.error('Error deleting plant:', error);
      }
    }
  }

  // Lifecycle hooks
  onMounted(async () => {
    await loadPlants()
  })
</script>

<style scoped>

h3 {
  text-align: center;
}

table {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  tr:hover {background-color: darkseagreen;}

}
th {
  padding: 2px;
  text-align: center;
  border-bottom: 1px solid seagreen;
  background-color: seagreen;
  color: white;
}
td {
  padding: 2px;
  text-align: center;
  border-bottom: 1px solid lightgrey;
}

button {
  color: green;
}

</style>
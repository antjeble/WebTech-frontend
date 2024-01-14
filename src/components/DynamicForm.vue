<template>
  <div class="plant-container">
    <h3> {{ title }}</h3>
    <div class="form-container">
      <input v-model="nameField" placeholder="Name">
      <input v-model="durationField" placeholder="Dauer">
      <button type="button" class="btn btn-outline-secondary" @click="save()">Speichern</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>schon gegossen?</th>
            <th>Name</th>
            <th>Dauer</th>
            <th>Löschen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="plants.length === 0">
            <td colspan="2">Noch keine Pflanzen hinzugefügt</td>
          </tr>
          <tr v-for="plant in plants" :key="plant.id">
            <td><input type="checkbox" v-model="plant.watered" @change="isChecked(plant)"></td>
            <td>{{plant.name}}</td>
            <td>{{plant.duration}}</td>
            <td><button class="btn btn-outline-dark" @click="deletePlant(plant.id)">X</button></td>
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
  import { Ref } from 'vue';
  import axios from "axios";
  import {AxiosResponse} from "axios";
  import {defineProps} from "vue";

  defineProps<{
   title: string }>()

  type Plant = {id: number, name: string, duration: number, watered: boolean}

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
    if (!nameField.value && !durationField.value) {
      alert('Bitte Name und Dauer angeben.');
      return;
    }
    if (!nameField.value) {
      alert('Bitte Name vor dem Speichern angeben.');
      return;
    }
    if (!durationField.value) {
      alert('Bitte Dauer vor dem Speichern angeben.');
      return;
    }
    //@ts-ignore
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
    const endpoint = baseUrl + '/plants'
    const data = {
      name: nameField.value,
      duration: durationField.value
    }
    try{
      const response: AxiosResponse = await axios.post(endpoint, data);
      const responseData: Plant = response.data;
      console.log('Success: ', responseData)
      plants.value.push(responseData)
      nameField.value = '';
      durationField.value= '';
    }
    catch (error) {
      console.error('Error saving plant:', error)
    }
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

  async function isChecked(plant: Plant) {
    //@ts-ignore
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const endpoint = baseUrl + '/plants/' + plant.id;

    try {
      const response: AxiosResponse = await axios.put(endpoint, plant);
      console.log('Plant watered status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating plant watered status:', error);
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
.form-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
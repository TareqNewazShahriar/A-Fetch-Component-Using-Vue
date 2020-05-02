<template>
   <div>
      <h2>Nested Requests</h2>
      <h5>Select a location to fetch its areas:</h5>
      <select v-model="selectedUrl" @change="locationChanged = true">
         <option v-for="item in locations" :value="item.url" :key="item.name">{{item.name}}</option>
      </select>
      <div v-for="(area, i) in areas" :key="area.name">
         {{i+1}}. {{area.name}}
      </div>

      <Fetch
         url="https://pokeapi.co/api/v2/location?offset=20&limit=10"
         @resolved="data => locations = data.results"
      />
      <!-- PokéAPI is free and open to use. It is asked every
       developer to abide by the fair use policy. -->
      <Fetch
         :start="locationChanged"
         :url="selectedUrl"
         @resolved="data => { areas = data.areas; locationChanged = false; }"
      />
   </div>
</template>

<script>
import Fetch from "@/components/Fetch";

export default {
   components: { Fetch },
   data: () => ({
      locations: null,
      areas: null,
      locationChanged: false,
      selectedUrl: null
   })
};
</script>
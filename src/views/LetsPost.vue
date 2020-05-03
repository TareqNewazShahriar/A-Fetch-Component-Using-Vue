<template>
   <div>
      <h2>Let's POST</h2>
      
      <button @click="start = true">Start POST</button>
      <br />
      Data: {{data}} | Error: {{isError}}
      
      <Fetch
         :start="start"
         url="https://jsonplaceholder.typicode.com/posts"
         :options="{ method: 'POST',
               headers: { 'Content-Type': 'application/json' }, 
               body: JSON.stringify({ woow: 'yahhhoo', thats: 'amazing', whatTimeIsIt: new Date() })
            }"
         @resolved="_data => { data = _data; start = false; }"
      />
   </div>
</template>
<script>
import Fetch from "@/components/Fetch";
export default {
   components: { Fetch },
   data: () => ({
      start: false,
      data: null,
      isError: false
   })
};
</script>
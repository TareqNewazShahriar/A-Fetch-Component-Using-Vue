<template>
   <div>
      <h2>Let's POST</h2>
		<p>
			Let's post some random data to <i>jsonplaceholder.typicode.com</i>.
		</p>
      <button @click="start = true">Start POST</button>
      <br />
      Data: {{data}} | Error: {{isError}}
      
      <Fetch
         :start="start"
         url="https://jsonplaceholder.typicode.com/posts"
         :options="{ method: 'POST',
               headers: { 'Content-Type': 'application/json' }, 
               body: JSON.stringify(model)
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
		model: { woow: 'yahhhoo', thats: 'amazing', whatTimeIsIt: new Date() },
      start: false,
      data: null,
      isError: false
   })
};
</script>
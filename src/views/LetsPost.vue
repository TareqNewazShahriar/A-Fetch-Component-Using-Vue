<template>
   <div>
      <h2>Let's POST</h2>
        <p>
            Let's post this JSON
            <pre class="inline border">
                { woow: 'yahhhoo', thats: 'amazing', whatTimeIsIt: new Date() }
            </pre>
            to <pre class="inline">jsonplaceholder.typicode.com</pre>.
        </p>
      <button @click="start = true">Start POST</button>
        <hr />
      <b>Data</b>: {{data}}
        <br />
        <b>Error</b>: {{isError}}

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

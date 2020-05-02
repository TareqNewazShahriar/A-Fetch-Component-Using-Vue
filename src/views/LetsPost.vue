<template>
   <div>
      <h2>Let's POST Nowhere</h2>
      <button @click="start = true">Start Post</button>
      <br />
      Data: {{data}} | Error: {{isError}}
      <Fetch
         :start="start"
         url="/here/nowhere/login"
         :options="{ method: 'POST',
               headers: { 'Content-Type': 'application/json' }, 
               body: JSON.stringify({ email:'str@iddd.com', password:'sdfsdfsdf' })
            }"
         @resolved="(_data, _isError) => { data = _data; isError = _isError; start = false; }"
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
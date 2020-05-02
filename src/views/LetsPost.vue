<template>
   <div>
      <h2>Let's POST</h2>
      {{data}},
      {{isError}}
      <Fetch
         url="somewhere.nowhere/account/login"
         :options="{ method: 'POST',
               headers: { 'Content-Type': 'application/json' }, 
               body: JSON.stringify({ email:'str@iddd.com', password:'sdfsdfsdf' })
            }"
         @resolved="(_data, _isError) => { data = _data; isError = _isError; }"
      />
   </div>
</template>
<script>
import Fetch from "@/components/Fetch";
export default {
   components: { Fetch },
   data: () => ({
      data: null,
      isError: false
   })
};
</script>
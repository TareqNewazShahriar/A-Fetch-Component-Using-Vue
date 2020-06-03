<template>
   <div>
      <h2>Let's Occur An Error</h2>
      <p>The Fetch component will hit to an wrong URL to occur an error.</p>
      <button @click="start = true">To occur an error - hit me</button>
      <hr />
      Error Occurred? {{isError}}
      <div v-show="completed">Fetch finished</div>

      <Fetch
         :start="start"
         url="/lets/occur/an/error"
         @resolved="(_data, _isError) => { isError = _isError; start = false; }"
         @finished="completed = true"
      />
      <a class="fixed-bottom" target="_blank" href="https://github.com/TareqNewazShahriar/a-fetch-component-using-vue/blob/master/src/views/LetsOccurAnError.vue">Check out this view source</a>
   </div>
</template>

<script>
import Fetch from "@/components/Fetch";
export default {
   components: { Fetch },
   data: () => ({
      start: false,
      completed: false,
      isError: false
   })
};
</script>

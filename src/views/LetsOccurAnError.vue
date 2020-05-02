<template>
   <div>
      <h2>Let's Occur An Error</h2>
      <div v-show="completed">Fetch finished</div>
      <Fetch url="https://adsfasdfds.xgtyutb/sdfsdf" 
         @finished="completed = true" />
   </div>
</template>

<script>
import Fetch from "@/components/Fetch";
export default {
   components: { Fetch },
   data: () => ({
      completed: false
   })
};
</script>
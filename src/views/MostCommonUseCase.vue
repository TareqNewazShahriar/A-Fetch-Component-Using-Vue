<template>
   <div>
      <h2>Most Common Use Case</h2>
      <pre>{{data}}</pre>
      <Fetch url="https://yesno.wtf/api" @resolved="json => data = json" />
   </div>
</template>

<script>
import Fetch from "@/components/Fetch";

export default {
   components: { Fetch },
   data: () => ({
      data: null
   })
};
</script>
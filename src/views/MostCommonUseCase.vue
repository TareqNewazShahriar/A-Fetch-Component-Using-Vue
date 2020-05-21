<template>
   <div>
      <h2>Most Common Use Case</h2>
		<p>Fetch component will fetch a small JSON from <pre class="inline">https://yesno.wtf/api</pre>.</p>
		<hr />
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
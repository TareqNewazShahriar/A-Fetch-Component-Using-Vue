<template>
   <div>
      <h2>Multiple URL Example</h2>
        <p>This page will initiate two http requests.</p>
        <hr />
      <pre>{{data1}}</pre>
      <pre>{{data2}}</pre>

      <Fetch
         :url="{
            randomYesno: 'https://yesno.wtf/api',
            forceNo: 'https://yesno.wtf/api?force=no'
         }"
         @resolved="takeData"
      />
      <a class="fixed-bottom" target="_blank" href="https://github.com/TareqNewazShahriar/a-fetch-component-using-vue/blob/master/src/views/MultiUrlExample.vue"></a>
   </div>
</template>
<script>
import Fetch from "@/components/Fetch"; // <-- check path, change if needed

export default {
   components: { Fetch },
   data: () => ({
      data1: null,
      data2: null
   }),
   methods: {
      takeData(dataset) {
         this.data1 = dataset.randomYesno;
         this.data2 = dataset.forceNo;
      }
   }
};
</script>

<template>
   <div>
      <h2>Multiple URL Example</h2>
      <pre>{{data1}}</pre>
      <pre>{{data2}}</pre>
      <Fetch
         :url="{ randomYesno: 'https://yesno.wtf/api', randomYesnoAgain: 'https://yesno.wtf/api' }"
         @resolved="takeData"
      />
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
         this.data2 = dataset.randomYesnoAgain;
      }
   }
};
</script>
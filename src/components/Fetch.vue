<template>
   <div>
      <!-- This is the error message html, change it -->
      <p v-if="error">
         {{errorData}}
         <button @click="error = false">Close</button>
      </p>

      <!-- This is the loader, change it -->
      <div v-show="loading">[ Loading... ]</div>
   </div>
</template>

<script>
export default {
   props: {
      start: { type: Boolean, default: true },
      url: [String, Object],
      options: { type: Object, default: () => ({ method: "GET" }) },
      responseType: {
         type: String /* json/text/formData/blob/arrayBuffer/none */,
         default: "json"
      }
   },
   data: () => ({
      loading: false,
      dataset: {},
      error: false,
      errorData: null
   }),
   watch: {
      start(newVal) {
         this.reset(newVal);
         if (newVal === true) this.dispatchAll(this.url);
      }
   },
   created() {
      this.reset(this.start);
      if (this.start === true) this.dispatchAll(this.url);
   },
   methods: {
      reset(start) {
         this.error = false;
         this.errorData = null;
         this.dataset = {};
         this.loading = start;
      },
      dispatchAll(urlData) {
         let vm = this;

         let promises = [];
         if (typeof urlData === "string") {
            promises.push(this.dispatch(urlData));
         } else {
            for (const key in urlData)
               promises.push(this.dispatch(urlData[key], key));
         }

         Promise.all(promises).then(() => {
            vm.loading = false;
            vm.$emit("resolved", !vm.error ? vm.dataset : null, /*is error?*/ vm.error);

            if (vm.error) {
               let unwatch = vm.$watch("error", function(newVal) {
                  if (newVal === false) {
                     unwatch();
                     vm.$emit("finished", /*is successful?*/ false);
                  }
               });
            } else {
               vm.$emit("finished", /*is successful?*/ true);
            }
         });
      },
      dispatch(url, dataName) {
         let vm = this;

         let promise = fetch(url, this.options)
            .then(r => {
               if (!r.ok) {
                  switch (r.status) {
                     case 400:
                        throw new Error("Input data is not valid.");
                     case 401:
                        throw new Error("Data wasn't matched.");
                     case 404:
                        throw new Error("Data not found.");
                     default:
                        throw new Error(`${r.status}: ${r.statusText}`);
                  }
               } else if (r.status === 204) {
                  return null;
               } else {
                  return r[vm.responseType]();
               }
            })
            .then(data => {
               dataName ? (vm.dataset[dataName] = data) : (vm.dataset = data);
            })
            .catch(ex => {
               vm.errorData = `Something went wrong. [${ex.message}]`;
               vm.error = true;
            });

         return promise;
      }
   }
};
</script>
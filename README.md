# A Fetch Component Using Vue

What that component is all about:
1. This component performs http requests using Javascript `fetch` (all modern browsers have support to it, this is not new anymore).
2. Passing the URL (or URLs) and a callback to receive data are enough.
3. A loader will be shown. When response arrived, data will be returned.
4. If error occurred, it will handle it and will show the error.


### A sample usage of this component
```vue
<Fetch
   url="https://yesno.wtf/api"
   @resolved="json => data = json"
/>
```
It is short and sweet, right! And also loader and errors will be shown. Just put your loader and error popup of choice.

### Copy the Component and Use
In the component template, you should use your own loader and error alert-box.

Let's see the component and then know its props and events. 
```vue
/* MIT License. Tareq Newaz Shahriar.
   https://github.com/TareqNewazShahriar/a-fetch-component-using-vue
*/
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
      dataset: null,
      error: false,
      errorData: null
   }),
   watch: {
      start(newVal) {
         if (newVal === true) {
            this.error = false;
            this.loading = true;
            this.dispatchAll(this.url);
         }
      }
   },
   created() {
      this.loading = this.start;
      if (this.start === true) this.dispatchAll(this.url);
   },
   methods: {
      dispatchAll(urlData) {
         let vm = this;

         let promises = [];
         if (typeof urlData === "string") {
            promises.push(this.dispatch(urlData));
         } else {
            for (const key in urlData)
               promises.push(this.dispatch(urlData[key], key));
         }

         this.dataset = {};
         Promise.all(promises).then(() => {
            vm.loading = false;
            vm.$emit(
               "resolved",
               !vm.error ? vm.dataset : null,
               /*is error?*/ vm.error
            );

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
                        throw new Error("Not found.");
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
```

#### Component Props
1. `start` (boolean | default: true): If `true`, http request will be started. If omitted, then request will be started immediately when the component is created.
2. `url` (string / Json): Pass your URL as a string. If you want to execute multiple requests, pass each URL with a _key_ as in Json object. So the returned object will have the data of each response with that _key_. Let's see an example:
```vue
// MultiUrlExample.vue
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
```
3. `options` (Json | default: { method: "GET" }): Pass the `options` Json object of the _fetch api_, which takes _method_, _headers_, data _body_ etc and more. To see details, go to the link and find [Supplying request options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
4. `responseType` (string | default: "json"): `fetch` API has some methods to parse the response _body_. Tell the component what type of data will come. Value can be one of these: json / text / formData / blob / arrayBuffer / none.

#### Component Events
1. `@resolved`: The request may resolve successfully or with an error. `resolved` event will have two parameters - data and isError. _data_ will contain the response data; if error occurred, _isError_ will be `true` and _data_ will be null.
2. `@finished`: When everything is finished, like either data successfully returned or error occurred and error shown, then error-message is gone - then this event will be emitted with a _true_ or _false_. _false_ for error, otherwise _true_.

Here's a usage of nested requests. Firstly, some locations will be loaded; then if an location is selected, its areas will be loaded:
```vue
// NestedRequests.vue
<template>
   <div>
      <h2>Nested Requests</h2>
      <h5>Select a location to fetch its areas:</h5>
      <select v-model="selectedUrl" @change="locationChanged = true">
         <option v-for="item in locations" :value="item.url" :key="item.name">{{item.name}}</option>
      </select>
      <div v-for="(area, i) in areas" :key="area.name">
         {{i+1}}. {{area.name}}
      </div>

      <!-- PokéAPI is free and open to use. And it is requested to
         abide by the fair use policy. -->
      <Fetch
         url="https://pokeapi.co/api/v2/location?offset=20&limit=10"
         @resolved="data => locations = data.results"
      />
      <Fetch
         :start="locationChanged"
         :url="selectedUrl"
         @resolved="data => { areas = data.areas; locationChanged = false; }"
      />
   </div>
</template>

<script>
import Fetch from "@/components/Fetch";

export default {
   components: { Fetch },
   data: () => ({
      locations: null,
      areas: null,
      locationChanged: false,
      selectedUrl: null
   })
};
</script>
```

Fell free to issue issues and suggestions. Thanks.

### Useful command to start the project
```npm install```
```npm run serve```

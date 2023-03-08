### A Fetch Component Using Vue

> Demo: [https://tareqnewazshahriar.github.io/fetch-component/dist](https://tareqnewazshahriar.github.io/fetch-component/dist)

What that component is all about:
1. This component performs http requests using Javascript `fetch` (all modern browsers have support to it, this is not new anymore).
2. Passing the URL (or URLs) and a callback to receive data are enough.
3. A loader will be shown. When response arrived, data will be returned.
4. If error occurred, it will handle it and will show the error.


### Most common usage of this component
```vue
<Fetch
   url="https://yesno.wtf/api"
   @resolved="json => data = json"
/>
```
It is short and sweet, right! And also loader and errors will be shown. Just put your loader and error popup of choice.

### Copy the Component and Use
In the component template, you should use your own loader and error alert-box.
Here's the comopnent [src > components > fetch.vue](https://raw.githubusercontent.com/TareqNewazShahriar/a-fetch-component-using-vue/master/src/components/Fetch.vue). Copy the code and use it.

Let's know its props and events.

### Component Props
* `start` (boolean; default: null): If `true`, http request will be started. If this prop is not used, the request will be started after the component is initiated.
* `url` (string / Json): Pass your URL as a string. If you want to execute multiple requests, pass each URL with a _key_ as in Json object. So the returned object will have the data of each response with that _key_. Let's see an example:

```vuejs
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

* `options` (Json, default: { method: "GET" }): Pass the `options` Json object of the _fetch api_, which takes _method_, _headers_, data _body_ etc and more. To see details, go to the link and find [Supplying request options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
* `responseType` (string, default: "json"): `fetch` API has some methods to parse the response _body_. Tell the component what type of data will come. Value can be one of these: json / text / formData / blob / arrayBuffer / none.

### Component Events
* `@resolved`: The request may resolve successfully or with an error. `resolved` event will have two parameters - data and isError. _data_ will contain the response data; if error occurred, _isError_ will be `true` and _data_ will be null.
* `@finished`: When everything is finished, like either data successfully returned or error occurred and error shown, then error-message is gone - then this event will be emitted with a _true_ or _false_. _false_ for error, otherwise _true_.

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

#### Commands to start the project
* `npm install`
* `npm run serve`


Fell free to issue issues and suggestions. Thanks.

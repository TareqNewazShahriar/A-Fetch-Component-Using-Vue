<template>
   <div id="app">
      <a class="fixed-top" href="https://github.com/TareqNewazShahriar/a-fetch-component-using-vue">Github</a>
      <div id="nav">
         <router-link to="/">Most Common Use Case</router-link>|
         <router-link :to="{name: 'multi-urls'}">Multiple URLs Example</router-link>|
         <router-link :to="{name: 'nested'}">Nested Requests</router-link>|
         <router-link :to="{name: 'post'}">Let's Post</router-link>|
         <router-link :to="{name: 'error'}">Let's Occur An Error</router-link>
      </div>
      <router-view />
   </div>
</template>

<style>
* {
   word-wrap: break-word;
   word-break: break-word;
   white-space: normal;
}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}

#nav {
   padding: 30px;
}

#nav a {
   font-weight: bold;
   color: #2c3e50;
}

#nav a.router-link-exact-active {
   color: #42b983;
}

.inline {
   display: inline;
}

.border {
   border: 1px dotted black;
}
.fixed-top {
   position: absolute;
   top: 10px;
   right: 10px;
}
.fixed-bottom {
   position: absolute;
   bottom: 10px;
   right: 10px;
}
.fixed-bottom::after {
   content: 'Check out this view source to see how the Fetch component was used here'
}
</style>

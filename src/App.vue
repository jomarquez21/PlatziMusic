<template>
  <div id="app">
    <img src="https://jomarquez21.github.io/PlatziMusic/assets/logo.png">
    <h1>PlatziMusic</h1>

    <select v-model="countrySelected">
      <option v-for="country in countriesAvailables" :key="country.value" :value="country.value" >{{country.name}}</option>
    </select>

    <spinner v-show="loading"></spinner>

    <ul>
      <artist v-for="artist in artists" :key="artist.mbid" :artist="artist"></artist>
    </ul>
  </div>
</template>

<script>
import {getArtists} from './api';
import Artist from './components/Artist.vue';
import Spinner from './components/Spinner.vue';

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countrySelected: 'venezuela',
      countriesAvailables: [
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'colombia'},
        {name: 'Venezuela', value: 'venezuela'},
      ],
      loading: true,
    }
  },
  components: {
    Artist,
    Spinner,
  },
  created: function() {
    console.log('created', this);
  },
  mounted: function() {
    const _this = this;
    this.loading = true;
    getArtists(this.countrySelected)
      .then((response) => {
        _this.loading = false;
        _this.artists = response;
      });
  },
  watch: {
    countrySelected() {
      console.log(this.countrySelected);
      const _this = this;
      this.loading = true;
      this.artists = [];
      getArtists(this.countrySelected)
        .then((response) => {
          _this.loading = false;
          _this.artists = response;
        });
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

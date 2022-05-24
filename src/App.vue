<template>
  <div id="app">
    <div id="nav">
      <router-link to="/series">Séries</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/cars">Carros</router-link>
    </div>
    <div data-app>
       <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  #app {
    position: relative;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #35806d;

    height: 100vh;

    background: linear-gradient(350deg, #2e8053, #fcfcfc 40%);
  }

  #nav {
    //position: absolute;
    z-index: 100;
    width: 100vw;

    background: #1d1d1d;

    max-height: 2.2rem;
    min-height: 2.2rem;
    height: 2.2rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    a {
      font-weight: 100;
      color: #abb4bd;

      max-width: 10vw;
      min-width: 10vw;
      width: 10vw;

      text-decoration: none;

      &.router-link-exact-active {
        color: #42b983;
        text-decoration: underline;
        font-weight: 600;
      }
    }
  }

  .page-header {
    margin: 4rem auto;
  }

  @media screen and (min-width: 992px) {
    .v-data-table.table-container {
      margin: auto;
      max-width: 70vw;
    }
  }

  // Estilização para evento 'hover' nas tabelas da aplicação
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #e0e0e0;
    color: #35806d;
  }
</style>
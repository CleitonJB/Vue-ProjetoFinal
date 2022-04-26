<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
           <h1> Listagem dos carros </h1>
           <v-data-table
              :headers="headers"
              :items="cars"
              :search="search"
              sort-by="id"
              class="elavation-1">
           </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CarCrud",
        data: () => ({
            search:"",
            headers: [
            { text: "Actions",    value: "actions", sortable: false },
            { text: "Id",         value: "id"},
            { text: "Nome",       value: "name"},
            { text: "Produção",   value: "production"},
            { text: "Fabricante", value: "manufacturer"},
            { text: "País",       value: "assembly"}
            ],
            cars: []
        }),
        methods: {
            inicializa() {
                axios.get('http://localhost:3000/cars')
                .then((response) => {
                    this.cars = response.data
                })
                .catch((error) => console.log("Erro ao buscar listagem de carros: ", error))
            }
        },
        created() {
            this.inicializa()
        }
    };
</script>
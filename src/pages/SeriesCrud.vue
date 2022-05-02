<template>
<v-container>
    <v-row class="text-center">
      <v-col cols="12">
           <h1> Listagem das séries </h1>
           <v-data-table
              :headers="headers"
              :items="series"
              :search="search"
              sort-by="id"
              class="elavation-1"
            >
                <!-- Dialog -->
                <template v-slot:top>
                    <v-dialog
                    v-model="dialogStatus"
                    max-width="500px"
                    >
                        <v-card>
                            <v-card-title>
                                <span class="text-h2">{{ (dialogMode == 'adicionar') ? 'Nova série' : 'Editar série' }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="4" md="2">
                                            <v-text-field v-model="modalForm.id" label="Id"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="8" md="10">
                                            <v-text-field v-model="modalForm.title" label="Nome"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="modalForm.genres" label="Gênero"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="modalForm.release" label="Lançamento"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="modalForm.language" label="Idioma"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close()"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="save()"
                                >
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>

                <!-- Adicionar - button -->
                <template #[`header.actions`]>
                    <v-icon color="blue" @click="abrirModal('adicionar', null)">mdi-plus-circle-outline</v-icon>
                </template>

                <!-- Editar  - button -->
                <!-- Excluir - button -->
                <template #[`item.actions`]="{ item }">
                    <v-icon @click="abrirModal('editar', item)">mdi-pencil-circle-outline</v-icon>
                    <v-icon @click="excluir(item.id)">mdi-delete-circle-outline</v-icon>
                </template>
           </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import axios from 'axios';

    export default{
        name: "SeriesCrud",
        data: () => ({
            search:"",
            headers: [
                { text: "Actions",      value: "actions", sortable: false },
                { text: "Id",           value: "id"},
                { text: "Nome",         value: "title"},
                { text: "Gênero",       value: "genres"},
                { text: "Lançamento",   value: "release"},
                { text: "Idioma",       value: "language"}
            ],
            series: [],
            dialogStatus: false,
            dialogMode: "",
            initialModalForm: {
                id:           null,
                title:        "",
                genres:       "",
                release:      "",
                language:     ""
            },
            modalForm: {
                id:           null,
                name:         "",
                production:   "",
                release:      "",
                language:     ""
            }
        }),
        methods: {
            inicializa() {
                axios.get('http://localhost:3000/series')
                .then((response) => {
                    this.series = response.data;
                })
                .catch((error) => console.log("Erro ao buscar listagem de séries: ", error))
            },
            abrirModal(modo, item) {
                switch(modo) {
                    case "adicionar":
                        this.dialogMode = "adicionar";
                    break;

                    case "editar":
                        this.dialogMode = "editar";
                        this.modalForm = Object.assign({}, (item != null) ? item : this.initialModalForm);
                    break;
                }
                
                this.dialogStatus = true;
            }, 
            close() {
                this.modalForm = Object.assign({}, this.initialModalForm);
                this.dialogStatus = false;
                this.dialogMode = "";
            },
            save() {
                this.dialogStatus = false;

                switch(this.dialogMode) {
                    case "adicionar":
                        this.adicionar(this.modalForm);
                    break;

                    case "editar":
                        this.editar(this.modalForm.id, this.modalForm);
                    break;
                }
            },
            adicionar(item) {
                axios.post("http://localhost:3000/series", item)
                    .then(() => {
                        alert(`Item (${item.id}) criado com sucesso!`);
                        this.inicializa();
                    })
                    .catch((error) => {
                        alert(`Erro ao criar item (${item.id}): ${error}`);
                    })
            },
            editar(itemId, item) {
                this.dialogMode = "editar";
                axios.put(`http://localhost:3000/series/${itemId}`, item)
                    .then(() => {
                        alert(`Item (${itemId}) editado com sucesso!`);
                        this.inicializa();
                    })
                    .catch((error) => {
                        alert(`Erro ao editar item (${itemId}): ${error}`);
                    });
            },
            excluir(itemId) {
                confirm(`Deseja realmente excluir o item (${itemId})?`) &&

                axios.delete(`http://localhost:3000/series/${itemId}`)
                    .then(() => {
                        alert(`Item (${itemId}) excluído com sucesso!`);
                        this.inicializa();
                    })
                    .catch((error) => {
                        alert(`Erro ao excluir item (${itemId}): ${error}`);
                    });
            }
        },
        created() {
            this.inicializa();
        }
    }
</script>

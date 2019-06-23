<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Productos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Dialog Box para registrar -->
        <v-dialog v-model="dialogProd" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Producto</v-btn>
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombreProd" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea name="input-7-1" label="Descripcion" v-model="descripcion"></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="precio" label="Precio"></v-text-field>
                  </v-flex>
                  <v-combobox v-model="selectCategoria" :items="categorias" label="Categoria"></v-combobox>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="registrarProducto">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Termina el dialog box de registro-->
        <v-dialog v-model="dialogCat" max-width="500px">
          <v-btn slot="activator" color="red accent-1" dark class="mb-2">Nueva Categoria</v-btn>
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombreCat" label="Nombre"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="registrarCategoria">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-data-table :headers="headers" :items="productos" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.nombreProd }}</td>
          <td>{{ props.item.precio }}</td>
          <td>{{ props.item.nombreCat }}</td>
          <td>{{ props.item.descripcion }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listarProductos">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      selectCategoria: "",
      categorias: [],
      productos: [],
      dialogCat: false,
      dialogProd: false,
      headers: [
        { text: "Nombre", value: "nombreProd", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Categoria", value: "nombreCat" },
        { text: "Descripcion", value: "descripcion" }
      ],

      alert: false,
      search: null,
      editedIndex: -1,

      //Model Producto
      idProd: "",
      nombreProd: "",
      descripcion: "",
      precio: "",
      categoriaId: this.categorias.find(
        categoria => categoria.name === this.selectCategoria
      ).id,
      //Model Categoria
      idCat: "",
      nombreCat: ""
    };
  },

  watch: {
    dialogCat(val) {
      val || this.close();
    },
    dialogProd(val) {
      val || this.close();
    }
  },

  created() {
    this.listarCategorias();
  },
  methods: {
    listarCategorias() {
      let me = this;
      axios
        .get("api/categoria")
        .then(response => {
          me.categorias = response.data;
          if (me.categorias.lenght > 0) {
            me.listarProductos();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    listarProductos() {
      let me = this;
      axios
        .get("api/producto")
        .then(response => {
          me.productos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.lastname = item.lastname;
      this.departament = item.departament;
      this.salary = item.salary;

      this.editedIndex = 1;
      this.dialog = true;
    },

    close() {
      this.dialogCat = false;
      this.dialogProd = false;
    },
    registrarCategoria() {
      let me = this;
      axios
        .post("api/categoria", {
          nombre: me.nombre
        })
        .then(response => {
          console.log(response);
          this.listarCategorias();
        })
        .catch(error => {
          console.log(error);
        });
    },
    registrarProducto() {
      let me = this;
      axios
        .post("api/producto", {
          nombre: me.nombreProd,
          descripcion: me.descripcion,
          precio: me.precio,
          categoriaid: me.categoriaId
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

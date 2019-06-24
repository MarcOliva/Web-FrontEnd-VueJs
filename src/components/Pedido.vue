<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Pedidos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Dialog Box para registrar -->
        <RegistrarPedido></RegistrarPedido>
        <!-- Termina el dialog box de registro-->
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-data-table :headers="headers" :items="pedidos" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.reservaid }}</td>
          <td>{{ props.item.fecha_registro}}</td>
          <td>{{ props.item.total }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listarPedidos">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import RegistrarPedido from "./RegistrarPedido";
export default {
  data() {
    return {
      pedidos: [],
      nombreHabitacion: "",
      numCamas: [1, 2, 3, 4],
      cantidadCamas: "",
      habitaciones: [],
      dialog: false,
      headers: [
        { text: "Reserva", value: "reservaid", sortable: false },
        { text: "F. Registro", value: "fecha_registro", sortable: false },
        { text: "Total", value: "total" }
      ],

      alert: false,
      search: null,
      editedIndex: -1,
      //Model Pedido
      idPed: "",
      fecha_registro: "",
      total: "",
      reservaid: "",
      //Modelo Detalle Pedido
      idDeta: "",
      precio: "",
      descuento: "",
      cantidad: "",
      productoid: "",
      pedidoid: ""
    };
  },
  components: {
    RegistrarPedido: RegistrarPedido
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listarPedidos();
  },
  methods: {
    listarPedidos() {
      let me = this;
      axios
        .get("api/pedido")
        .then(response => {
          me.pedidos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    close() {
      this.dialog = false;
    }
  }
};
</script>

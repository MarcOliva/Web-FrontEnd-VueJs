<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Reservas</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md3>
          <v-text-field label="Numero de Documento " v-model="search"></v-text-field>
        </v-flex>
        <v-btn @click.native="filterSalary" color="info">Buscar</v-btn>
        <v-spacer></v-spacer>
        <!-- Dialog Box para registrar -->
        <RegistroReserva></RegistroReserva>
        <!-- Termina el dialog box de registro-->
      </v-toolbar>
      <v-data-table :headers="headers" :items="reservas" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.apellidoPa }}</td>
          <td>{{ props.item.apellidoMa }}</td>
          <td>{{ props.item.habitacion_id }}</td>
          <td>{{ props.item.fecha_inicio }}</td>
          <td>{{ props.item.fecha_fin }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listarReservas">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import RegistroReserva from "./RegistrarReserva";
export default {
  data() {
    return {
      selectHabitacion: "",
      tiposHabitacion: ["Simple", "Doble", "Triple", "Matrimonial"],
      reservas: [],
      dialog: false,
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "A. Paterno", value: "apellidoPa", sortable: false },
        { text: "A. Materno", value: "apellidoMa" },
        { text: "Habitacion", value: "habitacion" },
        { text: "F. Inicio", value: "fecha_inicio" },
        { text: "F. Fin", value: "fecha_fin" }
      ],

      alert: false,
      search: null,
      editedIndex: -1,

      //Model Reserva
      fecha_inicio: "",
      fecha_fin: "",
      fecha_registro: this.formatDate(new Date().toISOString().substr(0, 10)), // se genera
      cliente_id: "",
      comentario: "",
      habitacion_id: "",
      monto: "",
      anulado: false,

      //Model Cliente
      nombre: "",
      apellidoPa: "",
      apellidoMa: "",
      phone: "",
      fecha_nac: "",
      tipo_doc: "",
      num_doc: "",
      pais: ""
    };
  },
  computed: {
    filterSalary() {
      return this.empleados.filter(i => {
        return !this.search || i.salary > this.search;
      });
    }
  },
  components: {
    RegistroReserva: RegistroReserva
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listarReservas();
  },
  methods: {
    listarReservas() {
      let me = this;
      axios
        .get("api/reserva")
        .then(function(response) {
          //console.log(response);
          me.reservas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  }
};
</script>

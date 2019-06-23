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
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.lastname }}</td>
          <td>{{ props.item.departament }}</td>
          <td>{{ props.item.salary }}</td>
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
        { text: "A. Paterno", value: "lastname", sortable: false },
        { text: "A. Materno", value: "department" },
        { text: "Habitacion", value: "salary" },
        { text: "F. Inicio", value: "department" },
        { text: "F. Fin", value: "department" }
      ],

      alert: false,
      search: null,
      editedIndex: -1,

      //Model
      id: "",
      name: "",
      lastname: "",
      departament: "",
      salary: ""
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
      this.dialog = false;
    },
    limpiar() {
      this.id = "";
      this.name = "";
      this.lastname = "";
      this.departament = "";
      this.salary = "";
    },
    editar() {
      let me = this;
      axios
        .put("api/reserva", {
          id: me.id,
          name: me.name,
          lastname: me.lastname,
          departament: me.departament,
          salary: me.salary
        })
        .then(function(response) {
          me.listarReservas();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Habitaciones</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Dialog Box para registrar -->
        <RegistrarHabitacion></RegistrarHabitacion>
        <!-- Termina el dialog box de registro-->
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-data-table :headers="headers" :items="habitaciones" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.numero }}</td>
          <td>{{ props.item.tipo }}</td>
          <td>{{ props.item.cantidadmaximacama }}</td>
          <td>{{ props.item.precio }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listarHabitaciones">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import RegistrarHabitacion from "./RegistrarHabitacion";
export default {
  data() {
    return {
      nombreHabitacion: "",
      numCamas: [1, 2, 3, 4],
      cantidadCamas: "",
      habitaciones: RegistrarHabitacion.habitaciones,
      dialog: false,
      headers: [
        { text: "Numero", value: "numero", sortable: false },
        { text: "Tipo", value: "tipo", sortable: false },
        { text: "Cantidad Camas", value: "cantidadmaximacama" },
        { text: "Precio", value: "precio" }
      ],

      alert: false,
      search: null,
      editedIndex: -1
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
    RegistrarHabitacion: RegistrarHabitacion
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listarHabitaciones();
  },
  methods: {
    listarHabitaciones() {
      let me = this;
      axios
        .get("api/habitacion")
        .then(response => {
          me.habitaciones = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

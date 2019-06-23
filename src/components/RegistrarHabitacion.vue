<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Tipo de Habitacion</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Habitacion</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Inicia Paso 1 -->
        <v-stepper-content step="1">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="tipo" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="cantidadmaximacama" label="Cantidad Max. Camas"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="precio" label="Precio"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-alert :value="true" type="error" v-model="alert">El nombre ya existe.</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="primary" @click.native="e1 = 2">Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <!-- Inicia Paso 2 -->
        <v-stepper-content step="2">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="numero" label="Numero"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea name="input-7-1" label="Descripcion" v-model="descripcion"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-alert :value="true" type="error" v-model="alert">El nombre ya existe.</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="primary" @click.native="registrarTipoHabitacion">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      alert: false,

      e1: 0,
      dialog: false,

      //Habitacion
      idHab: "",
      numero: "",
      descripcion: "",
      tipohabitacionid: "",

      //Tipo Habitacion
      idTipoHab: "",
      tipo: "",
      cantidadmaximacama: "",
      precio: ""
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    registrarTipoHabitacion() {
      let me = this;
      axios
        .post("api/tipohabitacion", {
          tipo: me.tipo,
          cantidadmaximacama: me.cantidadmaximacama,
          precio: me.precio
        })
        .then(response => {
          if (response.data != null) {
            //aqui se deberia obetenr como respuesta el id del reciente tipo de habitacion registrado
            me.tipohabitacionid = response.data;
            me.registrarTipoHabitacion();
          } else {
            //mostrar una alerta
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    registrarHabitacion() {
      let me = this;
      axios
        .post("api/habitacion", {
          numero: me.numero,
          descripcion: me.descripcion,
          tipohabitacionid: me.tipohabitacionid
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
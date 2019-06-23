<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Datos de Reserva</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Datos Personales</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Pago</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Inicia Paso 1 -->
        <v-stepper-content step="1">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-combobox
                      v-model="selectHabitacion"
                      :items="tiposHabitacion"
                      label="Tipo de Habitacion"
                    ></v-combobox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Fecha Inicio"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateFormatted2"
                          label="Fecha Fin"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date2 = parseDate(dateFormatted2)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                    </v-menu>
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
                    <v-text-field v-model="nombre" label="Nombres"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="apellidoPa" label="Apellido Paterno"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="apellidoMa" label="Apellido Materno"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="phone" label="Telefono"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fecha_nac"
                          label="Fecha Nacimiento"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="fecha_nac"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="pais" label="Pais"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-layout wrap row>
                      <v-combobox v-model="tipo_doc" :items="tiposDocumento" label="Documento"></v-combobox>
                      <v-text-field v-model="num_doc" label="Numero Documento"></v-text-field>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-alert :value="true" type="error" v-model="alert">El nombre ya existe.</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="primary" @click.native="e1=3">Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <!-- Inicia Paso 3 -->
        <v-stepper-content step="3">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-combobox
                      v-model="selectHabitacion"
                      :items="tiposHabitacion"
                      label="Tipo de Habitacion"
                    ></v-combobox>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-alert :value="true" type="error" v-model="alert">El nombre ya existe.</v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="primary" @click.native="registroCliente">Reservar</v-btn>
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
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,

      date2: new Date().toISOString().substr(0, 10),
      dateFormatted2: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu2: false,

      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      e1: 0,
      dialog: false,
      reservas: [],
      selectHabitacion: "",
      tiposHabitacion: ["Simple", "Doble", "Triple", "Matrimonial"],
      tiposDocumento: ["DNI", "C.E"],
      selectDocumento: "",
      fechaActual: new Date(),
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
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    computedDateFormatted2() {
      return this.formatDate(this.date2);
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    date2(val) {
      this.dateFormatted2 = this.formatDate(this.date2);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(fecha_nac) {
      this.$refs.menu.save(fecha_nac);
    },
    close() {
      this.dialog = false;
    },
    registroCliente() {
      let me = this;
      console.log(me.nombre);
      console.log(me.apellidoPa);
      console.log(me.apellidoMa);
      console.log(me.phone);
      console.log(me.fecha_nac);
      console.log(me.fecha_registro);
      console.log(me.pais);
      console.log(me.tipo_doc);
      console.log(me.num_doc);
      axios
        .post("api/cliente", {
          nombre: me.nombre,
          apellidopaterno: me.apellidoPa,
          apellidomaterno: me.apellidoMa,
          telefono: me.phone,
          fechanacimiento: me.fecha_nac,
          fecharegistro: me.fecha_registro,
          pais: me.pais,
          tipodocumento: me.tipo_doc,
          numerodocumento: me.num_doc
        })
        .then((res) => {
          //si registra correctamente al cliente
          //pasa a registrar datos de la reserva
          //this.registrarReserva()
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    registrarReserva() {
      let me = this;
      me.axios
        .post("api/reserva", {
          fechainicio: me.fecha_inicio,
          fechafin: me.fecha_fin,
          fecharegistro: me.fecha_registro,
          clienteid: me.cliente_id,
          empleado_id: me.empleado_id,
          comentario: me.comentario,
          habitacionid: me.habitacion_id,
          monto: me.monto,
          anulado: me.anulado
        })
        .then(function(response) {
          me.close();
          me.listarReservas();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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

    obtenerFechaActual() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        return `${day}-0${month}-${year}`;
      } else {
        return `${day}-${month}-${year}`;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
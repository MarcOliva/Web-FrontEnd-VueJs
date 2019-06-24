<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Pedido</v-btn>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 0" step="1">Selecciona la reserva</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 1" step="2">Elige un producto</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Inicia Paso 1 -->
        <v-stepper-content step="1">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione la reserva</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field
                      append-icon="search"
                      class="text-xs-center"
                      v-model="textoReserva"
                      label="Ingrese numero de documento"
                      @keyup.enter="listarReservas()"
                    ></v-text-field>
                    <template>
                      <v-data-table :headers="headersReserva" :items="reservas" class="elevation-1">
                        <template slot="items" slot-scope="props">
                          <td class="justify-center layout px-0">
                            <v-icon small class="mr-2" @click="seleccionarReserva(props.item)">add</v-icon>
                          </td>
                          <td>{{ props.item.nombre }}</td>
                          <td>{{ props.item.apellidoPa }}</td>
                          <td>{{ props.item.apellidoMa }}</td>
                          <td>{{ props.item.habitacion_id }}</td>
                          <td>{{ props.item.fecha_inicio }}</td>
                          <td>{{ props.item.fecha_fin }}</td>
                        </template>
                        <template slot="no-data">
                          <h3>No hay reservas para mostrar.</h3>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" color="primary" flat>Cancelar</v-btn>
              <v-btn @click="e1=2" color="primary" flat>Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <!-- Inicia Paso 2 -->
        <v-stepper-content step="2">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione productos</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field
                      append-icon="search"
                      class="text-xs-center"
                      v-model="texto"
                      label="Ingrese producto a buscar"
                      @keyup.enter="listarProductos()"
                    ></v-text-field>
                    <template>
                      <v-data-table
                        :headers="headersProductos"
                        :items="productos"
                        class="elevation-1"
                      >
                        <template slot="items" slot-scope="props">
                          <td class="justify-center layout px-0">
                            <v-icon small class="mr-2" @click="agregarDetalle(props.item)">add</v-icon>
                          </td>
                          <td>{{ props.item.nombreProd }}</td>
                          <td>{{ props.item.precioProd }}</td>
                          <td>{{ props.item.categoriaId }}</td>
                          <td>{{ props.item.descripcion }}</td>
                        </template>
                        <template slot="no-data">
                          <h3>No hay productos para mostrar.</h3>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" color="blue darken" flat>Cancelar</v-btn>
              <v-btn @click="registrarPedido" color="primary" flat>Guardar</v-btn>
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
      e1: 0,
      dialog: false,
      alert: false,
      selectReserva: null,
      texto: "",
      textoReserva: "",
      reservas: [],
      productos: [],
      headersProductos: [
        { text: "Nombre", value: "nombreProd", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Categoria", value: "nombreCat" },
        { text: "Descripcion", value: "descripcion" }
      ],
      headersReserva: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "A. Paterno", value: "apellidoPa", sortable: false },
        { text: "A. Materno", value: "apellidoMa" },
        { text: "Habitacion", value: "habitacion" },
        { text: "F. Inicio", value: "fecha_inicio" },
        { text: "F. Fin", value: "fecha_fin" }
      ],

      detallePedido: [],
      //Model Cliente
      nombre: "",
      apellidoPa: "",
      apellidoMa: "",
      phone: "",
      fecha_nac: "",
      tipo_doc: "",
      num_doc: "",
      pais: "",
      //Model Reserva
      fecha_inicio: "",
      fecha_fin: "",
      fecha_registro: this.formatDate(new Date().toISOString().substr(0, 10)), // se genera
      cliente_id: "",
      comentario: "",
      habitacion_id: "",
      monto: "",
      anulado: false,
      //Modelo Pedido
      pedidoId: "",
      reservaId: "",
      total: "",

      //Modelo Producto
      productoId: "",
      nombreProd: "",
      descripcion: "",
      precioProd: "",
      categoriaId: "",
      //Modelo Detalle Pedido
      detalleId: "",
      precioDeta: "",
      descuento: "",
      cantidad: ""
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.e1 = 1;
    },
    listarProductos() {
      let me = this;
      axios
        .get("api/producto/" + me.texto)
        .then(response => {
          console.log(response);
          me.productos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    agregarProducto(data = []) {
      //la data es el producto a agregar
      console.log(data);
      if (this.encuentra(data["id"])) {
        //producto actualizado
      } else {
        this.detallePedido.push({
          productoId: data["producto_id"],
          cantidad: 1,
          precio: data["precio"] * this.cantidad,
          descuento: data["descuento"]
        });
      }
    },
    encuentra(id) {
      var sw = 0;
      for (var i = 0; i < this.detallePedido.length; i++) {
        if (this.detallePedido[i].productoId == id) {
          sw = 1;
          //si agrega el mismo producto se actualiza la cantidad
          this.detallePedido[i].cantidad += 1;
          this.detallePedido[i].precio *= this.detallePedido[i].cantidad;
        }
      }
      return sw;
    },
    listarReservas() {
      let me = this;
      axios
        .get("api/reserva/" + me.textoReserva)
        .then(response => {
          me.reservas = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    registrarPedido() {
      let me = this;
      if (this.selectReserva != null) {
        axios
          .post("api/pedido", {
            reservaid: this.selectReserva,
            total: me.total,
            detallepedido: me.detallePedido,
            fecharegistro: me.fecha_registro
          })
          .then(response => {})
          .catch(error => {
            console.log(error);
          });
      } else {
        //Muestra alerta
      }
    },
    seleccionarReserva(data) {
      this.selectReserva = data.id;
      //Muestra alerta de seleccion con el nombre de la reserva
      //indicando cual fue seleccionada
    }
  }
};
</script>
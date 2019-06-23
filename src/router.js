import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Habitacion from '@/components/Habitacion.vue'
import Reserva from '@/components/Reserva.vue'
import Pedido from '@/components/Pedido.vue'
import Producto from '@/components/Producto.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/habitaciones',
      name: 'habitaciones',
      component: Habitacion
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: Reserva
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: Pedido
    },
    {
      path: '/productos',
      name: 'productos',
      component: Producto
    },



  ]
})

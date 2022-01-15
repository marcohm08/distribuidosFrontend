<template>
  <div class="container">
    <div>
      <div class="col text-left">
        <div class="row my-5">
          <div class="col-lg-4">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="info-icon text-center py-3">
                      <fa icon="exclamation-circle" size="4x"/>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="numbers">
                      <p class="card-category">Magnitud máxima</p>
                      <h1 class="card-title">{{ maxMagnitude() }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="info-icon text-center py-3">
                      <fa icon="chart-bar" size="4x"/>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="numbers">
                      <p class="card-category">Magnitud promedio</p>
                      <h1 class="card-title">{{ avgMagnitude().toFixed(2) }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="info-icon text-center py-3">
                      <fa icon="hourglass" size="4x"/>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="numbers">
                      <p class="card-category">Último evento</p>
                      <p class="card-title">M 2.0 - 40 km NNE of Chenega, Alaska</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>Listado de eventos recientes</h2>
        <div class="mt-5">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col" class="text-left">Evento</th>
                    <th scope="col" class="text-left">Coordenadas</th>
                    <th scope="col" class="text-left">Magnitud</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in this.events" :key="event.json_id">
                    <td class="text-wrap">{{event.properties.title}}</td>
                    <td class="text-left">{{event.geometry.coordinates}}</td>
                    <td class="text-left">{{event.properties.mag}}</td>                            
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default ({
    data () {
        return {
            events: []
        }
    },
    computed: {
    ...mapState(['apiUrl'])
    },
    methods: {
      async obtenerEventos () {
          try {
              const response = await axios.get(this.apiUrl + 'usgs/earthquakes/')
              this.events = response.data
          } catch (e) {
              console.log('No fue posible obtener los eventos')
              console.log(e)
          }
      },
      avgMagnitude: function () {
        var sum = 0
        for(const event of this.events) {
          sum = sum + event.properties.mag
        }
        var prom = sum / this.events.length
        return prom
      },
      maxMagnitude: function () {
        return Math.max.apply(Math, this.events.map(function(o) { return o.properties.mag; }))
      }
    },
    created () {
      this.obtenerEventos()
      console.log(this.events)
    }
  
})
</script>

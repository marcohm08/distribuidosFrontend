import { createRouter, createWebHistory } from 'vue-router'
import ListEarthquakes from '@/components/Earthquakes/ListEarthquakes'

const routes = [
  {
    path: '/',
    name: 'USGS',
    component: ListEarthquakes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

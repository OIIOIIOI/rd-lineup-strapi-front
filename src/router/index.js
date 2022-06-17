import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add/game',
      name: 'addGame',
      component: () => import('../views/NewGameView.vue')
    },
    {
      path: '/game/:gid',
      name: 'teamChoice',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/game/:gid/:tid',
      name: 'roleChoice',
      component: () => import('../views/RoleView.vue')
    },
    {
      path: '/game/:gid/:tid/lineup',
      name: 'lineup',
      component: () => import('../views/LineupView.vue')
    },
    {
      path: '/game/:gid/:tid/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue')
    },
  ],
})

export default router

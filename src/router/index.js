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
      path: '/lineup',
      name: 'lineup',
      component: () => import('../views/LineupView.vue')
    },
    {
      path: '/game/:gid',
      name: 'gameChoice',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/game/:gid/:tid',
      name: 'teamChoice',
      component: () => import('../views/TeamView.vue')
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Knigths from '../views/Knigths.vue'
import Heroes from '../views/Heroes.vue'
import regHeroes from '../views/regKnigths.vue'
import detalhesKnigths from '../views/detalhesKnigths.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
      redirect: '/knigths'			
		},
		{
			path: '/knigths',
			component: Knigths
		},
    {
			path: '/heroes',
			component: Heroes
		},
    {
			path: '/detalhes/:id',
			component: detalhesKnigths,
      name: 'detalhes',
		},
    {
			path: '/register',
			component: regHeroes
		},
	],
})

export default router
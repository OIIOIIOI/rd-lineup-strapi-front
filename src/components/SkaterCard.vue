<script setup>
import {computed, onMounted} from 'vue'

const props = defineProps(['skater'])
const emit = defineEmits(['toggled'])

const classes = computed(() =>
{
	let c = []
	if (props.skater.active)
		c.push('active')
	/*if (props.skater.ott === true)
	 c.push('opacity-25')*/
	c.push(props.skater.skater_role.name.toLowerCase())
	return c.join(' ')
})

function toggleActive () {
	emit('toggled', props.skater)
}
</script>

<template>
	<div class="name-card" :class="classes">
		<div class="name" @click="toggleActive">
			<p>{{ skater.number }}</p>
			<p>{{ skater.name }}</p>
		</div>
	</div>
</template>

<script>
export default { name: "SkaterCard" }
</script>

<style scoped>
div.name-card {
	@apply grid grid-cols-2 text-center items-center cursor-pointer select-none;
	@apply bg-zinc-800 text-zinc-300;
	
	> .name {
		@apply col-span-2 py-2;
		
		p:first-of-type {
			@apply text-xl font-bold leading-none mb-1;
		}
		
		p:last-of-type {
			@apply text-xs leading-tight;
		}
	}
	
	> .p-count,
	> .j-count {
		@apply col-span-1 self-end;
	}
	
	> .p-count {
		@apply bg-red-900 text-red-200;
	}
	
	> .j-count {
		@apply bg-zinc-700;
	}
	
	&.jammer .name {
		@apply text-teal-400;
	}
	
	&.pivot .name {
		@apply text-purple-400;
	}
	
	&.active {
		@apply bg-zinc-300 text-zinc-800;
		
		> .p-count {
			@apply bg-red-500;
		}
		
		> .j-count {
			@apply bg-zinc-100;
		}
		
		> .name {
			@apply text-zinc-800;
		}
		
		&.jammer {
			@apply bg-teal-400;
			
			> .j-count {
				@apply bg-teal-300;
			}
		}
		
		&.pivot {
			@apply bg-purple-400;
			
			> .j-count {
				@apply bg-purple-300;
			}
		}
	}
}
</style>
<template>
	<RouterView :key="$route.params.id" />
</template>

<script setup>
import { RouterView, onBeforeRouteUpdate } from 'vue-router'
import { useUnitsStore } from '@/stores/unitsStore'
onBeforeRouteUpdate(async (to) => {
	await useUnitsStore().loadCurrentUnit(Number(to.params.id));
})
</script>
<template>
	<v-container fluid>
		<UnitSelectedDetails :currentUnit="currentUnit"/>
	</v-container>
</template>

<script setup>
import UnitSelectedDetails from '@/components/UnitSelectedDetails.vue';
import { useUnitsStore } from '@/stores/unitsStore';
const currentUnit = useUnitsStore().currentUnit;
</script>
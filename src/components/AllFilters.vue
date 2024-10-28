<template>
	<AgesFilter :ages="ages"
		@selectedAges="updateAgesFilter" />
	<CostsFilter :resources="resources"
		@selectedResources="updateResourceFilter"/>
</template>

<script setup>
import { ref } from 'vue';
import AgesFilter from '@/components/AgesFilter.vue'
import CostsFilter from '@/components/CostsFilter.vue'

defineProps({
	ages: Array,
	resources: Array
});
const emit = defineEmits(['selectedFilters']);
const selectedAges = ref([]);
const selectedResources = ref([]);

function updateAgesFilter(ages) {
	selectedAges.value = ages;
	emit('selectedFilters', { ages: selectedAges, resources: selectedResources });
}
function updateResourceFilter(resources) {
	selectedResources.value = resources;
	emit('selectedFilters', { ages: selectedAges, resources: selectedResources });
}
</script>
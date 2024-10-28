<template>
	<v-container fluid>
		<v-row no-gutters
			class="mb-4">
			<v-col cols="12">
				<h1 class="text-center">Units</h1>
			</v-col>
			<v-col cols="8">
				<AllFilters :ages="ages"
					:resources="resources"
					@selectedFilters="filterUnits" />
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col class="d-flex justify-center"
				v-if="store?.isUnitsLoading">
				<v-progress-circular color="blue-lighten-3"
					model-value="20"
					:size="120"
					:width="5"
					indeterminate></v-progress-circular>
			</v-col>
			<v-col v-else>
				<UnitsTable :units="filteredUnits" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { useUnitsStore } from '@/stores/unitsStore'
import { ref, computed } from 'vue';
import UnitsTable from '@/components/UnitsTable.vue'
import AllFilters from '@/components/AllFilters.vue'

const store = useUnitsStore();
const resources = ref(store.resources);
const ages = ref(store.ages);

const filteredUnits = computed(() => store.filteredUnits);

function filterUnits({ages, resources}) {
	store.filterUnits({ages, resources });
}
</script>
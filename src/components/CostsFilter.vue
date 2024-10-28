<template>
	<v-row no-gutters>
		<v-col cols="8">
			<h3 class="mb-2">Costs</h3>
			<v-row no-gutters
				class="d-flex flex-column justify-left align-center">
				<v-col class="d-flex align-center"
					v-for="(resource, index) in resources"
					:key="`${index}-${resource.name}`">
					<v-checkbox class="mr-4"
						v-model="resource.isSelected"
						:label="resource?.name || 'N/A'"
						@change="triggerCostFilter({ resource })"
						hide-details></v-checkbox>
					<v-range-slider v-model="resource.range"
						:model-value="resource.range"
						@update:modelValue="triggerCostFilter({ resource })"
						:color="resource?.color || ''"
						hide-details
						:max="resource.max"
						:min="resource.min"
						step="1">
						<template #append>
							<span>{{ resource.range[0] }} - {{ resource.range[1] }}</span>
						</template>
					</v-range-slider>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref } from 'vue';
defineProps({ resources: Array });
const emit = defineEmits(['selectedResources']);

const selectedResources = ref([]);

let timeoutId = ref(null);
function triggerCostFilter({ resource }) {
	clearTimeout(timeoutId.value);
	timeoutId.value = setTimeout(() => {
		updateSelectedResources(resource);
		emit('selectedResources', selectedResources.value);
	}, 300);
}

function updateSelectedResources(resource) {
	if (!resource.isSelected || resource.range.every(r => r === resource.min)) {
		selectedResources.value = [...selectedResources.value.filter(r => r.name !== resource.name)];
	} else {
		const existingResource = selectedResources.value.find(r => r.name === resource.name);
		if (existingResource) {
			existingResource.range = resource.range;
		} else {
			selectedResources.value.push(resource);
		}
	}
}

</script>

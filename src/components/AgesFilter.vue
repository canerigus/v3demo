<template>
	<v-row no-gutters
		class="mb-4">
		<v-col>
			<h3 class="mb-4">Ages</h3>
			<v-btn-toggle v-model="toggle"
				background-color="primary"
				dark
				multiple>
				<v-btn v-for="(age, index) in ages"
					:key="index"
					@click="selectAge(age, index)"
					variant="outlined"
					class="text-capitalize">
					{{ age }}
				</v-btn>
			</v-btn-toggle>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ ages: Array })
const toggle = ref([]);
const selected = ref([]);
const emit = defineEmits(['selectedAges'])

const selectAge = (age, index) => {
	if (selected.value.includes(age)) {
		if (age === "All") {
			selected.value = [];
			toggle.value = [];
			emit('selectedAges', selected.value);
			return;
		}
		selected.value = selected.value.filter((item) => item !== age && item !== "All");
		toggle.value = toggle.value.filter((item) => item !== index && item !== 0);
		emit('selectedAges', selected.value);
		return;
	}
	if (age === "All") {
		selected.value = [];
		toggle.value = [];
		props.ages.forEach((age, index) => {
			toggle.value.push(index);
			selected.value.push(age);
		});
		emit('selectedAges', selected.value);
		return;
	}
	selected.value.push(age);
	toggle.value.push(index);
	if (props.ages.filter((age) => age !== "All").every((age) => selected.value.includes(age))) {
		toggle.value.push(0);
		selected.value.push("All");
	}
	emit('selectedAges', selected.value);
	return;
}

</script>

<template>
	<v-row no-gutters>
		<v-col cols="12">
			<h1>Unit Detail Page</h1>
		</v-col>
	</v-row>
	<v-row v-if="store?.isCurrentUnitLoading">
		<v-col class="d-flex justify-center">
			<v-progress-circular color="blue-lighten-3"
				model-value="20"
				:size="120"
				:width="5"
				indeterminate></v-progress-circular>
		</v-col>
	</v-row>
	<v-row v-else
		no-gutters
		class="d-flex justify-center">
		<v-col cols="9">
			<table>
				<tbody>
					<tr v-for="(value, key) in currentUnit"
						:key="key">
						<td>{{ key }}</td>
						<td>
							<span v-if="value !== 0">
								{{ value }}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</v-col>
		<v-col class="d-flex justify-center align-center"
			cols="3">
			<v-btn @click="randomUnit">
				Feeling Lucky
			</v-btn>
		</v-col>
	</v-row>

</template>

<script setup>
import { useUnitsStore } from '@/stores/unitsStore'
import { useRouter } from 'vue-router'
defineProps({
	currentUnit: Object
})
const router = useRouter();
const store = useUnitsStore();
function randomUnit() {
	const randomUnit = Math.floor((Math.random() * store.units.length) + 1);
	router.push({ path: `/units/${randomUnit}` });
}
</script>

<style scoped module lang="scss">
$button-bg-color: #2f5ac7;
$table-border-color: #ddd;
$table-first-row-bg: #f2eded;

h1 {
	text-align: center;
	margin-bottom: 0.75rem;
}

button {
	background-color: $button-bg-color;
	font-weight: bold;
	color: white;
	padding: 0.5rem 1rem;
	border: none;
	cursor: pointer;
	text-transform: capitalize;
}

table {
	width: 100%;
	border-collapse: collapse;
	border: 1px solid $table-border-color;

	tr,
	td {
		padding: 10px;
		text-align: left;
		border: 1px solid $table-border-color;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	tr>td:first-child {
		width: 30%;
		font-weight: bold;
		background-color: $table-first-row-bg;
	}
}
</style>
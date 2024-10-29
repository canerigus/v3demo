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
$table-data-padding: 10px;
$table-data-text-align: left;
$table-data-font-weight: bold;
$header-text-align: center;
$header-margin-bottom: 0.75rem;
$button-color: white;
$button-padding: 0.5rem 1rem;
$button-border: none;
$button-cursor: pointer;
$button-text-transform: capitalize;
$table-width: 100%;
$table-first-row-width: 30%;
$table-first-row-font-weight: bold;
$table-data-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
$table-data-border: 1px solid $table-border-color;

h1 {
	text-align: $header-text-align;
	margin-bottom: $header-margin-bottom;
}

button {
	background-color: $button-bg-color;
	font-weight: table-data-font-weight;
	color: $button-color;
	padding: $button-padding;
	border: $button-border;
	cursor: $button-cursor;
	text-transform: $button-text-transform;
}

table {
	width: $table-width;
	border-collapse: collapse;
	border: $table-data-border;

	tr,
	td {
		padding: $table-data-padding;
		text-align: $table-data-text-align;
		border: $table-data-border;
		font-family: $table-data-font-family;
	}

	tr>td:first-child {
		width: $table-first-row-width;
		font-weight: $table-first-row-font-weight;
		background-color: $table-first-row-bg;
	}
}
</style>
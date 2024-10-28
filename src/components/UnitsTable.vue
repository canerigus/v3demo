<template>
	<v-table fixed-header
		height="400px">
		<thead>
			<tr>
				<th v-for="(header, index) in tableHeaders"
					:key="`${header}-${index}`">
					{{ header }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="unit in units"
				:key="unit.id"
				@click="selectUnit(unit.id)">
				<td>{{ unit.id }}</td>
				<td>{{ unit.name }}</td>
				<td>{{ unit.age }}</td>
				<td>
					<span v-for="(value, key) in unit.cost"
						:key="key">
						<span>
							<span>
								{{ key }}:{{ value }}
							</span>
							&nbsp;
						</span>
					</span>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
defineProps({ units: Array });
const tableHeaders = ref(["ID", "Name", "Age", "Costs"]);
const router = useRouter();
async function selectUnit(id) {
	router.push({ path: `/units/${id}` });
};
</script>

<style scoped module lang="scss">
$table-border-color: #ccc;
$table-hover-bg-color: #defbb8;
$table-header-bg-color: #f2eded;
$table-padding: 0.75rem;
$table-font-size: 0.9rem;
$table-header-font-size: 1.1rem;

th,
td {
	padding: $table-padding;
	border: 1px solid $table-border-color;
	font-size: $table-font-size;
}

th {
	background-color: $table-header-bg-color !important;
	font-size: $table-header-font-size;
}

tbody>tr:hover {
	background-color: $table-hover-bg-color;
	cursor: pointer;
}
</style>
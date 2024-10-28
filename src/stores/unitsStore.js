import { ref } from "vue";
import { defineStore } from "pinia";
import data from "../../data/age-of-empires-units.json";
import { sanitizeCurrentUnit } from "@/utils/sanitizeUnit";

export const useUnitsStore = defineStore("unit", () => {
  const resources = ref([
    {
      name: "Wood",
      color: "brown-darken-2",
      range: [0, 0],
      min: 0,
      max: 200,
      isSelected: false,
    },
    {
      name: "Food",
      color: "red-darken-2",
      range: [0, 0],
      min: 0,
      max: 200,
      isSelected: false,
    },
    {
      name: "Gold",
      color: "yellow-darken-2",
      range: [0, 0],
      min: 0,
      max: 200,
      isSelected: false,
    },
  ]);
  const ages = ref(["All", "Dark", "Feudal", "Castle", "Imperial"]);
  const units = ref([]);
  const filteredUnits = ref([]);
  const isUnitsLoading = ref(false);
  const isCurrentUnitLoading = ref(false);
  const currentUnit = ref({});

  async function loadUnits() {
    isUnitsLoading.value = true;
    try {
      this.units = [...data.units];
      if (this.filteredUnits.length === 0) this.filteredUnits = [...data.units];
      isUnitsLoading.value = false;
    } catch (error) {
      console.error("Failed to load units:", error);
      isUnitsLoading.value = false;
    }
  }
  async function loadCurrentUnit(id) {
    isCurrentUnitLoading.value = true;
    try {
      this.currentUnit = await sanitizeCurrentUnit(
        this.units.find((unit) => unit.id === id)
      );
      isCurrentUnitLoading.value = false;
    } catch (error) {
      console.error("Failed to load current unit:", error);
      isCurrentUnitLoading.value = false;
    }
  }

  async function filterUnits({ ages, resources }) {
    if (!resources.value.length && !ages.value.length) return;
    if (!resources.value.length && ages.value.length) {
      this.filteredUnits = this.units.filter((unit) => {
        return ages.value.includes(unit.age);
      });
      return;
    }
    if (!ages.value.length && resources.value.length) {
      this.filteredUnits = this.units.filter((unit) => {
        return resources.value.every((resource) => {
          if (!unit.cost || !unit.cost[resource.name]) return;
          const unitResourceValue = unit.cost[resource.name];
          return (
            unitResourceValue >= resource.range[0] &&
            unitResourceValue <= resource.range[1]
          );
        });
      });
      return;
    }
    this.filteredUnits = this.units.filter((unit) => {
      return resources.value.every((resource) => {
        if (!unit.cost || !unit.cost[resource.name]) return;
        const unitResourceValue = unit.cost[resource.name];
        return (
          unitResourceValue >= resource.range[0] &&
          unitResourceValue <= resource.range[1] &&
          ages.value.includes(unit.age)
        );
      });
    });
  }

  return {
    units,
    loadUnits,
    loadCurrentUnit,
    isCurrentUnitLoading,
    currentUnit,
    isUnitsLoading,
    resources,
    ages,
    filterUnits,
    filteredUnits,
  };
});

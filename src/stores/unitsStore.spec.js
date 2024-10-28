import { setActivePinia, createPinia } from "pinia";
import { useUnitsStore } from "./unitsStore";
import { describe, it, expect, beforeEach, vi } from "vitest";
import data from "../../data/age-of-empires-units.json";
import { sanitizeCurrentUnit } from "@/utils/sanitizeUnit";
import { ref } from "vue";

vi.mock("@/utils/sanitizeUnit", () => ({
  sanitizeCurrentUnit: vi.fn(),
}));

describe("unitsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with correct default values", () => {
    const store = useUnitsStore();
    expect(store.resources).toHaveLength(3);
    expect(store.ages).toEqual(["All", "Dark", "Feudal", "Castle", "Imperial"]);
    expect(store.units).toEqual([]);
    expect(store.filteredUnits).toEqual([]);
    expect(store.isUnitsLoading).toBe(false);
    expect(store.isCurrentUnitLoading).toBe(false);
    expect(store.currentUnit).toEqual({});
  });

  it("loads units correctly", async () => {
    const store = useUnitsStore();
    await store.loadUnits();
    expect(store.units).toEqual(data.units);
    expect(store.filteredUnits).toEqual(data.units);
    expect(store.isUnitsLoading).toBe(false);
  });

  it("loads current unit correctly", async () => {
    const store = useUnitsStore();
    const unit = data.units[0];
    vi.mocked(sanitizeCurrentUnit).mockResolvedValue(unit);
    await store.loadUnits();
    await store.loadCurrentUnit(unit.id);
    expect(store.currentUnit).toEqual(unit);
    expect(store.isCurrentUnitLoading).toBe(false);
    expect(sanitizeCurrentUnit).toHaveBeenCalledWith(unit);
  });

  it("handles load current unit error", async () => {
    const store = useUnitsStore();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.mocked(sanitizeCurrentUnit).mockImplementationOnce(() => {
      throw new Error("Failed to load current unit");
    });
    await store.loadUnits();
    await store.loadCurrentUnit(999);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to load current unit:",
      expect.any(Error)
    );
    expect(store.isCurrentUnitLoading).toBe(false);
  });

  it("filters units by age correctly", async () => {
    const store = useUnitsStore();
    await store.loadUnits();
    await store.filterUnits({ ages: ref(["Feudal"]), resources: ref([]) });
    expect(store.filteredUnits.every((unit) => unit.age === "Feudal")).toBe(
      true
    );
  });

  it("filters units by resources correctly", async () => {
    const store = useUnitsStore();
    await store.loadUnits();
    await store.filterUnits({
      ages: ref([]),
      resources: ref([{ name: "Wood", range: [0, 100] }]),
    });
    expect(
      store.filteredUnits.every(
        (unit) => unit.cost && unit.cost.Wood >= 0 && unit.cost.Wood <= 100
      )
    ).toBe(true);
  });

  it("filters units by age and resources correctly", async () => {
    const store = useUnitsStore();
    await store.loadUnits();
    await store.filterUnits({
      ages: ref(["Feudal"]),
      resources: ref([{ name: "Wood", range: [0, 100] }]),
    });
    expect(
      store.filteredUnits.every(
        (unit) =>
          unit.age === "Feudal" &&
          unit.cost &&
          unit.cost.Wood >= 0 &&
          unit.cost.Wood <= 100
      )
    ).toBe(true);
  });
});

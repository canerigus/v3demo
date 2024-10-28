import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import UnitDetails from "@/views/UnitDetails.vue";
import { createTestingPinia } from "@pinia/testing";
import vuetify from "@/plugins/vuetify";
import { useUnitsStore } from "@/stores/unitsStore";
import UnitSelectedDetails from "@/components/UnitSelectedDetails.vue";

describe("UnitDetails.vue", () => {
  const pinia = createTestingPinia();
  const store = useUnitsStore();

  it("renders and with correct props", () => {
    store.currentUnit = {
      name: "archer",
      description: "A heavily armored vehicle.",
      id: 1,
    };
    const wrapper = mount(UnitDetails, {
      global: {
        plugins: [pinia, vuetify],
      },
    });
    const unitDetails = wrapper.findComponent(UnitSelectedDetails);
    expect(unitDetails.exists()).toBe(true);
    expect(unitDetails.props("currentUnit")).toEqual(store.currentUnit);
  });
});

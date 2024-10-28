import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import vuetify from "@/plugins/vuetify";
import { useUnitsStore } from "@/stores/unitsStore";
import UnitSelectedDetails from "@/components/UnitSelectedDetails.vue";

describe("UnitSelectedDetails.vue", () => {
  const pinia = createTestingPinia();
  const store = useUnitsStore();
  beforeEach(() => {
    store.isCurrentUnitLoading = false;
  }); 

  it("renders with correct html and props and methods work correctly", async () => {
    const units = {
        id: 5,
        name: "Archer",
        age: "Feudal",
        cost: {
          Wood: 25,
          Gold: 45
        },
      };
    const randomUnitMock = vi.fn();
    const wrapper = mount(UnitSelectedDetails, {
      global: {
        plugins: [pinia, vuetify],
        mocks: {
          randomUnit: randomUnitMock,
        },
      },
      props: {
        currentUnit: units,
      },
    });

    const unitSelectedDetailsHtml = wrapper.html();
    const unitSelectedDetailsProps = wrapper.props();

    expect(unitSelectedDetailsProps.currentUnit).toEqual(units);
    expect(unitSelectedDetailsHtml).toContain(units.id);
    expect(unitSelectedDetailsHtml).toContain(units.name);
    expect(unitSelectedDetailsHtml).toContain(units.age);
    expect(unitSelectedDetailsHtml).toContain(units.cost.Wood);
    expect(unitSelectedDetailsHtml).toContain(units.cost.Gold);
    expect(unitSelectedDetailsHtml).toContain('Feeling Lucky');
  });
  it("loading state works properly", async () => {
    store.isCurrentUnitLoading = true; 
    const wrapper = mount(UnitSelectedDetails);
    expect(wrapper.find('v-progress-circular').exists()).toBe(true);
  });
  it("button works", async () => {
    const randomUnitMock = vi.fn();
    const wrapper = mount(UnitSelectedDetails, {
      global: {
        mocks: {
          randomUnit: randomUnitMock,
        },
      },
    });
    await wrapper.find('v-btn').trigger('click');
    expect(randomUnitMock).toHaveBeenCalledTimes(1)
  });
});

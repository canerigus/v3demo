import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import vuetify from "@/plugins/vuetify";
import AllFilters from "@/components/AllFilters.vue";
import AgesFilter from "@/components/AgesFilter.vue";
import CostsFilter from "@/components/CostsFilter.vue";

describe("AllFilters.vue", () => {
  const mockResources = [
    { name: 'Gold', isSelected: false, range: [100, 200], min: 0, max: 200 },
  ];
  const agesMock = ["All", "Dark", "Feudal", "Castle", "Imperial"];
  it("renders correctly and methods work correctly", async () => {
    const wrapper = mount(AllFilters, {
      global: {
        plugins: [vuetify],
      },
      props: {
        ages: agesMock,
        resources: mockResources,
      }
    });
    const allFiltersHtml = wrapper.html();
    const allFiltersProps = wrapper.props();

    const agesFilter = wrapper.findComponent(AgesFilter);
    const costsFilter = wrapper.findComponent(CostsFilter);

    const buttons = wrapper.findAll("button");
    await buttons[1].trigger('click')

    expect(wrapper.vm.selectedAges).toEqual([agesMock[1]]);

    expect(wrapper.exists()).toBe(true);
    expect(allFiltersProps).toEqual({ ages: agesMock, resources: mockResources });

    expect(agesFilter.exists()).toBe(true);
    expect(agesFilter.props("ages")).toEqual(agesMock);

    expect(costsFilter.exists()).toBe(true);
    expect(costsFilter.props("resources")).toEqual(mockResources);

    agesMock.forEach((age) => {
      expect(allFiltersHtml).toContain(age);
    });
    expect(allFiltersHtml).toContain(mockResources[0].name);
    expect(allFiltersHtml).toContain(mockResources[0].range[0]);
    expect(allFiltersHtml).toContain(mockResources[0].range[1]);
  });
});

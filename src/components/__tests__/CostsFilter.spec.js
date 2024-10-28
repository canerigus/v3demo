import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import vuetify from "@/plugins/vuetify";
import CostsFilter from "@/components/CostsFilter.vue";

describe("CostsFilter.vue", () => {
  const mockResources = [
    { name: 'Gold', isSelected: false, range: [100, 200], min: 0, max: 200 },
  ];
  it("renders with correct html", async () => {
    const wrapper = mount(CostsFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        resources: mockResources,
      },
    });

    const costsFilterHtml = wrapper.html();
    const costsFilterProps = wrapper.props();

    expect(costsFilterHtml).toContain('Costs');
    expect(costsFilterHtml).toContain(mockResources[0].name);
    expect(costsFilterHtml).toContain(`${mockResources[0].range[0]} - ${mockResources[0].range[1]}`);
    expect(costsFilterHtml).toContain(mockResources[0].min);
    expect(costsFilterHtml).toContain(mockResources[0].max);
    expect(costsFilterProps.resources).toEqual(mockResources);

  });
  it("triggers work correctly", async () => {
    const wrapper = mount(CostsFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        resources: mockResources,
      },
    });
    const triggerSpy = vi.spyOn(wrapper.vm, 'triggerCostFilter');
    const checkbox = wrapper.find('#checkbox-0');
    await checkbox.setChecked();
    expect(mockResources[0].isSelected).toBe(true);
    expect(triggerSpy).toHaveBeenCalledWith({resource: { name: 'Gold', isSelected: true, range: [100, 200], min: 0, max: 200 } });
  });

  it("handles empty resources prop correctly", async () => {
    const wrapper = mount(CostsFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        resources: [],
      },
    });

    const costsFilterHtml = wrapper.html();
    expect(costsFilterHtml).toContain('Costs');
    //empty check
    expect(costsFilterHtml).toContain('<div class="v-row v-row--no-gutters d-flex flex-column justify-left align-center"></div>');
  });

  it("renders multiple resources correctly", async () => {
    const multipleResources = [
      { name: 'Gold', isSelected: false, range: [100, 200], min: 0, max: 200 },
      { name: 'Wood', isSelected: true, range: [50, 150], min: 0, max: 150 },
    ];
    const wrapper = mount(CostsFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        resources: multipleResources,
      },
    });

    const costsFilterHtml = wrapper.html();
    expect(costsFilterHtml).toContain('Gold');
    expect(costsFilterHtml).toContain('Wood');
    expect(costsFilterHtml).toContain('50 - 150');
  });
  it("methods works properly", async () => {
    const wrapper = mount(CostsFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        resources: mockResources,
      },
    });

    const triggerSpy = vi.spyOn(wrapper.vm, 'triggerCostFilter');
    const updateSpy = vi.spyOn(wrapper.vm, 'updateSelectedResources');
    wrapper.vm.triggerCostFilter({resource: { name: 'Gold', isSelected: true, range: [100, 200], min: 0, max: 200 } });
    wrapper.vm.updateSelectedResources({ name: 'Gold', isSelected: true, range: [100, 200], min: 0, max: 200 });
    expect(triggerSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
    expect(wrapper.vm.selectedResources).toEqual([{ name: 'Gold', isSelected: true, range: [100, 200], min: 0, max: 200 }]);
  }
);
});

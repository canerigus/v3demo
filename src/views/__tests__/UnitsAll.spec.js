import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import UnitsAll from '@/views/UnitsAll.vue';
import { createTestingPinia  } from '@pinia/testing';
import vuetify from '@/plugins/vuetify';
import { useUnitsStore } from '@/stores/unitsStore';
import AllFilters from '@/components/AllFilters.vue';
import UnitsTable from '@/components/UnitsTable.vue';

describe('UnitsAll.vue', () => {
  const pinia = createTestingPinia();
  const store = useUnitsStore();
  it('renders and with correct props and emits correct data from child', () => {
    store.filteredUnits = [{
      name: "archer",
      description: "A heavily armored vehicle.",
      id: 1,
    }];
    store.resources = [
      {
        name: "Test",
        color: "brown-darken-2",
        range: [15, 15],
        min: 0,
        max: 200,
        isSelected: false,
      }
    ];
    store.ages = ["Test"]
    const filterUnitsMock = vi.fn();
    const wrapper = mount(UnitsAll, {
      global: {
        plugins: [pinia, vuetify],
        mocks: {
          filterUnits: filterUnitsMock,
        }
      },
    });
    const allFilters = wrapper.findComponent(AllFilters);
    const unitsTable = wrapper.findComponent(UnitsTable);

    const mockSelectedFilters = { age: 'Age 1', resource: 'Wood' };
    allFilters.vm.$emit('selectedFilters', mockSelectedFilters);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Units');

    expect(unitsTable.exists()).toBe(true);
    expect(unitsTable.props("units")).toEqual(store.filteredUnits);

    expect(allFilters.exists()).toBe(true);
    expect(allFilters.props("ages")).toEqual(store.ages);
    expect(allFilters.props("resources")).toEqual(store.resources);

    expect(filterUnitsMock).toHaveBeenCalledWith(mockSelectedFilters);
    expect(filterUnitsMock).toHaveBeenCalledTimes(1);
  });
});

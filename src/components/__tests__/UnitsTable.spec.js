import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import vuetify from "@/plugins/vuetify";
import UnitsTable from "@/components/UnitsTable.vue";

describe("UnitsTable.vue", () => {
  it("renders with correct html and props and methods work correctly", async () => {
    const units = [
      {
        id: 5,
        name: "Archer",
        age: "Feudal",
        cost: {
          Wood: 25,
          Gold: 45
        },
      }
    ];
    const selectUnitMock = vi.fn();
    const wrapper = mount(UnitsTable, {
      global: {
        plugins: [ vuetify],
        mocks: {
          selectUnit: selectUnitMock,
        },
      },
      props: {
        units: units,
      },
    });

    await wrapper.find("tbody tr").trigger("click");
    const unitsTableHtml = wrapper.html();
    const unitsTableProps = wrapper.props();
    expect(unitsTableHtml).toContain('ID');
    expect(unitsTableHtml).toContain('Name');
    expect(unitsTableHtml).toContain('Age');
    expect(unitsTableHtml).toContain('Costs');

    expect(unitsTableProps.units).toEqual(units);

    expect(selectUnitMock).toHaveBeenCalledWith(5);
  });
});

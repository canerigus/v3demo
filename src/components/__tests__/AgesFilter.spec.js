import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import vuetify from "@/plugins/vuetify";
import AgesFilter from "@/components/AgesFilter.vue";

describe("AgesFilter.vue", () => {
  it("renders with correct html and props and methods work", async () => {
    const agesMock = ["All", "Dark", "Feudal", "Castle", "Imperial"];
    const selectAgeMock = vi.fn();
    const wrapper = mount(AgesFilter, {
      global: {
        plugins: [vuetify],
        mocks: {
          selectAge: selectAgeMock,
        },
      },
      props: {
        ages: agesMock,
      },
    });

    const agesFilterHtml = wrapper.html();
    const agesFilterProps = wrapper.props();
    const buttons = wrapper.findAll("button");
    await buttons[0].trigger('click')
    expect(selectAgeMock).toHaveBeenCalledWith(agesMock[0], 0);
    agesMock.forEach((age) => {
      expect(agesFilterHtml).toContain(age);
    });
    buttons.forEach(async (button, index) => {
      await buttons[index].trigger('click');
      expect(selectAgeMock).toHaveBeenCalledWith(agesMock[index], index);
    });
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(agesMock[index]);
    });
    expect(agesFilterProps).toEqual({ages: agesMock})
    expect(buttons.length).toBe(agesMock.length);
  });
  it("renders correctly with no ages prop", () => {
    const wrapper = mount(AgesFilter, {
      global: {
        plugins: [vuetify],
      },
    });

    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(0);
  });
  it("adds all ages to selected", async () => {
    const agesMock = ["All", "Dark", "Feudal", "Castle", "Imperial"];
    const wrapper = mount(AgesFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        ages: agesMock,
      },
    });

    const selectAgeSpy = vi.spyOn(wrapper.vm, "selectAge");
    const buttons = wrapper.findAll("button");
    await buttons[0].trigger('click')
    expect(selectAgeSpy).toHaveBeenCalledWith(agesMock[0], 0);
    expect(wrapper.vm.selected).toEqual(agesMock);
  });
  it("removes all ages from selected", async () => {
    const agesMock = ["All", "Dark", "Feudal", "Castle", "Imperial"];
    const wrapper = mount(AgesFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        ages: agesMock,
      },
    });
    wrapper.vm.selected = ["All"]
    const selectAgeSpy = vi.spyOn(wrapper.vm, "selectAge");
    const buttons = wrapper.findAll("button");
    await buttons[0].trigger('click')
    expect(selectAgeSpy).toHaveBeenCalledWith(agesMock[0], 0);
    expect(wrapper.vm.selected).toEqual([]);
  });
  it("removes selected age from selected", async () => {
    const agesMock = ["All", "Dark", "Feudal", "Castle", "Imperial"];
    const wrapper = mount(AgesFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        ages: agesMock,
      },
    });
    wrapper.vm.selected = [...agesMock]
    const selectAgeSpy = vi.spyOn(wrapper.vm, "selectAge");
    const buttons = wrapper.findAll("button");
    await buttons[1].trigger('click')
    expect(selectAgeSpy).toHaveBeenCalledWith(agesMock[1], 1);
    expect(wrapper.vm.selected).toEqual(["Feudal", "Castle", "Imperial"]);
    expect(wrapper.vm.toggle).toEqual([]);
  });
  it("adds selected to selected", async () => {
    const agesMock = ["All", "Dark", "Feudal", "Castle", "Imperial"];
    const wrapper = mount(AgesFilter, {
      global: {
        plugins: [vuetify],
      },
      props: {
        ages: agesMock,
      },
    });
    wrapper.vm.selected = []
    const selectAgeSpy = vi.spyOn(wrapper.vm, "selectAge");
    const buttons = wrapper.findAll("button");
    await buttons[1].trigger('click')
    expect(selectAgeSpy).toHaveBeenCalledWith(agesMock[1], 1);
    expect(wrapper.vm.selected).toEqual(["Dark"]);
    expect(wrapper.vm.toggle).toEqual([1,1]);
  });
});

import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect } from "vitest";
import UnitDetailsView from "@/views/UnitDetailsView.vue";

describe("UnitDetailsView", () => {
  const routes = [{ path: "/unit/:id", component: UnitDetailsView }];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  it("should render the router view", async () => {
    const wrapper = mount(UnitDetailsView, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findComponent({ name: "RouterView" }).exists()).toBe(true);
  });
});

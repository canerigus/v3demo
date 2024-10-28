import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import App from "../App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: { template: "<div>Mock Home</div>" } },
  { path: "/units", component: { template: "<div>Mock Units</div>" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("App.vue", () => {
  it("renders the header with Home and Units links", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();

    const links = wrapper.findAll("header > a");
    expect(links.length).toBe(2);
    expect(links[0].text()).toBe("Home");
    expect(links[1].text()).toBe("Units");
  });

  it("renders the Home", async () => {
    await router.push("/");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toContain("<div>Mock Home</div>");
  });
  it("renders the Units", async () => {
    await router.push("/units");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toContain("<div>Mock Units</div>");
  });
});

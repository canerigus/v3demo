import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UnitsAll from "@/views/UnitsAll.vue";
import UnitDetails from "@/views/UnitDetails.vue";
import UnitDetailsView from "@/views/UnitDetailsView.vue";
import NotFound from "@/views/NotFound.vue";
import { useUnitsStore } from "@/stores/unitsStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/units",
      name: "UnitsAll",
      component: UnitsAll,
      beforeEnter: async (to, from, next) => {
        try {
          if (!useUnitsStore().units?.length) {
            await useUnitsStore().loadUnits();
          }
          next();
        } catch (error) {
          console.error("Failed to load units:", error);
          next("/");
        }
      },
    },
    {
      path: "/units/:id",
      name: "UnitDetailsView",
      component: UnitDetailsView,
      props: true,
      beforeEnter: async (to, from, next) => {
        try {
          if (!useUnitsStore().units?.length) await useUnitsStore().loadUnits();
          await useUnitsStore().loadCurrentUnit(Number(to.params.id));
          next();
        } catch (error) {
          console.error("Failed to load current unit:", error);
          next("/units");
        }
      },
      children: [
        { path: "", name: "UnitDetails", component: UnitDetails, props: true },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import UnitsAll from '@/views/UnitsAll.vue';
import { createTestingPinia } from "@pinia/testing";
import UnitDetailsView from '@/views/UnitDetailsView.vue';
import NotFound from '@/views/NotFound.vue';
import { useUnitsStore } from '@/stores/unitsStore';
import router from './router';

describe('Router', () => {
  const pinia = createTestingPinia();
  const store = useUnitsStore();
  beforeEach(() => {
    store.units = [{
      id: 1, name: 'Archer', age: 'Feudal', cost: { Wood: 25, Gold: 45 }
    }]
  });

  afterEach(async () => {
    await vi.clearAllMocks();
    await router.push('/');
    await router.isReady();
  });
  it('should render HomeView on /', async () => {
    await router.push('/');
    await router.isReady();
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render UnitsAll on /units', async () => {
    await router.push('/units');
    await router.isReady();
    const wrapper = mount(UnitsAll, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render UnitDetailsView on /units/:id', async () => {
    await router.push('/units/1');
    await router.isReady();
    const wrapper = mount(UnitDetailsView, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render NotFound on unknown path', async () => {
    await router.push('/unknown');
    await router.isReady();
    const wrapper = mount(NotFound, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should call loadUnits before entering /units', async () => {
    store.units = [];
    await router.push('/units');
    await router.isReady();
    expect(store.loadUnits).toHaveBeenCalled();
  });

  it('should call loadCurrentUnit before entering /units/:id', async () => {
    await router.push('/units/1');
    await router.isReady();
    expect(store.loadCurrentUnit).toHaveBeenCalledWith(1);
  });

  it('should redirect to / if loadUnits fails', async () => {
    try {
      store.units = [];
      store.loadUnits.mockResolvedValueOnce(() => {
        throw new Error('Failed to load units');
      });
      await router.push('/units');
      await router.isReady();
    } catch (error) {
      expect(error.message).toBe('Failed to load units');
      expect(router.currentRoute.value.fullPath).toBe('/');
    }
  });

  it('should redirect to /units if loadCurrentUnit fails', async () => {
    try {
      store.loadCurrentUnit.mockResolvedValueOnce(() => {
        throw new Error('Failed to load current unit');
      });
      await router.push('/units/1');
      await router.isReady();
    } catch (error) {
      expect(error.message).toBe('Failed to load current unit');
      expect(router.currentRoute.value.fullPath).toBe('/units');
    }
  });

  it('should call loadCurrent if units not loaded when entering /units/:id', async () => {
    store.units = [];
    await router.push('/units/1');
    await router.isReady();
    expect(store.loadUnits).toHaveBeenCalledWith();
    expect(store.loadCurrentUnit).toHaveBeenCalledWith(1);
  });
});

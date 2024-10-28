import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HomeView from '@/views/HomeView.vue';

describe('HomeView', () => {
  it('renders an image with the correct src', () => {
    const wrapper = mount(HomeView);
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://upload.wikimedia.org/wikipedia/commons/4/40/Age_of_Empires_franchise_logo.png');
  });
});

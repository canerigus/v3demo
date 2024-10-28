import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NotFound from '@/views/NotFound.vue';

describe('NotFound', () => {
  it('renders the correct html', () => {
    const wrapper = mount(NotFound);
    expect(wrapper.html()).toContain('<h1>404 - Page Not Found</h1>');
    expect(wrapper.html()).toContain('<p>Sorry, the page you are looking for does not exist.</p>');
  });
});

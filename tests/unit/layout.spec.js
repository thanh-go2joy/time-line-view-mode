import { mount } from '@vue/test-utils'
import MemberLayout from '@/layouts/member.vue'
import GuestLayout from '@/layouts/guest.vue'
import App from '@/App.vue'
describe('App.vue', () => {
  it('renders layout', () => {
    const wrapper = mount(App)
    const token = localStorage.getItem('access_token')
    if (token) {
      const layoutRender = wrapper.findComponent(MemberLayout)
      expect(layoutRender.exists()).toBe(true)
    } else {
      const layoutRender = wrapper.findComponent(GuestLayout)
      expect(layoutRender.exists()).toBe(true)
    }
  })
})

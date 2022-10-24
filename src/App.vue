<template>
  <div class="app">
    <component :is="layout" @changeLayout="setLayout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MemberLayout from './layouts/member.vue'
import GuestLayout from './layouts/guest.vue'
import { getLocalStorageWithExpiry } from '@/utils/localStorage'
export default {
  name: 'SaApp',
  components: {
    MemberLayout,
    GuestLayout
  },
  data () {
    return {
      layout: ''
    }
  },
  created () {
    this.setLayout()
  },
  methods: {
    setLayout () {
      const token = getLocalStorageWithExpiry('access_token')
      this.layout = token ? 'member-layout' : 'guest-layout'
    }
  }
}
</script>
<style lang="scss">
.app {
  font-family: "Muli", sans-serif;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .el-select-dropdown {
    width: 88%;
    left: 22px;
  }
  .el-date-range-picker {
    left: 0 !important;
    width: 100% !important;
    overflow-x: scroll !important;
  }
}
</style>

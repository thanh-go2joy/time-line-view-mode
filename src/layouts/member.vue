<template>
  <div class="member-layout">
    <el-container>
      <el-aside class="member-layout__aside" :class="!isExpend ? '' : 'active'">
        <SaSidebar :isExpend="isExpend" />
      </el-aside>
      <el-container>
        <el-header class="member-layout__header" :class="!isExpend ? '' : 'active'">
          <SaHeader
            :expend="isExpend"
            @expended="getExpended"
            @logout="$emit('changeLayout')"
          />
        </el-header>
        <el-main class="member-layout__main" :class="!isExpend ? '' : 'active'">
          <div class="member-layout__topbar">
            <SaTopBar />
          </div>
          <div class="member-layout__content">
            <slot />
          </div>
          <el-footer class="member-layout__footer">
            © {{ new Date().getFullYear() }} Go2Joy - All Rights Reserved.
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SaHeader from '@/components/SaHeader.vue'
import SaSidebar from '@/components/SaSidebar.vue'
import SaTopBar from '@/components/SaTopBar.vue'
export default {
  name: 'MemberLayout',
  components: {
    SaHeader,
    SaSidebar,
    SaTopBar
  },
  data () {
    return {
      isExpend: true
    }
  },
  created () {
    if (window.screen.width < 766) {
      this.isExpend = false
    }
  },
  methods: {
    getExpended () {
      this.isExpend = !this.isExpend
    }
  }
}
</script>
<style lang="scss" scoped>
.member-layout{
  min-height: 100vh;
  .el-container {
    min-height: 100vh;
  }
  :deep(.el-main) {
    padding: 12px 8px 0 12px;
    .el-pagination {
      margin-top: 0.5em;
      @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        .el-pagination__total,
        .el-pagination__jump,
        .el-pagination__sizes {
          display: none;
        }
      }
    }
  }
  &__header {
    width: calc(100% - 193px);
    right: 0;
    top: 0;
    position: fixed;
    background: #FFFFFF;
    width: 100%;
    z-index: 101;
    padding: 0 30px 0 12px;
  }
  &__aside {
    z-index: 101;
    position: fixed;
    text-align: left;
    min-height: 100vh;
    width: 0 !important;
    transition: width 0.2s;
    padding-top: 57px;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar
    {
      width: 1px;
    }
    @media (max-width: 766px) {
      z-index: 2001;
    }
  }
  &__aside.active  {
    width: 228px !important;
  }
  &__main {
    margin-top: 60px;
    flex: 1;
    background-color: #f2f5fa;
    display: flex;
    flex-direction: column;
    transition: width 0s 5s;
  }
  &__topbar {
    background-color: #FFFFFF;
    margin-bottom: 12px;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__footer {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-top: 12px;
  }
  @media (min-width: 766px) {
    &__aside  {
      width: 6% !important;
    }
    &__main {
      margin-left: 64px;
      transition: all 0.5s ease;
      height: 100%;
    }
    &__main.active {
      margin-left: 220px;
    }
    &__main.active~ .footer-section {
      margin-left: 200px;
      transition: all 0.5s ease;
    }
  }
}
</style>

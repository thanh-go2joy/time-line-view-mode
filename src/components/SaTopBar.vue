<template>
  <div
    class="sa-topbar"
    v-if="$route.name"
  >
    <h3
      class="sa-topbar__title"
    >
      {{ $t(`breadcrumb.${$route.matched[0].name}`) }}
    </h3>
    <div class="sa-topbar__path">
      <router-link
        :to="'/'"
        class="sa-topbar__path--back"
      >
        {{ $t('breadcrumb.dashboard')}}
      </router-link>
      <component
        :is="router.name === 'collection' && $route.matched.length > 1 ? 'router-link' : 'span'"
        :to="router.path"
        v-for="(router) in $route.matched"
        :key="router.name"
        :class="{ 'sa-topbar__path--back': router.name === 'collection' && $route.matched.length > 1 }"
      >
        <i class="el-icon-arrow-right" /> {{$t(`breadcrumb.${router.name}`)}}
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaTopBar'
}
</script>

<style lang="scss" scoped>
.sa-topbar {
  padding: 20px;
  &__title {
    font-size: 18px;
    color: #263a5b;
    margin-bottom: 5px;
    margin-top: 0;
    font-weight: 600;
  }
  &__path {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @media (min-width: 640px) {
      margin-left: 26px;
    }

    &--back {
      color: #8A98AC;
      font-weight: 600;
    }
  }
  i {
    margin: 0 8px;
    font-size: 12px;
  }
}
</style>

<template>
  <div class="card-item">
    <p class="card-item__label">
      {{ $t(`page.userMgt.${label}`) }}
    </p>
    <p class="card-item__value">
      {{ label === 'mobileDevice' ? displayMobileDevice : value }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'CardItem',
  props: {
    value: {
      type: [String, Number, Object, Boolean],
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayMobileDevice () {
      let lang = ''
      let os = ''
      if (!this.value) {
        return ''
      }
      if (this.value.language) {
        switch (this.value.language) {
          case 1:
            lang = 'Korean'
            break
          case 2:
            lang = 'English'
            break
          case 3:
            lang = 'Việt nam'
            break
          default:
            lang = ''
        };
      }
      if (this.value.os) {
        switch (this.value.os) {
          case 1:
            os = 'IOS'
            break
          case 2:
            os = 'Android'
            break
          default:
            return ''
        };
      }
      return `${os} | ${this.value.osVersion} | ${lang} | ${this.value.appVersion} | ${this.value.phoneModel} | ${this.formatDate(this.value.registerTime)}`
    }
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  align-items: center;
  &__label {
    width: 35%;
    font-weight: 600;
  }
  &__value {
    width: 85%;
  }
}
</style>

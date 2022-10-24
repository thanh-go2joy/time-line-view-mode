<template>
  <el-popover
    :placement="placement"
    :trigger="trigger"
    popper-class="select-checkbox"
  >
    <el-checkbox
      v-if="isCheckAll"
      :indeterminate="indeterminate"
      v-model="checkAll"
    >
      {{ $t('button.checkAll') }}
    </el-checkbox>
    <el-checkbox-group
      v-model="checked"
    >
      <el-checkbox
        v-for="(item, index) in options"
        :label="item[label]"
        :key="index"
      >
        {{ translate ? $t(`${item[keyValue]}`) : item[keyValue]}}
      </el-checkbox>
    </el-checkbox-group>
    <el-button
      v-if="options.length === value.length"
      :loading="loadingButton"
      slot="reference"
      plain
    >
      {{ $t('option.allSelected') }}
      ({{ value.length }})
    </el-button>
    <el-button
      v-else
      slot="reference"
      plain
      :loading="loadingButton"
    >
      {{ $t('option.selected') }}
      ({{ value.length }})
    </el-button>
  </el-popover>
</template>
<script>
export default {
  name: 'SaSelectCheckBox',
  props: {
    translate: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom',
      validator: (value) => (['bottom', 'left', 'right', 'top'].indexOf(value) !== -1)
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (value) => (['click', 'hover', 'manual', 'focus'].indexOf(value) !== -1)
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    modelCheckAll: {
      type: [Boolean, Number, String],
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => [{ key: '', value: '' }]
    },
    label: {
      type: String,
      default: 'value'
    },
    keyValue: {
      type: String,
      default: 'key'
    },
    loadingButton: {
      type: Boolean,
      default: false
    },
    isCheckAll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    checkAll: {
      get () {
        return this.modelCheckAll
      },
      set (val) { this.$emit('changeCheckAll', val) }
    },
    checked: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.select-checkbox .el-checkbox {
  display: block;
  padding: 6px 12px;
}
.select-checkbox .el-checkbox-group {
  overflow: auto;
  height: 100%;
  max-height: 200px;
}
.select-checkbox .el-checkbox-group::-webkit-scrollbar {
  width: 2px;
  background-color: #F5F5F5;
}
.select-checkbox .el-checkbox-group::-webkit-scrollbar-thumb {
  background-color: #000000;
}
</style>

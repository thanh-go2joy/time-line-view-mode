<template>
  <div class="upload-file" :class="isDisabled ? 'disabled' : ''">
    <label class="upload-file__label">
      <input
        ref="file"
        type="file"
        :accept="accept"
        @change="onChange"
        multiple
      >
      <i class="el-icon-upload" style="margin-right: 4px; font-size: 13px;"></i> <slot />
    </label>
    <span class="upload-file__name" v-if="fileName && showFileName">
      {{ fileName }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'UploadImage',
  props: {
    accept: {
      type: String,
      default: ''
    },
    showFileName: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      fileName: ''
    }
  },
  methods: {
    onChange () {
      this.fileName = this.$refs.file.files[0].name || ''
      this.$emit('change', this.$refs.file.files[0])
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-file {
  display: flex;
  align-items: center;
  &__label {
    &:hover {
      opacity: 0.8;
    }
    transition: all .2s ease-in;
    margin-right: 12px;
    color: #fff;
    display: block;
    background-color: #409eff;
    border-color: #409eff;
    padding: 8px 20px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    input[type="file"] {
      display: none;
    }
  }
  &__name {
    color: #8A98AC;
    font-size: 12px;
    font-weight: 500;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
</style>

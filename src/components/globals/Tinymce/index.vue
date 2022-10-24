<template>
  <div
    :class="{ 'fullscreen': fullscreen }"
    class="tinymce-container editor-container"
  >
    <editor
      :value="value"
      :id="tinymceId"
      :init="init"
      class="tinymce-textarea"
      @onClick="onClick"
      @input="handleInput"
    />
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div> -->
    <el-button
      :style="{background:'#1890ff',borderColor:'#1890ff'}"
      class="editor-custom-btn-container"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >
      Upload Image
    </el-button>
    <el-dialog :visible.sync="dialogVisible" width="30%" >
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="#"
        list-type="picture-card"
        :httpRequest="handleApi"
      >
        <el-button size="small" type="primary">
          Click here to upload
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        Confirm
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import Editor from '@tinymce/tinymce-vue'
import { uploadImage } from '@/api/uploadImage.js'
import { getLocalStorageWithExpiry } from '@/utils/localStorage'

// import EditorImage from './components/EditorImage.vue'
export default {
  name: 'Tinymce',
  components: {
    Editor
  },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 550
    }
  },
  computed: {
    init () {
      const _this = this
      return {
        image_caption: true,
        height: this.height,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        selector: `#${this.tinymceId}`,
        body_class: 'panel-body ',
        object_resizing: false,
        menubar: this.menubar,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        plugins: this.plugins,
        toolbar: this.toolbar,
        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      }
    },
    headerAPI () {
      const token = getLocalStorageWithExpiry('access_token')
      if (!token) {
        return {}
      }
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  },
  data () {
    return {
      plugins: plugins,
      toolbar: toolbar,
      tinymceId: this.id,
      fullscreen: false,
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    imageSuccessCBK (arr) {
      const _this = this
      arr.forEach(v => {
        tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
    destroyTinymce () {
      if (this.fullscreen) {
        tinymce.get(this.tinymceId).execCommand('mceFullScreen')
      }
      if (tinymce.get(this.tinymceId)) {
        tinymce.get(this.tinymceId).destroy()
      }
    },
    handleInput (value) {
      this.$emit('input', value)
    },
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    async handleApi (option) {
      const formData = new FormData()
      formData.append('image', option.file)
      try {
        return await uploadImage(formData)
      } catch (error) {
        return false
      }
    },
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to be uploaded successfully or there is a network problem, please refresh the page and re-upload!')
        return
      }
      this.imageSuccessCBK(arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = this.formatImage(response.data.data)
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  },
  destroyed () {
    this.destroyTinymce()
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  line-height: normal;
}
.tinymce-container :deep(.mce-fullscreen) {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 8px;
  top: 6px;
  z-index: 100;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
.editor-slide-upload {
  margin-bottom: 20px;
  :deep(.el-upload--picture-card) {
    width: 100%;
  }
}
</style>

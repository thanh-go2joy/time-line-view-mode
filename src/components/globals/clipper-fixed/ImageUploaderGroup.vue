<template>
  <div>
    <div v-for="(formImage, index) in maxLoop" :key="index" class="image-uploader">
      <div class="image-uploader__label">
        <p v-if="formImage.typeImage === 1">{{ $t('page.hotelDisplay.homeImage')}}<span class="text-danger"> (*)</span></p>
        <p v-else-if="formImage.typeImage === 2">{{ $t('page.hotelDisplay.giftImage')}}<span class="text-danger"> (*)</span></p>
        <p v-else>{{ $t('page.hotelDisplay.image') + ' ' + formImage.no }}</p>
      </div>
      <div class="image-uploader__content">
        <el-image
          v-if="formImage.src !== 'delete'"
          :src="formImage.src">
        </el-image>

        <label class="img-box" for="fileInput" @click="getInfo(formImage, index)">
          {{ $t('button.chooseFile')}}
          <slot name="upload-label"></slot>
          <label slot="upload-label">
            {{ formImage.label }}
          </label>
        </label>
        <input :id="id" :class="className" type="file" @change="uploadFile" @click="onRemove" :accept="accept" :capture="capture" />

        <el-checkbox v-show="isDisableCheckBox(formImage)" @change="checkBoxImage(index)">{{ $t('page.hotelDisplay.degreesImage')}}</el-checkbox>
        <el-button v-show="isRemoveImage(formImage)" type="danger" @click="removeImage(index)" size="medium">{{ $t('button.delete')}}</el-button>
      </div>
    </div>
    <thumbnail-dialog-group
      ref="thumbnailDialog"
      :visible="ui.thumbnailDialogVisible"
      @result="resultThumbnail"
      @close="ui.thumbnailDialogVisible = false"
      />
  </div>
</template>

<style lang="scss" scoped>
.img-box {
  cursor: pointer;
  border: 1px solid;
  padding: 0.8em 1em;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 4px;
}

#fileInput {
  display: none;
}

.image-uploader {
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;

  @media (max-width: 640px) {
    display: block;
    border-bottom: 1px dashed #ccc;
  }
  &__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3em;
    margin: 0.5em 0;

    @media (max-width: 640px) {
      gap: 1em;
    }
  }
  :deep(.el-image) {
    width: 160px;
    min-height: 100px;
    height: auto;
    border: 1px solid #ccc;
    .el-image__error {
      display: none;
    }
  }
}
</style>

<script>
import EXIF from '@/utils/exif.js'
import dataURLtoBlob from 'blueimp-canvas-to-blob'
import ThumbnailDialogGroup from './ThumbnailDialogGroup.vue'

export default {
  name: 'image-uploader',
  props: {
    /**
     * v-for number.
     * @default 1
     * @type {Number}
     */
    maxLoop: {
      type: [Object, Array],
      default: () => []
    },
    /**
     * The ID for the file input, required if more than one instance should be used on the same page.
     *
     * @default fileInput
     * @type {String}
     */
    id: {
      type: String,
      default: 'fileInput'
    },

    /**
     * An integer in pixels for the maximum width allowed for uploaded images, selected images with a greater width than this value will be scaled down before upload.
     * @default 1024
     * @type {Number}
     */
    maxWidth: {
      type: Number,
      default: 1024
    },

    /**
     * An integer in pixels for the maximum height allowed for uploaded images, selected images with a greater height than this value will be scaled down before upload.
     * @default 1024
     * @type {Number}
     */
    maxHeight: {
      type: Number,
      default: 1024
    },

    /**
     * TODO: Does not make sens to me
     * A float value in megapixels (MP) for the maximum overall size of the image allowed for uploaded images, selected images with a greater size than this value will be scaled down before upload. If the value is null or is not specified, then maximum size restriction is not applied
     * @default null
     * @type {Number}
     */
    maxSize: {
      type: Number,
      default: 3
    },

    /**
     * A float between 0 and 1.00 for the image quality to use in the resulting image data, around 0.9 is recommended.
     * @default 1.00
     * @type {Number}
     */
    quality: {
      type: Number,
      default: 1.0
    },

    /**
     * Allows scaling down to a specified fraction of the original size. (Example: a value of 0.5 will reduce the size by half.) Accepts a decimal value between 0 and 1.
     * @default null
     * @type {Number}
     */
    scaleRatio: {
      type: Number,
      default: null
    },

    /**
     * A boolean flag, if true then EXIF information from the image is parsed and the image is rotated correctly before upload. If false, then no processing is performed, and unwanted image flipping can happen.
     * @default false
     * @type {Boolean}
     */
    autoRotate: {
      type: Boolean,
      default: false
    },

    /**
     * A boolean flag to toogle an img-tag displaying the uploaded image. When set to false no img-tag is displayed
     * @default true
     * @type {Boolean}
     */
    preview: {
      type: Boolean,
      default: true
    },

    /**
     * Sets the desired format for the returned image. Available formats are
     * 'string' (base64), 'verbose' (object), 'blob' (object), 'info' (object), 'file' (unmodified File object)
     * @default {string}
     * @type {String}
     */
    outputFormat: {
      type: String,
      default: 'string'
    },

    /**
     * Sets the desired class name for the input element
     * @default {fileinput}
     * @type {String or Array}
     */
    className: {
      type: [String, Array],
      default: 'fileinput'
    },

    /**
     * Sets an optional capture attribute. (false, camera, user, environment)
     * @default empty
     * @type [String or Boolean]
     */
    capture: {
      type: [String, Boolean],
      default: false
    },

    /**
     * Sets the accept attribute, in case the same input can accept other files
     * Shoub be a comma seperated string, eg 'audio/*,video/*,image/*'
     * @default image/*
     * @type {String}
     */
    accept: {
      type: String,
      default: 'image/png, image/jpeg, image/jpg'
    },

    /**
     * An array of image's extensions that will not be resized (['gif', 'svg'])
     * If only 1 extension, it can be provided directly as a stringEg ('gif')
     * Disable all resizing with a catch all ('*')
     * If not resized, the returned output will always be the unmodifed File object
     * @default []
     * @type {String or Array}
     */
    doNotResize: {
      type: [String, Array],
      default: () => []
    },

    /**
     * How much to write to the console. 0 = silent. 1 = quite. 2 = loud
     * @default false
     * @type {Boolean}
     */
    debug: {
      type: Number,
      default: 0
    }
  },
  components: {
    ThumbnailDialogGroup
  },
  data () {
    return {
      imagePreview: null,
      currentFile: {},
      dimensions: {},
      exifData: {},
      isMaxSize: false,
      ui: {
        thumbnailDialogVisible: false
      },
      indexFile: 0,
      formData: {}
    }
  },

  methods: {
    getInfo (data, index) {
      this.indexFile = index
      this.formData = data
    },
    checkBoxImage (index) {
      this.$emit('checkboxItem', index)
    },
    removeImage (index) {
      this.$emit('removeItem', index)
    },
    resultThumbnail (result) {
      this.$emit('result', result, this.indexFile)
    },
    onRemove (e) {
      e.target.value = ''
    },
    isDisableCheckBox (item) {
      return item.typeImage === 0
    },
    isRemoveImage (item) {
      return item.typeImage !== 2 && item.src
    },
    /**
     * Get file from input
     * @param  {object} event
     */
    uploadFile (e, index) {
      const file = e.target.files && e.target.files.length ? e.target.files[0] : null
      if (file) {
        this.emitLoad()
        // this.handleFile(file)
        this.handleAcceptSizeImage(file, this.indexFile)
      }
    },

    /**
     * Emit event with output
     * @param  {mixed} output - The resized image. type can be simple dataUrl string, verbose object or Blob instance
     */
    emitEvent (output, index) {
      this.$refs.thumbnailDialog.setup({ file: output }, this.formData)
      this.ui.thumbnailDialogVisible = true
      this.$emit('input', output, index)
      this.$emit('change', output)

      // setTimeout(() => {
      //   this.$refs.thumbnailDialog.setup({ file: output })
      //   this.ui.thumbnailDialogVisible = true
      //   this.$emit('input', output, index)
      //   this.$emit('change', output)
      // }, 500)
    },

    emitLoad () {
      this.$emit('onUpload')
    },

    emitComplete () {
      this.$emit('onComplete')
    },

    /**
     * Handels the file manipulation on upload
     * @param  {File}     file The current original uploaded file
     * @return {}         nada (yet)
     */

    handleAcceptSizeImage (file, index) {
      if (file.size <= 3145728) {
        this.isMaxSize = true
      } else {
        this.isMaxSize = false
      }

      this.handleFile(file, index)
    },

    handleFile (file, index) {
      this.currentFile = file

      const mimetype = file.type.split('/') // NB: Not supprted by Safari on iOS !??! @todo: TEST!
      const isImage = mimetype[0] === 'image'
      const doNotResize = typeof this.doNotResize === 'string' ? [this.doNotResize] : this.doNotResize // cast to array

      // Don't resize if not image or doNotResize is set
      if (!isImage || doNotResize.includes('*') || doNotResize.includes(mimetype[1])) {
        // this.log('No Resize, return file directly')
        this.emitEvent(file, index) // does NOT respect the output format prop
        this.emitComplete()
      } else {
        const that = this
        const img = document.createElement('img')
        const reader = new window.FileReader()

        reader.onload = function (e) {
          that.log('reader.onload() is triggered', 2)

          img.src = e.target.result
          img.onload = function () {
            that.log('img.onload() is triggered', 2)

            // this extracts exifdata if available. Returns an empty object if not
            EXIF.getData(img, function () {
              that.exifData = this.exifdata
              if (Object.keys(that.exifData).length === 0) {
                that.log('ImageUploader: exif data found and extracted', 2)
              }
            })
            that.scaleImage(img, that.exifData.Orientation, index)
          }
        }

        reader.readAsDataURL(file)
      }
    },

    /**
     * Performance orientation and scaling logic
     * @param  {HTMLElement} img -  A document img element containing the uploaded file as a base764 encoded string as source
     * @param  {int} [orientation = 1] - Exif-extracted orientation code
     */
    scaleImage (img, orientation = 1, index) {
      let canvas = document.createElement('canvas')

      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')

      ctx.save()

      // Good explanation of EXIF orientation is here http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
      if (this.autoRotate && orientation > 1) {
        // this.log('ImageUploader: rotating image as per EXIF orientation tag = ' + orientation)
        const width = canvas.width
        const styleWidth = canvas.style.width
        const height = canvas.height
        const styleHeight = canvas.style.height

        if (orientation > 4) {
          canvas.width = height
          canvas.style.width = styleHeight
          canvas.height = width
          canvas.style.height = styleWidth
        }
        switch (orientation) {
          case 2:
            ctx.translate(width, 0)
            ctx.scale(-1, 1)
            break
          case 3:
            ctx.translate(width, height)
            ctx.rotate(Math.PI)
            break
          case 4:
            ctx.translate(0, height)
            ctx.scale(1, -1)
            break
          case 5:
            ctx.rotate(0.5 * Math.PI)
            ctx.scale(1, -1)
            break
          case 6:
            ctx.rotate(0.5 * Math.PI)
            ctx.translate(0, -height)
            break
          case 7:
            ctx.rotate(0.5 * Math.PI)
            ctx.translate(width, -height)
            ctx.scale(-1, 1)
            break
          case 8:
            ctx.rotate(-0.5 * Math.PI)
            ctx.translate(-width, 0)
            break
        }
      }
      ctx.drawImage(img, 0, 0)
      ctx.restore()

      // Let's find the max available width for scaled image
      const ratio = canvas.width / canvas.height
      let mWidth = Math.min(this.maxWidth, ratio * this.maxHeight)

      // suggested re-write by https://github.com/ryancramerdesign
      // https://github.com/rossturner/HTML5-ImageUploader/issues/13

      // if (this.maxSize > 0 && this.maxSize < (canvas.width * canvas.height) / 1000000) {
      if (this.maxSize > 0 && this.maxSize < (canvas.width * canvas.height) / 1000000) {
        const mSize = Math.floor(Math.sqrt(this.maxSize * ratio) * 1000)
        mWidth = mWidth > 0 ? Math.min(mWidth, mSize) : mSize
      }

      if (this.scaleRatio) {
        mWidth = Math.min(mWidth, Math.floor(this.scaleRatio * canvas.width))
      }

      // store dimensions

      if (this.maxSize > 0 && this.maxSize < (canvas.width * canvas.height) / 1000000) {
        // Ảnh upload lên nếu Lớn hơn maxsize thì sẽ giữ nguyên kích thước
        this.dimensions.orgWidth = canvas.width
        this.dimensions.orgHeight = canvas.height
        this.dimensions.width = mWidth
        this.dimensions.height = Math.floor(mWidth / ratio)
      } else {
        // Ảnh upload lên nếu Nhỏ hơn maxsize thì sẽ giữ nguyên kích thước
        this.dimensions.orgWidth = canvas.width
        this.dimensions.orgHeight = canvas.height
        this.dimensions.width = canvas.width
        this.dimensions.height = canvas.height
      }

      // this.dimensions.orgWidth = canvas.width
      // this.dimensions.orgHeight = canvas.height
      // this.dimensions.width = mWidth
      // this.dimensions.height = Math.floor(mWidth / ratio)

      this.log('ImageUploader: NGOÀI = ' + canvas.width + ' X ' + canvas.height)
      this.log('ImageUploader: NGOÀI = ' + mWidth + ' X ' + Math.floor(mWidth / ratio))

      if (mWidth <= 0) {
        mWidth = 1
        // console.warning('ImageUploader: image size is too small')
      }

      // simple resize with a 2:1 ratio
      while (canvas.width >= 2 * mWidth) {
        canvas = this.getHalfScaleCanvas(canvas)
      }

      // When factor less than 2:1 remains, finish up with alogorithm
      if (canvas.width > mWidth) {
        canvas = this.scaleCanvasWithAlgorithm(canvas, mWidth)
      }

      // suggested re-write by https://github.com/ryancramerdesign
      // https://github.com/rossturner/HTML5-ImageUploader/issues/13

      const quality = this.currentFile.type === 'image/jpeg' ? this.quality : 1.0
      const imageData = canvas.toDataURL(this.currentFile.type, quality)

      // const imageData = canvas.toDataURL()
      // const imageData = canvas.toDataURL(this.currentFile.type, 1.0)

      if (typeof this.onScale === 'function') {
        this.onScale(imageData)
      }

      // this.log('New ImageData is ready', 2)

      // Display preview of the new image
      if (this.preview) {
        this.imagePreview = this.isMaxSize === true ? URL.createObjectURL(this.currentFile) : imageData
      }

      // Return the new image
      // this.emitEvent(this.currentFile) // DEBUG
      this.emitEvent(this.formatOutput(imageData), index)

      this.emitComplete()
    },

    /**
     * Scale Canvas. Scales the
     * @param {HTMLElement} canvas - canvas element before finale resize
     * @param {int} maxWidth - max image width
     * @returns {HTMLElement} - canvas resized to scale
     */
    scaleCanvasWithAlgorithm (canvas, maxWidth) {
      const scaledCanvas = document.createElement('canvas')
      const scale = maxWidth / canvas.width

      scaledCanvas.width = canvas.width * scale
      scaledCanvas.height = canvas.height * scale

      const srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
      const destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height)

      this.applyBilinearInterpolation(srcImgData, destImgData, scale)

      scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0)

      return scaledCanvas
    },

    /**
     * Interpolation
     * @param  {ImageData} srcCanvasData - Pixel data of source canvas
     * @param  {ImageData} destCanvasData - Pixel data of destionation canvas
     * @param  {int} scale - Resize scale (max width / original width)
     * @author http://web.archive.org/web/20120123142531/http://www.philou.ch/js-bilinear-interpolation.html
     */
    applyBilinearInterpolation (srcCanvasData, destCanvasData, scale) {
      function inner (f00, f10, f01, f11, x, y) {
        const unx = 1.0 - x
        const uny = 1.0 - y
        return f00 * unx * uny + f10 * x * uny + f01 * unx * y + f11 * x * y
      }
      let i, j
      let iyv, iy0, iy1, ixv, ix0, ix1
      let idxD, idxS00, idxS10, idxS01, idxS11
      let dx, dy
      let r, g, b, a
      for (i = 0; i < destCanvasData.height; ++i) {
        iyv = i / scale
        iy0 = Math.floor(iyv)
        // Math.ceil can go over bounds
        iy1 = Math.ceil(iyv) > srcCanvasData.height - 1 ? srcCanvasData.height - 1 : Math.ceil(iyv)
        for (j = 0; j < destCanvasData.width; ++j) {
          ixv = j / scale
          ix0 = Math.floor(ixv)
          // Math.ceil can go over bounds
          ix1 = Math.ceil(ixv) > srcCanvasData.width - 1 ? srcCanvasData.width - 1 : Math.ceil(ixv)
          idxD = (j + destCanvasData.width * i) * 4
          // matrix to vector indices
          idxS00 = (ix0 + srcCanvasData.width * iy0) * 4
          idxS10 = (ix1 + srcCanvasData.width * iy0) * 4
          idxS01 = (ix0 + srcCanvasData.width * iy1) * 4
          idxS11 = (ix1 + srcCanvasData.width * iy1) * 4
          // overall coordinates to unit square
          dx = ixv - ix0
          dy = iyv - iy0
          // I let the r, g, b, a on purpose for debugging
          r = inner(srcCanvasData.data[idxS00], srcCanvasData.data[idxS10], srcCanvasData.data[idxS01], srcCanvasData.data[idxS11], dx, dy)
          destCanvasData.data[idxD] = r

          g = inner(srcCanvasData.data[idxS00 + 1], srcCanvasData.data[idxS10 + 1], srcCanvasData.data[idxS01 + 1], srcCanvasData.data[idxS11 + 1], dx, dy)
          destCanvasData.data[idxD + 1] = g

          b = inner(srcCanvasData.data[idxS00 + 2], srcCanvasData.data[idxS10 + 2], srcCanvasData.data[idxS01 + 2], srcCanvasData.data[idxS11 + 2], dx, dy)
          destCanvasData.data[idxD + 2] = b

          a = inner(srcCanvasData.data[idxS00 + 3], srcCanvasData.data[idxS10 + 3], srcCanvasData.data[idxS01 + 3], srcCanvasData.data[idxS11 + 3], dx, dy)
          destCanvasData.data[idxD + 3] = a
        }
      }
    },

    /**
     * getHalfScaleCanvas - return a canvas divided by 2
     * @param  {HTMLElement} canvas - input document canvas element
     * @returns  {HTMLElement} half of input canvas
     */
    getHalfScaleCanvas (canvas) {
      const halfCanvas = document.createElement('canvas')
      halfCanvas.width = canvas.width / 2
      halfCanvas.height = canvas.height / 2

      halfCanvas.getContext('2d').drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height)

      return halfCanvas
    },

    /**
     * Sets the format of the component output
     * @param  {string} imageData  dataUrl
     * @return {mixed}             Either simple dataUrl string or
     *                                    object with dataURl and metadata or
     *                                    blob or
     *                                    file
     */
    formatOutput (imageData) {
      // this.log('ImageUploader: outputFormat: ' + this.outputFormat)

      if (this.outputFormat === 'file') {
        return this.currentFile
      }

      if (this.outputFormat === 'blob') {
        if (typeof dataURLtoBlob === 'undefined') {
          // console.warn('Missing library! blueimp-canvas-to-blob.js must be loaded to output as "blob"')
          // console.warn('Falling back to default base64 dataUrl')
          return imageData
        }
        return dataURLtoBlob(imageData)
      }

      const info = {
        name: this.currentFile.name,
        type: this.currentFile.type,
        size: this.currentFile.size,
        newWidth: this.dimensions.width,
        newHeight: this.dimensions.height,
        orgWidth: this.dimensions.orgWidth,
        orgHeight: this.dimensions.orgHeight,
        aspectRatio: Math.round((this.dimensions.width / this.dimensions.height) * 100) / 100, // as Float
        modifiedTimestamp: this.currentFile.lastModified,
        modifiedDate: this.currentFile.lastModifiedDate
      }

      // return just info
      if (this.outputFormat === 'info') {
        return info
      }

      if (this.outputFormat === 'verbose') {
        // const data = {
        //   dataUrl: imageData,
        //   info,
        //   exif: Object.keys(this.exifData).length > 0 ? this.exifData : null
        // }

        let data = {}

        if (this.isMaxSize === true) {
          data = {
            dataUrl: URL.createObjectURL(this.currentFile),
            info,
            exif: Object.keys(this.exifData).length > 0 ? this.exifData : null
          }
        } else {
          data = {
            dataUrl: imageData,
            info,
            exif: Object.keys(this.exifData).length > 0 ? this.exifData : null
          }
        }

        return data
      }
      // simple base64 dataUrl string by default
      return imageData
    },

    /**
     * Debug logger to console
     * @param  {string} msg - Message to console
     * @param  {int} level - Debug level to output
     * @param  {mixed} details - Extra debug details
     */
    log (msg, level = 1, details = null) {
      if (this.debug >= level) {
        // eslint-disable-next-line
        // console.info(msg)
        if (details) {
          // eslint-disable-next-line
          // console.info(details)
        }
      }
    }
  },

  created () {
    this.log('Initialised ImageUploader')
  }
}
</script>

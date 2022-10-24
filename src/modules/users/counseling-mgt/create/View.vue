<template>
  <sa-section>
    <el-form
      label-position="left"
      label-width="250px"
      ref="createForm"
      :rules="formRules"
      :model="counselings"
    >
      <el-form-item
        :label="$t('page.createCounselingMgt.title')"
        prop="title"
      >
        <el-input type="text" v-model="counselings.title"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('page.createCounselingMgt.content')"
        prop="content"
      >
        <el-input type="text" v-model="counselings.content"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('page.createCounselingMgt.sendUser')"
        prop="appUserSn"
      >
        <el-select
          v-bing :loading="isLoadingUser"
          element-loading-spinner="el-icon-loading"
          filterable
          remote
          style="min-width: 250px; margin-right: 12px"
          prefix-icon="el-icon-search"
          clearable
          :placeholder="$t('page.createCounselingMgt.placeholderUser')"
          :remote-method="reloadFilterDataUser"
          v-model="counselings.appUserSn"
        >
          <el-option
            v-for="item in user"
            :key="item.value"
            :label="item.nickName"
            :value="item.sn"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('page.createCounselingMgt.scope')"
        prop="scope"
      >
        <el-select
          element-loading-spinner="el-icon-loading"
          filterable
          remote
          style="min-width: 250px; margin-right: 12px"
          prefix-icon="el-icon-search"
          clearable
          :placeholder="$t('page.createCounselingMgt.placeholderScope')"
          :remote-method="reloadFilterDataUser"
          v-model="counselings.scope"
        >
          <el-option
            v-for="item in scope"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="right-content">
            <el-button  type="info" size="large" @click="$router.go(-1)">
              {{$t('button.back')}}
            </el-button>
            <el-button  type="success" size="large" @click="onCreateUser">
              <i class="feather icon-save mr-2"/>
              {{$t('button.create')}}
            </el-button>
          </div>
      </el-form-item>
    </el-form>
  </sa-section>
</template>
<script>
import saSection from '@/components/globals/SaSection.vue'
import { listUsers, onCreateCounseling } from './api'
import { debounce } from '@/utils/helpers'
import { repStatus } from '@/utils/const'

const timeDebounce = 500
export default {
  name: 'UserMgt',
  components: {
    saSection
  },
  data: (vm) => {
    return {
      counselings: {
        scope: 1
      },
      user: [],
      isLoadingUser: false,
      formRules: {
        title: [
          { required: true, message: vm.$t('page.createCounselingMgt.requireTitle'), trigger: 'blur' }
        ],
        content: [
          { required: true, message: vm.$t('page.createCounselingMgt.requireContent'), trigger: 'blur' }
        ],
        appUserSn: [
          { required: true, message: vm.$t('page.createCounselingMgt.requireUserApp'), trigger: 'blur' }
        ],
        scope: [
          { required: true, message: vm.$t('page.createCounselingMgt.requireScope'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    scope () {
      return [
        { name: this.$t('option.private'), value: 1 },
        { name: this.$t('option.public'), value: 2 }
      ]
    }
  },
  created () {
    this.listUser({ status: 1 })
  },
  watch: {

  },
  methods: {
    async listUser (params) {
      try {
        this.isLoadingUser = true
        const { data } = await listUsers(params)
        this.user = data.data.appUsers
      } catch (error) {
        return false
      } finally {
        this.isLoadingUser = false
      }
    },
    reloadFilterDataUser: debounce(function (keyword) {
      this.listUser({ keyword: keyword })
    }, timeDebounce),
    async onCreateUser () {
      this.$refs.createForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          const { data } = await onCreateCounseling(this.counselings)
          if (data?.code === repStatus.sussess) {
            this.$message({
              type: 'success',
              message: this.$t('message.success')
            })
            this.$router.push({ name: 'counselingMgt' })
          }
        } catch (error) {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.right-content{
  float: right;
}
</style>

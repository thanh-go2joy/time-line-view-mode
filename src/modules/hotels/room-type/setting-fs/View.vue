<template>
  <sa-section v-loading="isLoading">
    <el-row>
      <el-col :span="4">
          <p>{{ $t("page.settingFS.notification") }}</p>
      </el-col>
      <el-col :span="20">
        <el-select
         v-model="settingFS.sendAt"
        >
          <el-option
            v-for="(time,index) in 24"
            :key="time"
            :label="getTime(index)"
            :value="index"
          >
            {{ getTime(index) }}
          </el-option>
        </el-select>
      </el-col>
    </el-row>  <!-- send time -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.flash_sale_threshold") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input v-model="settingFS.threshold" type="text"></el-input>
      </el-col>
    </el-row>  <!-- threshold -->
    <el-row>
      <el-col :span="4">
        <strong><p>{{ $t("page.settingFS.template") }} 1</p></strong>
      </el-col>
    </el-row>  <!-- template 1 -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.notification_title") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input v-model="settingFS.title1" type="text"></el-input>
      </el-col>
    </el-row>  <!-- title -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.notification_content") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input type="textarea" v-model="settingFS.content1" ></el-input>
      </el-col>
    </el-row><!-- content -->
    <el-row>
      <el-col :span="4">
        <strong><p>{{ $t("page.settingFS.template") }} 2</p></strong>
      </el-col>
    </el-row>  <!-- template 2 -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.notification_title") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input v-model="settingFS.title3" type="text"></el-input>
      </el-col>
    </el-row>  <!-- title -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.notification_content") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input type="textarea" v-model="settingFS.content2" ></el-input>
      </el-col>
    </el-row><!-- content 2-->
    <el-row>
      <el-col :span="4">
        <strong><p>{{ $t("page.settingFS.template") }} 3</p></strong>
      </el-col>
    </el-row>  <!-- template 3 -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.notification_title") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input v-model="settingFS.title3" type="text"></el-input>
      </el-col>
    </el-row>  <!-- title -->
    <el-row>
      <el-col :span="4">
        <p>{{ $t("page.settingFS.notification_content") }}</p>
      </el-col>
      <el-col :span="20">
        <el-input type="textarea" v-model="settingFS.content3" ></el-input>
      </el-col>
    </el-row><!-- content 3-->
    <div >
      <div class="right-content">
        <el-button type="info" size="large" @click="$router.go(-1)">
          {{ $t("button.back") }}
        </el-button>
        <el-button type="success" size="large" @click="updatesettingFS">
          <i class="feather icon-save mr-2" />
          {{ $t("button.edit") }}
        </el-button>
      </div>
    </div>
  </sa-section>
</template>

<script>
import { listSettingFS, onUpdateSettingFS } from './api'
import SaSection from '@/components/globals/SaSection.vue'
export default {
  name: 'settingFSMgt',
  components: {
    SaSection
  },
  data () {
    return {
      settingFS: {
        re_password: ''
      },
      isLoading: false
    }
  },
  async created () {
    await this.listSettingFS()
  },
  methods: {
    async listSettingFS () {
      this.isLoading = true
      try {
        const { data } = await listSettingFS()
        this.settingFS = data.data
      } catch (error) {
        return false
      } finally {
        this.isLoading = false
      }
    },
    async updatesettingFS () {
      try {
        const dataJson = {
          sendAt: this.settingFS.sendAt,
          threshold: this.settingFS.threshold,
          title1: this.settingFS.title1,
          content1: this.settingFS.content1,
          title2: this.settingFS.title2,
          content2: this.settingFS.content2,
          title3: this.settingFS.title3,
          content3: this.settingFS.content3
        }
        await onUpdateSettingFS(dataJson)
        this.$message({
          type: 'success',
          message: this.$t('page.settingFS.success')
        })
        this.$router.go(-1)
      } catch (error) {
        return false
      }
    },
    getTime (time) {
      if (time < 10) {
        return `0${time}:00`
      } else {
        return `${time}:00`
      }
    }
  }
}
</script>

<style scoped>
  .right-content{
    text-align: right;
    margin-top: 12px;
  }
</style>

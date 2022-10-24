<template>
<sa-section>
<div class="tracking-booking-block" v-loading="ui.isLoading">
    <div class="tracking-booking-block__date-search">
        <div class="is-text">
            <p>{{ $t('page.bookingTracking.dateFrom') }}</p>
        </div>
        <div class="is-change-date">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              popper-class="custom-date-range"
              range-separator="-"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('page.firstBooking.startDate')" :end-placeholder="$t('page.firstBooking.endDate')"
              :clearable="false"
            />
        </div>
        <el-button type="primary" class="el-button mr-2 el-button--primary" @click="searchTracking()"><i class="el-icon-search"></i> search</el-button>
    </div>
    <div class="tracking-booking-block__policy">
        <div class="policy-item">
            <div>
              <span style="background-color: #FFF2CC">aa/bb</span>&emsp;&emsp; aa: Booking checked-in</div>
            <div style="margin-left:65px;">bb: Total Booking</div>
        </div>
        <div class="policy-item">
            <div>
              <span style="color:#6AA850;">aa/bb</span>&emsp;Booking checked-in rate "Daily Average" HIGHER "Previous Month Average"
            </div>
            <div style="margin-left:50px;">Total booking rate "Daily Average" HIGHER "Previous Month Average"</div>
            <div>
              <span style="color:#F2C642;">aa/bb</span>&emsp;Booking checked-in rate "Daily Average" EQUAL "Previous Month Average"
            </div>
            <div style="margin-left:50px;">Total booking rate "Daily Average" EQUAL "Previous Month Average"</div>
            <div>
              <span style="color:#FE0C05;">aa/bb</span>&emsp;Booking checked-in rate "Daily Average" LOWER "Previous Month Average"
            </div>
            <div style="margin-left:50px;">Total booking rate "Daily Average" LOWER "Previous Month Average"</div>
        </div>
        <div class="policy-item">
            <div>
              <span style="color:#6AA850;">aa/bb</span>&emsp;Booking checked-in rate "Previous Month Average" HIGHER "2020 Average"</div>
            <div style="margin-left:50px;">Total booking rate "Previous Month Average" HIGHER "2019 Average"</div>
            <div><span style="color:#F2C642;">aa/bb</span>&emsp;Booking checked-in rate "Previous Month Average" EQUAL "2020 Average"</div>
            <div style="margin-left:50px;">Total booking rate "Previous Month Average" EQUAL "2019 Average"</div>
            <div><span style="color:#FE0C05;">aa/bb</span>&emsp;Booking checked-in rate "Previous Month Average" LOWER "2020 Average"</div>
            <div style="margin-left:50px;">Total booking rate "Previous Month Average" LOWER "2019 Average"</div>
        </div>
    </div>
    <div class="tracking-booking-block__content-table">
      <!-- Start row -->
        <div v-if="region" >
          <div class="content-table">
            <!-- START HEADER -->
            <div>
              <aside class="content-table__post-sidebar">
                <div class="post-sidebar-inner ">
                  <div class="pos_abs tracking">
                    <button type="button"  class="btn btn_action btn-primary btn-total">{{$t('page.bookingTracking.region')}}</button>
                  </div>
                  <!-- Start Tổng-->
                  <div id="block-scroll-first" class="block-scroll-first" style="z-index: 1 !important">
                    <div style="width: 100%;" >
                      <div class="pd-width">
                        <div class="style-table-tracking scroll-table">
                          <table class="avoid-clicks">
                            <tbody>
                            <tr>
                              <td style="width: 200px;" class="style-title-tracking" colspan="2" rowspan="2">Total bookings(11) + (12) + (13)</td>
                              <td style="width: 1600px" class="style-title-tracking" colspan="16">
                                Promotion (issues coupon) (11)</td>
                              <td style="width: 2000px;" class="style-title-tracking" colspan="20">Promotion
                                (no issues coupon) (12)</td>
                              <td style="width: 200px" class="style-title-tracking" colspan="2" rowspan="2">Raw Bookings (no any promotion) (13)</td>
                            </tr>
                            <tr>
                              <!--Booking   -->
                              <td style="width: 400px" colspan="4">Total booking (1) +
                                (2) + (3)</td>
                              <td style="width: 400px" colspan="4">G2J 100% (1)</td>
                              <td style="width: 400px" colspan="4">G2J &amp; Hotel (2)</td>
                              <td style="width: 400px" colspan="4">Hotel 100% (3)</td>
                              <td style="width: 200px" colspan="2">Total booking (4) + (5) + (6) + (7) + (8) + (9) + (10) + (11)</td>
                              <td style="width: 400px" colspan="4">Direct Discount (4)</td>
                              <td style="width: 200px" colspan="2">Special Offer (5)</td>
                              <td style="width: 200px" colspan="2">Flash sale (6)</td>
                              <td style="width: 200px" colspan="2">Stamps (7)</td>
                              <td style="width: 200px" colspan="2">Points (8)</td>
                              <td style="width: 200px" colspan="2">Payment Promotion (9)</td>
                              <td style="width: 200px" colspan="2">Extra Fee (10)</td>
                              <td style="width: 200px" colspan="2">Hotel Product (11)</td>
                            </tr>
                            <tr>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All</td>
                              <td style="width: 200px" colspan="2">Distinct</td>
                              <td style="width: 200px" colspan="2">All</td>
                              <td style="width: 200px" colspan="2">Distinct</td>
                              <td style="width: 200px" colspan="2">All</td>
                              <td style="width: 200px" colspan="2">Distinct</td>
                              <td style="width: 200px" colspan="2">All</td>
                              <td style="width: 200px" colspan="2">Distinct</td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All</td>
                              <td style="width: 200px" colspan="2">Distinct</td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                              <td style="width: 200px" colspan="2">All </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <!-- End start vùng -->
                    <!-- Start Tổng -->
                    <div style="width: 100%;" >
                      <div class="pos_abs tracking">
                        <button type="button" style="font-size: 20px;" class="btn_action tbn-child btn btn-success" @click="activeCollapse('total')">{{$t('page.bookingTracking.total')}}</button>
                      </div>
                      <div class="pd-width" >
                        <div class="style-table-tracking scroll-table">
                          <table class="avoid-clicks">
                            <tbody>
                            <tr>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.totalFinalBookings.totalCheckin }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ region.totalFinalBookings.totalCheckin }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ region.totalFinalBookings.totalCheckin }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.totalFinalBookings.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ region.totalFinalBookings.totalBooking }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ region.totalFinalBookings.totalBooking }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ region.totalFinalBookings.totalBooking }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ region.totalFinalBookings.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ region.totalPromotionIssueCoupon.totalCheckin }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ region.totalPromotionIssueCoupon.totalCheckin }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ region.totalPromotionIssueCoupon.totalCheckin }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ region.totalPromotionIssueCoupon.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ region.totalPromotionIssueCoupon.totalBooking }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ region.totalPromotionIssueCoupon.totalBooking }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ region.totalPromotionIssueCoupon.totalBooking }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ region.totalPromotionIssueCoupon.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                ⁄
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.promotionG2J100.totalCheckin }}</span>
                                <span v-if="region.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850">  {{ region.promotionG2J100.totalCheckin }}</span>
                                <span v-if="region.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642">  {{ region.promotionG2J100.totalCheckin }}</span>
                                <span v-if="region.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.promotionG2J100.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionG2J100.totalBooking }}</span>
                                <span v-if="region.promotionG2J100.colorPerBooking == 1" style="color: #6AA850">  {{ region.promotionG2J100.totalBooking }}</span>
                                <span v-if="region.promotionG2J100.colorPerBooking == 2" style="color: #F2C642">  {{ region.promotionG2J100.totalBooking }}</span>
                                <span v-if="region.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionG2J100.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionG2J100.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.promotionG2J100.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.promotionG2J100.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionG2J100.distinctTotalCheckin }}</span>
                                ⁄
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionG2J100.distinctTotalBooking }}</span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.promotionG2J100.distinctTotalBooking }}</span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.promotionG2J100.distinctTotalBooking }}</span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionG2J100.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.promotionG2JHotel.totalCheckin }}</span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850">  {{ region.promotionG2JHotel.totalCheckin }}</span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642">  {{ region.promotionG2JHotel.totalCheckin }}</span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.promotionG2JHotel.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionG2JHotel.totalBooking }}</span>
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850">  {{ region.promotionG2JHotel.totalBooking }}</span>
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642">  {{ region.promotionG2JHotel.totalBooking }}</span>
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionG2JHotel.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionG2JHotel.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.promotionG2JHotel.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.promotionG2JHotel.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionG2JHotel.distinctTotalCheckin }}</span>
                                ⁄
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionG2JHotel.distinctTotalBooking }}</span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.promotionG2JHotel.distinctTotalBooking }}</span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.promotionG2JHotel.distinctTotalBooking }}</span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionG2JHotel.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.promotionHotel100.totalCheckin }}</span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850">  {{ region.promotionHotel100.totalCheckin }}</span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642">  {{ region.promotionHotel100.totalCheckin }}</span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.promotionHotel100.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionHotel100.totalBooking }}</span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 1" style="color: #6AA850">  {{ region.promotionHotel100.totalBooking }}</span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 2" style="color: #F2C642">  {{ region.promotionHotel100.totalBooking }}</span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionHotel100.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionHotel100.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.promotionHotel100.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.promotionHotel100.distinctTotalCheckin }}</span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionHotel100.distinctTotalCheckin }}</span>
                                ⁄
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.promotionHotel100.distinctTotalBooking }}</span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.promotionHotel100.distinctTotalBooking }}</span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.promotionHotel100.distinctTotalBooking }}</span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.promotionHotel100.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850">  {{ region.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642">  {{ region.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ region.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ region.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ region.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ region.totalPromotionNoIssueCoupon.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.directDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.directDiscount.totalCheckin }}</span>
                                <span v-if="region.directDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ region.directDiscount.totalCheckin }}</span>
                                <span v-if="region.directDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ region.directDiscount.totalCheckin }}</span>
                                <span v-if="region.directDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.directDiscount.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.directDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ region.directDiscount.totalBooking }}</span>
                                <span v-if="region.directDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ region.directDiscount.totalBooking }}</span>
                                <span v-if="region.directDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ region.directDiscount.totalBooking }}</span>
                                <span v-if="region.directDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ region.directDiscount.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.directDiscount.distinctTotalCheckin }}</span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.directDiscount.distinctTotalCheckin }}</span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.directDiscount.distinctTotalCheckin }}</span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.directDiscount.distinctTotalCheckin }}</span>
                                ⁄
                                <span v-if="region.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ region.directDiscount.distinctTotalBooking }}</span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ region.directDiscount.distinctTotalBooking }}</span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ region.directDiscount.distinctTotalBooking }}</span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ region.directDiscount.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.specialOffer.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.specialOffer.totalCheckin }}</span>
                                <span v-if="region.specialOffer.colorPerCheckin == 1" style="color: #6AA850">  {{ region.specialOffer.totalCheckin }}</span>
                                <span v-if="region.specialOffer.colorPerCheckin == 2" style="color: #F2C642">  {{ region.specialOffer.totalCheckin }}</span>
                                <span v-if="region.specialOffer.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.specialOffer.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.specialOffer.colorPerBooking == 0" style="color: #8A98AC">  {{ region.specialOffer.totalBooking }}</span>
                                <span v-if="region.specialOffer.colorPerBooking == 1" style="color: #6AA850">  {{ region.specialOffer.totalBooking }}</span>
                                <span v-if="region.specialOffer.colorPerBooking == 2" style="color: #F2C642">  {{ region.specialOffer.totalBooking }}</span>
                                <span v-if="region.specialOffer.colorPerBooking == 3" style="color: #FE0C05">  {{ region.specialOffer.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.flashSale.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.flashSale.totalCheckin }}</span>
                                <span v-if="region.flashSale.colorPerCheckin == 1" style="color: #6AA850">  {{ region.flashSale.totalCheckin }}</span>
                                <span v-if="region.flashSale.colorPerCheckin == 2" style="color: #F2C642">  {{ region.flashSale.totalCheckin }}</span>
                                <span v-if="region.flashSale.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.flashSale.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.flashSale.colorPerBooking == 0" style="color: #8A98AC">  {{ region.flashSale.totalBooking }}</span>
                                <span v-if="region.flashSale.colorPerBooking == 1" style="color: #6AA850">  {{ region.flashSale.totalBooking }}</span>
                                <span v-if="region.flashSale.colorPerBooking == 2" style="color: #F2C642">  {{ region.flashSale.totalBooking }}</span>
                                <span v-if="region.flashSale.colorPerBooking == 3" style="color: #FE0C05">  {{ region.flashSale.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.stamp.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.stamp.totalCheckin }}</span>
                                <span v-if="region.stamp.colorPerCheckin == 1" style="color: #6AA850">  {{ region.stamp.totalCheckin }}</span>
                                <span v-if="region.stamp.colorPerCheckin == 2" style="color: #F2C642">  {{ region.stamp.totalCheckin }}</span>
                                <span v-if="region.stamp.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.stamp.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.stamp.colorPerBooking == 0" style="color: #8A98AC">  {{ region.stamp.totalBooking }}</span>
                                <span v-if="region.stamp.colorPerBooking == 1" style="color: #6AA850">  {{ region.stamp.totalBooking }}</span>
                                <span v-if="region.stamp.colorPerBooking == 2" style="color: #F2C642">  {{ region.stamp.totalBooking }}</span>
                                <span v-if="region.stamp.colorPerBooking == 3" style="color: #FE0C05">  {{ region.stamp.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.mileagePoint.totalCheckin }}</span>
                                <span v-if="region.mileagePoint.colorPerCheckin == 1" style="color: #6AA850">  {{ region.mileagePoint.totalCheckin }}</span>
                                <span v-if="region.mileagePoint.colorPerCheckin == 2" style="color: #F2C642">  {{ region.mileagePoint.totalCheckin }}</span>
                                <span v-if="region.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.mileagePoint.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.mileagePoint.colorPerBooking == 0" style="color: #8A98AC">  {{ region.mileagePoint.totalBooking }}</span>
                                <span v-if="region.mileagePoint.colorPerBooking == 1" style="color: #6AA850">  {{ region.mileagePoint.totalBooking }}</span>
                                <span v-if="region.mileagePoint.colorPerBooking == 2" style="color: #F2C642">  {{ region.mileagePoint.totalBooking }}</span>
                                <span v-if="region.mileagePoint.colorPerBooking == 3" style="color: #FE0C05">  {{ region.mileagePoint.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.paymentPromotion.totalCheckin }}</span>
                                <span v-if="region.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850">  {{ region.paymentPromotion.totalCheckin }}</span>
                                <span v-if="region.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642">  {{ region.paymentPromotion.totalCheckin }}</span>
                                <span v-if="region.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.paymentPromotion.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC">  {{ region.paymentPromotion.totalBooking }}</span>
                                <span v-if="region.paymentPromotion.colorPerBooking == 1" style="color: #6AA850">  {{ region.paymentPromotion.totalBooking }}</span>
                                <span v-if="region.paymentPromotion.colorPerBooking == 2" style="color: #F2C642">  {{ region.paymentPromotion.totalBooking }}</span>
                                <span v-if="region.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05">  {{ region.paymentPromotion.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.extraFee.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.extraFee.totalCheckin }}</span>
                                <span v-if="region.extraFee.colorPerCheckin == 1" style="color: #6AA850">  {{ region.extraFee.totalCheckin }}</span>
                                <span v-if="region.extraFee.colorPerCheckin == 2" style="color: #F2C642">  {{ region.extraFee.totalCheckin }}</span>
                                <span v-if="region.extraFee.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.extraFee.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.extraFee.colorPerBooking == 0" style="color: #8A98AC">  {{ region.extraFee.totalBooking }}</span>
                                <span v-if="region.extraFee.colorPerBooking == 1" style="color: #6AA850">  {{ region.extraFee.totalBooking }}</span>
                                <span v-if="region.extraFee.colorPerBooking == 2" style="color: #F2C642">  {{ region.extraFee.totalBooking }}</span>
                                <span v-if="region.extraFee.colorPerBooking == 3" style="color: #FE0C05">  {{ region.extraFee.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.hotelProduct.totalCheckin }}</span>
                                <span v-if="region.hotelProduct.colorPerCheckin == 1" style="color: #6AA850">  {{ region.hotelProduct.totalCheckin }}</span>
                                <span v-if="region.hotelProduct.colorPerCheckin == 2" style="color: #F2C642">  {{ region.hotelProduct.totalCheckin }}</span>
                                <span v-if="region.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.hotelProduct.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.hotelProduct.colorPerBooking == 0" style="color: #8A98AC">  {{ region.hotelProduct.totalBooking }}</span>
                                <span v-if="region.hotelProduct.colorPerBooking == 1" style="color: #6AA850">  {{ region.hotelProduct.totalBooking }}</span>
                                <span v-if="region.hotelProduct.colorPerBooking == 2" style="color: #F2C642">  {{ region.hotelProduct.totalBooking }}</span>
                                <span v-if="region.hotelProduct.colorPerBooking == 3" style="color: #FE0C05">  {{ region.hotelProduct.totalBooking }}</span>
                              </td>
                              <td style="width: 200px" colspan="2">
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.bookingsNotDiscount.totalCheckin }}</span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ region.bookingsNotDiscount.totalCheckin }}</span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ region.bookingsNotDiscount.totalCheckin }}</span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.bookingsNotDiscount.totalCheckin }}</span>
                                ⁄
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ region.bookingsNotDiscount.totalBooking }}</span>
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ region.bookingsNotDiscount.totalBooking }}</span>
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ region.bookingsNotDiscount.totalBooking }}</span>
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ region.bookingsNotDiscount.totalBooking }}</span>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="collapsible total" >
                      <div class="pos_abs tracking">
                        <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.daily_average')}}</button>
                      </div>
                      <div class="pd-width" >
                        <div class="style-table-tracking scroll-table">
                          <table class="avoid-clicks none-border back-table">
                            <tbody>
                            <tr>
                              <td style="width: 100px">
                                <span>{{ region.totalFinalBookings.totalCheckin }} / {{ region.totalFinalBookings.totalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ region.totalFinalBookings.totalCheckinPerDays }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ region.totalFinalBookings.totalCheckinPerDays }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ region.totalFinalBookings.totalCheckinPerDays }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ region.totalFinalBookings.totalCheckinPerDays }}</span>
                                ⁄
                                <span v-if="region.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ region.totalFinalBookings.totalBookingPerDays }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ region.totalFinalBookings.totalBookingPerDays }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ region.totalFinalBookings.totalBookingPerDays }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ region.totalFinalBookings.totalBookingPerDays }}</span>
                              </td>

                              <td style="width: 100px">
                                <span>{{ region.totalPromotionIssueCoupon.totalCheckin }}</span>/ <span>{{ region.totalPromotionIssueCoupon.totalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                <span>{{ region.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>/ <span>{{ region.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionG2J100.totalCheckin }} / {{ region.promotionG2J100.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionG2J100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionG2J100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionG2J100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionG2J100.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionG2J100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionG2J100.colorPerBooking == 1" style="color: #6AA850"> {{ region.promotionG2J100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionG2J100.colorPerBooking == 2" style="color: #F2C642"> {{ region.promotionG2J100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05"> {{ region.promotionG2J100.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                <span>{{ region.promotionG2J100.distinctTotalCheckin }}</span>/ <span>{{ region.promotionG2J100.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2J100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ region.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ region.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ region.promotionG2J100.distinctTotalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionG2JHotel.totalCheckin }} / {{ region.promotionG2JHotel.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.totalBookingPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.totalBookingPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.totalBookingPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                <span>{{ region.promotionG2JHotel.distinctTotalCheckin }}</span>/ <span>{{ region.promotionG2JHotel.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionHotel100.totalCheckin }} / {{ region.promotionHotel100.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                <span>{{ region.promotionHotel100.distinctTotalCheckin }}</span>/ <span>{{ region.promotionHotel100.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionHotel100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ region.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ region.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ region.promotionHotel100.distinctTotalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.totalPromotionNoIssueCoupon.totalCheckin }} / {{ region.totalPromotionNoIssueCoupon.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionHotel100.totalCheckin }} / {{ region.promotionHotel100.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.promotionHotel100.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                                <span v-if="region.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ region.promotionHotel100.totalBookingPerDays }} </span>
                                <span v-if="region.directDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ region.directDiscount.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                <span>{{ region.directDiscount.distinctTotalCheckin }}</span>/ <span>{{ region.directDiscount.distinctTotalBooking }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.directDiscount.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ region.directDiscount.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.directDiscount.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ region.directDiscount.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.directDiscount.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ region.directDiscount.distinctTotalCheckinPerDays }} </span>
                                <span v-if="region.directDiscount.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ region.directDiscount.distinctTotalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ region.directDiscount.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850"> {{ region.directDiscount.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642"> {{ region.directDiscount.distinctTotalBookingPerDays }} </span>
                                <span v-if="region.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ region.directDiscount.distinctTotalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.specialOffer.totalCheckin }} / {{ region.specialOffer.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.specialOffer.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.specialOffer.totalCheckinPerDays }} </span>
                                <span v-if="region.specialOffer.colorPerCheckin == 1" style="color: #6AA850"> {{ region.specialOffer.totalCheckinPerDays }} </span>
                                <span v-if="region.specialOffer.colorPerCheckin == 2" style="color: #F2C642"> {{ region.specialOffer.totalCheckinPerDays }} </span>
                                <span v-if="region.specialOffer.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.specialOffer.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.specialOffer.colorPerBooking == 0" style="color: #8A98AC"> {{ region.specialOffer.totalBookingPerDays }} </span>
                                <span v-if="region.specialOffer.colorPerBooking == 1" style="color: #6AA850"> {{ region.specialOffer.totalBookingPerDays }} </span>
                                <span v-if="region.specialOffer.colorPerBooking == 2" style="color: #F2C642"> {{ region.specialOffer.totalBookingPerDays }} </span>
                                <span v-if="region.specialOffer.colorPerBooking == 3" style="color: #FE0C05"> {{ region.specialOffer.totalBookingPerDays }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.flashSale.totalCheckin }} / {{ region.flashSale.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.flashSale.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.flashSale.totalCheckinPerDays }} </span>
                                <span v-if="region.flashSale.colorPerCheckin == 1" style="color: #6AA850"> {{ region.flashSale.totalCheckinPerDays }} </span>
                                <span v-if="region.flashSale.colorPerCheckin == 2" style="color: #F2C642"> {{ region.flashSale.totalCheckinPerDays }} </span>
                                <span v-if="region.flashSale.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.flashSale.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.flashSale.colorPerBooking == 0" style="color: #8A98AC"> {{ region.flashSale.totalBookingPerDays }} </span>
                                <span v-if="region.flashSale.colorPerBooking == 1" style="color: #6AA850"> {{ region.flashSale.totalBookingPerDays }} </span>
                                <span v-if="region.flashSale.colorPerBooking == 2" style="color: #F2C642"> {{ region.flashSale.totalBookingPerDays }} </span>
                                <span v-if="region.flashSale.colorPerBooking == 3" style="color: #FE0C05"> {{ region.flashSale.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.stamp.totalCheckin }} / {{ region.stamp.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.stamp.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.stamp.totalCheckinPerDays }} </span>
                                <span v-if="region.stamp.colorPerCheckin == 1" style="color: #6AA850"> {{ region.stamp.totalCheckinPerDays }} </span>
                                <span v-if="region.stamp.colorPerCheckin == 2" style="color: #F2C642"> {{ region.stamp.totalCheckinPerDays }} </span>
                                <span v-if="region.stamp.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.stamp.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.stamp.colorPerBooking == 0" style="color: #8A98AC"> {{ region.stamp.totalBookingPerDays }} </span>
                                <span v-if="region.stamp.colorPerBooking == 1" style="color: #6AA850"> {{ region.stamp.totalBookingPerDays }} </span>
                                <span v-if="region.stamp.colorPerBooking == 2" style="color: #F2C642"> {{ region.stamp.totalBookingPerDays }} </span>
                                <span v-if="region.stamp.colorPerBooking == 3" style="color: #FE0C05"> {{ region.stamp.totalBookingPerDays }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.mileagePoint.totalCheckin }} / {{ region.mileagePoint.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.mileagePoint.totalCheckinPerDays }} </span>
                                <span v-if="region.mileagePoint.colorPerCheckin == 1" style="color: #6AA850"> {{ region.mileagePoint.totalCheckinPerDays }} </span>
                                <span v-if="region.mileagePoint.colorPerCheckin == 2" style="color: #F2C642"> {{ region.mileagePoint.totalCheckinPerDays }} </span>
                                <span v-if="region.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.mileagePoint.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.mileagePoint.colorPerBooking == 0" style="color: #8A98AC"> {{ region.mileagePoint.totalBookingPerDays }} </span>
                                <span v-if="region.mileagePoint.colorPerBooking == 1" style="color: #6AA850"> {{ region.mileagePoint.totalBookingPerDays }} </span>
                                <span v-if="region.mileagePoint.colorPerBooking == 2" style="color: #F2C642"> {{ region.mileagePoint.totalBookingPerDays }} </span>
                                <span v-if="region.mileagePoint.colorPerBooking == 3" style="color: #FE0C05"> {{ region.mileagePoint.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.paymentPromotion.totalCheckin }} / {{ region.paymentPromotion.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.paymentPromotion.totalCheckinPerDays }} </span>
                                <span v-if="region.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850"> {{ region.paymentPromotion.totalCheckinPerDays }} </span>
                                <span v-if="region.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642"> {{ region.paymentPromotion.totalCheckinPerDays }} </span>
                                <span v-if="region.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.paymentPromotion.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC"> {{ region.paymentPromotion.totalBookingPerDays }} </span>
                                <span v-if="region.paymentPromotion.colorPerBooking == 1" style="color: #6AA850"> {{ region.paymentPromotion.totalBookingPerDays }} </span>
                                <span v-if="region.paymentPromotion.colorPerBooking == 2" style="color: #F2C642"> {{ region.paymentPromotion.totalBookingPerDays }} </span>
                                <span v-if="region.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05"> {{ region.paymentPromotion.totalBookingPerDays }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.extraFee.totalCheckin }} / {{ region.extraFee.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.extraFee.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.extraFee.totalCheckinPerDays }} </span>
                                <span v-if="region.extraFee.colorPerCheckin == 1" style="color: #6AA850"> {{ region.extraFee.totalCheckinPerDays }} </span>
                                <span v-if="region.extraFee.colorPerCheckin == 2" style="color: #F2C642"> {{ region.extraFee.totalCheckinPerDays }} </span>
                                <span v-if="region.extraFee.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.extraFee.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.extraFee.colorPerBooking == 0" style="color: #8A98AC"> {{ region.extraFee.totalBookingPerDays }} </span>
                                <span v-if="region.extraFee.colorPerBooking == 1" style="color: #6AA850"> {{ region.extraFee.totalBookingPerDays }} </span>
                                <span v-if="region.extraFee.colorPerBooking == 2" style="color: #F2C642"> {{ region.extraFee.totalBookingPerDays }} </span>
                                <span v-if="region.extraFee.colorPerBooking == 3" style="color: #FE0C05"> {{ region.extraFee.totalBookingPerDays }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.hotelProduct.totalCheckin }} / {{ region.hotelProduct.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.hotelProduct.totalCheckinPerDays }} </span>
                                <span v-if="region.hotelProduct.colorPerCheckin == 1" style="color: #6AA850"> {{ region.hotelProduct.totalCheckinPerDays }} </span>
                                <span v-if="region.hotelProduct.colorPerCheckin == 2" style="color: #F2C642"> {{ region.hotelProduct.totalCheckinPerDays }} </span>
                                <span v-if="region.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.hotelProduct.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.hotelProduct.colorPerBooking == 0" style="color: #8A98AC"> {{ region.hotelProduct.totalBookingPerDays }} </span>
                                <span v-if="region.hotelProduct.colorPerBooking == 1" style="color: #6AA850"> {{ region.hotelProduct.totalBookingPerDays }} </span>
                                <span v-if="region.hotelProduct.colorPerBooking == 2" style="color: #F2C642"> {{ region.hotelProduct.totalBookingPerDays }} </span>
                                <span v-if="region.hotelProduct.colorPerBooking == 3" style="color: #FE0C05"> {{ region.hotelProduct.totalBookingPerDays }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.bookingsNotDiscount.totalCheckin }} / {{ region.bookingsNotDiscount.totalBooking }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC"> {{ region.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850"> {{ region.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642"> {{ region.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05"> {{ region.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                ⁄
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC"> {{ region.bookingsNotDiscount.totalBookingPerDays }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850"> {{ region.bookingsNotDiscount.totalBookingPerDays }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642"> {{ region.bookingsNotDiscount.totalBookingPerDays }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ region.bookingsNotDiscount.totalBookingPerDays }} </span>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="pos_abs tracking">
                        <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.previous_month_average')}}</button>
                      </div>
                      <div class="pd-width" >
                        <div class="style-table-tracking scroll-table">
                          <table class="avoid-clicks none-border back-table">
                            <tbody>
                            <tr>
                              <td style="width: 100px">
                                <span>{{ region.totalFinalBookings.totalCheckinMonth }} / {{ region.totalFinalBookings.totalBookingMonth }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalFinalBookings.colorPerCheckinMonth == 0" style="color: #8A98AC">  {{ region.totalFinalBookings.totalCheckinPerMonth }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckinMonth == 1" style="color: #6AA850">  {{ region.totalFinalBookings.totalCheckinPerMonth }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckinMonth == 2" style="color: #F2C642">  {{ region.totalFinalBookings.totalCheckinPerMonth }}</span>
                                <span v-if="region.totalFinalBookings.colorPerCheckinMonth == 3" style="color: #FE0C05">  {{ region.totalFinalBookings.totalCheckinPerMonth }}</span>
                                ⁄
                                <span v-if="region.totalFinalBookings.colorPerBookingMonth == 0" style="color: #8A98AC">  {{ region.totalFinalBookings.totalBookingPerMonth }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBookingMonth == 1" style="color: #6AA850">  {{ region.totalFinalBookings.totalBookingPerMonth }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBookingMonth == 2" style="color: #F2C642">  {{ region.totalFinalBookings.totalBookingPerMonth }}</span>
                                <span v-if="region.totalFinalBookings.colorPerBookingMonth == 3" style="color: #FE0C05">  {{ region.totalFinalBookings.totalBookingPerMonth }}</span>
                              </td>

                              <td style="width: 100px">
                                <span>{{ region.totalPromotionIssueCoupon.totalCheckinMonth }}</span>/ <span>{{ region.totalPromotionIssueCoupon.totalBookingMonth }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                <span>{{ region.totalPromotionIssueCoupon.distinctTotalCheckinMonth }}</span>/ <span>{{ region.totalPromotionIssueCoupon.distinctTotalBookingMonth }}</span>
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionG2J100.totalCheckinMonth }} / {{ region.promotionG2J100.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2J100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.promotionG2J100.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2J100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.promotionG2J100.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2J100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.promotionG2J100.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2J100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.promotionG2J100.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.promotionG2J100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.promotionG2J100.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2J100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.promotionG2J100.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2J100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.promotionG2J100.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2J100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.promotionG2J100.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionG2J100.distinctTotalCheckinMonth }} / {{ region.promotionG2J100.distinctTotalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2J100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.promotionG2J100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ region.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ region.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2J100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionG2JHotel.totalCheckinMonth }} / {{ region.promotionG2JHotel.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2JHotel.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.promotionG2JHotel.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionG2JHotel.distinctTotalCheckinMonth }} / {{ region.promotionG2JHotel.distinctTotalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.promotionG2JHotel.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ region.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ region.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionG2JHotel.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionHotel100.totalCheckinMonth }} / {{ region.promotionHotel100.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionHotel100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.promotionHotel100.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.promotionHotel100.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.promotionHotel100.totalCheckinPerMonth }} </span>
                                <span v-if="region.promotionHotel100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.promotionHotel100.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.promotionHotel100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.promotionHotel100.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionHotel100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.promotionHotel100.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionHotel100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.promotionHotel100.totalBookingPerMonth }} </span>
                                <span v-if="region.promotionHotel100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.promotionHotel100.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.promotionHotel100.distinctTotalCheckinMonth }} / {{ region.promotionHotel100.distinctTotalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.promotionHotel100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.promotionHotel100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ region.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ region.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.promotionHotel100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.totalPromotionNoIssueCoupon.totalCheckinMonth }} / {{ region.totalPromotionNoIssueCoupon.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                <span v-if="region.totalPromotionNoIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.directDiscount.totalCheckinMonth }} / {{ region.directDiscount.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.directDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.directDiscount.totalCheckinPerMonth }} </span>
                                <span v-if="region.directDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.directDiscount.totalCheckinPerMonth }} </span>
                                <span v-if="region.directDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.directDiscount.totalCheckinPerMonth }} </span>
                                <span v-if="region.directDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.directDiscount.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.directDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.directDiscount.totalBookingPerMonth }} </span>
                                <span v-if="region.directDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.directDiscount.totalBookingPerMonth }} </span>
                                <span v-if="region.directDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.directDiscount.totalBookingPerMonth }} </span>
                                <span v-if="region.directDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.directDiscount.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.directDiscount.distinctTotalCheckinMonth }} / {{ region.directDiscount.distinctTotalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.directDiscount.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.directDiscount.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.directDiscount.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                <span v-if="region.directDiscount.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.directDiscount.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.directDiscount.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.directDiscount.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ region.directDiscount.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.directDiscount.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ region.directDiscount.distinctTotalBookingPerMonth }} </span>
                                <span v-if="region.directDiscount.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.directDiscount.distinctTotalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.specialOffer.totalCheckinMonth }} / {{ region.specialOffer.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.specialOffer.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.specialOffer.totalCheckinPerMonth }} </span>
                                <span v-if="region.specialOffer.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.specialOffer.totalCheckinPerMonth }} </span>
                                <span v-if="region.specialOffer.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.specialOffer.totalCheckinPerMonth }} </span>
                                <span v-if="region.specialOffer.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.specialOffer.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.specialOffer.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.specialOffer.totalBookingPerMonth }} </span>
                                <span v-if="region.specialOffer.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.specialOffer.totalBookingPerMonth }} </span>
                                <span v-if="region.specialOffer.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.specialOffer.totalBookingPerMonth }} </span>
                                <span v-if="region.specialOffer.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.specialOffer.totalBookingPerMonth }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.flashSale.totalCheckinMonth }} / {{ region.flashSale.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.flashSale.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.flashSale.totalCheckinPerMonth }} </span>
                                <span v-if="region.flashSale.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.flashSale.totalCheckinPerMonth }} </span>
                                <span v-if="region.flashSale.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.flashSale.totalCheckinPerMonth }} </span>
                                <span v-if="region.flashSale.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.flashSale.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.flashSale.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.flashSale.totalBookingPerMonth }} </span>
                                <span v-if="region.flashSale.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.flashSale.totalBookingPerMonth }} </span>
                                <span v-if="region.flashSale.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.flashSale.totalBookingPerMonth }} </span>
                                <span v-if="region.flashSale.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.flashSale.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.stamp.totalCheckinMonth }} / {{ region.stamp.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.stamp.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.stamp.totalCheckinPerMonth }} </span>
                                <span v-if="region.stamp.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.stamp.totalCheckinPerMonth }} </span>
                                <span v-if="region.stamp.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.stamp.totalCheckinPerMonth }} </span>
                                <span v-if="region.stamp.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.stamp.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.stamp.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.stamp.totalBookingPerMonth }} </span>
                                <span v-if="region.stamp.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.stamp.totalBookingPerMonth }} </span>
                                <span v-if="region.stamp.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.stamp.totalBookingPerMonth }} </span>
                                <span v-if="region.stamp.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.stamp.totalBookingPerMonth }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.mileagePoint.totalCheckinMonth }} / {{ region.mileagePoint.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.mileagePoint.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.mileagePoint.totalCheckinPerMonth }} </span>
                                <span v-if="region.mileagePoint.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.mileagePoint.totalCheckinPerMonth }} </span>
                                <span v-if="region.mileagePoint.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.mileagePoint.totalCheckinPerMonth }} </span>
                                <span v-if="region.mileagePoint.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.mileagePoint.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.mileagePoint.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.mileagePoint.totalBookingPerMonth }} </span>
                                <span v-if="region.mileagePoint.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.mileagePoint.totalBookingPerMonth }} </span>
                                <span v-if="region.mileagePoint.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.mileagePoint.totalBookingPerMonth }} </span>
                                <span v-if="region.mileagePoint.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.mileagePoint.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.paymentPromotion.totalCheckinMonth }} / {{ region.paymentPromotion.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.paymentPromotion.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.paymentPromotion.totalCheckinPerMonth }} </span>
                                <span v-if="region.paymentPromotion.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.paymentPromotion.totalCheckinPerMonth }} </span>
                                <span v-if="region.paymentPromotion.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.paymentPromotion.totalCheckinPerMonth }} </span>
                                <span v-if="region.paymentPromotion.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.paymentPromotion.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.paymentPromotion.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.paymentPromotion.totalBookingPerMonth }} </span>
                                <span v-if="region.paymentPromotion.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.paymentPromotion.totalBookingPerMonth }} </span>
                                <span v-if="region.paymentPromotion.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.paymentPromotion.totalBookingPerMonth }} </span>
                                <span v-if="region.paymentPromotion.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.paymentPromotion.totalBookingPerMonth }} </span>
                              </td>
                              <td style="width: 100px">
                                {{ region.extraFee.totalCheckinMonth }} / {{ region.extraFee.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.extraFee.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.extraFee.totalCheckinPerMonth }} </span>
                                <span v-if="region.extraFee.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.extraFee.totalCheckinPerMonth }} </span>
                                <span v-if="region.extraFee.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.extraFee.totalCheckinPerMonth }} </span>
                                <span v-if="region.extraFee.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.extraFee.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.extraFee.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.extraFee.totalBookingPerMonth }} </span>
                                <span v-if="region.extraFee.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.extraFee.totalBookingPerMonth }} </span>
                                <span v-if="region.extraFee.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.extraFee.totalBookingPerMonth }} </span>
                                <span v-if="region.extraFee.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.extraFee.totalBookingPerMonth }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.hotelProduct.totalCheckinMonth }} / {{ region.hotelProduct.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.hotelProduct.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.hotelProduct.totalCheckinPerMonth }} </span>
                                <span v-if="region.hotelProduct.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.hotelProduct.totalCheckinPerMonth }} </span>
                                <span v-if="region.hotelProduct.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.hotelProduct.totalCheckinPerMonth }} </span>
                                <span v-if="region.hotelProduct.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.hotelProduct.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.hotelProduct.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.hotelProduct.totalBookingPerMonth }} </span>
                                <span v-if="region.hotelProduct.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.hotelProduct.totalBookingPerMonth }} </span>
                                <span v-if="region.hotelProduct.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.hotelProduct.totalBookingPerMonth }} </span>
                                <span v-if="region.hotelProduct.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.hotelProduct.totalBookingPerMonth }} </span>
                              </td>

                              <td style="width: 100px">
                                {{ region.bookingsNotDiscount.totalCheckinMonth }} / {{ region.bookingsNotDiscount.totalBookingMonth }}
                              </td>
                              <td style="width: 100px">
                                <span v-if="region.bookingsNotDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ region.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ region.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ region.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ region.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                ⁄
                                <span v-if="region.bookingsNotDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ region.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ region.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ region.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                <span v-if="region.bookingsNotDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ region.bookingsNotDiscount.totalBookingPerMonth }} </span>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="pos_abs tracking">
                        <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.average')}}</button>
                      </div>
                      <div class="pd-width" >
                        <div class="style-table-tracking scroll-table">
                          <table class="avoid-clicks none-border back-table">
                            <tbody>
                            <tr >
                              <td style="width: 100px"><span>{{ region.totalFinalBookings.totalCheckinYear }}</span> / <span> {{ region.totalFinalBookings.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.totalFinalBookings.totalCheckinPerYear }}</span> / <span> {{ region.totalFinalBookings.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.totalPromotionIssueCoupon.totalCheckinYear }}</span> / <span> {{ region.totalPromotionIssueCoupon.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.totalPromotionIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ region.totalPromotionIssueCoupon.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.totalPromotionIssueCoupon.distinctTotalCheckinYear }}</span> / <span>{{ region.totalPromotionIssueCoupon.distinctTotalBookingYear}}</span> </td>
                              <td style="width: 100px"><span>{{ region.totalPromotionIssueCoupon.distinctTotalCheckinPerYear }}</span> / <span>{{ region.totalPromotionIssueCoupon.distinctTotalBookingPerYear}}</span> </td>

                              <td style="width: 100px"><span>{{ region.promotionG2J100.totalCheckinYear }}</span> / <span> {{ region.promotionG2J100.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.promotionG2J100.totalCheckinPerYear }}</span> / <span> {{ region.promotionG2J100.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.promotionG2J100.distinctTotalCheckinYear }}</span> / <span>{{ region.promotionG2J100.distinctTotalBookingYear}}</span> </td>
                              <td style="width: 100px"><span>{{ region.promotionG2J100.distinctTotalCheckinPerYear }}</span> / <span>{{ region.promotionG2J100.distinctTotalBookingPerYear}}</span> </td>

                              <td style="width: 100px"><span>{{ region.promotionG2JHotel.totalCheckinYear }}</span> / <span> {{ region.promotionG2JHotel.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.promotionG2JHotel.totalCheckinPerYear }}</span> / <span> {{ region.promotionG2JHotel.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.promotionG2JHotel.distinctTotalCheckinYear }}</span> / <span>{{ region.promotionG2JHotel.distinctTotalBookingYear}}</span> </td>
                              <td style="width: 100px"><span>{{ region.promotionG2JHotel.distinctTotalCheckinPerYear }}</span> / <span>{{ region.promotionG2JHotel.distinctTotalBookingPerYear}}</span> </td>

                              <td style="width: 100px"><span>{{ region.promotionHotel100.totalCheckinYear }}</span> / <span> {{ region.promotionHotel100.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.promotionHotel100.totalCheckinPerYear }}</span> / <span> {{ region.promotionHotel100.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.promotionHotel100.distinctTotalCheckinYear }}</span> / <span>{{ region.promotionHotel100.distinctTotalBookingYear}}</span> </td>
                              <td style="width: 100px"><span>{{ region.promotionHotel100.distinctTotalCheckinPerYear }}</span> / <span>{{ region.promotionHotel100.distinctTotalBookingPerYear}}</span> </td>

                              <td style="width: 100px"><span>{{ region.totalPromotionNoIssueCoupon.totalCheckinYear }}</span> / <span> {{ region.totalPromotionNoIssueCoupon.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.totalPromotionNoIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ region.totalPromotionNoIssueCoupon.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.directDiscount.distinctTotalCheckinYear }}</span> / <span>{{ region.directDiscount.distinctTotalBookingYear}}</span> </td>
                              <td style="width: 100px"><span>{{ region.directDiscount.distinctTotalCheckinPerYear }}</span> / <span>{{ region.directDiscount.distinctTotalBookingPerYear}}</span> </td>

                              <td style="width: 100px"><span>{{ region.directDiscount.totalCheckinYear }}</span> / <span> {{ region.directDiscount.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.directDiscount.totalCheckinPerYear }}</span> / <span> {{ region.directDiscount.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.specialOffer.totalCheckinYear }}</span> / <span> {{ region.specialOffer.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.specialOffer.totalCheckinPerYear }}</span> / <span> {{ region.specialOffer.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.flashSale.totalCheckinYear }}</span> / <span> {{ region.flashSale.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.flashSale.totalCheckinPerYear }}</span> / <span> {{ region.flashSale.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.stamp.totalCheckinYear }}</span> / <span> {{ region.stamp.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.stamp.totalCheckinPerYear }}   </span> / <span> {{ region.stamp.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.mileagePoint.totalCheckinYear }}</span> / <span> {{ region.mileagePoint.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.mileagePoint.totalCheckinPerYear }}</span> / <span> {{ region.mileagePoint.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.paymentPromotion.totalCheckinYear }}</span> / <span> {{ region.paymentPromotion.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.paymentPromotion.totalCheckinPerYear }}</span> / <span> {{ region.paymentPromotion.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.extraFee.totalCheckinYear }}</span> / <span> {{ region.extraFee.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.extraFee.totalCheckinPerYear }}</span> / <span> {{ region.extraFee.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.hotelProduct.totalCheckinYear }}</span> / <span> {{ region.hotelProduct.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.hotelProduct.totalCheckinPerYear }}</span> / <span> {{ region.hotelProduct.totalBookingPerYear }}</span></td>

                              <td style="width: 100px"><span>{{ region.bookingsNotDiscount.totalCheckinYear }}</span> / <span> {{ region.bookingsNotDiscount.totalBookingYear }}</span></td>
                              <td style="width: 100px"><span>{{ region.bookingsNotDiscount.totalCheckinPerYear }}</span> / <span> {{ region.bookingsNotDiscount.totalBookingPerYear }}</span></td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End Start Tổng -->
                </div>
              </aside>
            </div>
            <!-- END HEADER -->
            <div id="block-scroll-second" class="style-width block-scroll-second" >
              <div style="width: 100%;" v-for="(dataRegion,index) in regionTotal" :key="index">
                <div class="pos_abs tracking">
                  <button @click="activeCollapse(`dataRegion${index}`,dataRegion,0)" type="button" style="font-size: 20px; " aria-expanded="true" class="btn_action tbn-child btn btn-success" >
                    <span>{{ dataRegion.name }}</span>
                    <!-- <span v-else> {{ dataRegion.nameEn }}</span> -->
                  </button>
                </div>
                <div class="pd-width">
                  <div class="style-table-tracking scroll-table">
                    <table class="avoid-clicks">
                      <tbody>
                      <tr>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.totalFinalBookings.totalCheckin }}</span>
                          <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.totalFinalBookings.totalCheckin }}</span>
                          <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.totalFinalBookings.totalCheckin }}</span>
                          <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.totalFinalBookings.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalFinalBookings.totalBooking }}</span>
                          <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalFinalBookings.totalBooking }}</span>
                          <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalFinalBookings.totalBooking }}</span>
                          <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalFinalBookings.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalPromotionIssueCoupon.totalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalPromotionIssueCoupon.totalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalPromotionIssueCoupon.totalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalPromotionIssueCoupon.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalPromotionIssueCoupon.totalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalPromotionIssueCoupon.totalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalPromotionIssueCoupon.totalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalPromotionIssueCoupon.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBooking }}</span>

                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2J100.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.promotionG2J100.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.promotionG2J100.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2J100.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2J100.totalBooking }}</span>
                          <span v-if="dataRegion.promotionG2J100.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionG2J100.totalBooking }}</span>
                          <span v-if="dataRegion.promotionG2J100.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionG2J100.totalBooking }}</span>
                          <span v-if="dataRegion.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2J100.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2J100.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionG2J100.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionG2J100.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2J100.distinctTotalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2J100.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionG2J100.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionG2J100.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2J100.distinctTotalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2JHotel.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.promotionG2JHotel.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.promotionG2JHotel.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2JHotel.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2JHotel.totalBooking }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionG2JHotel.totalBooking }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionG2JHotel.totalBooking }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2JHotel.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2JHotel.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionG2JHotel.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionG2JHotel.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2JHotel.distinctTotalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionG2JHotel.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionG2JHotel.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionG2JHotel.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionG2JHotel.distinctTotalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.promotionHotel100.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.promotionHotel100.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.promotionHotel100.totalCheckin }}</span>
                          <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.promotionHotel100.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionHotel100.totalBooking }}</span>
                          <span v-if="dataRegion.promotionHotel100.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionHotel100.totalBooking }}</span>
                          <span v-if="dataRegion.promotionHotel100.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionHotel100.totalBooking }}</span>
                          <span v-if="dataRegion.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionHotel100.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionHotel100.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionHotel100.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionHotel100.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionHotel100.distinctTotalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.promotionHotel100.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.promotionHotel100.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.promotionHotel100.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.promotionHotel100.distinctTotalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalPromotionNoIssueCoupon.totalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalPromotionNoIssueCoupon.totalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalPromotionNoIssueCoupon.totalBooking }}</span>
                          <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalPromotionNoIssueCoupon.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.directDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.directDiscount.totalCheckin }}</span>
                          <span v-if="dataRegion.directDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.directDiscount.totalCheckin }}</span>
                          <span v-if="dataRegion.directDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.directDiscount.totalCheckin }}</span>
                          <span v-if="dataRegion.directDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.directDiscount.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.directDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.directDiscount.totalBooking }}</span>
                          <span v-if="dataRegion.directDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.directDiscount.totalBooking }}</span>
                          <span v-if="dataRegion.directDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.directDiscount.totalBooking }}</span>
                          <span v-if="dataRegion.directDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.directDiscount.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.directDiscount.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.directDiscount.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.directDiscount.distinctTotalCheckin }}</span>
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.directDiscount.distinctTotalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.directDiscount.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.directDiscount.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.directDiscount.distinctTotalBooking }}</span>
                          <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.directDiscount.distinctTotalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.specialOffer.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.specialOffer.totalCheckin }}</span>
                          <span v-if="dataRegion.specialOffer.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.specialOffer.totalCheckin }}</span>
                          <span v-if="dataRegion.specialOffer.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.specialOffer.totalCheckin }}</span>
                          <span v-if="dataRegion.specialOffer.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.specialOffer.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.specialOffer.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.specialOffer.totalBooking }}</span>
                          <span v-if="dataRegion.specialOffer.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.specialOffer.totalBooking }}</span>
                          <span v-if="dataRegion.specialOffer.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.specialOffer.totalBooking }}</span>
                          <span v-if="dataRegion.specialOffer.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.specialOffer.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.flashSale.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.flashSale.totalCheckin }}</span>
                          <span v-if="dataRegion.flashSale.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.flashSale.totalCheckin }}</span>
                          <span v-if="dataRegion.flashSale.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.flashSale.totalCheckin }}</span>
                          <span v-if="dataRegion.flashSale.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.flashSale.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.flashSale.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.flashSale.totalBooking }}</span>
                          <span v-if="dataRegion.flashSale.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.flashSale.totalBooking }}</span>
                          <span v-if="dataRegion.flashSale.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.flashSale.totalBooking }}</span>
                          <span v-if="dataRegion.flashSale.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.flashSale.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.stamp.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.stamp.totalCheckin }}</span>
                          <span v-if="dataRegion.stamp.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.stamp.totalCheckin }}</span>
                          <span v-if="dataRegion.stamp.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.stamp.totalCheckin }}</span>
                          <span v-if="dataRegion.stamp.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.stamp.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.stamp.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.stamp.totalBooking }}</span>
                          <span v-if="dataRegion.stamp.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.stamp.totalBooking }}</span>
                          <span v-if="dataRegion.stamp.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.stamp.totalBooking }}</span>
                          <span v-if="dataRegion.stamp.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.stamp.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.mileagePoint.totalCheckin }}</span>
                          <span v-if="dataRegion.mileagePoint.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.mileagePoint.totalCheckin }}</span>
                          <span v-if="dataRegion.mileagePoint.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.mileagePoint.totalCheckin }}</span>
                          <span v-if="dataRegion.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.mileagePoint.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.mileagePoint.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.mileagePoint.totalBooking }}</span>
                          <span v-if="dataRegion.mileagePoint.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.mileagePoint.totalBooking }}</span>
                          <span v-if="dataRegion.mileagePoint.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.mileagePoint.totalBooking }}</span>
                          <span v-if="dataRegion.mileagePoint.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.mileagePoint.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.paymentPromotion.totalCheckin }}</span>
                          <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.paymentPromotion.totalCheckin }}</span>
                          <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.paymentPromotion.totalCheckin }}</span>
                          <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.paymentPromotion.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.paymentPromotion.totalBooking }}</span>
                          <span v-if="dataRegion.paymentPromotion.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.paymentPromotion.totalBooking }}</span>
                          <span v-if="dataRegion.paymentPromotion.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.paymentPromotion.totalBooking }}</span>
                          <span v-if="dataRegion.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.paymentPromotion.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.extraFee.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.extraFee.totalCheckin }}</span>
                          <span v-if="dataRegion.extraFee.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.extraFee.totalCheckin }}</span>
                          <span v-if="dataRegion.extraFee.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.extraFee.totalCheckin }}</span>
                          <span v-if="dataRegion.extraFee.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.extraFee.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.extraFee.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.extraFee.totalBooking }}</span>
                          <span v-if="dataRegion.extraFee.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.extraFee.totalBooking }}</span>
                          <span v-if="dataRegion.extraFee.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.extraFee.totalBooking }}</span>
                          <span v-if="dataRegion.extraFee.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.extraFee.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.hotelProduct.totalCheckin }}</span>
                          <span v-if="dataRegion.hotelProduct.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.hotelProduct.totalCheckin }}</span>
                          <span v-if="dataRegion.hotelProduct.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.hotelProduct.totalCheckin }}</span>
                          <span v-if="dataRegion.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.hotelProduct.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.hotelProduct.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.hotelProduct.totalBooking }}</span>
                          <span v-if="dataRegion.hotelProduct.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.hotelProduct.totalBooking }}</span>
                          <span v-if="dataRegion.hotelProduct.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.hotelProduct.totalBooking }}</span>
                          <span v-if="dataRegion.hotelProduct.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.hotelProduct.totalBooking }}</span>
                        </td>
                        <td style="width: 200px" colspan="2">
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.bookingsNotDiscount.totalCheckin }}</span>
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.bookingsNotDiscount.totalCheckin }}</span>
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.bookingsNotDiscount.totalCheckin }}</span>
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.bookingsNotDiscount.totalCheckin }}</span>
                          ⁄
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.bookingsNotDiscount.totalBooking }}</span>
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.bookingsNotDiscount.totalBooking }}</span>
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.bookingsNotDiscount.totalBooking }}</span>
                          <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.bookingsNotDiscount.totalBooking }}</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="collapsible"  :class="`dataRegion${index}`">
                  <div class="pos_abs tracking">
                    <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper " >{{$t('page.bookingTracking.daily_average')}}</button>
                  </div>
                  <div class="pd-width" >
                    <div class="style-table-tracking scroll-table">
                      <table class="avoid-clicks none-border back-table">
                        <tbody>
                        <tr>
                          <td style="width: 100px">
                            <span>{{ dataRegion.totalFinalBookings.totalCheckin }} / {{ dataRegion.totalFinalBookings.totalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ dataRegion.totalFinalBookings.totalCheckinPerDays }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ dataRegion.totalFinalBookings.totalCheckinPerDays }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ dataRegion.totalFinalBookings.totalCheckinPerDays }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ dataRegion.totalFinalBookings.totalCheckinPerDays }}</span>
                            ⁄
                            <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ dataRegion.totalFinalBookings.totalBookingPerDays }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ dataRegion.totalFinalBookings.totalBookingPerDays }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ dataRegion.totalFinalBookings.totalBookingPerDays }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ dataRegion.totalFinalBookings.totalBookingPerDays }}</span>
                          </td>

                          <td style="width: 100px">
                            <span>{{ dataRegion.totalPromotionIssueCoupon.totalCheckin }}</span>/ <span>{{ dataRegion.totalPromotionIssueCoupon.totalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            <span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>/ <span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionG2J100.totalCheckin }} / {{ dataRegion.promotionG2J100.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            <span>{{ dataRegion.promotionG2J100.distinctTotalCheckin }}</span>/ <span>{{ dataRegion.promotionG2J100.distinctTotalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionG2JHotel.totalCheckin }} / {{ dataRegion.promotionG2JHotel.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            <span>{{ dataRegion.promotionG2JHotel.distinctTotalCheckin }}</span>/ <span>{{ dataRegion.promotionG2JHotel.distinctTotalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionHotel100.totalCheckin }} / {{ dataRegion.promotionHotel100.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            <span>{{ dataRegion.promotionHotel100.distinctTotalCheckin }}</span>/ <span>{{ dataRegion.promotionHotel100.distinctTotalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckin }} / {{ dataRegion.totalPromotionNoIssueCoupon.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionHotel100.totalCheckin }} / {{ dataRegion.promotionHotel100.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            <span>{{ dataRegion.directDiscount.distinctTotalCheckin }}</span>/ <span>{{ dataRegion.directDiscount.distinctTotalBooking }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.directDiscount.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.directDiscount.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.directDiscount.distinctTotalCheckinPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.distinctTotalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.directDiscount.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.directDiscount.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.directDiscount.distinctTotalBookingPerDays }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.distinctTotalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.specialOffer.totalCheckin }} / {{ dataRegion.specialOffer.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.specialOffer.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.specialOffer.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.specialOffer.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.specialOffer.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.specialOffer.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.specialOffer.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.specialOffer.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.specialOffer.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.specialOffer.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.specialOffer.totalBookingPerDays }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.flashSale.totalCheckin }} / {{ dataRegion.flashSale.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.flashSale.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.flashSale.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.flashSale.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.flashSale.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.flashSale.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.flashSale.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.flashSale.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.flashSale.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.flashSale.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.flashSale.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.flashSale.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.flashSale.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.flashSale.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.flashSale.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.flashSale.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.flashSale.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.stamp.totalCheckin }} / {{ dataRegion.stamp.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.stamp.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.stamp.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.stamp.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.stamp.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.stamp.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.stamp.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.stamp.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.stamp.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.stamp.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.stamp.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.stamp.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.stamp.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.stamp.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.stamp.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.stamp.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.stamp.totalBookingPerDays }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.mileagePoint.totalCheckin }} / {{ dataRegion.mileagePoint.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.mileagePoint.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.mileagePoint.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.mileagePoint.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.mileagePoint.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.mileagePoint.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.mileagePoint.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.mileagePoint.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.mileagePoint.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.mileagePoint.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.paymentPromotion.totalCheckin }} / {{ dataRegion.paymentPromotion.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.paymentPromotion.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.paymentPromotion.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.paymentPromotion.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.paymentPromotion.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.paymentPromotion.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.paymentPromotion.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.paymentPromotion.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.paymentPromotion.totalBookingPerDays }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.extraFee.totalCheckin }} / {{ dataRegion.extraFee.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.extraFee.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.extraFee.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.extraFee.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.extraFee.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.extraFee.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.extraFee.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.extraFee.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.extraFee.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.extraFee.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.extraFee.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.extraFee.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.extraFee.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.extraFee.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.extraFee.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.extraFee.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.extraFee.totalBookingPerDays }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.hotelProduct.totalCheckin }} / {{ dataRegion.hotelProduct.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.hotelProduct.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.hotelProduct.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.hotelProduct.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.hotelProduct.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.hotelProduct.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.hotelProduct.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.hotelProduct.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.hotelProduct.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.hotelProduct.totalBookingPerDays }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.bookingsNotDiscount.totalCheckin }} / {{ dataRegion.bookingsNotDiscount.totalBooking }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerDays }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerDays }} </span>
                            ⁄
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC"> {{ dataRegion.bookingsNotDiscount.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850"> {{ dataRegion.bookingsNotDiscount.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642"> {{ dataRegion.bookingsNotDiscount.totalBookingPerDays }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ dataRegion.bookingsNotDiscount.totalBookingPerDays }} </span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="pos_abs tracking">
                    <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.previous_month_average')}}</button>
                  </div>
                  <div class="pd-width" >
                    <div class="style-table-tracking scroll-table">
                      <table class="avoid-clicks none-border back-table">
                        <tbody>
                        <tr>
                          <td style="width: 100px">
                            <span>{{ dataRegion.totalFinalBookings.totalCheckinMonth }} / {{ dataRegion.totalFinalBookings.totalBookingMonth }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckinMonth == 0" style="color: #8A98AC">  {{ dataRegion.totalFinalBookings.totalCheckinPerMonth }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckinMonth == 1" style="color: #6AA850">  {{ dataRegion.totalFinalBookings.totalCheckinPerMonth }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckinMonth == 2" style="color: #F2C642">  {{ dataRegion.totalFinalBookings.totalCheckinPerMonth }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerCheckinMonth == 3" style="color: #FE0C05">  {{ dataRegion.totalFinalBookings.totalCheckinPerMonth }}</span>
                            ⁄
                            <span v-if="dataRegion.totalFinalBookings.colorPerBookingMonth == 0" style="color: #8A98AC">  {{ dataRegion.totalFinalBookings.totalBookingPerMonth }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerBookingMonth == 1" style="color: #6AA850">  {{ dataRegion.totalFinalBookings.totalBookingPerMonth }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerBookingMonth == 2" style="color: #F2C642">  {{ dataRegion.totalFinalBookings.totalBookingPerMonth }}</span>
                            <span v-if="dataRegion.totalFinalBookings.colorPerBookingMonth == 3" style="color: #FE0C05">  {{ dataRegion.totalFinalBookings.totalBookingPerMonth }}</span>
                          </td>

                          <td style="width: 100px">
                            <span>{{ dataRegion.totalPromotionIssueCoupon.totalCheckinMonth }}</span>/ <span>{{ dataRegion.totalPromotionIssueCoupon.totalBookingMonth }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            <span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinMonth }}</span>/ <span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingMonth }}</span>
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionG2J100.totalCheckinMonth }} / {{ dataRegion.promotionG2J100.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2J100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionG2J100.distinctTotalCheckinMonth }} / {{ dataRegion.promotionG2J100.distinctTotalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2J100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionG2JHotel.totalCheckinMonth }} / {{ dataRegion.promotionG2JHotel.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionG2JHotel.distinctTotalCheckinMonth }} / {{ dataRegion.promotionG2JHotel.distinctTotalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionG2JHotel.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionHotel100.totalCheckinMonth }} / {{ dataRegion.promotionHotel100.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionHotel100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.promotionHotel100.distinctTotalCheckinMonth }} / {{ dataRegion.promotionHotel100.distinctTotalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.promotionHotel100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinMonth }} / {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.totalPromotionNoIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.directDiscount.totalCheckinMonth }} / {{ dataRegion.directDiscount.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.directDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.directDiscount.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.directDiscount.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.directDiscount.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.directDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.directDiscount.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.directDiscount.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.directDiscount.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.directDiscount.distinctTotalCheckinMonth }} / {{ dataRegion.directDiscount.distinctTotalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.directDiscount.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.directDiscount.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.directDiscount.distinctTotalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.distinctTotalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.directDiscount.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.directDiscount.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.directDiscount.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.directDiscount.distinctTotalBookingPerMonth }} </span>
                            <span v-if="dataRegion.directDiscount.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.directDiscount.distinctTotalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.specialOffer.totalCheckinMonth }} / {{ dataRegion.specialOffer.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.specialOffer.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.specialOffer.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.specialOffer.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.specialOffer.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.specialOffer.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.specialOffer.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.specialOffer.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.specialOffer.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.specialOffer.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.specialOffer.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.specialOffer.totalBookingPerMonth }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.flashSale.totalCheckinMonth }} / {{ dataRegion.flashSale.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.flashSale.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.flashSale.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.flashSale.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.flashSale.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.flashSale.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.flashSale.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.flashSale.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.flashSale.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.flashSale.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.flashSale.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.flashSale.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.flashSale.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.flashSale.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.flashSale.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.flashSale.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.flashSale.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.stamp.totalCheckinMonth }} / {{ dataRegion.stamp.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.stamp.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.stamp.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.stamp.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.stamp.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.stamp.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.stamp.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.stamp.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.stamp.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.stamp.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.stamp.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.stamp.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.stamp.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.stamp.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.stamp.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.stamp.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.stamp.totalBookingPerMonth }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.mileagePoint.totalCheckinMonth }} / {{ dataRegion.mileagePoint.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.mileagePoint.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.mileagePoint.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.mileagePoint.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.mileagePoint.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.mileagePoint.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.mileagePoint.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.mileagePoint.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.mileagePoint.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.mileagePoint.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.mileagePoint.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.mileagePoint.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.paymentPromotion.totalCheckinMonth }} / {{ dataRegion.paymentPromotion.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.paymentPromotion.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.paymentPromotion.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.paymentPromotion.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.paymentPromotion.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.paymentPromotion.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.paymentPromotion.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.paymentPromotion.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.paymentPromotion.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.paymentPromotion.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.paymentPromotion.totalBookingPerMonth }} </span>
                          </td>
                          <td style="width: 100px">
                            {{ dataRegion.extraFee.totalCheckinMonth }} / {{ dataRegion.extraFee.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.extraFee.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.extraFee.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.extraFee.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.extraFee.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.extraFee.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.extraFee.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.extraFee.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.extraFee.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.extraFee.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.extraFee.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.extraFee.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.extraFee.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.extraFee.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.extraFee.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.extraFee.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.extraFee.totalBookingPerMonth }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.hotelProduct.totalCheckinMonth }} / {{ dataRegion.hotelProduct.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.hotelProduct.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.hotelProduct.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.hotelProduct.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.hotelProduct.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.hotelProduct.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.hotelProduct.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.hotelProduct.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.hotelProduct.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.hotelProduct.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.hotelProduct.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.hotelProduct.totalBookingPerMonth }} </span>
                          </td>

                          <td style="width: 100px">
                            {{ dataRegion.bookingsNotDiscount.totalCheckinMonth }} / {{ dataRegion.bookingsNotDiscount.totalBookingMonth }}
                          </td>
                          <td style="width: 100px">
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ dataRegion.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                            ⁄
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ dataRegion.bookingsNotDiscount.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ dataRegion.bookingsNotDiscount.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ dataRegion.bookingsNotDiscount.totalBookingPerMonth }} </span>
                            <span v-if="dataRegion.bookingsNotDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ dataRegion.bookingsNotDiscount.totalBookingPerMonth }} </span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="pos_abs tracking">
                    <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.average')}}</button>
                  </div>
                  <div class="pd-width" >
                    <div class="style-table-tracking scroll-table">
                      <table class="avoid-clicks none-border back-table">
                        <tbody>
                        <tr >
                          <td style="width: 100px"><span>{{ dataRegion.totalFinalBookings.totalCheckinYear }}</span> / <span> {{ dataRegion.totalFinalBookings.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.totalFinalBookings.totalCheckinPerYear }}</span> / <span> {{ dataRegion.totalFinalBookings.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.totalPromotionIssueCoupon.totalCheckinYear }}</span> / <span> {{ dataRegion.totalPromotionIssueCoupon.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.totalPromotionIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ dataRegion.totalPromotionIssueCoupon.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinYear }}</span> / <span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingYear}}</span> </td>
                          <td style="width: 100px"><span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalCheckinPerYear }}</span> / <span>{{ dataRegion.totalPromotionIssueCoupon.distinctTotalBookingPerYear}}</span> </td>

                          <td style="width: 100px"><span>{{ dataRegion.promotionG2J100.totalCheckinYear }}</span> / <span> {{ dataRegion.promotionG2J100.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.promotionG2J100.totalCheckinPerYear }}</span> / <span> {{ dataRegion.promotionG2J100.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.promotionG2J100.distinctTotalCheckinYear }}</span> / <span>{{ dataRegion.promotionG2J100.distinctTotalBookingYear}}</span> </td>
                          <td style="width: 100px"><span>{{ dataRegion.promotionG2J100.distinctTotalCheckinPerYear }}</span> / <span>{{ dataRegion.promotionG2J100.distinctTotalBookingPerYear}}</span> </td>

                          <td style="width: 100px"><span>{{ dataRegion.promotionG2JHotel.totalCheckinYear }}</span> / <span> {{ dataRegion.promotionG2JHotel.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.promotionG2JHotel.totalCheckinPerYear }}</span> / <span> {{ dataRegion.promotionG2JHotel.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.promotionG2JHotel.distinctTotalCheckinYear }}</span> / <span>{{ dataRegion.promotionG2JHotel.distinctTotalBookingYear}}</span> </td>
                          <td style="width: 100px"><span>{{ dataRegion.promotionG2JHotel.distinctTotalCheckinPerYear }}</span> / <span>{{ dataRegion.promotionG2JHotel.distinctTotalBookingPerYear}}</span> </td>

                          <td style="width: 100px"><span>{{ dataRegion.promotionHotel100.totalCheckinYear }}</span> / <span> {{ dataRegion.promotionHotel100.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.promotionHotel100.totalCheckinPerYear }}</span> / <span> {{ dataRegion.promotionHotel100.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.promotionHotel100.distinctTotalCheckinYear }}</span> / <span>{{ dataRegion.promotionHotel100.distinctTotalBookingYear}}</span> </td>
                          <td style="width: 100px"><span>{{ dataRegion.promotionHotel100.distinctTotalCheckinPerYear }}</span> / <span>{{ dataRegion.promotionHotel100.distinctTotalBookingPerYear}}</span> </td>

                          <td style="width: 100px"><span>{{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinYear }}</span> / <span> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.totalPromotionNoIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ dataRegion.totalPromotionNoIssueCoupon.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.directDiscount.distinctTotalCheckinYear }}</span> / <span>{{ dataRegion.directDiscount.distinctTotalBookingYear}}</span> </td>
                          <td style="width: 100px"><span>{{ dataRegion.directDiscount.distinctTotalCheckinPerYear }}</span> / <span>{{ dataRegion.directDiscount.distinctTotalBookingPerYear}}</span> </td>

                          <td style="width: 100px"><span>{{ dataRegion.directDiscount.totalCheckinYear }}</span> / <span> {{ dataRegion.directDiscount.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.directDiscount.totalCheckinPerYear }}</span> / <span> {{ dataRegion.directDiscount.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.specialOffer.totalCheckinYear }}</span> / <span> {{ dataRegion.specialOffer.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.specialOffer.totalCheckinPerYear }}</span> / <span> {{ dataRegion.specialOffer.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.flashSale.totalCheckinYear }}</span> / <span> {{ dataRegion.flashSale.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.flashSale.totalCheckinPerYear }}</span> / <span> {{ dataRegion.flashSale.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.stamp.totalCheckinYear }}</span> / <span> {{ dataRegion.stamp.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.stamp.totalCheckinPerYear }}   </span> / <span> {{ dataRegion.stamp.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.mileagePoint.totalCheckinYear }}</span> / <span> {{ dataRegion.mileagePoint.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.mileagePoint.totalCheckinPerYear }}</span> / <span> {{ dataRegion.mileagePoint.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.paymentPromotion.totalCheckinYear }}</span> / <span> {{ dataRegion.paymentPromotion.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.paymentPromotion.totalCheckinPerYear }}</span> / <span> {{ dataRegion.paymentPromotion.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.extraFee.totalCheckinYear }}</span> / <span> {{ dataRegion.extraFee.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.extraFee.totalCheckinPerYear }}</span> / <span> {{ dataRegion.extraFee.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.hotelProduct.totalCheckinYear }}</span> / <span> {{ dataRegion.hotelProduct.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.hotelProduct.totalCheckinPerYear }}</span> / <span> {{ dataRegion.hotelProduct.totalBookingPerYear }}</span></td>

                          <td style="width: 100px"><span>{{ dataRegion.bookingsNotDiscount.totalCheckinYear }}</span> / <span> {{ dataRegion.bookingsNotDiscount.totalBookingYear }}</span></td>
                          <td style="width: 100px"><span>{{ dataRegion.bookingsNotDiscount.totalCheckinPerYear }}</span> / <span> {{ dataRegion.bookingsNotDiscount.totalBookingPerYear }}</span></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <template v-if="(dataRegion && dataRegion.provinces ) || loading == false">
                    <div style="width: 100%;" v-for="(province,i) in dataRegion.provinces" :key="i">
                      <section>
                        <div class="pos_abs tracking"  >
                          <button @click="activeCollapse(`dataProvide11${index}${province.trackingSn}`,province,1)" type="button" style="font-size: 18px; " class="btn_action tbn-child btn btn-info collapsed" >
                            <span>{{ province.name }}</span>
                          </button>
                        </div>
                        <div class="pd-width">
                          <div class="style-table-tracking scroll-table">
                            <table class="avoid-clicks">
                              <tbody>
                              <tr>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.totalFinalBookings.totalCheckin }}</span>
                                  <span v-if="province.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ province.totalFinalBookings.totalCheckin }}</span>
                                  <span v-if="province.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ province.totalFinalBookings.totalCheckin }}</span>
                                  <span v-if="province.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.totalFinalBookings.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ province.totalFinalBookings.totalBooking }}</span>
                                  <span v-if="province.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ province.totalFinalBookings.totalBooking }}</span>
                                  <span v-if="province.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ province.totalFinalBookings.totalBooking }}</span>
                                  <span v-if="province.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ province.totalFinalBookings.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ province.totalPromotionIssueCoupon.totalCheckin }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ province.totalPromotionIssueCoupon.totalCheckin }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ province.totalPromotionIssueCoupon.totalCheckin }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ province.totalPromotionIssueCoupon.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ province.totalPromotionIssueCoupon.totalBooking }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ province.totalPromotionIssueCoupon.totalBooking }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ province.totalPromotionIssueCoupon.totalBooking }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ province.totalPromotionIssueCoupon.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                  <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.promotionG2J100.totalCheckin }}</span>
                                  <span v-if="province.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850">  {{ province.promotionG2J100.totalCheckin }}</span>
                                  <span v-if="province.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642">  {{ province.promotionG2J100.totalCheckin }}</span>
                                  <span v-if="province.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.promotionG2J100.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionG2J100.totalBooking }}</span>
                                  <span v-if="province.promotionG2J100.colorPerBooking == 1" style="color: #6AA850">  {{ province.promotionG2J100.totalBooking }}</span>
                                  <span v-if="province.promotionG2J100.colorPerBooking == 2" style="color: #F2C642">  {{ province.promotionG2J100.totalBooking }}</span>
                                  <span v-if="province.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionG2J100.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionG2J100.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.promotionG2J100.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.promotionG2J100.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionG2J100.distinctTotalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionG2J100.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.promotionG2J100.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.promotionG2J100.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionG2J100.distinctTotalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.promotionG2JHotel.totalCheckin }}</span>
                                  <span v-if="province.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850">  {{ province.promotionG2JHotel.totalCheckin }}</span>
                                  <span v-if="province.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642">  {{ province.promotionG2JHotel.totalCheckin }}</span>
                                  <span v-if="province.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.promotionG2JHotel.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionG2JHotel.totalBooking }}</span>
                                  <span v-if="province.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850">  {{ province.promotionG2JHotel.totalBooking }}</span>
                                  <span v-if="province.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642">  {{ province.promotionG2JHotel.totalBooking }}</span>
                                  <span v-if="province.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionG2JHotel.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionG2JHotel.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.promotionG2JHotel.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.promotionG2JHotel.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionG2JHotel.distinctTotalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionG2JHotel.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.promotionG2JHotel.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.promotionG2JHotel.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionG2JHotel.distinctTotalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.promotionHotel100.totalCheckin }}</span>
                                  <span v-if="province.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850">  {{ province.promotionHotel100.totalCheckin }}</span>
                                  <span v-if="province.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642">  {{ province.promotionHotel100.totalCheckin }}</span>
                                  <span v-if="province.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.promotionHotel100.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionHotel100.totalBooking }}</span>
                                  <span v-if="province.promotionHotel100.colorPerBooking == 1" style="color: #6AA850">  {{ province.promotionHotel100.totalBooking }}</span>
                                  <span v-if="province.promotionHotel100.colorPerBooking == 2" style="color: #F2C642">  {{ province.promotionHotel100.totalBooking }}</span>
                                  <span v-if="province.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionHotel100.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionHotel100.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.promotionHotel100.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.promotionHotel100.distinctTotalCheckin }}</span>
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionHotel100.distinctTotalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.promotionHotel100.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.promotionHotel100.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.promotionHotel100.distinctTotalBooking }}</span>
                                  <span v-if="province.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.promotionHotel100.distinctTotalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850">  {{ province.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642">  {{ province.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ province.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ province.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ province.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                  <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ province.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.directDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.directDiscount.totalCheckin }}</span>
                                  <span v-if="province.directDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ province.directDiscount.totalCheckin }}</span>
                                  <span v-if="province.directDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ province.directDiscount.totalCheckin }}</span>
                                  <span v-if="province.directDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.directDiscount.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.directDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ province.directDiscount.totalBooking }}</span>
                                  <span v-if="province.directDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ province.directDiscount.totalBooking }}</span>
                                  <span v-if="province.directDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ province.directDiscount.totalBooking }}</span>
                                  <span v-if="province.directDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ province.directDiscount.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.directDiscount.distinctTotalCheckin }}</span>
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.directDiscount.distinctTotalCheckin }}</span>
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.directDiscount.distinctTotalCheckin }}</span>
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.directDiscount.distinctTotalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ province.directDiscount.distinctTotalBooking }}</span>
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ province.directDiscount.distinctTotalBooking }}</span>
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ province.directDiscount.distinctTotalBooking }}</span>
                                  <span v-if="province.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ province.directDiscount.distinctTotalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.specialOffer.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.specialOffer.totalCheckin }}</span>
                                  <span v-if="province.specialOffer.colorPerCheckin == 1" style="color: #6AA850">  {{ province.specialOffer.totalCheckin }}</span>
                                  <span v-if="province.specialOffer.colorPerCheckin == 2" style="color: #F2C642">  {{ province.specialOffer.totalCheckin }}</span>
                                  <span v-if="province.specialOffer.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.specialOffer.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.specialOffer.colorPerBooking == 0" style="color: #8A98AC">  {{ province.specialOffer.totalBooking }}</span>
                                  <span v-if="province.specialOffer.colorPerBooking == 1" style="color: #6AA850">  {{ province.specialOffer.totalBooking }}</span>
                                  <span v-if="province.specialOffer.colorPerBooking == 2" style="color: #F2C642">  {{ province.specialOffer.totalBooking }}</span>
                                  <span v-if="province.specialOffer.colorPerBooking == 3" style="color: #FE0C05">  {{ province.specialOffer.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.flashSale.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.flashSale.totalCheckin }}</span>
                                  <span v-if="province.flashSale.colorPerCheckin == 1" style="color: #6AA850">  {{ province.flashSale.totalCheckin }}</span>
                                  <span v-if="province.flashSale.colorPerCheckin == 2" style="color: #F2C642">  {{ province.flashSale.totalCheckin }}</span>
                                  <span v-if="province.flashSale.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.flashSale.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.flashSale.colorPerBooking == 0" style="color: #8A98AC">  {{ province.flashSale.totalBooking }}</span>
                                  <span v-if="province.flashSale.colorPerBooking == 1" style="color: #6AA850">  {{ province.flashSale.totalBooking }}</span>
                                  <span v-if="province.flashSale.colorPerBooking == 2" style="color: #F2C642">  {{ province.flashSale.totalBooking }}</span>
                                  <span v-if="province.flashSale.colorPerBooking == 3" style="color: #FE0C05">  {{ province.flashSale.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.stamp.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.stamp.totalCheckin }}</span>
                                  <span v-if="province.stamp.colorPerCheckin == 1" style="color: #6AA850">  {{ province.stamp.totalCheckin }}</span>
                                  <span v-if="province.stamp.colorPerCheckin == 2" style="color: #F2C642">  {{ province.stamp.totalCheckin }}</span>
                                  <span v-if="province.stamp.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.stamp.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.stamp.colorPerBooking == 0" style="color: #8A98AC">  {{ province.stamp.totalBooking }}</span>
                                  <span v-if="province.stamp.colorPerBooking == 1" style="color: #6AA850">  {{ province.stamp.totalBooking }}</span>
                                  <span v-if="province.stamp.colorPerBooking == 2" style="color: #F2C642">  {{ province.stamp.totalBooking }}</span>
                                  <span v-if="province.stamp.colorPerBooking == 3" style="color: #FE0C05">  {{ province.stamp.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.mileagePoint.totalCheckin }}</span>
                                  <span v-if="province.mileagePoint.colorPerCheckin == 1" style="color: #6AA850">  {{ province.mileagePoint.totalCheckin }}</span>
                                  <span v-if="province.mileagePoint.colorPerCheckin == 2" style="color: #F2C642">  {{ province.mileagePoint.totalCheckin }}</span>
                                  <span v-if="province.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.mileagePoint.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.mileagePoint.colorPerBooking == 0" style="color: #8A98AC">  {{ province.mileagePoint.totalBooking }}</span>
                                  <span v-if="province.mileagePoint.colorPerBooking == 1" style="color: #6AA850">  {{ province.mileagePoint.totalBooking }}</span>
                                  <span v-if="province.mileagePoint.colorPerBooking == 2" style="color: #F2C642">  {{ province.mileagePoint.totalBooking }}</span>
                                  <span v-if="province.mileagePoint.colorPerBooking == 3" style="color: #FE0C05">  {{ province.mileagePoint.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.paymentPromotion.totalCheckin }}</span>
                                  <span v-if="province.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850">  {{ province.paymentPromotion.totalCheckin }}</span>
                                  <span v-if="province.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642">  {{ province.paymentPromotion.totalCheckin }}</span>
                                  <span v-if="province.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.paymentPromotion.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC">  {{ province.paymentPromotion.totalBooking }}</span>
                                  <span v-if="province.paymentPromotion.colorPerBooking == 1" style="color: #6AA850">  {{ province.paymentPromotion.totalBooking }}</span>
                                  <span v-if="province.paymentPromotion.colorPerBooking == 2" style="color: #F2C642">  {{ province.paymentPromotion.totalBooking }}</span>
                                  <span v-if="province.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05">  {{ province.paymentPromotion.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.extraFee.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.extraFee.totalCheckin }}</span>
                                  <span v-if="province.extraFee.colorPerCheckin == 1" style="color: #6AA850">  {{ province.extraFee.totalCheckin }}</span>
                                  <span v-if="province.extraFee.colorPerCheckin == 2" style="color: #F2C642">  {{ province.extraFee.totalCheckin }}</span>
                                  <span v-if="province.extraFee.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.extraFee.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.extraFee.colorPerBooking == 0" style="color: #8A98AC">  {{ province.extraFee.totalBooking }}</span>
                                  <span v-if="province.extraFee.colorPerBooking == 1" style="color: #6AA850">  {{ province.extraFee.totalBooking }}</span>
                                  <span v-if="province.extraFee.colorPerBooking == 2" style="color: #F2C642">  {{ province.extraFee.totalBooking }}</span>
                                  <span v-if="province.extraFee.colorPerBooking == 3" style="color: #FE0C05">  {{ province.extraFee.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.hotelProduct.totalCheckin }}</span>
                                  <span v-if="province.hotelProduct.colorPerCheckin == 1" style="color: #6AA850">  {{ province.hotelProduct.totalCheckin }}</span>
                                  <span v-if="province.hotelProduct.colorPerCheckin == 2" style="color: #F2C642">  {{ province.hotelProduct.totalCheckin }}</span>
                                  <span v-if="province.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.hotelProduct.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.hotelProduct.colorPerBooking == 0" style="color: #8A98AC">  {{ province.hotelProduct.totalBooking }}</span>
                                  <span v-if="province.hotelProduct.colorPerBooking == 1" style="color: #6AA850">  {{ province.hotelProduct.totalBooking }}</span>
                                  <span v-if="province.hotelProduct.colorPerBooking == 2" style="color: #F2C642">  {{ province.hotelProduct.totalBooking }}</span>
                                  <span v-if="province.hotelProduct.colorPerBooking == 3" style="color: #FE0C05">  {{ province.hotelProduct.totalBooking }}</span>
                                </td>
                                <td style="width: 200px" colspan="2">
                                  <span v-if="province.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.bookingsNotDiscount.totalCheckin }}</span>
                                  <span v-if="province.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ province.bookingsNotDiscount.totalCheckin }}</span>
                                  <span v-if="province.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ province.bookingsNotDiscount.totalCheckin }}</span>
                                  <span v-if="province.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.bookingsNotDiscount.totalCheckin }}</span>
                                  ⁄
                                  <span v-if="province.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ province.bookingsNotDiscount.totalBooking }}</span>
                                  <span v-if="province.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ province.bookingsNotDiscount.totalBooking }}</span>
                                  <span v-if="province.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ province.bookingsNotDiscount.totalBooking }}</span>
                                  <span v-if="province.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ province.bookingsNotDiscount.totalBooking }}</span>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div  class="collapsible" :class="`dataProvide11${index}${province.trackingSn}`">
                          <div class="pos_abs tracking">
                            <button type="button" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.daily_average')}} </button>
                          </div>
                          <div class="pd-width">
                            <div class="style-table-tracking scroll-table">
                              <table class="avoid-clicks none-border back-table">
                                <tbody>
                                <tr>
                                  <td style="width: 100px">
                                    <span>{{ province.totalFinalBookings.totalCheckin }} / {{ province.totalFinalBookings.totalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ province.totalFinalBookings.totalCheckinPerDays }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ province.totalFinalBookings.totalCheckinPerDays }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ province.totalFinalBookings.totalCheckinPerDays }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ province.totalFinalBookings.totalCheckinPerDays }}</span>
                                    ⁄
                                    <span v-if="province.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ province.totalFinalBookings.totalBookingPerDays }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ province.totalFinalBookings.totalBookingPerDays }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ province.totalFinalBookings.totalBookingPerDays }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ province.totalFinalBookings.totalBookingPerDays }}</span>
                                  </td>

                                  <td style="width: 100px">
                                    <span>{{ province.totalPromotionIssueCoupon.totalCheckin }}</span>/ <span>{{ province.totalPromotionIssueCoupon.totalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    <span>{{ province.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>/ <span>{{ province.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionG2J100.totalCheckin }} / {{ province.promotionG2J100.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionG2J100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionG2J100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionG2J100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionG2J100.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionG2J100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2J100.colorPerBooking == 1" style="color: #6AA850"> {{ province.promotionG2J100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2J100.colorPerBooking == 2" style="color: #F2C642"> {{ province.promotionG2J100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05"> {{ province.promotionG2J100.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    <span>{{ province.promotionG2J100.distinctTotalCheckin }}</span>/ <span>{{ province.promotionG2J100.distinctTotalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ province.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ province.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ province.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionG2JHotel.totalCheckin }} / {{ province.promotionG2JHotel.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    <span>{{ province.promotionG2JHotel.distinctTotalCheckin }}</span>/ <span>{{ province.promotionG2JHotel.distinctTotalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionHotel100.totalCheckin }} / {{ province.promotionHotel100.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    <span>{{ province.promotionHotel100.distinctTotalCheckin }}</span>/ <span>{{ province.promotionHotel100.distinctTotalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ province.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ province.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ province.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.totalPromotionNoIssueCoupon.totalCheckin }} / {{ province.totalPromotionNoIssueCoupon.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionHotel100.totalCheckin }} / {{ province.promotionHotel100.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.promotionHotel100.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ province.promotionHotel100.totalBookingPerDays }} </span>
                                    <span v-if="province.directDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ province.directDiscount.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    <span>{{ province.directDiscount.distinctTotalCheckin }}</span>/ <span>{{ province.directDiscount.distinctTotalBooking }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.directDiscount.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ province.directDiscount.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ province.directDiscount.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ province.directDiscount.distinctTotalCheckinPerDays }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ province.directDiscount.distinctTotalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ province.directDiscount.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850"> {{ province.directDiscount.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642"> {{ province.directDiscount.distinctTotalBookingPerDays }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ province.directDiscount.distinctTotalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.specialOffer.totalCheckin }} / {{ province.specialOffer.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.specialOffer.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.specialOffer.totalCheckinPerDays }} </span>
                                    <span v-if="province.specialOffer.colorPerCheckin == 1" style="color: #6AA850"> {{ province.specialOffer.totalCheckinPerDays }} </span>
                                    <span v-if="province.specialOffer.colorPerCheckin == 2" style="color: #F2C642"> {{ province.specialOffer.totalCheckinPerDays }} </span>
                                    <span v-if="province.specialOffer.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.specialOffer.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.specialOffer.colorPerBooking == 0" style="color: #8A98AC"> {{ province.specialOffer.totalBookingPerDays }} </span>
                                    <span v-if="province.specialOffer.colorPerBooking == 1" style="color: #6AA850"> {{ province.specialOffer.totalBookingPerDays }} </span>
                                    <span v-if="province.specialOffer.colorPerBooking == 2" style="color: #F2C642"> {{ province.specialOffer.totalBookingPerDays }} </span>
                                    <span v-if="province.specialOffer.colorPerBooking == 3" style="color: #FE0C05"> {{ province.specialOffer.totalBookingPerDays }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.flashSale.totalCheckin }} / {{ province.flashSale.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.flashSale.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.flashSale.totalCheckinPerDays }} </span>
                                    <span v-if="province.flashSale.colorPerCheckin == 1" style="color: #6AA850"> {{ province.flashSale.totalCheckinPerDays }} </span>
                                    <span v-if="province.flashSale.colorPerCheckin == 2" style="color: #F2C642"> {{ province.flashSale.totalCheckinPerDays }} </span>
                                    <span v-if="province.flashSale.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.flashSale.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.flashSale.colorPerBooking == 0" style="color: #8A98AC"> {{ province.flashSale.totalBookingPerDays }} </span>
                                    <span v-if="province.flashSale.colorPerBooking == 1" style="color: #6AA850"> {{ province.flashSale.totalBookingPerDays }} </span>
                                    <span v-if="province.flashSale.colorPerBooking == 2" style="color: #F2C642"> {{ province.flashSale.totalBookingPerDays }} </span>
                                    <span v-if="province.flashSale.colorPerBooking == 3" style="color: #FE0C05"> {{ province.flashSale.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.stamp.totalCheckin }} / {{ province.stamp.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.stamp.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.stamp.totalCheckinPerDays }} </span>
                                    <span v-if="province.stamp.colorPerCheckin == 1" style="color: #6AA850"> {{ province.stamp.totalCheckinPerDays }} </span>
                                    <span v-if="province.stamp.colorPerCheckin == 2" style="color: #F2C642"> {{ province.stamp.totalCheckinPerDays }} </span>
                                    <span v-if="province.stamp.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.stamp.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.stamp.colorPerBooking == 0" style="color: #8A98AC"> {{ province.stamp.totalBookingPerDays }} </span>
                                    <span v-if="province.stamp.colorPerBooking == 1" style="color: #6AA850"> {{ province.stamp.totalBookingPerDays }} </span>
                                    <span v-if="province.stamp.colorPerBooking == 2" style="color: #F2C642"> {{ province.stamp.totalBookingPerDays }} </span>
                                    <span v-if="province.stamp.colorPerBooking == 3" style="color: #FE0C05"> {{ province.stamp.totalBookingPerDays }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.mileagePoint.totalCheckin }} / {{ province.mileagePoint.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.mileagePoint.totalCheckinPerDays }} </span>
                                    <span v-if="province.mileagePoint.colorPerCheckin == 1" style="color: #6AA850"> {{ province.mileagePoint.totalCheckinPerDays }} </span>
                                    <span v-if="province.mileagePoint.colorPerCheckin == 2" style="color: #F2C642"> {{ province.mileagePoint.totalCheckinPerDays }} </span>
                                    <span v-if="province.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.mileagePoint.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.mileagePoint.colorPerBooking == 0" style="color: #8A98AC"> {{ province.mileagePoint.totalBookingPerDays }} </span>
                                    <span v-if="province.mileagePoint.colorPerBooking == 1" style="color: #6AA850"> {{ province.mileagePoint.totalBookingPerDays }} </span>
                                    <span v-if="province.mileagePoint.colorPerBooking == 2" style="color: #F2C642"> {{ province.mileagePoint.totalBookingPerDays }} </span>
                                    <span v-if="province.mileagePoint.colorPerBooking == 3" style="color: #FE0C05"> {{ province.mileagePoint.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.paymentPromotion.totalCheckin }} / {{ province.paymentPromotion.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.paymentPromotion.totalCheckinPerDays }} </span>
                                    <span v-if="province.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850"> {{ province.paymentPromotion.totalCheckinPerDays }} </span>
                                    <span v-if="province.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642"> {{ province.paymentPromotion.totalCheckinPerDays }} </span>
                                    <span v-if="province.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.paymentPromotion.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC"> {{ province.paymentPromotion.totalBookingPerDays }} </span>
                                    <span v-if="province.paymentPromotion.colorPerBooking == 1" style="color: #6AA850"> {{ province.paymentPromotion.totalBookingPerDays }} </span>
                                    <span v-if="province.paymentPromotion.colorPerBooking == 2" style="color: #F2C642"> {{ province.paymentPromotion.totalBookingPerDays }} </span>
                                    <span v-if="province.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05"> {{ province.paymentPromotion.totalBookingPerDays }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.extraFee.totalCheckin }} / {{ province.extraFee.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.extraFee.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.extraFee.totalCheckinPerDays }} </span>
                                    <span v-if="province.extraFee.colorPerCheckin == 1" style="color: #6AA850"> {{ province.extraFee.totalCheckinPerDays }} </span>
                                    <span v-if="province.extraFee.colorPerCheckin == 2" style="color: #F2C642"> {{ province.extraFee.totalCheckinPerDays }} </span>
                                    <span v-if="province.extraFee.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.extraFee.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.extraFee.colorPerBooking == 0" style="color: #8A98AC"> {{ province.extraFee.totalBookingPerDays }} </span>
                                    <span v-if="province.extraFee.colorPerBooking == 1" style="color: #6AA850"> {{ province.extraFee.totalBookingPerDays }} </span>
                                    <span v-if="province.extraFee.colorPerBooking == 2" style="color: #F2C642"> {{ province.extraFee.totalBookingPerDays }} </span>
                                    <span v-if="province.extraFee.colorPerBooking == 3" style="color: #FE0C05"> {{ province.extraFee.totalBookingPerDays }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.hotelProduct.totalCheckin }} / {{ province.hotelProduct.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.hotelProduct.totalCheckinPerDays }} </span>
                                    <span v-if="province.hotelProduct.colorPerCheckin == 1" style="color: #6AA850"> {{ province.hotelProduct.totalCheckinPerDays }} </span>
                                    <span v-if="province.hotelProduct.colorPerCheckin == 2" style="color: #F2C642"> {{ province.hotelProduct.totalCheckinPerDays }} </span>
                                    <span v-if="province.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.hotelProduct.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.hotelProduct.colorPerBooking == 0" style="color: #8A98AC"> {{ province.hotelProduct.totalBookingPerDays }} </span>
                                    <span v-if="province.hotelProduct.colorPerBooking == 1" style="color: #6AA850"> {{ province.hotelProduct.totalBookingPerDays }} </span>
                                    <span v-if="province.hotelProduct.colorPerBooking == 2" style="color: #F2C642"> {{ province.hotelProduct.totalBookingPerDays }} </span>
                                    <span v-if="province.hotelProduct.colorPerBooking == 3" style="color: #FE0C05"> {{ province.hotelProduct.totalBookingPerDays }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.bookingsNotDiscount.totalCheckin }} / {{ province.bookingsNotDiscount.totalBooking }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC"> {{ province.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850"> {{ province.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642"> {{ province.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05"> {{ province.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                    ⁄
                                    <span v-if="province.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC"> {{ province.bookingsNotDiscount.totalBookingPerDays }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850"> {{ province.bookingsNotDiscount.totalBookingPerDays }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642"> {{ province.bookingsNotDiscount.totalBookingPerDays }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ province.bookingsNotDiscount.totalBookingPerDays }} </span>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div class="pos_abs tracking">
                            <button type="button" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.previous_month_average')}}</button>
                          </div>
                          <div class="pd-width">
                            <div class="style-table-tracking scroll-table">
                              <table class="avoid-clicks none-border back-table">
                                <tbody>
                                <tr>
                                  <td style="width: 100px">
                                    <span>{{ province.totalFinalBookings.totalCheckinMonth }} / {{ province.totalFinalBookings.totalBookingMonth }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalFinalBookings.colorPerCheckinMonth == 0" style="color: #8A98AC">  {{ province.totalFinalBookings.totalCheckinPerMonth }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerCheckinMonth == 1" style="color: #6AA850">  {{ province.totalFinalBookings.totalCheckinPerMonth }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerCheckinMonth == 2" style="color: #F2C642">  {{ province.totalFinalBookings.totalCheckinPerMonth }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerCheckinMonth == 3" style="color: #FE0C05">  {{ province.totalFinalBookings.totalCheckinPerMonth }}</span>
                                    ⁄
                                    <span v-if="province.totalFinalBookings.colorPerBookingMonth == 0" style="color: #8A98AC">  {{ province.totalFinalBookings.totalBookingPerMonth }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerBookingMonth == 1" style="color: #6AA850">  {{ province.totalFinalBookings.totalBookingPerMonth }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerBookingMonth == 2" style="color: #F2C642">  {{ province.totalFinalBookings.totalBookingPerMonth }}</span>
                                    <span v-if="province.totalFinalBookings.colorPerBookingMonth == 3" style="color: #FE0C05">  {{ province.totalFinalBookings.totalBookingPerMonth }}</span>
                                  </td>

                                  <td style="width: 100px">
                                    <span>{{ province.totalPromotionIssueCoupon.totalCheckinMonth }}</span>/ <span>{{ province.totalPromotionIssueCoupon.totalBookingMonth }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    <span>{{ province.totalPromotionIssueCoupon.distinctTotalCheckinMonth }}</span>/ <span>{{ province.totalPromotionIssueCoupon.distinctTotalBookingMonth }}</span>
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionG2J100.totalCheckinMonth }} / {{ province.promotionG2J100.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2J100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.promotionG2J100.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.promotionG2J100.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.promotionG2J100.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.promotionG2J100.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2J100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.promotionG2J100.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.promotionG2J100.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.promotionG2J100.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.promotionG2J100.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionG2J100.distinctTotalCheckinMonth }} / {{ province.promotionG2J100.distinctTotalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2J100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ province.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ province.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2J100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionG2JHotel.totalCheckinMonth }} / {{ province.promotionG2JHotel.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2JHotel.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2JHotel.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionG2JHotel.distinctTotalCheckinMonth }} / {{ province.promotionG2JHotel.distinctTotalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ province.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ province.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionG2JHotel.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionHotel100.totalCheckinMonth }} / {{ province.promotionHotel100.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionHotel100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.promotionHotel100.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.promotionHotel100.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.promotionHotel100.totalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.promotionHotel100.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.promotionHotel100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.promotionHotel100.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.promotionHotel100.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.promotionHotel100.totalBookingPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.promotionHotel100.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.promotionHotel100.distinctTotalCheckinMonth }} / {{ province.promotionHotel100.distinctTotalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.promotionHotel100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ province.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ province.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.promotionHotel100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.totalPromotionNoIssueCoupon.totalCheckinMonth }} / {{ province.totalPromotionNoIssueCoupon.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                    <span v-if="province.totalPromotionNoIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.directDiscount.totalCheckinMonth }} / {{ province.directDiscount.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.directDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.directDiscount.totalCheckinPerMonth }} </span>
                                    <span v-if="province.directDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.directDiscount.totalCheckinPerMonth }} </span>
                                    <span v-if="province.directDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.directDiscount.totalCheckinPerMonth }} </span>
                                    <span v-if="province.directDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.directDiscount.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.directDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.directDiscount.totalBookingPerMonth }} </span>
                                    <span v-if="province.directDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.directDiscount.totalBookingPerMonth }} </span>
                                    <span v-if="province.directDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.directDiscount.totalBookingPerMonth }} </span>
                                    <span v-if="province.directDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.directDiscount.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.directDiscount.distinctTotalCheckinMonth }} / {{ province.directDiscount.distinctTotalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.directDiscount.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.directDiscount.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.directDiscount.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ province.directDiscount.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ province.directDiscount.distinctTotalBookingPerMonth }} </span>
                                    <span v-if="province.directDiscount.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.directDiscount.distinctTotalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.specialOffer.totalCheckinMonth }} / {{ province.specialOffer.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.specialOffer.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.specialOffer.totalCheckinPerMonth }} </span>
                                    <span v-if="province.specialOffer.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.specialOffer.totalCheckinPerMonth }} </span>
                                    <span v-if="province.specialOffer.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.specialOffer.totalCheckinPerMonth }} </span>
                                    <span v-if="province.specialOffer.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.specialOffer.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.specialOffer.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.specialOffer.totalBookingPerMonth }} </span>
                                    <span v-if="province.specialOffer.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.specialOffer.totalBookingPerMonth }} </span>
                                    <span v-if="province.specialOffer.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.specialOffer.totalBookingPerMonth }} </span>
                                    <span v-if="province.specialOffer.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.specialOffer.totalBookingPerMonth }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.flashSale.totalCheckinMonth }} / {{ province.flashSale.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.flashSale.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.flashSale.totalCheckinPerMonth }} </span>
                                    <span v-if="province.flashSale.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.flashSale.totalCheckinPerMonth }} </span>
                                    <span v-if="province.flashSale.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.flashSale.totalCheckinPerMonth }} </span>
                                    <span v-if="province.flashSale.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.flashSale.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.flashSale.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.flashSale.totalBookingPerMonth }} </span>
                                    <span v-if="province.flashSale.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.flashSale.totalBookingPerMonth }} </span>
                                    <span v-if="province.flashSale.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.flashSale.totalBookingPerMonth }} </span>
                                    <span v-if="province.flashSale.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.flashSale.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.stamp.totalCheckinMonth }} / {{ province.stamp.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.stamp.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.stamp.totalCheckinPerMonth }} </span>
                                    <span v-if="province.stamp.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.stamp.totalCheckinPerMonth }} </span>
                                    <span v-if="province.stamp.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.stamp.totalCheckinPerMonth }} </span>
                                    <span v-if="province.stamp.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.stamp.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.stamp.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.stamp.totalBookingPerMonth }} </span>
                                    <span v-if="province.stamp.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.stamp.totalBookingPerMonth }} </span>
                                    <span v-if="province.stamp.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.stamp.totalBookingPerMonth }} </span>
                                    <span v-if="province.stamp.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.stamp.totalBookingPerMonth }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.mileagePoint.totalCheckinMonth }} / {{ province.mileagePoint.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.mileagePoint.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.mileagePoint.totalCheckinPerMonth }} </span>
                                    <span v-if="province.mileagePoint.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.mileagePoint.totalCheckinPerMonth }} </span>
                                    <span v-if="province.mileagePoint.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.mileagePoint.totalCheckinPerMonth }} </span>
                                    <span v-if="province.mileagePoint.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.mileagePoint.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.mileagePoint.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.mileagePoint.totalBookingPerMonth }} </span>
                                    <span v-if="province.mileagePoint.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.mileagePoint.totalBookingPerMonth }} </span>
                                    <span v-if="province.mileagePoint.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.mileagePoint.totalBookingPerMonth }} </span>
                                    <span v-if="province.mileagePoint.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.mileagePoint.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.paymentPromotion.totalCheckinMonth }} / {{ province.paymentPromotion.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.paymentPromotion.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.paymentPromotion.totalCheckinPerMonth }} </span>
                                    <span v-if="province.paymentPromotion.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.paymentPromotion.totalCheckinPerMonth }} </span>
                                    <span v-if="province.paymentPromotion.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.paymentPromotion.totalCheckinPerMonth }} </span>
                                    <span v-if="province.paymentPromotion.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.paymentPromotion.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.paymentPromotion.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.paymentPromotion.totalBookingPerMonth }} </span>
                                    <span v-if="province.paymentPromotion.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.paymentPromotion.totalBookingPerMonth }} </span>
                                    <span v-if="province.paymentPromotion.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.paymentPromotion.totalBookingPerMonth }} </span>
                                    <span v-if="province.paymentPromotion.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.paymentPromotion.totalBookingPerMonth }} </span>
                                  </td>
                                  <td style="width: 100px">
                                    {{ province.extraFee.totalCheckinMonth }} / {{ province.extraFee.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.extraFee.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.extraFee.totalCheckinPerMonth }} </span>
                                    <span v-if="province.extraFee.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.extraFee.totalCheckinPerMonth }} </span>
                                    <span v-if="province.extraFee.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.extraFee.totalCheckinPerMonth }} </span>
                                    <span v-if="province.extraFee.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.extraFee.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.extraFee.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.extraFee.totalBookingPerMonth }} </span>
                                    <span v-if="province.extraFee.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.extraFee.totalBookingPerMonth }} </span>
                                    <span v-if="province.extraFee.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.extraFee.totalBookingPerMonth }} </span>
                                    <span v-if="province.extraFee.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.extraFee.totalBookingPerMonth }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.hotelProduct.totalCheckinMonth }} / {{ province.hotelProduct.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.hotelProduct.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.hotelProduct.totalCheckinPerMonth }} </span>
                                    <span v-if="province.hotelProduct.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.hotelProduct.totalCheckinPerMonth }} </span>
                                    <span v-if="province.hotelProduct.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.hotelProduct.totalCheckinPerMonth }} </span>
                                    <span v-if="province.hotelProduct.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.hotelProduct.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.hotelProduct.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.hotelProduct.totalBookingPerMonth }} </span>
                                    <span v-if="province.hotelProduct.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.hotelProduct.totalBookingPerMonth }} </span>
                                    <span v-if="province.hotelProduct.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.hotelProduct.totalBookingPerMonth }} </span>
                                    <span v-if="province.hotelProduct.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.hotelProduct.totalBookingPerMonth }} </span>
                                  </td>

                                  <td style="width: 100px">
                                    {{ province.bookingsNotDiscount.totalCheckinMonth }} / {{ province.bookingsNotDiscount.totalBookingMonth }}
                                  </td>
                                  <td style="width: 100px">
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ province.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ province.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ province.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ province.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                    ⁄
                                    <span v-if="province.bookingsNotDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ province.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ province.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ province.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                    <span v-if="province.bookingsNotDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ province.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div class="pos_abs tracking">
                            <button type="button" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.average')}}</button>
                          </div>
                          <div class="pd-width">
                            <div class="style-table-tracking scroll-table">
                              <table class="avoid-clicks none-border back-table">
                                <tbody>
                                <tr >
                                  <td style="width: 100px"><span>{{ province.totalFinalBookings.totalCheckinYear }}</span> / <span> {{ province.totalFinalBookings.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.totalFinalBookings.totalCheckinPerYear }}</span> / <span> {{ province.totalFinalBookings.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.totalPromotionIssueCoupon.totalCheckinYear }}</span> / <span> {{ province.totalPromotionIssueCoupon.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.totalPromotionIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ province.totalPromotionIssueCoupon.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.totalPromotionIssueCoupon.distinctTotalCheckinYear }}</span> / <span>{{ province.totalPromotionIssueCoupon.distinctTotalBookingYear}}</span> </td>
                                  <td style="width: 100px"><span>{{ province.totalPromotionIssueCoupon.distinctTotalCheckinPerYear }}</span> / <span>{{ province.totalPromotionIssueCoupon.distinctTotalBookingPerYear}}</span> </td>

                                  <td style="width: 100px"><span>{{ province.promotionG2J100.totalCheckinYear }}</span> / <span> {{ province.promotionG2J100.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.promotionG2J100.totalCheckinPerYear }}</span> / <span> {{ province.promotionG2J100.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.promotionG2J100.distinctTotalCheckinYear }}</span> / <span>{{ province.promotionG2J100.distinctTotalBookingYear}}</span> </td>
                                  <td style="width: 100px"><span>{{ province.promotionG2J100.distinctTotalCheckinPerYear }}</span> / <span>{{ province.promotionG2J100.distinctTotalBookingPerYear}}</span> </td>

                                  <td style="width: 100px"><span>{{ province.promotionG2JHotel.totalCheckinYear }}</span> / <span> {{ province.promotionG2JHotel.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.promotionG2JHotel.totalCheckinPerYear }}</span> / <span> {{ province.promotionG2JHotel.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.promotionG2JHotel.distinctTotalCheckinYear }}</span> / <span>{{ province.promotionG2JHotel.distinctTotalBookingYear}}</span> </td>
                                  <td style="width: 100px"><span>{{ province.promotionG2JHotel.distinctTotalCheckinPerYear }}</span> / <span>{{ province.promotionG2JHotel.distinctTotalBookingPerYear}}</span> </td>

                                  <td style="width: 100px"><span>{{ province.promotionHotel100.totalCheckinYear }}</span> / <span> {{ province.promotionHotel100.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.promotionHotel100.totalCheckinPerYear }}</span> / <span> {{ province.promotionHotel100.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.promotionHotel100.distinctTotalCheckinYear }}</span> / <span>{{ province.promotionHotel100.distinctTotalBookingYear}}</span> </td>
                                  <td style="width: 100px"><span>{{ province.promotionHotel100.distinctTotalCheckinPerYear }}</span> / <span>{{ province.promotionHotel100.distinctTotalBookingPerYear}}</span> </td>

                                  <td style="width: 100px"><span>{{ province.totalPromotionNoIssueCoupon.totalCheckinYear }}</span> / <span> {{ province.totalPromotionNoIssueCoupon.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.totalPromotionNoIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ province.totalPromotionNoIssueCoupon.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.directDiscount.distinctTotalCheckinYear }}</span> / <span>{{ province.directDiscount.distinctTotalBookingYear}}</span> </td>
                                  <td style="width: 100px"><span>{{ province.directDiscount.distinctTotalCheckinPerYear }}</span> / <span>{{ province.directDiscount.distinctTotalBookingPerYear}}</span> </td>

                                  <td style="width: 100px"><span>{{ province.directDiscount.totalCheckinYear }}</span> / <span> {{ province.directDiscount.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.directDiscount.totalCheckinPerYear }}</span> / <span> {{ province.directDiscount.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.specialOffer.totalCheckinYear }}</span> / <span> {{ province.specialOffer.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.specialOffer.totalCheckinPerYear }}</span> / <span> {{ province.specialOffer.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.flashSale.totalCheckinYear }}</span> / <span> {{ province.flashSale.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.flashSale.totalCheckinPerYear }}</span> / <span> {{ province.flashSale.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.stamp.totalCheckinYear }}</span> / <span> {{ province.stamp.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.stamp.totalCheckinPerYear }}   </span> / <span> {{ province.stamp.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.mileagePoint.totalCheckinYear }}</span> / <span> {{ province.mileagePoint.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.mileagePoint.totalCheckinPerYear }}</span> / <span> {{ province.mileagePoint.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.paymentPromotion.totalCheckinYear }}</span> / <span> {{ province.paymentPromotion.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.paymentPromotion.totalCheckinPerYear }}</span> / <span> {{ province.paymentPromotion.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.extraFee.totalCheckinYear }}</span> / <span> {{ province.extraFee.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.extraFee.totalCheckinPerYear }}</span> / <span> {{ province.extraFee.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.hotelProduct.totalCheckinYear }}</span> / <span> {{ province.hotelProduct.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.hotelProduct.totalCheckinPerYear }}</span> / <span> {{ province.hotelProduct.totalBookingPerYear }}</span></td>

                                  <td style="width: 100px"><span>{{ province.bookingsNotDiscount.totalCheckinYear }}</span> / <span> {{ province.bookingsNotDiscount.totalBookingYear }}</span></td>
                                  <td style="width: 100px"><span>{{ province.bookingsNotDiscount.totalCheckinPerYear }}</span> / <span> {{ province.bookingsNotDiscount.totalBookingPerYear }}</span></td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <template v-if="(province && province.districts ) || loading == false">

                            <div style="width: 100%;" v-for="(district,index) in province.districts" :key="index">
                              <section>
                                <div class="pos_abs tracking"  >
                                  <button
                                  @click="activeCollapse(`dataDistrict22${district.trackingSn}${index}`,district,2)" type="button" style="font-size: 18px; " class="btn_action tbn-child btn btn-warning collapsed">
                                    <span>{{ district.name }}</span>
                                  </button>
                                </div>
                                <div class="pd-width">
                                  <div class="style-table-tracking scroll-table">
                                    <table class="avoid-clicks">
                                      <tbody>
                                      <tr>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.totalFinalBookings.totalCheckin }}</span>
                                          <span v-if="district.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ district.totalFinalBookings.totalCheckin }}</span>
                                          <span v-if="district.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ district.totalFinalBookings.totalCheckin }}</span>
                                          <span v-if="district.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.totalFinalBookings.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ district.totalFinalBookings.totalBooking }}</span>
                                          <span v-if="district.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ district.totalFinalBookings.totalBooking }}</span>
                                          <span v-if="district.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ district.totalFinalBookings.totalBooking }}</span>
                                          <span v-if="district.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ district.totalFinalBookings.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ district.totalPromotionIssueCoupon.totalCheckin }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ district.totalPromotionIssueCoupon.totalCheckin }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ district.totalPromotionIssueCoupon.totalCheckin }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ district.totalPromotionIssueCoupon.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ district.totalPromotionIssueCoupon.totalBooking }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ district.totalPromotionIssueCoupon.totalBooking }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ district.totalPromotionIssueCoupon.totalBooking }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ district.totalPromotionIssueCoupon.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                          <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.promotionG2J100.totalCheckin }}</span>
                                          <span v-if="district.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850">  {{ district.promotionG2J100.totalCheckin }}</span>
                                          <span v-if="district.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642">  {{ district.promotionG2J100.totalCheckin }}</span>
                                          <span v-if="district.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.promotionG2J100.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionG2J100.totalBooking }}</span>
                                          <span v-if="district.promotionG2J100.colorPerBooking == 1" style="color: #6AA850">  {{ district.promotionG2J100.totalBooking }}</span>
                                          <span v-if="district.promotionG2J100.colorPerBooking == 2" style="color: #F2C642">  {{ district.promotionG2J100.totalBooking }}</span>
                                          <span v-if="district.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionG2J100.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionG2J100.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.promotionG2J100.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.promotionG2J100.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionG2J100.distinctTotalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionG2J100.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.promotionG2J100.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.promotionG2J100.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionG2J100.distinctTotalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.promotionG2JHotel.totalCheckin }}</span>
                                          <span v-if="district.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850">  {{ district.promotionG2JHotel.totalCheckin }}</span>
                                          <span v-if="district.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642">  {{ district.promotionG2JHotel.totalCheckin }}</span>
                                          <span v-if="district.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.promotionG2JHotel.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionG2JHotel.totalBooking }}</span>
                                          <span v-if="district.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850">  {{ district.promotionG2JHotel.totalBooking }}</span>
                                          <span v-if="district.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642">  {{ district.promotionG2JHotel.totalBooking }}</span>
                                          <span v-if="district.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionG2JHotel.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionG2JHotel.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.promotionG2JHotel.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.promotionG2JHotel.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionG2JHotel.distinctTotalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionG2JHotel.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.promotionG2JHotel.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.promotionG2JHotel.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionG2JHotel.distinctTotalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.promotionHotel100.totalCheckin }}</span>
                                          <span v-if="district.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850">  {{ district.promotionHotel100.totalCheckin }}</span>
                                          <span v-if="district.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642">  {{ district.promotionHotel100.totalCheckin }}</span>
                                          <span v-if="district.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.promotionHotel100.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionHotel100.totalBooking }}</span>
                                          <span v-if="district.promotionHotel100.colorPerBooking == 1" style="color: #6AA850">  {{ district.promotionHotel100.totalBooking }}</span>
                                          <span v-if="district.promotionHotel100.colorPerBooking == 2" style="color: #F2C642">  {{ district.promotionHotel100.totalBooking }}</span>
                                          <span v-if="district.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionHotel100.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionHotel100.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.promotionHotel100.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.promotionHotel100.distinctTotalCheckin }}</span>
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionHotel100.distinctTotalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.promotionHotel100.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.promotionHotel100.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.promotionHotel100.distinctTotalBooking }}</span>
                                          <span v-if="district.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.promotionHotel100.distinctTotalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850">  {{ district.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642">  {{ district.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ district.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ district.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ district.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                          <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ district.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.directDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.directDiscount.totalCheckin }}</span>
                                          <span v-if="district.directDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ district.directDiscount.totalCheckin }}</span>
                                          <span v-if="district.directDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ district.directDiscount.totalCheckin }}</span>
                                          <span v-if="district.directDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.directDiscount.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.directDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ district.directDiscount.totalBooking }}</span>
                                          <span v-if="district.directDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ district.directDiscount.totalBooking }}</span>
                                          <span v-if="district.directDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ district.directDiscount.totalBooking }}</span>
                                          <span v-if="district.directDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ district.directDiscount.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.directDiscount.distinctTotalCheckin }}</span>
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.directDiscount.distinctTotalCheckin }}</span>
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.directDiscount.distinctTotalCheckin }}</span>
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.directDiscount.distinctTotalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ district.directDiscount.distinctTotalBooking }}</span>
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ district.directDiscount.distinctTotalBooking }}</span>
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ district.directDiscount.distinctTotalBooking }}</span>
                                          <span v-if="district.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ district.directDiscount.distinctTotalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.specialOffer.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.specialOffer.totalCheckin }}</span>
                                          <span v-if="district.specialOffer.colorPerCheckin == 1" style="color: #6AA850">  {{ district.specialOffer.totalCheckin }}</span>
                                          <span v-if="district.specialOffer.colorPerCheckin == 2" style="color: #F2C642">  {{ district.specialOffer.totalCheckin }}</span>
                                          <span v-if="district.specialOffer.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.specialOffer.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.specialOffer.colorPerBooking == 0" style="color: #8A98AC">  {{ district.specialOffer.totalBooking }}</span>
                                          <span v-if="district.specialOffer.colorPerBooking == 1" style="color: #6AA850">  {{ district.specialOffer.totalBooking }}</span>
                                          <span v-if="district.specialOffer.colorPerBooking == 2" style="color: #F2C642">  {{ district.specialOffer.totalBooking }}</span>
                                          <span v-if="district.specialOffer.colorPerBooking == 3" style="color: #FE0C05">  {{ district.specialOffer.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.flashSale.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.flashSale.totalCheckin }}</span>
                                          <span v-if="district.flashSale.colorPerCheckin == 1" style="color: #6AA850">  {{ district.flashSale.totalCheckin }}</span>
                                          <span v-if="district.flashSale.colorPerCheckin == 2" style="color: #F2C642">  {{ district.flashSale.totalCheckin }}</span>
                                          <span v-if="district.flashSale.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.flashSale.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.flashSale.colorPerBooking == 0" style="color: #8A98AC">  {{ district.flashSale.totalBooking }}</span>
                                          <span v-if="district.flashSale.colorPerBooking == 1" style="color: #6AA850">  {{ district.flashSale.totalBooking }}</span>
                                          <span v-if="district.flashSale.colorPerBooking == 2" style="color: #F2C642">  {{ district.flashSale.totalBooking }}</span>
                                          <span v-if="district.flashSale.colorPerBooking == 3" style="color: #FE0C05">  {{ district.flashSale.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.stamp.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.stamp.totalCheckin }}</span>
                                          <span v-if="district.stamp.colorPerCheckin == 1" style="color: #6AA850">  {{ district.stamp.totalCheckin }}</span>
                                          <span v-if="district.stamp.colorPerCheckin == 2" style="color: #F2C642">  {{ district.stamp.totalCheckin }}</span>
                                          <span v-if="district.stamp.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.stamp.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.stamp.colorPerBooking == 0" style="color: #8A98AC">  {{ district.stamp.totalBooking }}</span>
                                          <span v-if="district.stamp.colorPerBooking == 1" style="color: #6AA850">  {{ district.stamp.totalBooking }}</span>
                                          <span v-if="district.stamp.colorPerBooking == 2" style="color: #F2C642">  {{ district.stamp.totalBooking }}</span>
                                          <span v-if="district.stamp.colorPerBooking == 3" style="color: #FE0C05">  {{ district.stamp.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.mileagePoint.totalCheckin }}</span>
                                          <span v-if="district.mileagePoint.colorPerCheckin == 1" style="color: #6AA850">  {{ district.mileagePoint.totalCheckin }}</span>
                                          <span v-if="district.mileagePoint.colorPerCheckin == 2" style="color: #F2C642">  {{ district.mileagePoint.totalCheckin }}</span>
                                          <span v-if="district.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.mileagePoint.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.mileagePoint.colorPerBooking == 0" style="color: #8A98AC">  {{ district.mileagePoint.totalBooking }}</span>
                                          <span v-if="district.mileagePoint.colorPerBooking == 1" style="color: #6AA850">  {{ district.mileagePoint.totalBooking }}</span>
                                          <span v-if="district.mileagePoint.colorPerBooking == 2" style="color: #F2C642">  {{ district.mileagePoint.totalBooking }}</span>
                                          <span v-if="district.mileagePoint.colorPerBooking == 3" style="color: #FE0C05">  {{ district.mileagePoint.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.paymentPromotion.totalCheckin }}</span>
                                          <span v-if="district.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850">  {{ district.paymentPromotion.totalCheckin }}</span>
                                          <span v-if="district.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642">  {{ district.paymentPromotion.totalCheckin }}</span>
                                          <span v-if="district.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.paymentPromotion.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC">  {{ district.paymentPromotion.totalBooking }}</span>
                                          <span v-if="district.paymentPromotion.colorPerBooking == 1" style="color: #6AA850">  {{ district.paymentPromotion.totalBooking }}</span>
                                          <span v-if="district.paymentPromotion.colorPerBooking == 2" style="color: #F2C642">  {{ district.paymentPromotion.totalBooking }}</span>
                                          <span v-if="district.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05">  {{ district.paymentPromotion.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.extraFee.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.extraFee.totalCheckin }}</span>
                                          <span v-if="district.extraFee.colorPerCheckin == 1" style="color: #6AA850">  {{ district.extraFee.totalCheckin }}</span>
                                          <span v-if="district.extraFee.colorPerCheckin == 2" style="color: #F2C642">  {{ district.extraFee.totalCheckin }}</span>
                                          <span v-if="district.extraFee.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.extraFee.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.extraFee.colorPerBooking == 0" style="color: #8A98AC">  {{ district.extraFee.totalBooking }}</span>
                                          <span v-if="district.extraFee.colorPerBooking == 1" style="color: #6AA850">  {{ district.extraFee.totalBooking }}</span>
                                          <span v-if="district.extraFee.colorPerBooking == 2" style="color: #F2C642">  {{ district.extraFee.totalBooking }}</span>
                                          <span v-if="district.extraFee.colorPerBooking == 3" style="color: #FE0C05">  {{ district.extraFee.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.hotelProduct.totalCheckin }}</span>
                                          <span v-if="district.hotelProduct.colorPerCheckin == 1" style="color: #6AA850">  {{ district.hotelProduct.totalCheckin }}</span>
                                          <span v-if="district.hotelProduct.colorPerCheckin == 2" style="color: #F2C642">  {{ district.hotelProduct.totalCheckin }}</span>
                                          <span v-if="district.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.hotelProduct.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.hotelProduct.colorPerBooking == 0" style="color: #8A98AC">  {{ district.hotelProduct.totalBooking }}</span>
                                          <span v-if="district.hotelProduct.colorPerBooking == 1" style="color: #6AA850">  {{ district.hotelProduct.totalBooking }}</span>
                                          <span v-if="district.hotelProduct.colorPerBooking == 2" style="color: #F2C642">  {{ district.hotelProduct.totalBooking }}</span>
                                          <span v-if="district.hotelProduct.colorPerBooking == 3" style="color: #FE0C05">  {{ district.hotelProduct.totalBooking }}</span>
                                        </td>
                                        <td style="width: 200px" colspan="2">
                                          <span v-if="district.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.bookingsNotDiscount.totalCheckin }}</span>
                                          <span v-if="district.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ district.bookingsNotDiscount.totalCheckin }}</span>
                                          <span v-if="district.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ district.bookingsNotDiscount.totalCheckin }}</span>
                                          <span v-if="district.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.bookingsNotDiscount.totalCheckin }}</span>
                                          ⁄
                                          <span v-if="district.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ district.bookingsNotDiscount.totalBooking }}</span>
                                          <span v-if="district.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ district.bookingsNotDiscount.totalBooking }}</span>
                                          <span v-if="district.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ district.bookingsNotDiscount.totalBooking }}</span>
                                          <span v-if="district.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ district.bookingsNotDiscount.totalBooking }}</span>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div class="collapsible" :class="`dataDistrict22${district.trackingSn}${index}`">
                                  <div class="pos_abs tracking">
                                    <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.daily_average')}}</button>
                                  </div>
                                  <div class="pd-width">
                                    <div class="style-table-tracking scroll-table">
                                      <table class="avoid-clicks none-border back-table">
                                        <tbody>
                                        <tr>
                                          <td style="width: 100px">
                                            <span>{{ district.totalFinalBookings.totalCheckin }} / {{ district.totalFinalBookings.totalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ district.totalFinalBookings.totalCheckinPerDays }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ district.totalFinalBookings.totalCheckinPerDays }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ district.totalFinalBookings.totalCheckinPerDays }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ district.totalFinalBookings.totalCheckinPerDays }}</span>
                                            ⁄
                                            <span v-if="district.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ district.totalFinalBookings.totalBookingPerDays }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ district.totalFinalBookings.totalBookingPerDays }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ district.totalFinalBookings.totalBookingPerDays }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ district.totalFinalBookings.totalBookingPerDays }}</span>
                                          </td>

                                          <td style="width: 100px">
                                            <span>{{ district.totalPromotionIssueCoupon.totalCheckin }}</span>/ <span>{{ district.totalPromotionIssueCoupon.totalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            <span>{{ district.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>/ <span>{{ district.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionG2J100.totalCheckin }} / {{ district.promotionG2J100.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionG2J100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionG2J100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionG2J100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionG2J100.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionG2J100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2J100.colorPerBooking == 1" style="color: #6AA850"> {{ district.promotionG2J100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2J100.colorPerBooking == 2" style="color: #F2C642"> {{ district.promotionG2J100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05"> {{ district.promotionG2J100.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            <span>{{ district.promotionG2J100.distinctTotalCheckin }}</span>/ <span>{{ district.promotionG2J100.distinctTotalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ district.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ district.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ district.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionG2JHotel.totalCheckin }} / {{ district.promotionG2JHotel.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            <span>{{ district.promotionG2JHotel.distinctTotalCheckin }}</span>/ <span>{{ district.promotionG2JHotel.distinctTotalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionHotel100.totalCheckin }} / {{ district.promotionHotel100.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            <span>{{ district.promotionHotel100.distinctTotalCheckin }}</span>/ <span>{{ district.promotionHotel100.distinctTotalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ district.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ district.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ district.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.totalPromotionNoIssueCoupon.totalCheckin }} / {{ district.totalPromotionNoIssueCoupon.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionHotel100.totalCheckin }} / {{ district.promotionHotel100.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.promotionHotel100.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ district.promotionHotel100.totalBookingPerDays }} </span>
                                            <span v-if="district.directDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ district.directDiscount.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            <span>{{ district.directDiscount.distinctTotalCheckin }}</span>/ <span>{{ district.directDiscount.distinctTotalBooking }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.directDiscount.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ district.directDiscount.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ district.directDiscount.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ district.directDiscount.distinctTotalCheckinPerDays }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ district.directDiscount.distinctTotalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ district.directDiscount.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850"> {{ district.directDiscount.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642"> {{ district.directDiscount.distinctTotalBookingPerDays }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ district.directDiscount.distinctTotalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.specialOffer.totalCheckin }} / {{ district.specialOffer.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.specialOffer.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.specialOffer.totalCheckinPerDays }} </span>
                                            <span v-if="district.specialOffer.colorPerCheckin == 1" style="color: #6AA850"> {{ district.specialOffer.totalCheckinPerDays }} </span>
                                            <span v-if="district.specialOffer.colorPerCheckin == 2" style="color: #F2C642"> {{ district.specialOffer.totalCheckinPerDays }} </span>
                                            <span v-if="district.specialOffer.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.specialOffer.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.specialOffer.colorPerBooking == 0" style="color: #8A98AC"> {{ district.specialOffer.totalBookingPerDays }} </span>
                                            <span v-if="district.specialOffer.colorPerBooking == 1" style="color: #6AA850"> {{ district.specialOffer.totalBookingPerDays }} </span>
                                            <span v-if="district.specialOffer.colorPerBooking == 2" style="color: #F2C642"> {{ district.specialOffer.totalBookingPerDays }} </span>
                                            <span v-if="district.specialOffer.colorPerBooking == 3" style="color: #FE0C05"> {{ district.specialOffer.totalBookingPerDays }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.flashSale.totalCheckin }} / {{ district.flashSale.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.flashSale.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.flashSale.totalCheckinPerDays }} </span>
                                            <span v-if="district.flashSale.colorPerCheckin == 1" style="color: #6AA850"> {{ district.flashSale.totalCheckinPerDays }} </span>
                                            <span v-if="district.flashSale.colorPerCheckin == 2" style="color: #F2C642"> {{ district.flashSale.totalCheckinPerDays }} </span>
                                            <span v-if="district.flashSale.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.flashSale.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.flashSale.colorPerBooking == 0" style="color: #8A98AC"> {{ district.flashSale.totalBookingPerDays }} </span>
                                            <span v-if="district.flashSale.colorPerBooking == 1" style="color: #6AA850"> {{ district.flashSale.totalBookingPerDays }} </span>
                                            <span v-if="district.flashSale.colorPerBooking == 2" style="color: #F2C642"> {{ district.flashSale.totalBookingPerDays }} </span>
                                            <span v-if="district.flashSale.colorPerBooking == 3" style="color: #FE0C05"> {{ district.flashSale.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.stamp.totalCheckin }} / {{ district.stamp.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.stamp.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.stamp.totalCheckinPerDays }} </span>
                                            <span v-if="district.stamp.colorPerCheckin == 1" style="color: #6AA850"> {{ district.stamp.totalCheckinPerDays }} </span>
                                            <span v-if="district.stamp.colorPerCheckin == 2" style="color: #F2C642"> {{ district.stamp.totalCheckinPerDays }} </span>
                                            <span v-if="district.stamp.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.stamp.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.stamp.colorPerBooking == 0" style="color: #8A98AC"> {{ district.stamp.totalBookingPerDays }} </span>
                                            <span v-if="district.stamp.colorPerBooking == 1" style="color: #6AA850"> {{ district.stamp.totalBookingPerDays }} </span>
                                            <span v-if="district.stamp.colorPerBooking == 2" style="color: #F2C642"> {{ district.stamp.totalBookingPerDays }} </span>
                                            <span v-if="district.stamp.colorPerBooking == 3" style="color: #FE0C05"> {{ district.stamp.totalBookingPerDays }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.mileagePoint.totalCheckin }} / {{ district.mileagePoint.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.mileagePoint.totalCheckinPerDays }} </span>
                                            <span v-if="district.mileagePoint.colorPerCheckin == 1" style="color: #6AA850"> {{ district.mileagePoint.totalCheckinPerDays }} </span>
                                            <span v-if="district.mileagePoint.colorPerCheckin == 2" style="color: #F2C642"> {{ district.mileagePoint.totalCheckinPerDays }} </span>
                                            <span v-if="district.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.mileagePoint.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.mileagePoint.colorPerBooking == 0" style="color: #8A98AC"> {{ district.mileagePoint.totalBookingPerDays }} </span>
                                            <span v-if="district.mileagePoint.colorPerBooking == 1" style="color: #6AA850"> {{ district.mileagePoint.totalBookingPerDays }} </span>
                                            <span v-if="district.mileagePoint.colorPerBooking == 2" style="color: #F2C642"> {{ district.mileagePoint.totalBookingPerDays }} </span>
                                            <span v-if="district.mileagePoint.colorPerBooking == 3" style="color: #FE0C05"> {{ district.mileagePoint.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.paymentPromotion.totalCheckin }} / {{ district.paymentPromotion.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.paymentPromotion.totalCheckinPerDays }} </span>
                                            <span v-if="district.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850"> {{ district.paymentPromotion.totalCheckinPerDays }} </span>
                                            <span v-if="district.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642"> {{ district.paymentPromotion.totalCheckinPerDays }} </span>
                                            <span v-if="district.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.paymentPromotion.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC"> {{ district.paymentPromotion.totalBookingPerDays }} </span>
                                            <span v-if="district.paymentPromotion.colorPerBooking == 1" style="color: #6AA850"> {{ district.paymentPromotion.totalBookingPerDays }} </span>
                                            <span v-if="district.paymentPromotion.colorPerBooking == 2" style="color: #F2C642"> {{ district.paymentPromotion.totalBookingPerDays }} </span>
                                            <span v-if="district.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05"> {{ district.paymentPromotion.totalBookingPerDays }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.extraFee.totalCheckin }} / {{ district.extraFee.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.extraFee.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.extraFee.totalCheckinPerDays }} </span>
                                            <span v-if="district.extraFee.colorPerCheckin == 1" style="color: #6AA850"> {{ district.extraFee.totalCheckinPerDays }} </span>
                                            <span v-if="district.extraFee.colorPerCheckin == 2" style="color: #F2C642"> {{ district.extraFee.totalCheckinPerDays }} </span>
                                            <span v-if="district.extraFee.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.extraFee.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.extraFee.colorPerBooking == 0" style="color: #8A98AC"> {{ district.extraFee.totalBookingPerDays }} </span>
                                            <span v-if="district.extraFee.colorPerBooking == 1" style="color: #6AA850"> {{ district.extraFee.totalBookingPerDays }} </span>
                                            <span v-if="district.extraFee.colorPerBooking == 2" style="color: #F2C642"> {{ district.extraFee.totalBookingPerDays }} </span>
                                            <span v-if="district.extraFee.colorPerBooking == 3" style="color: #FE0C05"> {{ district.extraFee.totalBookingPerDays }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.hotelProduct.totalCheckin }} / {{ district.hotelProduct.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.hotelProduct.totalCheckinPerDays }} </span>
                                            <span v-if="district.hotelProduct.colorPerCheckin == 1" style="color: #6AA850"> {{ district.hotelProduct.totalCheckinPerDays }} </span>
                                            <span v-if="district.hotelProduct.colorPerCheckin == 2" style="color: #F2C642"> {{ district.hotelProduct.totalCheckinPerDays }} </span>
                                            <span v-if="district.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.hotelProduct.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.hotelProduct.colorPerBooking == 0" style="color: #8A98AC"> {{ district.hotelProduct.totalBookingPerDays }} </span>
                                            <span v-if="district.hotelProduct.colorPerBooking == 1" style="color: #6AA850"> {{ district.hotelProduct.totalBookingPerDays }} </span>
                                            <span v-if="district.hotelProduct.colorPerBooking == 2" style="color: #F2C642"> {{ district.hotelProduct.totalBookingPerDays }} </span>
                                            <span v-if="district.hotelProduct.colorPerBooking == 3" style="color: #FE0C05"> {{ district.hotelProduct.totalBookingPerDays }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.bookingsNotDiscount.totalCheckin }} / {{ district.bookingsNotDiscount.totalBooking }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC"> {{ district.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850"> {{ district.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642"> {{ district.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05"> {{ district.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                            ⁄
                                            <span v-if="district.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC"> {{ district.bookingsNotDiscount.totalBookingPerDays }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850"> {{ district.bookingsNotDiscount.totalBookingPerDays }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642"> {{ district.bookingsNotDiscount.totalBookingPerDays }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ district.bookingsNotDiscount.totalBookingPerDays }} </span>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  <div class="pos_abs tracking">
                                    <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.previous_month_average')}}</button>
                                  </div>
                                  <div class="pd-width">
                                    <div class="style-table-tracking scroll-table">
                                      <table class="avoid-clicks none-border back-table">
                                        <tbody>
                                        <tr>
                                          <td style="width: 100px">
                                            <span>{{ district.totalFinalBookings.totalCheckinMonth }} / {{ district.totalFinalBookings.totalBookingMonth }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalFinalBookings.colorPerCheckinMonth == 0" style="color: #8A98AC">  {{ district.totalFinalBookings.totalCheckinPerMonth }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerCheckinMonth == 1" style="color: #6AA850">  {{ district.totalFinalBookings.totalCheckinPerMonth }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerCheckinMonth == 2" style="color: #F2C642">  {{ district.totalFinalBookings.totalCheckinPerMonth }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerCheckinMonth == 3" style="color: #FE0C05">  {{ district.totalFinalBookings.totalCheckinPerMonth }}</span>
                                            ⁄
                                            <span v-if="district.totalFinalBookings.colorPerBookingMonth == 0" style="color: #8A98AC">  {{ district.totalFinalBookings.totalBookingPerMonth }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerBookingMonth == 1" style="color: #6AA850">  {{ district.totalFinalBookings.totalBookingPerMonth }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerBookingMonth == 2" style="color: #F2C642">  {{ district.totalFinalBookings.totalBookingPerMonth }}</span>
                                            <span v-if="district.totalFinalBookings.colorPerBookingMonth == 3" style="color: #FE0C05">  {{ district.totalFinalBookings.totalBookingPerMonth }}</span>
                                          </td>

                                          <td style="width: 100px">
                                            <span>{{ district.totalPromotionIssueCoupon.totalCheckinMonth }}</span>/ <span>{{ district.totalPromotionIssueCoupon.totalBookingMonth }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            <span>{{ district.totalPromotionIssueCoupon.distinctTotalCheckinMonth }}</span>/ <span>{{ district.totalPromotionIssueCoupon.distinctTotalBookingMonth }}</span>
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionG2J100.totalCheckinMonth }} / {{ district.promotionG2J100.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2J100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.promotionG2J100.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.promotionG2J100.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.promotionG2J100.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.promotionG2J100.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2J100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.promotionG2J100.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.promotionG2J100.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.promotionG2J100.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.promotionG2J100.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionG2J100.distinctTotalCheckinMonth }} / {{ district.promotionG2J100.distinctTotalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2J100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ district.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ district.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2J100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionG2JHotel.totalCheckinMonth }} / {{ district.promotionG2JHotel.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2JHotel.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2JHotel.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionG2JHotel.distinctTotalCheckinMonth }} / {{ district.promotionG2JHotel.distinctTotalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ district.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ district.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionG2JHotel.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionHotel100.totalCheckinMonth }} / {{ district.promotionHotel100.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionHotel100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.promotionHotel100.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.promotionHotel100.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.promotionHotel100.totalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.promotionHotel100.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.promotionHotel100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.promotionHotel100.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.promotionHotel100.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.promotionHotel100.totalBookingPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.promotionHotel100.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.promotionHotel100.distinctTotalCheckinMonth }} / {{ district.promotionHotel100.distinctTotalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.promotionHotel100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ district.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ district.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.promotionHotel100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.totalPromotionNoIssueCoupon.totalCheckinMonth }} / {{ district.totalPromotionNoIssueCoupon.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                            <span v-if="district.totalPromotionNoIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.directDiscount.totalCheckinMonth }} / {{ district.directDiscount.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.directDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.directDiscount.totalCheckinPerMonth }} </span>
                                            <span v-if="district.directDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.directDiscount.totalCheckinPerMonth }} </span>
                                            <span v-if="district.directDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.directDiscount.totalCheckinPerMonth }} </span>
                                            <span v-if="district.directDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.directDiscount.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.directDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.directDiscount.totalBookingPerMonth }} </span>
                                            <span v-if="district.directDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.directDiscount.totalBookingPerMonth }} </span>
                                            <span v-if="district.directDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.directDiscount.totalBookingPerMonth }} </span>
                                            <span v-if="district.directDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.directDiscount.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.directDiscount.distinctTotalCheckinMonth }} / {{ district.directDiscount.distinctTotalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.directDiscount.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.directDiscount.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.directDiscount.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ district.directDiscount.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ district.directDiscount.distinctTotalBookingPerMonth }} </span>
                                            <span v-if="district.directDiscount.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.directDiscount.distinctTotalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.specialOffer.totalCheckinMonth }} / {{ district.specialOffer.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.specialOffer.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.specialOffer.totalCheckinPerMonth }} </span>
                                            <span v-if="district.specialOffer.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.specialOffer.totalCheckinPerMonth }} </span>
                                            <span v-if="district.specialOffer.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.specialOffer.totalCheckinPerMonth }} </span>
                                            <span v-if="district.specialOffer.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.specialOffer.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.specialOffer.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.specialOffer.totalBookingPerMonth }} </span>
                                            <span v-if="district.specialOffer.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.specialOffer.totalBookingPerMonth }} </span>
                                            <span v-if="district.specialOffer.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.specialOffer.totalBookingPerMonth }} </span>
                                            <span v-if="district.specialOffer.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.specialOffer.totalBookingPerMonth }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.flashSale.totalCheckinMonth }} / {{ district.flashSale.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.flashSale.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.flashSale.totalCheckinPerMonth }} </span>
                                            <span v-if="district.flashSale.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.flashSale.totalCheckinPerMonth }} </span>
                                            <span v-if="district.flashSale.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.flashSale.totalCheckinPerMonth }} </span>
                                            <span v-if="district.flashSale.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.flashSale.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.flashSale.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.flashSale.totalBookingPerMonth }} </span>
                                            <span v-if="district.flashSale.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.flashSale.totalBookingPerMonth }} </span>
                                            <span v-if="district.flashSale.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.flashSale.totalBookingPerMonth }} </span>
                                            <span v-if="district.flashSale.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.flashSale.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.stamp.totalCheckinMonth }} / {{ district.stamp.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.stamp.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.stamp.totalCheckinPerMonth }} </span>
                                            <span v-if="district.stamp.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.stamp.totalCheckinPerMonth }} </span>
                                            <span v-if="district.stamp.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.stamp.totalCheckinPerMonth }} </span>
                                            <span v-if="district.stamp.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.stamp.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.stamp.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.stamp.totalBookingPerMonth }} </span>
                                            <span v-if="district.stamp.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.stamp.totalBookingPerMonth }} </span>
                                            <span v-if="district.stamp.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.stamp.totalBookingPerMonth }} </span>
                                            <span v-if="district.stamp.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.stamp.totalBookingPerMonth }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.mileagePoint.totalCheckinMonth }} / {{ district.mileagePoint.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.mileagePoint.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.mileagePoint.totalCheckinPerMonth }} </span>
                                            <span v-if="district.mileagePoint.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.mileagePoint.totalCheckinPerMonth }} </span>
                                            <span v-if="district.mileagePoint.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.mileagePoint.totalCheckinPerMonth }} </span>
                                            <span v-if="district.mileagePoint.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.mileagePoint.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.mileagePoint.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.mileagePoint.totalBookingPerMonth }} </span>
                                            <span v-if="district.mileagePoint.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.mileagePoint.totalBookingPerMonth }} </span>
                                            <span v-if="district.mileagePoint.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.mileagePoint.totalBookingPerMonth }} </span>
                                            <span v-if="district.mileagePoint.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.mileagePoint.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.paymentPromotion.totalCheckinMonth }} / {{ district.paymentPromotion.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.paymentPromotion.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.paymentPromotion.totalCheckinPerMonth }} </span>
                                            <span v-if="district.paymentPromotion.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.paymentPromotion.totalCheckinPerMonth }} </span>
                                            <span v-if="district.paymentPromotion.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.paymentPromotion.totalCheckinPerMonth }} </span>
                                            <span v-if="district.paymentPromotion.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.paymentPromotion.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.paymentPromotion.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.paymentPromotion.totalBookingPerMonth }} </span>
                                            <span v-if="district.paymentPromotion.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.paymentPromotion.totalBookingPerMonth }} </span>
                                            <span v-if="district.paymentPromotion.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.paymentPromotion.totalBookingPerMonth }} </span>
                                            <span v-if="district.paymentPromotion.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.paymentPromotion.totalBookingPerMonth }} </span>
                                          </td>
                                          <td style="width: 100px">
                                            {{ district.extraFee.totalCheckinMonth }} / {{ district.extraFee.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.extraFee.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.extraFee.totalCheckinPerMonth }} </span>
                                            <span v-if="district.extraFee.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.extraFee.totalCheckinPerMonth }} </span>
                                            <span v-if="district.extraFee.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.extraFee.totalCheckinPerMonth }} </span>
                                            <span v-if="district.extraFee.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.extraFee.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.extraFee.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.extraFee.totalBookingPerMonth }} </span>
                                            <span v-if="district.extraFee.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.extraFee.totalBookingPerMonth }} </span>
                                            <span v-if="district.extraFee.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.extraFee.totalBookingPerMonth }} </span>
                                            <span v-if="district.extraFee.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.extraFee.totalBookingPerMonth }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.hotelProduct.totalCheckinMonth }} / {{ district.hotelProduct.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.hotelProduct.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.hotelProduct.totalCheckinPerMonth }} </span>
                                            <span v-if="district.hotelProduct.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.hotelProduct.totalCheckinPerMonth }} </span>
                                            <span v-if="district.hotelProduct.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.hotelProduct.totalCheckinPerMonth }} </span>
                                            <span v-if="district.hotelProduct.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.hotelProduct.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.hotelProduct.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.hotelProduct.totalBookingPerMonth }} </span>
                                            <span v-if="district.hotelProduct.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.hotelProduct.totalBookingPerMonth }} </span>
                                            <span v-if="district.hotelProduct.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.hotelProduct.totalBookingPerMonth }} </span>
                                            <span v-if="district.hotelProduct.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.hotelProduct.totalBookingPerMonth }} </span>
                                          </td>

                                          <td style="width: 100px">
                                            {{ district.bookingsNotDiscount.totalCheckinMonth }} / {{ district.bookingsNotDiscount.totalBookingMonth }}
                                          </td>
                                          <td style="width: 100px">
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ district.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ district.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ district.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ district.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                            ⁄
                                            <span v-if="district.bookingsNotDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ district.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ district.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ district.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                            <span v-if="district.bookingsNotDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ district.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  <div class="pos_abs tracking">
                                    <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.average')}}</button>
                                  </div>
                                  <div class="pd-width">
                                    <div class="style-table-tracking scroll-table">
                                      <table class="avoid-clicks none-border back-table">
                                        <tbody>
                                        <tr >
                                          <td style="width: 100px"><span>{{ district.totalFinalBookings.totalCheckinYear }}</span> / <span> {{ district.totalFinalBookings.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.totalFinalBookings.totalCheckinPerYear }}</span> / <span> {{ district.totalFinalBookings.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.totalPromotionIssueCoupon.totalCheckinYear }}</span> / <span> {{ district.totalPromotionIssueCoupon.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.totalPromotionIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ district.totalPromotionIssueCoupon.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.totalPromotionIssueCoupon.distinctTotalCheckinYear }}</span> / <span>{{ district.totalPromotionIssueCoupon.distinctTotalBookingYear}}</span> </td>
                                          <td style="width: 100px"><span>{{ district.totalPromotionIssueCoupon.distinctTotalCheckinPerYear }}</span> / <span>{{ district.totalPromotionIssueCoupon.distinctTotalBookingPerYear}}</span> </td>

                                          <td style="width: 100px"><span>{{ district.promotionG2J100.totalCheckinYear }}</span> / <span> {{ district.promotionG2J100.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.promotionG2J100.totalCheckinPerYear }}</span> / <span> {{ district.promotionG2J100.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.promotionG2J100.distinctTotalCheckinYear }}</span> / <span>{{ district.promotionG2J100.distinctTotalBookingYear}}</span> </td>
                                          <td style="width: 100px"><span>{{ district.promotionG2J100.distinctTotalCheckinPerYear }}</span> / <span>{{ district.promotionG2J100.distinctTotalBookingPerYear}}</span> </td>

                                          <td style="width: 100px"><span>{{ district.promotionG2JHotel.totalCheckinYear }}</span> / <span> {{ district.promotionG2JHotel.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.promotionG2JHotel.totalCheckinPerYear }}</span> / <span> {{ district.promotionG2JHotel.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.promotionG2JHotel.distinctTotalCheckinYear }}</span> / <span>{{ district.promotionG2JHotel.distinctTotalBookingYear}}</span> </td>
                                          <td style="width: 100px"><span>{{ district.promotionG2JHotel.distinctTotalCheckinPerYear }}</span> / <span>{{ district.promotionG2JHotel.distinctTotalBookingPerYear}}</span> </td>

                                          <td style="width: 100px"><span>{{ district.promotionHotel100.totalCheckinYear }}</span> / <span> {{ district.promotionHotel100.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.promotionHotel100.totalCheckinPerYear }}</span> / <span> {{ district.promotionHotel100.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.promotionHotel100.distinctTotalCheckinYear }}</span> / <span>{{ district.promotionHotel100.distinctTotalBookingYear}}</span> </td>
                                          <td style="width: 100px"><span>{{ district.promotionHotel100.distinctTotalCheckinPerYear }}</span> / <span>{{ district.promotionHotel100.distinctTotalBookingPerYear}}</span> </td>

                                          <td style="width: 100px"><span>{{ district.totalPromotionNoIssueCoupon.totalCheckinYear }}</span> / <span> {{ district.totalPromotionNoIssueCoupon.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.totalPromotionNoIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ district.totalPromotionNoIssueCoupon.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.directDiscount.distinctTotalCheckinYear }}</span> / <span>{{ district.directDiscount.distinctTotalBookingYear}}</span> </td>
                                          <td style="width: 100px"><span>{{ district.directDiscount.distinctTotalCheckinPerYear }}</span> / <span>{{ district.directDiscount.distinctTotalBookingPerYear}}</span> </td>

                                          <td style="width: 100px"><span>{{ district.directDiscount.totalCheckinYear }}</span> / <span> {{ district.directDiscount.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.directDiscount.totalCheckinPerYear }}</span> / <span> {{ district.directDiscount.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.specialOffer.totalCheckinYear }}</span> / <span> {{ district.specialOffer.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.specialOffer.totalCheckinPerYear }}</span> / <span> {{ district.specialOffer.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.flashSale.totalCheckinYear }}</span> / <span> {{ district.flashSale.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.flashSale.totalCheckinPerYear }}</span> / <span> {{ district.flashSale.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.stamp.totalCheckinYear }}</span> / <span> {{ district.stamp.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.stamp.totalCheckinPerYear }}   </span> / <span> {{ district.stamp.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.mileagePoint.totalCheckinYear }}</span> / <span> {{ district.mileagePoint.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.mileagePoint.totalCheckinPerYear }}</span> / <span> {{ district.mileagePoint.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.paymentPromotion.totalCheckinYear }}</span> / <span> {{ district.paymentPromotion.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.paymentPromotion.totalCheckinPerYear }}</span> / <span> {{ district.paymentPromotion.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.extraFee.totalCheckinYear }}</span> / <span> {{ district.extraFee.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.extraFee.totalCheckinPerYear }}</span> / <span> {{ district.extraFee.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.hotelProduct.totalCheckinYear }}</span> / <span> {{ district.hotelProduct.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.hotelProduct.totalCheckinPerYear }}</span> / <span> {{ district.hotelProduct.totalBookingPerYear }}</span></td>

                                          <td style="width: 100px"><span>{{ district.bookingsNotDiscount.totalCheckinYear }}</span> / <span> {{ district.bookingsNotDiscount.totalBookingYear }}</span></td>
                                          <td style="width: 100px"><span>{{ district.bookingsNotDiscount.totalCheckinPerYear }}</span> / <span> {{ district.bookingsNotDiscount.totalBookingPerYear }}</span></td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <template v-if="district && district.hotels || loading == false">
                                    <div style="width: 100%;" v-for="(hotel,index) in district.hotels" :key="index">
                                      <section>
                                        <div class="pos_abs tracking"  >
                                          <button  type="button" style="font-size: 18px; " class="btn_action tbn-child btn btn-danger limit-text" @click="activeCollapse(`dataHotel${index}${hotel.trackingSn}`,district,3)">
                                            <span>{{ hotel.name }}</span>
                                          </button>
                                        </div>
                                        <div class="pd-width">
                                          <div class="style-table-tracking scroll-table">
                                            <table class="avoid-clicks">
                                              <tbody>
                                              <tr>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.totalFinalBookings.totalCheckin }}</span>
                                                  <span v-if="hotel.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalCheckin }}</span>
                                                  <span v-if="hotel.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.totalFinalBookings.totalCheckin }}</span>
                                                  <span v-if="hotel.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.totalFinalBookings.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.totalFinalBookings.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.totalFinalBookings.totalBooking }}</span>
                                                  <span v-if="hotel.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalBooking }}</span>
                                                  <span v-if="hotel.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalFinalBookings.totalBooking }}</span>
                                                  <span v-if="hotel.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalFinalBookings.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.totalPromotionIssueCoupon.totalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalPromotionIssueCoupon.totalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalPromotionIssueCoupon.totalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalPromotionIssueCoupon.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.totalPromotionIssueCoupon.totalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalPromotionIssueCoupon.totalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalPromotionIssueCoupon.totalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalPromotionIssueCoupon.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.promotionG2J100.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.promotionG2J100.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.promotionG2J100.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.promotionG2J100.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionG2J100.totalBooking }}</span>
                                                  <span v-if="hotel.promotionG2J100.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionG2J100.totalBooking }}</span>
                                                  <span v-if="hotel.promotionG2J100.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionG2J100.totalBooking }}</span>
                                                  <span v-if="hotel.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionG2J100.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionG2J100.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionG2J100.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionG2J100.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionG2J100.distinctTotalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionG2J100.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionG2J100.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionG2J100.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionG2J100.distinctTotalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.promotionG2JHotel.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.promotionG2JHotel.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.promotionG2JHotel.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.promotionG2JHotel.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionG2JHotel.totalBooking }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionG2JHotel.totalBooking }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionG2JHotel.totalBooking }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionG2JHotel.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionG2JHotel.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionG2JHotel.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionG2JHotel.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionG2JHotel.distinctTotalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionG2JHotel.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionG2JHotel.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionG2JHotel.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionG2JHotel.distinctTotalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.promotionHotel100.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.promotionHotel100.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.promotionHotel100.totalCheckin }}</span>
                                                  <span v-if="hotel.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.promotionHotel100.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionHotel100.totalBooking }}</span>
                                                  <span v-if="hotel.promotionHotel100.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionHotel100.totalBooking }}</span>
                                                  <span v-if="hotel.promotionHotel100.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionHotel100.totalBooking }}</span>
                                                  <span v-if="hotel.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionHotel100.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionHotel100.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionHotel100.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionHotel100.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionHotel100.distinctTotalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.promotionHotel100.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.promotionHotel100.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.promotionHotel100.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.promotionHotel100.distinctTotalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.totalPromotionNoIssueCoupon.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                                  <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalPromotionNoIssueCoupon.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.directDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.directDiscount.totalCheckin }}</span>
                                                  <span v-if="hotel.directDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.directDiscount.totalCheckin }}</span>
                                                  <span v-if="hotel.directDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.directDiscount.totalCheckin }}</span>
                                                  <span v-if="hotel.directDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.directDiscount.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.directDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.directDiscount.totalBooking }}</span>
                                                  <span v-if="hotel.directDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.directDiscount.totalBooking }}</span>
                                                  <span v-if="hotel.directDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.directDiscount.totalBooking }}</span>
                                                  <span v-if="hotel.directDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.directDiscount.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.directDiscount.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.directDiscount.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.directDiscount.distinctTotalCheckin }}</span>
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.directDiscount.distinctTotalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC">  {{ hotel.directDiscount.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850">  {{ hotel.directDiscount.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642">  {{ hotel.directDiscount.distinctTotalBooking }}</span>
                                                  <span v-if="hotel.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05">  {{ hotel.directDiscount.distinctTotalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.specialOffer.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.specialOffer.totalCheckin }}</span>
                                                  <span v-if="hotel.specialOffer.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.specialOffer.totalCheckin }}</span>
                                                  <span v-if="hotel.specialOffer.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.specialOffer.totalCheckin }}</span>
                                                  <span v-if="hotel.specialOffer.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.specialOffer.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.specialOffer.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.specialOffer.totalBooking }}</span>
                                                  <span v-if="hotel.specialOffer.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.specialOffer.totalBooking }}</span>
                                                  <span v-if="hotel.specialOffer.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.specialOffer.totalBooking }}</span>
                                                  <span v-if="hotel.specialOffer.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.specialOffer.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.flashSale.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.flashSale.totalCheckin }}</span>
                                                  <span v-if="hotel.flashSale.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.flashSale.totalCheckin }}</span>
                                                  <span v-if="hotel.flashSale.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.flashSale.totalCheckin }}</span>
                                                  <span v-if="hotel.flashSale.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.flashSale.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.flashSale.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.flashSale.totalBooking }}</span>
                                                  <span v-if="hotel.flashSale.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.flashSale.totalBooking }}</span>
                                                  <span v-if="hotel.flashSale.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.flashSale.totalBooking }}</span>
                                                  <span v-if="hotel.flashSale.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.flashSale.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.stamp.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.stamp.totalCheckin }}</span>
                                                  <span v-if="hotel.stamp.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.stamp.totalCheckin }}</span>
                                                  <span v-if="hotel.stamp.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.stamp.totalCheckin }}</span>
                                                  <span v-if="hotel.stamp.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.stamp.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.stamp.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.stamp.totalBooking }}</span>
                                                  <span v-if="hotel.stamp.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.stamp.totalBooking }}</span>
                                                  <span v-if="hotel.stamp.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.stamp.totalBooking }}</span>
                                                  <span v-if="hotel.stamp.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.stamp.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.mileagePoint.totalCheckin }}</span>
                                                  <span v-if="hotel.mileagePoint.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.mileagePoint.totalCheckin }}</span>
                                                  <span v-if="hotel.mileagePoint.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.mileagePoint.totalCheckin }}</span>
                                                  <span v-if="hotel.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.mileagePoint.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.mileagePoint.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.mileagePoint.totalBooking }}</span>
                                                  <span v-if="hotel.mileagePoint.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.mileagePoint.totalBooking }}</span>
                                                  <span v-if="hotel.mileagePoint.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.mileagePoint.totalBooking }}</span>
                                                  <span v-if="hotel.mileagePoint.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.mileagePoint.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.paymentPromotion.totalCheckin }}</span>
                                                  <span v-if="hotel.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.paymentPromotion.totalCheckin }}</span>
                                                  <span v-if="hotel.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.paymentPromotion.totalCheckin }}</span>
                                                  <span v-if="hotel.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.paymentPromotion.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.paymentPromotion.totalBooking }}</span>
                                                  <span v-if="hotel.paymentPromotion.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.paymentPromotion.totalBooking }}</span>
                                                  <span v-if="hotel.paymentPromotion.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.paymentPromotion.totalBooking }}</span>
                                                  <span v-if="hotel.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.paymentPromotion.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.extraFee.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.extraFee.totalCheckin }}</span>
                                                  <span v-if="hotel.extraFee.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.extraFee.totalCheckin }}</span>
                                                  <span v-if="hotel.extraFee.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.extraFee.totalCheckin }}</span>
                                                  <span v-if="hotel.extraFee.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.extraFee.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.extraFee.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.extraFee.totalBooking }}</span>
                                                  <span v-if="hotel.extraFee.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.extraFee.totalBooking }}</span>
                                                  <span v-if="hotel.extraFee.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.extraFee.totalBooking }}</span>
                                                  <span v-if="hotel.extraFee.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.extraFee.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.hotelProduct.totalCheckin }}</span>
                                                  <span v-if="hotel.hotelProduct.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.hotelProduct.totalCheckin }}</span>
                                                  <span v-if="hotel.hotelProduct.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.hotelProduct.totalCheckin }}</span>
                                                  <span v-if="hotel.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.hotelProduct.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.hotelProduct.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.hotelProduct.totalBooking }}</span>
                                                  <span v-if="hotel.hotelProduct.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.hotelProduct.totalBooking }}</span>
                                                  <span v-if="hotel.hotelProduct.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.hotelProduct.totalBooking }}</span>
                                                  <span v-if="hotel.hotelProduct.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.hotelProduct.totalBooking }}</span>
                                                </td>
                                                <td style="width: 200px" colspan="2">
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.bookingsNotDiscount.totalCheckin }}</span>
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.bookingsNotDiscount.totalCheckin }}</span>
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.bookingsNotDiscount.totalCheckin }}</span>
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.bookingsNotDiscount.totalCheckin }}</span>
                                                  ⁄
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC">  {{ hotel.bookingsNotDiscount.totalBooking }}</span>
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.bookingsNotDiscount.totalBooking }}</span>
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.bookingsNotDiscount.totalBooking }}</span>
                                                  <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.bookingsNotDiscount.totalBooking }}</span>
                                                </td>
                                              </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                        <div  class="collapsible" :class="`dataHotel${index}${hotel.trackingSn}`">
                                          <div class="pos_abs tracking">
                                            <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.daily_average')}}</button>
                                          </div>
                                          <div class="pd-width">
                                            <div class="style-table-tracking scroll-table">
                                              <table class="avoid-clicks none-border back-table">
                                                <tbody>
                                                <tr>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.totalFinalBookings.totalCheckin }} / {{ hotel.totalFinalBookings.totalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckin == 0" style="color: #8A98AC">  {{ hotel.totalFinalBookings.totalCheckinPerDays }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckin == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalCheckinPerDays }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckin == 2" style="color: #F2C642">  {{ hotel.totalFinalBookings.totalCheckinPerDays }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckin == 3" style="color: #FE0C05">  {{ hotel.totalFinalBookings.totalCheckinPerDays }}</span>
                                                    ⁄
                                                    <span v-if="hotel.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalBookingPerDays }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerBooking == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalBookingPerDays }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerBooking == 2" style="color: #F2C642">  {{ hotel.totalFinalBookings.totalBookingPerDays }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerBooking == 3" style="color: #FE0C05">  {{ hotel.totalFinalBookings.totalBookingPerDays }}</span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    <span>{{ hotel.totalPromotionIssueCoupon.totalCheckin }}</span>/ <span>{{ hotel.totalPromotionIssueCoupon.totalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.totalPromotionIssueCoupon.distinctTotalCheckin }}</span>/ <span>{{ hotel.totalPromotionIssueCoupon.distinctTotalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionG2J100.totalCheckin }} / {{ hotel.promotionG2J100.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2J100.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.promotionG2J100.distinctTotalCheckin }}</span>/ <span>{{ hotel.promotionG2J100.distinctTotalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.distinctTotalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.distinctTotalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionG2JHotel.totalCheckin }} / {{ hotel.promotionG2JHotel.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.promotionG2JHotel.distinctTotalCheckin }}</span>/ <span>{{ hotel.promotionG2JHotel.distinctTotalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionHotel100.totalCheckin }} / {{ hotel.promotionHotel100.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.promotionHotel100.distinctTotalCheckin }}</span>/ <span>{{ hotel.promotionHotel100.distinctTotalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.distinctTotalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.distinctTotalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.totalPromotionNoIssueCoupon.totalCheckin }} / {{ hotel.totalPromotionNoIssueCoupon.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionHotel100.totalCheckin }} / {{ hotel.promotionHotel100.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.directDiscount.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.directDiscount.distinctTotalCheckin }}</span>/ <span>{{ hotel.directDiscount.distinctTotalBooking }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.directDiscount.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckin == 1" style="color: #6AA850"> {{ hotel.directDiscount.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckin == 2" style="color: #F2C642"> {{ hotel.directDiscount.distinctTotalCheckinPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.directDiscount.distinctTotalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.directDiscount.distinctColorPerBooking == 0" style="color: #8A98AC"> {{ hotel.directDiscount.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerBooking == 1" style="color: #6AA850"> {{ hotel.directDiscount.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerBooking == 2" style="color: #F2C642"> {{ hotel.directDiscount.distinctTotalBookingPerDays }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerBooking == 3" style="color: #FE0C05"> {{ hotel.directDiscount.distinctTotalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.specialOffer.totalCheckin }} / {{ hotel.specialOffer.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.specialOffer.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.specialOffer.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.specialOffer.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.specialOffer.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.specialOffer.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.specialOffer.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.specialOffer.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.specialOffer.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.specialOffer.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.specialOffer.totalBookingPerDays }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.flashSale.totalCheckin }} / {{ hotel.flashSale.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.flashSale.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.flashSale.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.flashSale.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.flashSale.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.flashSale.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.flashSale.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.flashSale.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.flashSale.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.flashSale.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.flashSale.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.flashSale.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.flashSale.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.flashSale.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.flashSale.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.flashSale.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.flashSale.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.stamp.totalCheckin }} / {{ hotel.stamp.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.stamp.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.stamp.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.stamp.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.stamp.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.stamp.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.stamp.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.stamp.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.stamp.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.stamp.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.stamp.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.stamp.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.stamp.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.stamp.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.stamp.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.stamp.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.stamp.totalBookingPerDays }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.mileagePoint.totalCheckin }} / {{ hotel.mileagePoint.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.mileagePoint.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.mileagePoint.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.mileagePoint.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.mileagePoint.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.mileagePoint.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.mileagePoint.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.mileagePoint.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.mileagePoint.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.mileagePoint.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.mileagePoint.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.paymentPromotion.totalCheckin }} / {{ hotel.paymentPromotion.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.paymentPromotion.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.paymentPromotion.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.paymentPromotion.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.paymentPromotion.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.paymentPromotion.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.paymentPromotion.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.paymentPromotion.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.paymentPromotion.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.paymentPromotion.totalBookingPerDays }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.extraFee.totalCheckin }} / {{ hotel.extraFee.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.extraFee.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.extraFee.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.extraFee.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.extraFee.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.extraFee.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.extraFee.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.extraFee.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.extraFee.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.extraFee.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.extraFee.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.extraFee.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.extraFee.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.extraFee.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.extraFee.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.extraFee.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.extraFee.totalBookingPerDays }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.hotelProduct.totalCheckin }} / {{ hotel.hotelProduct.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.hotelProduct.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.hotelProduct.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.hotelProduct.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.hotelProduct.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.hotelProduct.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.hotelProduct.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.hotelProduct.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.hotelProduct.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.hotelProduct.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.hotelProduct.totalBookingPerDays }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.bookingsNotDiscount.totalCheckin }} / {{ hotel.bookingsNotDiscount.totalBooking }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 0" style="color: #8A98AC"> {{ hotel.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 1" style="color: #6AA850"> {{ hotel.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 2" style="color: #F2C642"> {{ hotel.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckin == 3" style="color: #FE0C05"> {{ hotel.bookingsNotDiscount.totalCheckinPerDays }} </span>
                                                    ⁄
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 0" style="color: #8A98AC"> {{ hotel.bookingsNotDiscount.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 1" style="color: #6AA850"> {{ hotel.bookingsNotDiscount.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 2" style="color: #F2C642"> {{ hotel.bookingsNotDiscount.totalBookingPerDays }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBooking == 3" style="color: #FE0C05"> {{ hotel.bookingsNotDiscount.totalBookingPerDays }} </span>
                                                  </td>
                                                </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>

                                          <div class="pos_abs tracking">
                                            <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.previous_month_average')}}</button>
                                          </div>
                                          <div class="pd-width">
                                            <div class="style-table-tracking scroll-table">
                                              <table class="avoid-clicks none-border back-table">
                                                <tbody>
                                                <tr>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.totalFinalBookings.totalCheckinMonth }} / {{ hotel.totalFinalBookings.totalBookingMonth }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckinMonth == 0" style="color: #8A98AC">  {{ hotel.totalFinalBookings.totalCheckinPerMonth }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckinMonth == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalCheckinPerMonth }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckinMonth == 2" style="color: #F2C642">  {{ hotel.totalFinalBookings.totalCheckinPerMonth }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerCheckinMonth == 3" style="color: #FE0C05">  {{ hotel.totalFinalBookings.totalCheckinPerMonth }}</span>
                                                    ⁄
                                                    <span v-if="hotel.totalFinalBookings.colorPerBookingMonth == 0" style="color: #8A98AC">  {{ hotel.totalFinalBookings.totalBookingPerMonth }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerBookingMonth == 1" style="color: #6AA850">  {{ hotel.totalFinalBookings.totalBookingPerMonth }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerBookingMonth == 2" style="color: #F2C642">  {{ hotel.totalFinalBookings.totalBookingPerMonth }}</span>
                                                    <span v-if="hotel.totalFinalBookings.colorPerBookingMonth == 3" style="color: #FE0C05">  {{ hotel.totalFinalBookings.totalBookingPerMonth }}</span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    <span>{{ hotel.totalPromotionIssueCoupon.totalCheckinMonth }}</span>/ <span>{{ hotel.totalPromotionIssueCoupon.totalBookingMonth }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span>{{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinMonth }}</span>/ <span>{{ hotel.totalPromotionIssueCoupon.distinctTotalBookingMonth }}</span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionIssueCoupon.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionG2J100.totalCheckinMonth }} / {{ hotel.promotionG2J100.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2J100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionG2J100.distinctTotalCheckinMonth }} / {{ hotel.promotionG2J100.distinctTotalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.distinctTotalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2J100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2J100.distinctTotalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionG2JHotel.totalCheckinMonth }} / {{ hotel.promotionG2JHotel.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionG2JHotel.distinctTotalCheckinMonth }} / {{ hotel.promotionG2JHotel.distinctTotalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.distinctTotalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionG2JHotel.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.promotionG2JHotel.distinctTotalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionHotel100.totalCheckinMonth }} / {{ hotel.promotionHotel100.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionHotel100.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.promotionHotel100.distinctTotalCheckinMonth }} / {{ hotel.promotionHotel100.distinctTotalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.distinctTotalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.promotionHotel100.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.promotionHotel100.distinctTotalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.totalPromotionNoIssueCoupon.totalCheckinMonth }} / {{ hotel.totalPromotionNoIssueCoupon.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.totalPromotionNoIssueCoupon.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.directDiscount.totalCheckinMonth }} / {{ hotel.directDiscount.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.directDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.directDiscount.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.directDiscount.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.directDiscount.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.directDiscount.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.directDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.directDiscount.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.directDiscount.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.directDiscount.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.directDiscount.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.directDiscount.distinctTotalCheckinMonth }} / {{ hotel.directDiscount.distinctTotalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.directDiscount.distinctTotalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.directDiscount.distinctColorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.directDiscount.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.directDiscount.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.directDiscount.distinctTotalBookingPerMonth }} </span>
                                                    <span v-if="hotel.directDiscount.distinctColorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.directDiscount.distinctTotalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.specialOffer.totalCheckinMonth }} / {{ hotel.specialOffer.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.specialOffer.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.specialOffer.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.specialOffer.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.specialOffer.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.specialOffer.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.specialOffer.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.specialOffer.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.specialOffer.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.specialOffer.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.specialOffer.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.specialOffer.totalBookingPerMonth }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.flashSale.totalCheckinMonth }} / {{ hotel.flashSale.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.flashSale.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.flashSale.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.flashSale.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.flashSale.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.flashSale.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.flashSale.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.flashSale.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.flashSale.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.flashSale.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.flashSale.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.flashSale.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.flashSale.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.flashSale.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.flashSale.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.flashSale.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.flashSale.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.stamp.totalCheckinMonth }} / {{ hotel.stamp.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.stamp.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.stamp.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.stamp.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.stamp.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.stamp.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.stamp.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.stamp.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.stamp.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.stamp.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.stamp.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.stamp.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.stamp.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.stamp.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.stamp.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.stamp.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.stamp.totalBookingPerMonth }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.mileagePoint.totalCheckinMonth }} / {{ hotel.mileagePoint.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.mileagePoint.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.mileagePoint.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.mileagePoint.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.mileagePoint.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.mileagePoint.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.mileagePoint.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.mileagePoint.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.mileagePoint.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.mileagePoint.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.mileagePoint.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.mileagePoint.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.paymentPromotion.totalCheckinMonth }} / {{ hotel.paymentPromotion.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.paymentPromotion.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.paymentPromotion.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.paymentPromotion.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.paymentPromotion.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.paymentPromotion.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.paymentPromotion.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.paymentPromotion.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.paymentPromotion.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.paymentPromotion.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.paymentPromotion.totalBookingPerMonth }} </span>
                                                  </td>
                                                  <td style="width: 100px">
                                                    {{ hotel.extraFee.totalCheckinMonth }} / {{ hotel.extraFee.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.extraFee.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.extraFee.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.extraFee.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.extraFee.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.extraFee.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.extraFee.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.extraFee.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.extraFee.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.extraFee.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.extraFee.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.extraFee.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.extraFee.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.extraFee.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.extraFee.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.extraFee.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.extraFee.totalBookingPerMonth }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.hotelProduct.totalCheckinMonth }} / {{ hotel.hotelProduct.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.hotelProduct.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.hotelProduct.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.hotelProduct.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.hotelProduct.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.hotelProduct.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.hotelProduct.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.hotelProduct.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.hotelProduct.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.hotelProduct.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.hotelProduct.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.hotelProduct.totalBookingPerMonth }} </span>
                                                  </td>

                                                  <td style="width: 100px">
                                                    {{ hotel.bookingsNotDiscount.totalCheckinMonth }} / {{ hotel.bookingsNotDiscount.totalBookingMonth }}
                                                  </td>
                                                  <td style="width: 100px">
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckinMonth == 0" style="color: #8A98AC"> {{ hotel.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckinMonth == 1" style="color: #6AA850"> {{ hotel.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckinMonth == 2" style="color: #F2C642"> {{ hotel.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerCheckinMonth == 3" style="color: #FE0C05"> {{ hotel.bookingsNotDiscount.totalCheckinPerMonth }} </span>
                                                    ⁄
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBookingMonth == 0" style="color: #8A98AC"> {{ hotel.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBookingMonth == 1" style="color: #6AA850"> {{ hotel.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBookingMonth == 2" style="color: #F2C642"> {{ hotel.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                                    <span v-if="hotel.bookingsNotDiscount.colorPerBookingMonth == 3" style="color: #FE0C05"> {{ hotel.bookingsNotDiscount.totalBookingPerMonth }} </span>
                                                  </td>
                                                </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>

                                          <div class="pos_abs tracking">
                                            <button type="button" style="text-transform: none;" class="tbn-child btn btn-tracking-detail btn-title none-upper" >{{$t('page.bookingTracking.average')}}</button>
                                          </div>
                                          <div class="pd-width">
                                            <div class="style-table-tracking scroll-table">
                                              <table class="avoid-clicks none-border back-table">
                                                <tbody>
                                                <tr >
                                                  <td style="width: 100px"><span>{{ hotel.totalFinalBookings.totalCheckinYear }}</span> / <span> {{ hotel.totalFinalBookings.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.totalFinalBookings.totalCheckinPerYear }}</span> / <span> {{ hotel.totalFinalBookings.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.totalPromotionIssueCoupon.totalCheckinYear }}</span> / <span> {{ hotel.totalPromotionIssueCoupon.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.totalPromotionIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ hotel.totalPromotionIssueCoupon.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinYear }}</span> / <span>{{ hotel.totalPromotionIssueCoupon.distinctTotalBookingYear}}</span> </td>
                                                  <td style="width: 100px"><span>{{ hotel.totalPromotionIssueCoupon.distinctTotalCheckinPerYear }}</span> / <span>{{ hotel.totalPromotionIssueCoupon.distinctTotalBookingPerYear}}</span> </td>

                                                  <td style="width: 100px"><span>{{ hotel.promotionG2J100.totalCheckinYear }}</span> / <span> {{ hotel.promotionG2J100.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.promotionG2J100.totalCheckinPerYear }}</span> / <span> {{ hotel.promotionG2J100.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.promotionG2J100.distinctTotalCheckinYear }}</span> / <span>{{ hotel.promotionG2J100.distinctTotalBookingYear}}</span> </td>
                                                  <td style="width: 100px"><span>{{ hotel.promotionG2J100.distinctTotalCheckinPerYear }}</span> / <span>{{ hotel.promotionG2J100.distinctTotalBookingPerYear}}</span> </td>

                                                  <td style="width: 100px"><span>{{ hotel.promotionG2JHotel.totalCheckinYear }}</span> / <span> {{ hotel.promotionG2JHotel.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.promotionG2JHotel.totalCheckinPerYear }}</span> / <span> {{ hotel.promotionG2JHotel.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.promotionG2JHotel.distinctTotalCheckinYear }}</span> / <span>{{ hotel.promotionG2JHotel.distinctTotalBookingYear}}</span> </td>
                                                  <td style="width: 100px"><span>{{ hotel.promotionG2JHotel.distinctTotalCheckinPerYear }}</span> / <span>{{ hotel.promotionG2JHotel.distinctTotalBookingPerYear}}</span> </td>

                                                  <td style="width: 100px"><span>{{ hotel.promotionHotel100.totalCheckinYear }}</span> / <span> {{ hotel.promotionHotel100.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.promotionHotel100.totalCheckinPerYear }}</span> / <span> {{ hotel.promotionHotel100.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.promotionHotel100.distinctTotalCheckinYear }}</span> / <span>{{ hotel.promotionHotel100.distinctTotalBookingYear}}</span> </td>
                                                  <td style="width: 100px"><span>{{ hotel.promotionHotel100.distinctTotalCheckinPerYear }}</span> / <span>{{ hotel.promotionHotel100.distinctTotalBookingPerYear}}</span> </td>

                                                  <td style="width: 100px"><span>{{ hotel.totalPromotionNoIssueCoupon.totalCheckinYear }}</span> / <span> {{ hotel.totalPromotionNoIssueCoupon.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.totalPromotionNoIssueCoupon.totalCheckinPerYear }}</span> / <span> {{ hotel.totalPromotionNoIssueCoupon.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.directDiscount.distinctTotalCheckinYear }}</span> / <span>{{ hotel.directDiscount.distinctTotalBookingYear}}</span> </td>
                                                  <td style="width: 100px"><span>{{ hotel.directDiscount.distinctTotalCheckinPerYear }}</span> / <span>{{ hotel.directDiscount.distinctTotalBookingPerYear}}</span> </td>

                                                  <td style="width: 100px"><span>{{ hotel.directDiscount.totalCheckinYear }}</span> / <span> {{ hotel.directDiscount.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.directDiscount.totalCheckinPerYear }}</span> / <span> {{ hotel.directDiscount.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.specialOffer.totalCheckinYear }}</span> / <span> {{ hotel.specialOffer.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.specialOffer.totalCheckinPerYear }}</span> / <span> {{ hotel.specialOffer.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.flashSale.totalCheckinYear }}</span> / <span> {{ hotel.flashSale.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.flashSale.totalCheckinPerYear }}</span> / <span> {{ hotel.flashSale.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.stamp.totalCheckinYear }}</span> / <span> {{ hotel.stamp.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.stamp.totalCheckinPerYear }}   </span> / <span> {{ hotel.stamp.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.mileagePoint.totalCheckinYear }}</span> / <span> {{ hotel.mileagePoint.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.mileagePoint.totalCheckinPerYear }}</span> / <span> {{ hotel.mileagePoint.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.paymentPromotion.totalCheckinYear }}</span> / <span> {{ hotel.paymentPromotion.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.paymentPromotion.totalCheckinPerYear }}</span> / <span> {{ hotel.paymentPromotion.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.extraFee.totalCheckinYear }}</span> / <span> {{ hotel.extraFee.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.extraFee.totalCheckinPerYear }}</span> / <span> {{ hotel.extraFee.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.hotelProduct.totalCheckinYear }}</span> / <span> {{ hotel.hotelProduct.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.hotelProduct.totalCheckinPerYear }}</span> / <span> {{ hotel.hotelProduct.totalBookingPerYear }}</span></td>

                                                  <td style="width: 100px"><span>{{ hotel.bookingsNotDiscount.totalCheckinYear }}</span> / <span> {{ hotel.bookingsNotDiscount.totalBookingYear }}</span></td>
                                                  <td style="width: 100px"><span>{{ hotel.bookingsNotDiscount.totalCheckinPerYear }}</span> / <span> {{ hotel.bookingsNotDiscount.totalBookingPerYear }}</span></td>
                                                </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  </template>
                                </div>
                              </section>
                            </div>
                          </template>
                        </div>
                      </section>
                    </div>
                  </template>

                </div>
              </div>

            </div>
            <!-- </div> -->
          </div>
          <!-- -->
        </div>
        <div v-else-if="region == null">
          <div class="card m-b-30" style="text-align: center;padding: 20px;">
            <h2><i class="el-icon-loading"></i></h2>
            <h2> {{$t('loading')}} ...</h2>
          </div>
        </div>
        <div v-if="!loading && Object.keys(region).length == 0">
          <div class="" style="text-align: center;padding: 20px;">
            <p>{{$t('no_data')}}</p>
          </div>
        </div>
        <!-- End col -->
    </div>
</div>
</sa-section>
</template>
<script>
import ScrollMagic from 'scrollmagic'
import { debounce } from '@/utils/helpers'
import {
  getTrackingRegion
} from './api'
import SaSection from '@/components/globals/SaSection'
const timeDebounce = 500
export default {
  name: 'BookingTracking',
  components: {
    SaSection
  },
  data () {
    return {

      ui: {
        isLoading: true
      },
      loading: true,
      dateFrom: '',
      dateTo: '',
      region: null,
      regionTotalRes: [],
      provinces: [],
      district: [],
      dateRange: [],
      lang: '',
      count: 1,
      filter: {
        dateFrom: '',
        dateTo: '',
        limit: 10,
        page: 1
      }
    }
  },
  async created () {
    this.getFromToDate()
    this.dateRange = [this.filter.dateFrom, this.filter.dateTo]
    await this.getDataFirst()
    this.doubleScroll()
  },
  watch: {
    dateRange (value) {
      if (!value) {
        delete this.filter.dateFrom
        delete this.filter.dateTo
      } else {
        this.filter.dateFrom = value[0]
        this.filter.dateTo = value[1]
      }
    }
  },
  computed: {
    regionTotal () {
      return this.regionTotalRes
    }
  },

  methods: {
    getFromToDate () {
      const date = new Date()
      if (date.getDate() > 1) {
        this.filter.dateTo = this.formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1), false)
        date.setDate(1)
        this.filter.dateFrom = this.formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()), false)
      } else if (date.getDate() === 1) {
        this.filter.dateTo = this.formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1), false)
        date.setDate(1)
        this.filter.dateFrom = this.formatDate(new Date(date.getFullYear(), (date.getMonth() - 1), date.getDate()), false)
      }
    },
    searchTracking: debounce(function (keySearch) {
      this.getDataFirst()
    }, timeDebounce),

    async getDataFirst () {
      this.ui.isLoading = true
      const params = {
        trackingType: 0,
        trackingSn: 0,
        startDate: this.filter.dateFrom,
        endDate: this.filter.dateTo
      }
      try {
        const { data } = await getTrackingRegion(params)
        const dataRes = data.data
        this.region = dataRes[0]
        if (dataRes.length > 1) {
          this.regionTotalRes = dataRes.slice(1)
        }
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
    }, // getDataRegion
    getDataTable (dataTable, number) {
      if (!number && number !== 0) {
        return
      }
      if (number === 0) {
        this.getDataRegion(dataTable)
      } else if (number === 1) {
        this.getDataProvince(dataTable)
      } else if (number === 2) {
        this.getDataDistrict(dataTable)
      } else {

      }
    }, // getDataTable
    async getDataRegion (dataRegion) {
      if (!dataRegion) {
        return
      }
      this.ui.isLoading = true
      const params = {
        trackingType: dataRegion.trackingType,
        trackingSn: dataRegion.trackingSn,
        startDate: this.filter.dateFrom,
        endDate: this.filter.dateTo
      }
      try {
        const { data } = await getTrackingRegion(params)
        dataRegion.provinces = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
      return dataRegion
    }, // getDataRegion
    async getDataProvince (dataProvince) {
      if (!dataProvince) {
        return
      }
      this.ui.isLoading = true
      const params = {
        trackingType: dataProvince.trackingType,
        trackingSn: dataProvince.trackingSn,
        startDate: this.filter.dateFrom,
        endDate: this.filter.dateTo
      }
      try {
        const { data } = await getTrackingRegion(params)
        dataProvince.districts = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
      return dataProvince
    }, // getDataProvince
    async getDataDistrict (dataDistrict) {
      if (!dataDistrict) {
        return
      }
      this.ui.isLoading = true
      const params = {
        trackingType: dataDistrict.trackingType,
        trackingSn: dataDistrict.trackingSn,
        startDate: this.filter.dateFrom,
        endDate: this.filter.dateTo
      }
      try {
        const { data } = await getTrackingRegion(params)
        dataDistrict.hotels = data.data
      } catch (error) {
        return false
      } finally {
        this.ui.isLoading = false
      }
      return dataDistrict
    }, // getDataDistrict

    async activeCollapse (className, dataTable, number) {
      if (!className) {
        return
      }
      var classColl = document.getElementsByClassName(className)[0]
      if (classColl.style.display === 'block') {
        classColl.style.display = 'none'
      } else {
        this.getDataTable(dataTable, number)
        classColl.style.display = 'block'
      }
    }, // activeCollapse

    doubleScroll () {
      const x = document.getElementById('block-scroll-first')
      const y = document.getElementById('block-scroll-second')
      y.addEventListener('scroll', function (e) {
        x.scrollLeft = y.scrollLeft
      })
      var elem = document.getElementsByClassName('content-table__post-sidebar')
      const postSidebar = elem[0]
      const scoll1 = document.getElementById('block-scroll-first')
      if (postSidebar && !postSidebar.parentNode.classList.contains('scrollmagic-pin-spacer')) {
        const controller = new ScrollMagic.Controller()
        const scene = new ScrollMagic.Scene({
          triggerElement: postSidebar,
          triggerHook: 0,
          duration: 0
        }).addTo(controller)
        if (window.matchMedia('(min-width: 768px)').matches) {
          scene.setPin(postSidebar, { pushFollowers: false })
        }
        scoll1.style.width = window.getComputedStyle(document.getElementById('block-scroll-second')).width
      }
    }
  }

}
</script>

<style lang="scss" scoped>

button{
  cursor: pointer;
}
.collapsible{
  width: 100%;
  display: none;
}
.post-sidebar div {
    font-weight: bold;
    background: #fbfbfb;
}

.btn-tracking-detail {
    color: #444 !important;
    background-color: #fff !important;
    border-color: #ccc !important;
}
.style-title-tracking {
    background-color: #427fed;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    border: 1px solid #00328c;
}
.scroll-table table {
    width: 100%;
}

.style-table-tracking table {
    table-layout: fixed !important;
    width: 100% !important;
    border-collapse: inherit;
}
table.info {
    margin: 0;
}
.tracking .btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}
.tbn-child {
    width: 100%;
    height: 40px;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
}
td {
    word-wrap: break-word !important;
}
.post {
    padding: 50px;
}
.post p+p {
    margin-top: 30px;
}
.post-desc {
    margin-top: 30px;
}

.post-sidebar div {
    font-weight: bold;
    background: #fbfbfb;
}

.post-sidebar div+div {
    margin-top: 0px;
}

.post-sidebar a {
    font-weight: normal;
    color: black;
    text-decoration: none;
}
@media only screen and (min-width: 1600px) {
    .style-width {
        width: 98.9%;
    }

}
.pd-width{
  padding-left: 250px;
  width: 2000px;
}
#block-scroll-first {
  margin:0;
  overflow-x: auto;
  overflow: hidden;
}
#block-scroll-second {
  overflow: auto;
}
.layout-tracking-booking ::-webkit-scrollbar {
    width: 12px;
}
.layout-tracking-booking ::-webkit-scrollbar-thumb {
    width: 12px;
    background: #c1c1c1;
}
.layout-tracking-booking ::-webkit-scrollbar-thumb:hover{
    width: 12px;
    background: #999999;
}
.tracking .btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}
.tracking .btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.tracking .btn-danger {
    color: #fff;
    background-color: #c9302c;
    border-color: #ac2925;
}
.tracking .btn-info {
    color: #ffffff;
    background-color: #00b8d4;
    border-color: #00b8d4;
    box-shadow: unset;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.style-table-tracking tbody tr td {
    text-align: center;
    height: 40px;
    border: 1px solid #ccc;
    font-weight: 700;
    font-size: 10px;
    vertical-align: middle;
}
.tracking .btn-warning {
    color: #ffffff;
    background-color: #e69700;
    border-color: #e69700;
    box-shadow: unset;
}
.tracking .btn_action:focus{
    box-shadow: unset !important;
}

.style-table-tracking table{
    border-collapse: collapse !important;
}
.btn-tracking-detail{
    color: #444;
    background-color: #fff;
    border-color: #ccc;
}
.pos_abs {
  width: 250px;
  position: absolute;
  float: left;
  button {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    border-radius: 3px;
    padding: 6px 12px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .btn-total {
      width: 100%;
      height: 155px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 22px;
      box-shadow: none;
  }
}
.tracking-booking-block{
    min-height: calc(100vh - 150px );
    background-color: #ffffff;
    // padding: 30px;
    &__date-search {
      display: flex;
      align-items: center;
      gap: 15px;
      @media only screen and (max-width: 480px) {
        display:block !important;
      }
    }
    &__policy {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 20px 15px
    }
    &__content-table {
      .content-table {
        width:100%;
        &__post-sidebar {
          z-index: 1004;
          padding-top: 60px;
          left: auto !important;
          width: 100% !important;
          top:0px;
          .post-sidebar-inner {
            background: #ffffff;
            width: 100%;
            padding: 0px 0 0 0 !important;

            #block-scroll-first {
              margin: 0;
              margin-left: 0px;
              overflow-x: auto;
              overflow: hidden;
              .pd-width {
                padding-left: 250px;
                width: 2000px;
              }
            }
          }
        }
      }
    }
}
</style>

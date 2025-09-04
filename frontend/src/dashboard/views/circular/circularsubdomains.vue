<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <div fluid class="topAction">
      <download-csv :data="json_data" name="filename.csv" v-if="false">
        <v-btn class="customButton">Download CSV</v-btn>
      </download-csv>

      <button class="customButton" v-if="!loadingReportAll">
        Generating Report Please Wait ...
      </button>
      <button
        class="customButton"
        @click="showSubdomainReport"
        v-if="loadingReportAll && !showcolortable"
      >
        Active Member Subdomain
        <i class="fa fa-eye" v-if="showCount != 'Hide'"></i>
        <i class="fa fa-eye-slash" v-if="showCount != 'Show'"></i>
      </button>
      <button
        class="customButton"
        @click="printb"
        v-if="showCount == 'Hide' && logged == 'admin'"
      >
        Download
      </button>
      <button
        type="button"
        class="customButton"
        @click="showColorTable"
        v-if="!viewSubdomain"
      >
        Color Table <i class="fa fa-eye" v-if="!showcolortable"></i>
        <i class="fa fa-eye-slash" v-if="showcolortable"></i>
      </button>
    </div>
    <div class="pillmain px-5 py-5" v-if="showcolortable && !viewSubdomain">
      <div class="pillbox">
        <table border="1" class="table table-responsive pdfbox">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Subdomain</th>
              <th>Total Count</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(colordata, index) in allColorData.results"
              :key="index"
              :class="{ redbox: colordata.totalActiveMember == 0 }"
              class="greenbox"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ colordata.name }}</td>
              <td>{{ colordata.totalActiveMember }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="insidepadding" v-if="viewSubdomain && !showcolortable">
      <div class="pillmain">
        <div class="pillbox">
          <ul class="distbtn">
            <li @click="showAllDataSubdomainCount" class="loaddata">
              <label for>प्रदेश</label>
              <v-selection
                v-model="province"
                placeholder="Province"
                :options="allProvices"
                label="province"
                :filterable="true"
                :value="selectProvinceInTotal(province)"
              ></v-selection>
              <v-btn @click="loaddata" class="btn btn-default">Load</v-btn>
            </li>
          </ul>
          <ul class="distbtn">
            <li
              @click="showAllDataSubdomainCount"
              v-bind:class="{ activebtn: allsubdomain }"
            >
              All
            </li>
            <li
              @click="showAllDataSubdomainCount"
              v-bind:class="{ activebtn: !allsubdomain }"
            >
              District Only
            </li>
          </ul>
          <div v-if="loadingspecificall">
            <table
              class="table table-responsive pdfbox"
              v-if="!showSomeTime"
              ref="doc1"
            >
              <thead>
                <tr>
                  <th v-for="(heading, index) in headersreport" :key="index">
                    {{ heading.text }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="allsubdomain">
                <tr v-for="(body, index) in this.allReport.posts" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ body.place }}</td>
                  <td>{{ body.count }}</td>
                </tr>
              </tbody>
              <tbody v-if="!allsubdomain">
                <tr
                  v-for="(body, index) in this.allReport.district"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ body.place }}</td>
                  <td>{{ body.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pillmain centerload" v-if="!loadingspecificall">
            <img
              :src="require(`@/assets/images/icons/la.svg`)"
              alt
              class="loading"
              width="50px"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="insidepadding" v-if="!viewSubdomain && !showcolortable">
      <div class="grid-container">
        <v-col>
          <label for>सबडोमेन कोटि</label>

          <div class="grid-item">
            <v-selection
              v-model="subdomainCategory"
              placeholder="सबडोमेन कोटि"
              :options="[
                'जिल्ला कार्यसमितिहरु',
                'नेपाली जनसम्पर्क समितिहरु',
                'कृयसिल नम्बर',
              ]"
              :filterable="true"
            ></v-selection>
          </div>
        </v-col>
      </div>

      <v-form v-if="subdomainCategory == 'कृयसिल नम्बर'">
        <div class="grid-container">
          <v-col>
            <div class="grid-item">
              <v-text-field
                label="कृयसिल नम्बर"
                v-model="workingformnumber"
                placeholder="xxxxxxxxxxxxxx/14"
                outlined
              ></v-text-field>
            </div>
          </v-col>
          <v-col>
            <div class="grid-item">
              <v-text-field
                label="पुरानो कृयसिल नम्बर"
                v-model="workingformnumberold"
                placeholder="xxxxxxxxxxxxxx/13-14"
                outlined
              ></v-text-field>
            </div>
          </v-col>
          <!-- Add your button in the grid -->
        </div>
        <div class="button-container">
          <button class="submit-button">Submit</button>
        </div>
      </v-form>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        v-if="subdomainCategory == 'नेपाली जनसम्पर्क समितिहरु'"
      >
        <v-row>
          <v-col md="3">
            <v-selection
              v-model="district"
              placeholder="Select Country"
              :options="counties"
              :filterable="true"
            ></v-selection>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="">
            <div class="button-container">
              <button
                type="button"
                class="submit-button"
                @click="filterActive"
                v-if="!allloadingActive"
              >
                Filter
              </button>
              <button
                type="button"
                class="submit-button"
                @click="filterActive"
                v-if="allloadingActive"
              >
                <v-progress-circular
                  indeterminate
                  color="white"
                  size="20"
                  width="2"
                ></v-progress-circular>
              </button>
            </div>
          </v-col>
        </v-row>
      </v-form>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        v-if="subdomainCategory == 'जिल्ला कार्यसमितिहरु'"
      >
        <div class="grid-container">
          <div class="grid-item">
            <v-col>
              <label for>प्रदेश</label>
              <v-selection
                v-model="province"
                placeholder="Province"
                :options="allProvices"
                label="name"
                :filterable="true"
                @input="selectProvince(province)"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item">
            <v-col>
              <label for>जिल्ला</label>
              <v-selection
                v-model="district"
                placeholder="जिल्ला"
                :options="allDistrict"
                label="name"
                :filterable="true"
                :value="selectDistrict(district)"
              ></v-selection>
            </v-col>
          </div>

          <div class="grid-item" v-if="district != ''">
            <v-col>
              <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
              <v-selection
                v-model="houseofrepresentative"
                placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                :options="representatives"
                label="code"
                :filterable="true"
                :value="regionFunc(houseofrepresentative)"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item" v-if="houseofrepresentative != ''">
            <v-col>
              <label for>प्रदेश सभा क्षेत्र</label>
              <v-selection
                v-model="pradeshassemblyconstituency"
                placeholder="प्रदेश सभा क्षेत्र"
                :options="regions"
                label="code"
                :filterable="true"
                :value="municipalityFunc(pradeshassemblyconstituency)"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item" v-if="pradeshassemblyconstituency != ''">
            <v-col>
              <label for>न.पा./गा.पा.</label>
              <v-selection
                v-model="municipality"
                placeholder="न.पा./गा.पा."
                :options="municipalities"
                label="name"
                :filterable="true"
                :value="wardFunc(municipality)"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item" v-if="municipality != ''">
            <v-col>
              <label for>वडा नं.</label>
              <v-selection
                v-model="wardno"
                placeholder="वडा नं."
                :options="wards"
                :filterable="true"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item" v-if="district != ''">
            <v-col>
              <label for>लिङ्ग</label>
              <v-selection
                v-model="gender"
                placeholder="सबै"
                :options="genders"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item" v-if="district != ''">
            <v-col>
              <label for>Member Type</label>
              <v-selection
                v-model="memberType"
                placeholder="Member Type"
                :options="groupofs"
              ></v-selection>
            </v-col>
          </div>
          <div class="grid-item" v-if="district != ''">
            <v-col>
              <label for>समावेशी समूह</label>
              <v-selection
                v-model="inclusivegroup"
                placeholder="समावेशी समूह"
                :options="inclusivegroups"
              ></v-selection>
            </v-col>
          </div>
        </div>
        <v-col class="">
          <div class="button-container">
            <button
              type="button"
              class="submit-button"
              @click="filterActive"
              v-if="!allloadingActive"
            >
              Filter
            </button>
            <button
              type="button"
              class="submit-button"
              @click="filterActive"
              v-if="allloadingActive"
            >
              <v-progress-circular
                indeterminate
                color="white"
                size="20"
                width="2"
              ></v-progress-circular>
            </button>
          </div>
        </v-col>
      </v-form>

      <ul
        class="switchLayout"
        v-if="allFilterData.posts != undefined && logged == 'admin'"
      >
        <li
          @click="switchLayout('table')"
          v-bind:class="{ active: layout == 'table' }"
        >
          table view
        </li>
        <li
          @click="switchLayout('chart')"
          v-bind:class="{ active: layout == 'chart' }"
        >
          detail view
        </li>
      </ul>

      <div v-if="loading" class="mr-btm">
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
      </div>

      <template v-if="allFilterData.posts != undefined && !loading">
        <div v-if="layout == 'table'" class="px-5">
          <div class="actionButton">
            <div class="totalData">
              {{ allFilterData.pagination.total }}
              <span class="pl-2">कुल सक्रिय संख्या</span>
            </div>
            <div class="actionList">
              <v-checkbox v-model="isSign" label="Need Signature ?">
              </v-checkbox>
              <button
                v-if="
                  layout == 'table' &&
                  (logged == 'admin' || logged == 'activecontrol')
                "
                @click="printCSV"
              >
                Export Excel
              </button>
              <button
                v-if="
                  layout == 'table' &&
                  (logged == 'admin' || logged == 'activecontrol')
                "
                @click="printa"
              >
                {{ exportPDF }}
              </button>
              <div class="selectLimit">
                <v-selection
                  v-model="limit"
                  placeholder="Limit"
                  :options="limits"
                  label="code"
                ></v-selection>
              </div>
            </div>
          </div>

          <div class="pdfbox">
            <ul class="imageheader top">
              <li class="no-header">
                <img :src="require(`@/assets/images/flag.jpg`)" alt />
              </li>
              <li>
                <h1 class="no-header">नेपाली कांग्रेसको</h1>
                <h2 class="no-header">क्रियाशिल सदस्यताको विवरण</h2>
                <v-row>
                  <div class="centertext">
                    <span v-if="memberType != 'Old'">नयाँ </span>
                    <span v-if="memberType != 'New'">नवीकरण </span>
                  </div>
                </v-row>
                <ul class="fromdata">
                  <li v-if="district.name != undefined">
                    <strong>प्रदेश</strong>
                    : <span>{{ selectP[0].label }} </span>
                  </li>
                  <li v-if="district.name != undefined" class="no-print">
                    <strong>प्रकार</strong>
                    : <span v-if="memberType != 'Old'">नयाँ </span>
                    <span v-if="memberType != 'New'">नवीकरण </span>
                  </li>
                  <li v-if="district.name != undefined">
                    <strong>जिल्ला</strong>
                    : {{ district.name }}
                  </li>
                  <li v-if="houseofrepresentative.code != undefined">
                    <strong>प्रतिनिधिसभा नि.क्षे.नं.</strong>
                    : {{ houseofrepresentative.code }}
                  </li>
                  <li v-if="pradeshassemblyconstituency.code != undefined">
                    <strong>प्रदेश सभा क्षेत्र</strong>
                    :{{ pradeshassemblyconstituency.code }}
                  </li>
                  <li v-if="municipality.name != undefined">
                    <strong>न.पा./गा.पा.</strong>
                    : {{ municipality.name }}
                  </li>
                  <li v-if="wardno != undefined">
                    <strong>वडा नं.</strong>
                    : {{ wardno }}
                  </li>
                  <li v-if="inclusivegroup != undefined">
                    <strong>समावेशी समूह</strong>
                    : {{ inclusivegroup }}
                  </li>
                  <li v-if="gender != undefined">
                    <strong>लिङ्ग</strong>
                    : {{ gender }}
                  </li>
                </ul>
              </li>
              <li class="no-header">
                <img :src="require(`@/assets/images/tree.png`)" alt />
              </li>
            </ul>
          </div>

          <section class="pdfbox" ref="doc">
            <table
              class="report-container"
              border="1"
              v-if="allFilterData.posts != undefined"
            >
              <thead class="report-header-top">
                <tr class="report-header">
                  <th colspan="9">
                    <ul class="imageheader top">
                      <li class="no-header">
                        <img :src="require(`@/assets/images/flag.jpg`)" alt />
                      </li>
                      <li>
                        <h1 class="no-header">नेपाली कांग्रेसको</h1>
                        <h2 class="no-header">क्रियाशिल सदस्यताको विवरण</h2>
                        <v-row>
                          <div class="centertext">
                            <span v-if="memberType != 'Old'">नयाँ </span>
                            <span v-if="memberType != 'New'">नवीकरण </span>
                          </div>
                        </v-row>
                        <ul class="fromdata">
                          <li v-if="district.name != undefined">
                            <strong>प्रदेश</strong>
                            : <span>{{ selectP[0].label }} </span>
                          </li>
                          <li
                            v-if="district.name != undefined"
                            class="no-print"
                          >
                            <strong>प्रकार</strong>
                            : <span v-if="memberType != 'Old'">नयाँ </span>
                            <span v-if="memberType != 'New'">नवीकरण </span>
                          </li>
                          <li v-if="district.name != undefined">
                            <strong>जिल्ला</strong>
                            : {{ district.name }}
                          </li>
                          <li v-if="houseofrepresentative.code != undefined">
                            <strong>प्रतिनिधिसभा नि.क्षे.नं.</strong>
                            : {{ houseofrepresentative.code }}
                          </li>
                          <li
                            v-if="pradeshassemblyconstituency.code != undefined"
                          >
                            <strong>प्रदेश सभा क्षेत्र</strong>
                            :{{ pradeshassemblyconstituency.code }}
                          </li>
                          <li v-if="municipality.name != undefined">
                            <strong>न.पा./गा.पा.</strong>
                            : {{ municipality.name }}
                          </li>
                          <li v-if="wardno != undefined">
                            <strong>वडा नं.</strong>
                            : {{ wardno }}
                          </li>
                          <li v-if="inclusivegroup != undefined">
                            <strong>समावेशी समूह</strong>
                            : {{ inclusivegroup }}
                          </li>
                          <li v-if="gender != undefined">
                            <strong>लिङ्ग</strong>
                            : {{ gender }}
                          </li>
                        </ul>
                      </li>
                      <li class="no-header">
                        <img :src="require(`@/assets/images/tree.png`)" alt />
                      </li>
                    </ul>
                  </th>
                </tr>
                <tr class="trborder">
                  <th
                    v-for="(heading, index) in headings"
                    :key="index"
                    :class="{ 'no-print': !heading.printStatus }"
                  >
                    <div>{{ heading.name }}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(body, index) in allFilterData.posts" :key="index">
                  <td class="widthSN">
                    {{ index + 1 + (skip - 1 > 0 ? limit * (skip - 1) : 0) }}
                  </td>
                  <td class="withName">{{ body.workingformnumber }}</td>
                  <td class="withName">{{ body.membername }}</td>
                  <td class="withName">{{ body.fathermothername }}</td>
                  <td class="withName">
                    <span v-if="body.husbandwifename != 'N/A'">{{
                      body.husbandwifename
                    }}</span>
                  </td>
                  <td class="width20">{{ body.gender }}</td>
                  <td class="width20">{{ body.age }}</td>

                  <td class="width30">
                    <span></span>
                    <span>{{
                      body.inclusivegroup == "आदिवासी जनजाति"
                        ? "आ.ज."
                        : body.inclusivegroup
                    }}</span>
                  </td>
                  <td class="no-print">{{ body.profession }}</td>
                  <td class="width20 no-print">{{ body.kaifiyat }}</td>

                  <td class="width20">
                    <div
                      class="actionbtn no-print"
                      v-if="logged == 'admin' || logged == 'activecontrol'"
                    >
                      <i class="fa fa-pencil" @click="editItem(body)"></i>
                      <i class="fa fa-trash" @click="editItem(body)"></i>
                      <v-checkbox
                        type="checkbox"
                        v-model="deleteSelection[index]"
                        :value="body.workingformnumber"
                      >
                      </v-checkbox>
                    </div>
                  </td>
                </tr>
                <tr class="no-print">
                  <td colspan="15" class="flextd">
                    Total : {{ allFilterData.pagination.total }}
                    <span
                      class="btnatc"
                      v-if="logged == 'admin' || logged == 'activecontrol'"
                    >
                      <v-btn
                        class="deleteSelected"
                        v-if="deleteSelection.length > 0 && deleteSelection"
                        @click="deleteMultiple"
                        >Delete Selected</v-btn
                      >
                    </span>
                    <span
                      class="btnatc1"
                      v-if="logged == 'admin' || logged == 'activecontrol'"
                    >
                      <v-btn
                        class="unselect"
                        v-if="deleteSelection.length > 0 && deleteSelection"
                        @click="unSelectDelete"
                        >Unselect</v-btn
                      >
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot class="report-footer" v-if="isSign">
                <tr></tr>
                <tr>
                  <td colspan="9">
                    <div>
                      <ul class="imageheader bottom">
                        <li class="signatureBox">
                          <img :src="require(`@/assets/images/two.png`)" alt />
                          <ul class="flexlist">
                            <li>( रमेश लेखक)</li>
                            <li>संयोजक</li>
                            <li>केन्द्रीय क्रियाशील सदस्यता छानविन समिति</li>
                          </ul>
                        </li>
                        <li></li>
                        <li class="signatureBox">
                          <img :src="require(`@/assets/images/one.png`)" alt />
                          <ul class="flexlist">
                            <li>(शेरबहादुर देउवा)</li>
                            <li>सभापति</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
        <div v-if="layout == 'chart'" class="px-5">
          <div class="actionButton">
            <button
              v-if="
                layout == 'chart' &&
                (logged == 'admin' || logged == 'activecontrol')
              "
              @click="printa"
            >
              {{ exportPDF }}
            </button>
          </div>

          <section class="pdfbox" ref="document">
            <ul class="imageheader">
              <li>
                <img :src="require(`@/assets/images/flag.jpg`)" alt />
              </li>
              <li>
                <h1>नेपाली कांग्रेसको</h1>
                <h2>क्रियाशिल सदस्यताको विवरण</h2>
                <ul class="fromdata">
                  <li v-if="district.name != undefined">
                    <strong>जिल्ला</strong>
                    : {{ district.name }}
                  </li>
                  <li v-if="houseofrepresentative.code != undefined">
                    <strong>प्रतिनिधिसभा नि.क्षे.नं.</strong>
                    : {{ houseofrepresentative.code }}
                  </li>
                  <li v-if="pradeshassemblyconstituency.code != undefined">
                    <strong>प्रदेश सभा क्षेत्र</strong>
                    : {{ pradeshassemblyconstituency.code }}
                  </li>
                  <li v-if="municipality.name != undefined">
                    <strong>प्रदेश सभा क्षेत्र</strong>
                    : {{ municipality.name }}
                  </li>
                  <li v-if="wardno != undefined">
                    <strong>वडा नं.</strong>
                    : {{ wardno }}
                  </li>
                  <li v-if="inclusivegroup != undefined">
                    <strong>समावेशी समूह</strong>
                    : {{ inclusivegroup }}
                  </li>
                  <li v-if="gender != undefined">
                    <strong>लिङ्ग</strong>
                    : {{ gender }}
                  </li>
                </ul>
              </li>
              <li>
                <img :src="require(`@/assets/images/tree.png`)" alt />
              </li>
            </ul>
            <div>
              <div class="gridchart">
                <div class="gridview">
                  <ChartAndTable
                    :datachart="[
                      {
                        title: 'कुल फोन नम्बर प्रविष्ट गरियो',
                        count: allChartData.totalPhoneAdded,
                      },
                      {
                        title: 'कुल फोन नम्बर प्रविष्ट गरिएको छैन',
                        count: allChartData.totalPhoneNotAdded,
                      },
                    ]"
                    title="कुल फोन नम्बर जानकारी"
                    :totalAll="allChartData.totalActive"
                    :totalDAll="allChartData.totalActive"
                    :status="true"
                  />
                </div>
                <div class="gridview">
                  <ChartAndTable
                    :datachart="allChartData.totalAllInclusive"
                    title="सबै समावेशी समूह"
                    :totalAll="allChartData.totalActive"
                    :totalDAll="allChartData.totalActive"
                    :status="true"
                  />
                </div>
                <div class="gridview">
                  <ChartAndTable
                    :datachart="allChartData.totalAllGender"
                    title="सबै लिङ्ग"
                    :totalAll="allChartData.totalActive"
                    :totalDAll="allChartData.totalActive"
                    :status="true"
                  />
                </div>
                <div class="gridview">
                  <ChartAndTable
                    :datachart="allChartData.totalAll"
                    :totalAll="allChartData.totalActive"
                    :totalDAll="allChartData.totalActive"
                    title="सबै सदस्यता समूह"
                    :status="true"
                  />
                </div>
                <div class="gridview">
                  <ChartAndTable
                    :datachart="this.allChartData.totalAllAge"
                    :totalAll="allChartData.totalActive"
                    :totalDAll="allChartData.totalActive"
                    title="उमेर"
                    :status="true"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>

      <ul
        class="switchLayout mr-btm"
        v-if="allFilterData.pagination != undefined"
      >
        <li @click="prevPage" v-if="allFilterData.pagination.previous">
          Previous
          <span> {{ allFilterData.pagination.previous + 1 }}</span>
        </li>
        <li>
          {{ (allFilterData.pagination.total / limit).toFixed(0) }}
          <strong>pages</strong>
        </li>
        <li @click="nextPage" v-if="allFilterData.pagination.next">
          Next <span> {{ allFilterData.pagination.next }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import ChartAndTable from "./chartAndTable";
import { mapGetters, mapActions } from "vuex";
import html2pdf from "html2pdf.js";
import Printd from "printd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { secureStorage } from "../../../main";

export default {
  name: "CircularSubdomain",
  components: {
    TitleBreadCrumb,
    ChartAndTable,
  },
  data: () => ({
    municipality: "",
    viewSubdomain: false,
    showCount: "Show",
    wardno: undefined,
    regions: [],
    wards: [],
    layout: "table",
    municipalities: [],
    provicedata: [],
    title: "Active Member Subdomain Report",
    workingformnumber: "",
    workingformnumberold: "",
    inclusivegroups: [
      "महिला",
      "आदिवासी जनजाति",
      "दलित",
      "मधेशी",
      "खस आर्य",
      "थारु",
      "मुस्लिम",
      "पिछडिएको क्षेत्र",
      "अपाङ्गता भएका",
      "अल्पसंख्यक",
    ],
    proviceslist: [
      {
        name: "1",
        label: "1",
      },
      {
        name: "2",
        label: "2",
      },
      {
        name: "3",
        label: "बागमति",
      },
      {
        name: "4",
        label: "गण्डकी",
      },
      {
        name: "5",
        label: "लुम्बिनी",
      },
      {
        name: "6",
        label: "कर्णाली",
      },
      {
        name: "7",
        label: "सुदुरपश्चिम",
      },
    ],
    counties: [
      "अष्ट्रेलिया",
      " बहराइन",
      "बेल्जियम ",
      "क्यानडा",
      "चीन",
      "साइप्रस",
      "डेनमार्क",
      "फिनल्याण्ड",
      "फ्रान्स",
      "जर्मनी",
      " हङकङ",
      "भारत",
      "आयरल्यान्ड",
      "इजरायल",
      "इटाली",
      "जापान",
      "कुवेत",
      "लक्जमबर्ग",
      " मकाउ",
      "मलेशिया",
      "नेदरल्याण्ड्स",
      "न्यूजिल्याण्ड",
      "नर्वे",
      "ओमान",
      "पोल्याण्ड",
      "पोर्चुगल",
      "कतार",
      "दक्षिण कोरिया",
      "स्पेन",
      "साउदी अरेबिया",
      "स्वीडेन",
      "स्वीट्जरल्याण्ड",
      "युएई",
      "बेलायत",
      "अमेरिका",
      "माल्टा",
    ],
    logged: undefined,
    groupof: "",
    groupofs: ["New", "Old"],
    loading: false,
    subdomainCategory: undefined,
    headings: [
      {
        name: "क्र.स.",
        printStatus: true,
      },
      {
        name: "क्रियाशील नं.",
        printStatus: true,
      },
      {
        name: "सदस्यको नाम .",
        printStatus: true,
      },
      {
        name: "वावु / आमाको नाम",
        printStatus: true,
      },
      {
        name: "पति / पत्निको नाम",
        printStatus: true,
      },
      {
        name: "लिङ्ग",
        printStatus: true,
      },
      {
        name: "उमेर",
        printStatus: true,
      },
      {
        name: "समावेशी समूह",
        printStatus: true,
      },
      {
        name: "पेशा",
        printStatus: false,
      },
      {
        name: "कैफियत",
        printStatus: true,
      },
      {
        name: "कार्यहरू",
        printStatus: false,
      },
    ],
    genders: ["महिला", "पुरुष", "अन्य"],
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Active Member Subdomain Report",
      },
    ],
    showcolortable: false,
    allsubdomain: true,
    district: "",
    province: {
      name: "कोशी",
      label: "1",
    },
    search: "",
    dialog: false,
    provinceno: 1,
    valid: false,
    deleteSelection: [],

    headersreport: [
      { text: "S.N.", value: "sn" },
      {
        text: "Subdomain",
        align: "start",
        sortable: false,
        value: "place",
      },
      {
        text: "Total Count",
        align: "start",
        sortable: false,
        value: "count",
      },
    ],
    headers: [
      { text: "S.N.", value: "__v" },
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },

      {
        text: "Member Counts",
        align: "start",
        sortable: false,
        value: "circular.length",
      },
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      content: "",
    },
    defaultItem: {
      name: "",
      content: "",
    },
    json_data: [],
    age: "",
    profession: "",
    gender: undefined,
    region: "",

    houseofrepresentative: "",
    pradeshassemblyconstituency: "",

    inclusivegroup: undefined,
    memberType: undefined,
    limits: [10, 20, 25, 30, 40, 100, 500, 1500, 10000],
    showSomeTime: false,
    limit: 30,
    skip: 1,
    exportPDF: "Export To PDF",
    chartOptions: {},
    chartData: {},
    chartOptionsD: {},
    chartDataD: {},
    chartOptionsA: {},
    chartDataA: {},
    provincenum: 1,
    selectP: "1",
    isSign: true,
    cssText: `
    thead { border: 1px solid black; padding: 10px; color: #000; }

tbody { border: 1px solid black; padding: 10px; color: #000; }
 .report-container {
    page-break-after: auto;
  }
  thead.report-header-top {
   
        border-color:#fff;

  }
  .trborder{
    border:1px solid #000;
  }
  tfoot.report-footer {

    border-color:#fff;

  }
  table{
    border:none!important;
  }
  tbody {

  }
  #spacer {
    margin-bottom: 150px;
  }
  #footer {
    border: none;
  }
    .widthSN{
      width:50px;
    }
    .width30{
      width:60px;
    }
    .widthName{
      width:100px;
    }
    .centertext{
  display: flex;
  justify-content: center;
  width: 100%;
  font-size:15px;
  font-weight:600;
  margin-top:-15px;
  margin-bottom:15px;
}
    .width20{
      width:10px;
    }
    img{
      width:120px;
      object-fit:contain;
    }
    .no-header{
        display:none;
    }
    .no-print{
      display:none;
    }
    .pdfbox {
	 left: 100px;
	 right: 100px;
	 background: white;
	 z-index: 9999;

}
 .pdfbox table {
	 width: 100%;
	 border-collapse: collapse;
}
.imgsig{
  margin-top:-20px;
}
.flexlist{
  display:flex;
  flex-flow:column;
  justify-content:center;
  align-items:center;
  font-size:9px;
  font-weight:600;
  list-style:none;
  margin:0;
  padding:0;
}
 .pdfbox table th {
	 font-size: 10px;
	 text-align: left;
  padding:3px 2px;
}
 .pdfbox table td {
	 font-size:10px;
  padding:2.5px 2px;
}
.signatureBox{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-flow:column;
  margin:0;
  padding:0;
}
.signatureBox img{
  margin-bottom:-20px;
}
 .pdfbox .imageheader {
	 background: white;
	 list-style: none;
	 padding-left: 0;
	 display: flex;
	 justify-content: space-between;
	 padding: 10px 30px;
}

 .pdfbox .imageheader.top{
	 justify-content: center;
	 padding: 0;
   margin-top:130px;
}
 .pdfbox .imageheader img {
	 height: 90px;
}
 .pdfbox .imageheader h1 {
	 font-size: 30px;
	 text-align: center;
}
 .pdfbox .imageheader h2 {
	 font-size: 20px;
	 text-align: center;
}
.fromdata{
  list-style:none;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
}
 .fromdata li{
font-size:12px;
padding:0 5px;
}
 
    `,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allDashCategories",
      "subdomainSpeicfic",
      "allloadingSubdomain",
      "allProvienceDistrict",
      "allProvices",
      "allRepresentative",
      "allFilterData",
      "allReport",
      "allloadingActive",
      "allChartData",
      "loadingReportAll",
      "allDistrict",
      "loadingspecificall",
      "allColorData",
    ]),
  },

  methods: {
    ...mapActions([
      "getColorData",
      "fetchSubDomain",
      "fetchSubDomainSpecific",
      "fetchProvinceDistrict",
      "fetchProvinceDistrictProvince",
      "getReports",
      "getReportsProvince",
      "fetchChartData",
      "deleteMultipleCirculars",
    ]),

    async printchart() {
      const reportContent = this.$refs.document;
      reportContent.classList.add("hide-buttons");
      const canvas = await html2canvas(reportContent, { scale: 2 }); // High-res rendering
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Embed the image in the PDF
      pdf.save(`${this.title || "Report"}.pdf`); // Save the PDF
      reportContent.classList.remove("hide-buttons");
    },
    unSelectDelete() {
      this.deleteSelection = [];
    },
    showAllDataSubdomainCount() {
      this.allsubdomain = !this.allsubdomain;
    },
    showSubdomainReport() {
      this.viewSubdomain = !this.viewSubdomain;
      if (!this.viewSubdomain) {
        this.showCount = "Show";
      } else {
        this.showCount = "Hide";
      }
    },
    printa() {
      if (this.layout == "chart") {
        this.printchart();
      } else {
        this.exportPDF = "Download Now";
        this.showSomeTime = true;
        this.d.print(this.$refs.doc, [this.cssText]);
        setTimeout(() => {
          this.showSomeTime = false;
        }, 3000);
      }
    },
    printCSV() {
      if (this.layout === "chart") {
        this.printchart();
      } else {
        if (!this.allFilterData.posts || !this.allFilterData.posts.length) {
          alert("No data available to download.");
          return;
        }

        const payload = this.allFilterData.posts.map((row) => ({
          "कार्यरत फारम नम्बर": row.workingformnumber,
          "पुरानो फारम नम्बर": row.workingformnumberold,
          "फारम नम्बर": row.formNumber,
          "सदस्य नाम": row.membername,
          "बाबु/आमा को नाम": row.fathermothername,
          "श्रीमान/श्रीमती को नाम": row.husbandwifename,
          पेशा: row.profession,
          उमेर: row.age,
          लिङ्ग: row.gender,
          "समावेशी समूह": row.inclusivegroup,
          कैफियत: row.kaifiyat,
          प्रदेश: row.region,
          जिल्ला: row.district,
          "प्रतिनिधि सभा": row.houseofrepresentative,
          "प्रदेश सभा निर्वाचन क्षेत्र": row.pradeshassemblyconstituency,
          "निर्वाचन क्षेत्र नम्बर": row.froRconstituencyNo,
          "नगरपालिका/गाउँपालिका": row.municipality,
          "साविक नगरपालिका": row.savikmunicipality,
          "वडा नं": row.wardno,
          "साविक वडा नं": row.savikwardno,
          फोन: row.phone,
          इमेल: row.email,
          "सदस्य प्रकार": row.memberType,
          "सिर्जना मिति": row.createdAt.split("T")[0],
        }));

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(payload);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

        // Generate filename
        const filename = `${this.selectP[0].label}-${this.district.name}-${
          this.memberType !== "Old" ? "नयाँ" : "नवीकरण"
        }-${this.houseofrepresentative.code}-${
          this.pradeshassemblyconstituency.code
        }.xlsx`;

        // Write to file
        XLSX.writeFile(workbook, filename);
      }
    },

    async deleteMultiple() {
      if (confirm("के तपाई यस बारे निश्चित हुनुहुन्छ?")) {
        await this.$store.dispatch("deleteMultipleCirculars", {
          activememeberid: this.deleteSelection,
        });
        alert("Deleted Successfully");
        await this.filterActive();
      } else {
        alert("Not Deleted");
      }
    },
    printb() {
      this.d.print(this.$refs.doc1, [this.cssText]);
      setTimeout(() => {
        this.showCount = "Show";
        this.viewSubdomain = false;
      }, 2000);
    },
    showColorTable() {
      this.showcolortable = !this.showcolortable;
    },
    exportToPDF() {
      html2pdf(this.$refs.document, {
        filename: "report.pdf",
        margin: 0.1,
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      });
    },
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.$router.push(`/dashboard/updateActiveMember/${item._id}`);
    },
    async deleteItem(item) {
      if (confirm("के तपाई यस बारे निश्चित हुनुहुन्छ?")) {
        await this.$store.dispatch("deleteCirculars", item._id);
        alert("Deleted Successfully");
        await this.filterActive();
      } else {
        alert("Not Deleted");
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    selectProvinceInTotal(data) {
      if (data.province != undefined) {
        this.provincenum = data.province;
      }
    },
    loaddata() {
      this.$store.dispatch("getReportsProvince", this.provincenum);
    },
    selectProvince(data) {
      if (data.province != undefined) {
        this.$store.dispatch(
          "fetchProvinceDistrictSelectProvice",
          data.province
        );
        this.selectProvinceData(data.province);
      }
    },
    selectProvinceData(data) {
      this.selectP = this.proviceslist.filter((ele) => {
        return ele.name == data;
      });
    },
    selectDistrict(data) {
      if (data.name != undefined) {
        this.representatives = data.list.repno;
      }
    },
    regionFunc(code) {
      if (code.code != undefined) {
        this.representatives.forEach((ele) => {
          if (ele.code == code.code) {
            this.regions = ele.region;
          }
        });
      }
    },
    municipalityFunc(code) {
      if (code.code != undefined) {
        this.regions.forEach((ele) => {
          if (ele.code == code.code) {
            this.municipalities = ele.napa;
          }
        });
      }
    },
    wardFunc(name) {
      if (name.name != undefined) {
        this.municipalities.forEach((ele) => {
          if (ele.name.trim() == name.name.trim()) {
            this.wards = ele.ward;
            this.muninumber = ele.code;
          }
        });
      }
    },
    async filterActive() {
      let filterData = {};
      if (this.workingformnumber.length > 0) {
        filterData.workingformnumber = this.workingformnumber;
      }
      if (this.workingformnumberold.length > 0) {
        filterData.workingformnumberold = this.workingformnumberold;
      }

      if (this.district.name != undefined) {
        filterData.district = this.district.name;
      } else {
        if (this.district != undefined) {
          filterData.district = this.district;
        }
      }

      if (this.memberType != undefined) {
        filterData.memberType = this.memberType;
      }
      if (this.houseofrepresentative.code != undefined) {
        filterData.houseofrepresentative =
          this.houseofrepresentative.code.toString();
      }
      if (this.pradeshassemblyconstituency.code != undefined) {
        filterData.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency.code.toString();
      }
      if (this.municipality.name != undefined) {
        filterData.municipality = this.municipality.name;
      }
      if (this.wardno != undefined) {
        filterData.wardno = this.wardno;
      }
      if (this.inclusivegroup != undefined) {
        filterData.district = this.district.name;
      }
      if (this.gender != undefined) {
        filterData.gender = this.gender;
      }
      if (this.limit != undefined) {
        filterData.limit = this.limit;
      }

      filterData.skip = this.skip;

      this.loading = true;
      await this.$store.dispatch("filterData", filterData);

      this.deleteSelection = [];
      this.loading = false;
    },
    async filterActiveChart() {
      let filterData = {};
      if (this.district.name != undefined) {
        filterData.district = this.district.name;
      }
      if (this.memberType != undefined) {
        filterData.memberType = this.memberType;
      }
      if (this.houseofrepresentative.code != undefined) {
        filterData.houseofrepresentative =
          this.houseofrepresentative.code.toString();
      }
      if (this.pradeshassemblyconstituency.code != undefined) {
        filterData.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency.code.toString();
      }
      if (this.municipality.name != undefined) {
        filterData.municipality = this.municipality.name;
      }
      if (this.wardno != undefined) {
        filterData.wardno = this.wardno;
      }
      if (this.inclusivegroup != undefined) {
        filterData.district = this.district.name;
      }
      if (this.gender != undefined) {
        filterData.gender = this.gender;
      }
      if (this.limit != undefined) {
        filterData.limit = this.limit;
      }

      filterData.skip = this.skip;

      this.loading = true;
      await this.$store.dispatch("fetchChartData", filterData);
      // alert("data");

      this.deleteSelection = [];
      this.loading = false;
    },
    async nextPage() {
      this.skip = this.allFilterData.pagination.next;
      await this.filterActive();
    },
    async prevPage() {
      this.skip = this.allFilterData.pagination.previous;
      await this.filterActive();
    },
    async switchLayout(e) {
      this.layout = e;
      if (this.layout == "chart") {
        await this.filterActiveChart();
      }
    },
  },
  created() {
    this.logged = JSON.parse(secureStorage.getItem("userData")).user.role;
    this.Printd = window.printd;
    this.d = new Printd();
    this.initialize();
    this.fetchSubDomainSpecific();
    this.fetchProvinceDistrictProvince();
    this.getReports();
    this.getColorData();
    this.deleteSelection = [];
    setTimeout(() => {
      this.subdomainSpeicfic.forEach((element) => {
        if (element.circular != undefined) {
          this.json_data.push({
            Name: element.name,
            "Member Counts": JSON.stringify(element.circular.length),
          });
        }
      });
    }, 2000);
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.grid-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); // Default to 3 columns
  justify-items: start; // Left-align the grid items
  align-items: baseline;

  .grid-item {
    text-align: center;
    font-size: 1.2rem;
    width: 100%;
  }

  col {
    padding: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
  }
}

// Button Container outside the grid
.button-container {
  display: flex;
  justify-content: flex-start; // Left-align button

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #45a049;
    }
  }
}

// Media Queries for Responsive Design
@media screen and (min-width: 2560px) {
  // 4K resolution
  .grid-container {
    grid-template-columns: repeat(4, 1fr); // 4 columns
  }
}

@media screen and (min-width: 1920px) and (max-width: 2559px) {
  // HD resolution
  .grid-container {
    grid-template-columns: repeat(3, 1fr); // 3 columns
  }
}

@media screen and (max-width: 1919px) {
  // Below HD (default to 2 columns)
  .grid-container {
    grid-template-columns: repeat(3, 1fr); // 2 columns
  }
}

.gridchart {
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-content: start;
  width: 100%;

  .gridview {
    border: 1px solid #cdcdcd;
    border-radius: 10px;
    padding: 10px;
  }
}

.tablechart {
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;

  .insidechart {
    background-color: rgb(239, 239, 239);
    border-radius: 10px;
    padding: 10px;
    width: 100%;
  }
}

.align-center {
  justify-content: center;
}

.switchLayout {
  display: flex;
  list-style: none;
  text-transform: capitalize;
  padding-left: 15px;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
  li {
    padding: 10px 15px;
    font-size: 14px;
    background: $midwhite;
    color: $dark;
    cursor: pointer;
    border-radius: 5px;
    &:nth-of-type(1) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:nth-of-type(2) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .active {
    background: $secondary;
    color: $white;
  }
}

.report-header {
  display: none;
}

.span .pillmain {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;

  .pillbox {
    padding: 15px;
    width: 100%;
    border: 1px solid #dedede;

    ul {
      list-style: none;
      display: flex;
      align-items: center;
      flex-flow: column;
      justify-content: center;
      padding-left: 0;

      li {
        &:first-of-type {
          font-size: 25px;
          font-weight: 500;
        }

        &:nth-of-type(2) {
          color: $secondary;
        }
      }
    }
  }
}

.fromdata {
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;

  li {
    margin: 5px 15px;
  }
}

.btn-default {
  color: $dark !important;
}

.insidepadding {
  padding: 0 20px;
}

.v-sheet {
  display: none;
}

.passportimage {
  width: 100px;
  height: 100px;
}

.v-sheet {
  display: none;
}

.imagePost {
  width: 150px;
}

.btn {
  &_primary {
    background: $btncolor;
  }

  &_secondary {
    background: $secondary;
  }

  padding: 8px 20px;
  color: $white;
  font-size: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;

  &:focus {
    outline: none;
  }
}

.flextd {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px !important;
  line-height: 40px !important;
  font-weight: 500;
}

.popupbox {
  // width:80%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    header {
      display: flex;
      justify-content: center;
      position: fixed;
      right: 18%;
      top: 12%;
      background: white;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      align-items: center;

      .fa {
        padding: 20px;
        cursor: pointer;
        font-size: 20px;
      }
    }

    padding: 40px;
    width: 60%;
    max-height: 70vh;
    background: $white;
    overflow-y: scroll;

    table {
      width: 100%;
      border-collapse: collapse;

      th {
        font-size: 14px;
        text-align: left;
        padding: 10px;
      }

      td {
        font-size: 14px;
        padding: 0 10px;
      }
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;

  th {
    font-size: 14px;
    text-align: left;
    padding: 10px;
  }

  td {
    font-size: 14px;
    padding: 0 10px;
  }
}

.centertext {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pdfbox {
  // position: fixed;
  left: 100px;
  right: 100px;
  background: white;
  z-index: 9999;
  padding: 30px 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      font-size: 14px;
      text-align: left;
      // padding: 10px;
    }

    td {
      font-size: 14px;
      // padding: 10px;
    }
  }

  .imageheader {
    background: white;
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;

    img {
      height: 90px;
    }

    h1 {
      font-size: 30px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      text-align: center;
    }

    &.bottom {
      display: none;
    }
  }
}

.btn {
  background: $secondary !important;
  color: $white !important;
  margin-left: 15px;
}

.btn-filter {
  margin-bottom: 20px;

  .v-btn {
    margin-right: 15px;
  }
}

.distbtn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 14px !important;
  flex-flow: row !important;
  margin-bottom: 20px;

  li {
    list-style: none;
    padding: 5px 10px;
    cursor: pointer;

    &:first-of-type {
      font-size: 14px !important;
    }
  }

  color: $dark !important;

  .activebtn {
    background: $secondary;
    color: $white !important;
    border-radius: 5px;
  }
}

.loaddata {
  width: 300px;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }
}

.centerload {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
  }
}

.greenbox {
  background: #2c9131;
  color: #fff;
}

.redbox {
  background: red;
}

.actionbtn {
  .fa {
    display: inline-block;
    padding: 0 10px;
  }
}

.btnatc {
  .v-btn {
    float: right;
    background: red !important;
    color: white;
  }
}

.btnatc1 {
  .v-btn {
    float: right;
    background: rgb(85, 58, 58) !important;
    color: white;
  }
}

.mr-btm {
  margin-bottom: 20px;
  margin-top: 20px;

  li {
    margin-right: 10px;
  }
}
.actionButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border: 2px solid #f8f5f5;
  padding: 20px;
  background: #fcfcfc;
  border-radius: 10px;
  .actionList {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .selectLimit {
    width: 200px;
  }
  .totalData {
    padding: 5px 15px;
    font-size: 16px;
    color: $dark;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
  }
  button {
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    padding: 10px 20px;
    &:hover {
      background-color: #45a049;
    }
  }
}

.topAction {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  padding-top: 15px;
  .customButton {
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    padding: 10px 20px;
    &:hover {
      background-color: #45a049;
    }
    margin-left: 10px;
  }
}
</style>

<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row v-if="logged.user.role == 'admin'">
        <v-col cols="10" class="formbox px-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="2">
                <label for="">User Of</label>
                <v-selection
                  class="selectdate"
                  v-model="userFor"
                  placeholder="User Of"
                  :options="userFors"
                  :filterable="true"
                  autocomplete="false"
                  :input="selectUserFor(userFor)"
                ></v-selection>
              </v-col>
              <v-col md="2">
                <label for>प्रदेश</label>
                <v-selection
                  class="selectdate"
                  v-model="province"
                  placeholder="Province"
                  :options="allProvices"
                  label="name"
                  :filterable="true"
                  :auto-complete="false"
                  :value="selectProvince(province)"
                ></v-selection>
              </v-col>
              <v-col md="2">
                <label for>जिल्ला</label>
                <v-selection
                  class="selectdate"
                  v-model="district"
                  placeholder="जिल्ला"
                  :options="allDistrict"
                  label="name"
                  :filterable="true"
                  :value="selectDistrict(district)"
                ></v-selection>
              </v-col>
            </v-row>

            <v-btn
              v-if="$route.params.id == undefined && !loading"
              :disabled="!valid"
              color="success"
              class="mr-4 ml-3 mb-10"
              @click="validate"
              >Filter</v-btn
            >
             <v-btn  class="mr-4 ml-3 mb-10"   color="success" v-if="loading">
               <v-progress-circular indeterminate></v-progress-circular>
            </v-btn>
          </v-form>

          <table border="" class="mx-3">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Province</th>
                <th>District</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in allgeneralConventionUsers.results"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.phone }}</td>
                <td>{{ data.province }}</td>
                <td>{{ data.district }}</td>
                <td><router-link :to="`/dashboard/createGeneralConventionUser/${data._id}`"><v-icon> mdi-pencil </v-icon></router-link></td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "ListGeneralConvention",
  components: { TitleBreadCrumb },

  data() {
    return {
      loading:false,
      province: "",
      district: "",
      title: "Add General Convention Users",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add General Convention Users",
        },
      ],
      userFor: "Election Officer",
      userFors: ["Election Officer", "Kendra", "Pradesh"],
    };
  },
  methods: {
    ...mapActions([

      "getGeneralConventionUserList",
    ]),
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let auth = {
          userFor:this.userFor
        };
        if (this.province != "") {
          auth.province = this.province;
        }
        if (this.district != "") {
          auth.district = this.district;
        }
        auth.limit = this.limit;
        auth.skip = this.skip;
     
        await this.getGeneralConventionUserList(auth);
        this.loading = false;
      }
    },
   selectUserFor(data){
      this.userFor = data;
    },
    passwordShow() {
      this.showpassword = !this.showpassword;
    },
    checkFunc(subdomain) {
      if (subdomain != "") {
        this.subdomain = subdomain.userHandle;
      }
    },
    selectProvince(data) {
      if (data.province != undefined) {
        this.fetchProvinceDistrictSelectProvice(data.province);
      }
    },
    selectDistrict(data) {
      if (data.name != undefined) {
        this.representatives = data.list.repno;
      }
    },
   
  },
  computed: {
    ...mapGetters([
      "subdomainSpeicfic",
      "logged",
      "singleUserActive",
      "allDistrict",
      "allProvices",
      "allgeneralConventionUsers",
    ]),
  },
  async created() {
    this.getGeneralConventionUserList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.btn-primary {
  background: $secondary !important;
  color: $white;
  margin-right: 10px;
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
    padding: 10px;
  }
}
iframe {
  width: 100%;
  height: 800px;
}
a{
  text-decoration: none;
}
</style>

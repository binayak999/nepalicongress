<template>
  <section>
    <v-container>
      <v-row>
        <v-col md="12">
          <h1>Add Signature</h1>
          <v-form class="mt-5">
            <v-text-field
              v-model="name"
              label="Name"
              outlined
              class="mt-2"
            ></v-text-field>

            <v-selection
              v-model="province"
              placeholder="Province"
              :options="allProvices"
              label="province"
              class="mt-2 selectBox"
              :filterable="true"
              @input="selectProvince(province)"
            ></v-selection>

            <v-selection
              v-model="district"
              placeholder="जिल्ला"
              :options="allDistrict"
              label="name"
              class="mt-2 selectBox"
              :filterable="true"
            ></v-selection>

            <div class="imageupload">
              <picture-input
                ref="pictureInput"
                @change="onChange"
                width="200"
                height="200"
                margin="0"
                accept="image/jpeg, image/png"
                size="10"
                buttonClass="btn"
                :customStrings="{
                  upload: '<h1>Bummer!</h1>',
                  drag: 'Drag Or Click to Upload',
                }"
                class="mx-0"
              ></picture-input>
            </div>

            <v-btn class="primary mt-3" @click="validate" :loading="loading">Save Signature</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PictureInput from "vue-picture-input";
export default {
  name: "AddSignature",
  data: () => ({
    name: undefined,
    province: undefined,
    district: undefined,
    loading: false,
    image: undefined,
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
    selectP:undefined
  }),
  components: {
    PictureInput,
  },
  methods: {
    ...mapActions(["fetchProvinceDistrictProvince", "postSignature"]),
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

    async validate() {
      this.loading = true;
      let formData = new FormData();

      if (this.name != undefined) {
        formData.append("name", this.name);
      }

      if (this.province != undefined) {
        formData.append("province", this.province.province);
      }

      if (this.district != undefined) {
        formData.append("district", this.district.name);
      }

      if (this.image != undefined) {
        formData.append("image",  this.$refs.pictureInput.file);
      }

      await this.postSignature(formData);
      this.loading = false;
    },

      onChange(image) {
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
  },
  computed: {
    ...mapGetters(["allProvices", "allDistrict"]),
  },
  async created() {
    await this.fetchProvinceDistrictProvince();
  },
};
</script>
<style lang="scss" scoped>
.imageupload {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  margin-top: 10px;
}

</style>
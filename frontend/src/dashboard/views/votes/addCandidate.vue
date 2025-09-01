<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="8" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <v-text-field
                  v-model="voteCandidateGroup"
                  :rules="[voteCandidateGroupRule.required]"
                  label="Vote Candidate Group"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-file-input
                  label="CSV"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="csvfile"
                  accept=".csv"
                  prepend-icon="mdi-file-excel "
                ></v-file-input>
              </v-col>
              <v-col>
                <h4>Sample</h4>
                <img :src="require(`@/assets/images/sample.png`)" alt="">
                <!-- <a :href="require(`@/assets/images/sample.png`)" download="sample.png"><i class="fa fa-file-excel-o fa-2x"></i></a> -->
                
                
              </v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Upload Voters</v-btn>
          </v-form>
        </v-col>
        <v-col cols="4">
          <iframe
            src="https://www.hamropatro.com/widgets/calender-medium.php"
            frameborder="0"
            scrolling="no"
            marginwidth="0"
            marginheight="0"
            style="border:none; overflow:hidden; width:295px; height:385px;"
            allowtransparency="true"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "AddVoters",
  components: { TitleBreadCrumb },
  data() {
    return {
      valid: true,
      title: "Add Candidate",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Candidate",
        },
      ],
      voteCandidateGroup: "",
      voteCandidateGroupRule: {
        required: (value) => !!value || "Required.",
      },
      csvfile: null,
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const voting = {
          voteCandidateGroup: this.voteCandidateGroup,
          csvfile: this.csvfile,
        };

        this.$store.dispatch("createCandidates", voting);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.activebtn {
  background: $secondary;
  padding: 10px 20px;
  // margin-right: 10px;
  color: $white;
  border: 1px solid $secondary;
}
.btncondition {
  margin-top: 10px;
  // margin-right: 10px;
  font-size: 14px;
  border: 1px solid $secondary;
  padding: 10px 20px;
}
.adctionbutton {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding-left: 0;
  font-size: 12px;
  li {
    &:first-of-type {
      button {
        background: green;
        color: $white;
      }
    }
    &:nth-of-type(2) {
      button {
        background: red;
        color: $white;
      }
    }
  }
  button {
    // border: 1px solid $ligtgray;
    padding: 5px 15px;
    margin-bottom: 15px;
    &:focus {
      outline: none;
    }
  }
  .fa {
    margin-right: 10px;
  }
}

.labeltitle {
  padding: 10px 0;
  display: block;
}
.formtitle {
  background: $ligtgray;
  color: $white;
  display: inline-block;
  padding: 5px 20px;
  font-size: 14px;
}
.active {
  background: $primary;
}
.tabs {
  display: flex;
  list-style: none;
  padding-left: 0;
  li {
    margin-right: 5px;
    cursor: pointer;
  }
}
.formbox {
  padding: 20px 30px;
}
.nepaliDate {
  display: inline-block;
  padding: 12px 20px;
  border: 1px solid $primary;
  color: $dark;
  width: 100%;
}
.container {
  max-width: 100%;
}
</style>
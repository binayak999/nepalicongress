<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <download-csv class="btn btn-default" :data="json_data" name="filename.csv">
      <button class="btn btn_secondary btn-small">Download CSV</button>
    </download-csv>
    <div class="votescounts">
      <div
        v-for="(vote, index) in allsingleVote"
        :key="index"
        class="voteinside"
      >
        <h3>{{ vote.votingTopic.eng }}</h3>
        <div class="votebox">
          <div v-for="(v, index) in vote.votes" :key="index" class="votecount">
            <ul>
              <li>{{ v.valueEng }}</li>
              <li>{{ v.votecount }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ViewVote",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "ViewVote",
    json_data: [],
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "ViewVote",
      },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allDashCategories", "allsingleVote"]),
  },

  methods: {
    ...mapActions(["fetchSingleVotes"]),
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(item);
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    updateStatus(item) {
      let voteTopic = {
        id: item._id,
        voteStatus: !item.voteStatus,
      };
      this.$store.dispatch("updateStatus", voteTopic);
      this.initialize();
    },
  },
  created() {
    this.initialize();

    this.fetchSingleVotes(this.$route.params.id);
    setTimeout(() => {
      this.allsingleVote.forEach((element) => {
        element.votes.forEach((ele) => {
          this.json_data.push({
            "Purpose": element.votingTopic.eng,
            "For": ele.valueEng,
            "Vote Count":ele.votecount,
          });
        });
      });
    },2000);
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.votescounts {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px;

  h3 {
    background: $secondary;
    color: $white;
    padding: 10px;
  }
  .voteinside {
    width: 20%;
    margin: 5px;
  }
  .votebox {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .votecount {
    width: 100%;
    ul {
      list-style: none;
      padding-left: 0;
      text-align: center;
      border: 1px solid $secondary;
      height: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      li {
        &:first-of-type {
          font-size: 14px;
          margin-top: 10px;
          font-weight: 500;
          letter-spacing: 1px;
        }
        &:last-of-type {
          font-size: 30px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
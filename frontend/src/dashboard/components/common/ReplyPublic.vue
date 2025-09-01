<template>
  <section>
    <i class="fa fa-close" @click="closeButton"></i>
    <div class="userTitle">
      <strong>{{letterdata.title}}</strong>
      <p>{{letterdata.content}}</p>
    </div>
    <h4>Replies</h4>
    <div v-for="(ltdata,index) in letterdata.replies" :key="index" class="replybox">
      {{ltdata.content}}
    </div>

    <v-form ref="form" v-model="valid" lazy-validation class="publicforum">
      <v-row>
        <v-col md="12">
          <v-textarea
            v-model="content"
            :rules="[nameRules.required]"
            label="Content"
            required
            outlined
          ></v-textarea>
        </v-col>
        <v-col md="12">
          <v-btn color="primary" @click="forumSubmit">Reply</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </section>
</template>

<script>
export default {
  name: "ReplyPublic",
  props: ["letterdata"],
  data() {
    return {
      valid: false,
      content: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    closeButton() {
      this.$emit("closePop", false);
    },
    forumSubmit() {
       this.$emit("closePop", false);
      if (this.content != "") {
        let forumReply = {
          forumHandle: this.letterdata.forumHandle,
          content:this.content,
        };
        this.$store.dispatch("replyindiscuss",forumReply);
      } else {
        let info = {
          icon: "warning",
          status: true,
          title: `warning`,
          subtitle: `Please fill The Reply To Send`,
        };
        this.$store.dispatch("alertNow", info);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  background: $white;
  padding: 30px;
  width: 50%;
  max-height: 90vh;
  position: relative;
  h1 {
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
  }
}

.fa {
  position: absolute;
  right: -40px;
  top: -40px;
  background: $white;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
.replybox{
  font-size: 14px;
  padding: 5px;
  background: $ligtgrey;
}
</style>
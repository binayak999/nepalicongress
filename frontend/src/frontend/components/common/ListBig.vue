<template>
  <section v-if="data != undefined && data.status">
    <div v-if="language === 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
      <header>
        <small>{{data.nep.date}}</small>
        <div>
          <span>
            <i class="fa fa-eye"></i>
            {{data.countView}}
          </span>
          <span>
            <i class="fa fa-share-alt"></i>
            <ShareNetwork
              network="facebook"
              :url="`https://nepalicongress.org/single/${slug}/${data.slug}`"
              :title="data.nep.title"
              :description="data.nep.content"
              :hashtags="slug"
            >Share on Facebook</ShareNetwork>
          </span>
        </div>
      </header>
      <h4>
        <router-link :to="`/single/${slug}/${data.slug}`">{{data.nep.title}}</router-link>
      </h4>
      <div class="content">
        <p
          v-html="data.nep.content.length > 200 ? data.nep.content.slice(0,200)+' [...]':data.nep.content"
        ></p>
      </div>
     <footer>
          <span class="viewmore">
            <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">
              अधिक हेर्नुहोस्</router-link
            >
          </span>
          <span v-for="(data, index) in data.attachment" :key="index">
            <a :href="baseUrl + data.fileUrl" download class="downloadbtn">
              <i class="fa fa-file-pdf-o"></i>
              डाउनलोड गर्नुहोस्
            </a>
          </span>
        </footer>
    </div>
    <div v-if="language !== 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
      <header>
        <small>{{data.eng.date}}</small>
        <div>
          <span>
            <i class="fa fa-eye"></i>
            {{data.countView}}
          </span>
          <span>
            <i class="fa fa-share-alt"></i>
            <ShareNetwork
              network="facebook"
              :url="`/single/${slug}/${data.slug}`"
              :title="data.nep.title"
              :description="data.nep.content"
              :hashtags="slug"
            >Share on Facebook</ShareNetwork>
          </span>
        </div>
      </header>
      <h4>
        <router-link :to="`https://nepalicongress.org/single/${slug}/${data.slug}`">{{data.eng.title}}</router-link>
      </h4>
      <div class="content">
        <p
          v-html="data.eng.content.length > 200 ? data.eng.content.slice(0,200)+' [...]':data.eng.content"
        ></p>
      </div>
     <footer>
          <span class="viewmore">
            <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">
              अधिक हेर्नुहोस्</router-link
            >
          </span>
          <span v-for="(data, index) in data.attachment" :key="index">
            <a :href="baseUrl + data.fileUrl" download class="downloadbtn">
              <i class="fa fa-file-pdf-o"></i>
              डाउनलोड गर्नुहोस्
            </a>
          </span>
        </footer>
    </div>
  </section>
</template>

<script>
import { fileUrl } from "./../../../main";
export default {
  name: "ListBig",
  props: ["data", "language", "slug"],
  data() {
    return {
      baseUrl: fileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  padding: 10px 0;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  div {
    font-size: 13px;
    display: flex;
    span {
      margin-left: 10px;
      margin-top: 0;
      .fa {
        margin-right: 5px;
      }
    }
  }
}
small {
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
}
.nep {
  small {
    letter-spacing: 0;
    margin-bottom: 8px;
    display: block;
    font-size: 14px;
    font-family: $nepalifont !important;
  }
  h4 {
    a {
      letter-spacing: 0;
      color: $dark;
      font-family: $nepalifont !important;
      font-weight: 600;
      text-decoration: none;
      font-size: 15px;
    }
  }
}
a{
 color: $text!important;
}
h4 {
  a {
    letter-spacing: 1.2px;
    color: $text;
    font-family: $mon;
    font-weight: 500;
    text-decoration: none;
    font-size: 14px;
  }
}
img {
  width: 20px;
  margin-right: 10px;
}
span {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 14px;
  letter-spacing: 1.2px;
  cursor: pointer;
  color: $text;
}
.content {
  font-size: 14px;
  margin-top: 5px;
}
.fa-file-pdf-o {
  font-size: 20px;
  cursor: pointer;
}
footer {
  display: flex;
  span {
    margin-right: 10px;
  }
  a {
    color: $text;
  }
}
.downloadbtn{
  border:1px solid $text;
  text-decoration: none;
  padding: 5px 10px;
}
</style>
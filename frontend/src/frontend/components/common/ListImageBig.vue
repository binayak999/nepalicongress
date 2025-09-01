<template>
  <section v-if="language != undefined && data.status">
    <img
      :src="
        data.images[0] != undefined
          ? baseUrl + data.images[0].fileUrl
          : 'https://nepalicongress.org/img/aboutimage.6d9fbb33.jpg'
      "
      alt
      class="imagebox"
    />
    <div class="rightside">
      <div
        v-if="language === 'Nepali'"
        v-bind:class="{ nep: language === 'Nepali' }"
      >
        <div class="headertitle">
          <header>
            <small>{{ data.nep.date }}</small>
            <div>
              <span>
                <i class="fa fa-eye"></i>
                {{ data.countView }}
              </span>
              <span>
                <i class="fa fa-share-alt"></i>
                <ShareNetwork
                  network="facebook"
                  :url="`https://nepalicongress.org/single/${slug}/${data.slug}`"
                  :title="data.nep.title"
                  :description="data.nep.content"
                  :hashtags="slug"
                  >Share on Facebook</ShareNetwork
                >
              </span>
            </div>
          </header>
        </div>
        <h4>
          <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">{{
            data.nep.title
          }}</router-link>
        </h4>
        <div class="content">
          <p
            v-html="
              data.nep.content.length > 300
                ? data.nep.content.slice(0, 300) + ' [...]'
                : data.nep.content
            "
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
      <div v-if="language !== 'Nepali'">
        <div class="headertitle">
          <header v-bind:class="{ nep: language === 'Nepali' }">
            <small>{{ data.eng.date }}</small>
            <div>
              <span>
                <i class="fa fa-eye"></i>
                {{ data.countView }}
              </span>
              <span>
                <i class="fa fa-share-alt"></i>
                <ShareNetwork
                  network="facebook"
                  :url="`/single/${slug}/${data.slug}`"
                  :title="data.nep.title"
                  :description="data.nep.content"
                  :hashtags="slug"
                  >Share on Facebook</ShareNetwork
                >
              </span>
            </div>
          </header>
        </div>
        <h4>
          <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">{{
            data.eng.title.length > 100
              ? data.eng.title.slice(0, 100) + " [...]"
              : data.eng.title
          }}</router-link>
        </h4>
        <div class="content">
          <p
            v-html="
              data.eng.content.length > 200
                ? data.eng.content.slice(0, 200) + ' [...]'
                : data.eng.content
            "
          ></p>
        </div>
        <footer>
          <span class="viewmore">
            <router-link :to="`/single/${data.category[0].slug}/${data.slug}`"
              >View More</router-link
            >
          </span>
          <span v-for="(data, index) in data.attachment" :key="index">
            <a :href="baseUrl + data.fileUrl" download class="downloadbtn">
              <i class="fa fa-file-pdf-o"></i> Download
            </a>
          </span>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import { fileUrl } from "./../../../main";
export default {
  name: "ListImageBig",
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
.nep {
  letter-spacing: 0 !important;
}
section {
  margin-bottom: 20px;
}
.rightside {
  width: 100%;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: $text;
  div {
    font-size: 13px;
    display: flex;
    margin-top: 15px;
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
  letter-spacing: 1.2px;
  margin-bottom: 5px;
  margin-top: 10px;
  display: block;
  font-size: 14px;
}
.viewmore {
  a {
    text-decoration: none;
    text-decoration: none;
    padding: 10px 25px;
    background: $green !important;
    color: $whitegray !important;
  }
}
.nep {
  h4 {
    font-family: $nepalifont !important;
    a {
      // letter-spacing: 1.2px;
      color: $dark !important;
      font-family: $nepalifont !important;
      font-weight: 600;
      text-decoration: none;
      font-size: 18px;
    }
  }
  p {
    font-size: 16px;
  }
}
h4 {
  a {
    letter-spacing: 0.5px;
    color: $dark !important;
    font-family: $mon;
    font-weight: 500;
    text-decoration: none;
    font-size: 18px;
  }
}
.transicon {
  width: 20px;
  margin-right: 10px;
}
// .imagebox {
//   width: 100%;
//   height: 300px;
//   object-fit: contain;
//   object-position: top;
// }
span {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 14px;
  letter-spacing: 1.2px;
  cursor: pointer;
}
.backgroundlist {
  section {
    display: flex;
    @media only screen and (max-width: 991px) {
      flex-flow: column;
    }
    .imagebox {
      width: 160px;
      height: 160px;
      margin-right: 20px;
      object-fit: contain;
      margin-top: 15px;
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
    small {
      margin-top: 15px;
      // padding-top: 0;
    }
  }
}
.content {
  font-size: 14px;
  margin-top: 5px;
}
.fa-file-pdf-o {
  font-size: 20px;
  cursor: pointer;
  padding-right: 5px;
}
footer {
  display: flex;
  flex-flow: row;
  width: 100%;
  justify-content: space-between;
  a {
    color: $text;
  }
  span {
    margin-right: 10px;
  }
}
p {
  font-family: $mon;
  letter-spacing: 1px;
}
a {
  color: $text !important;
}
.nep {
  small {
    letter-spacing: 0 !important;
    font-family: $nepalifont !important;
    font-size: 13px;
  }
  a {
    letter-spacing: 0 !important;
    font-family: $nepalifont !important;
  }
  header {
    letter-spacing: 0 !important;
    font-family: $nepalifont !important;
  }
  .btn-readmore {
    letter-spacing: 0 !important;
    font-family: $nepalifont !important;
  }
  p {
    letter-spacing: 0 !important;
    font-family: $nepalifont !important;
  }
}
.downloadbtn {
  text-decoration: none;
  padding: 10px 25px;
  background: $green !important;
  color: $whitegray !important;
}
</style>
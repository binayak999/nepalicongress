<template>
  <section class="nep">
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container fluid>
      <img
        :src="require(`@/assets/images/aboutimage.jpg`)"
        alt=""
        class="bannerimage"
      />
    </v-container>
    <v-container class="containerbox">
      <v-row>
        <v-col>
   
            <p>
              राष्ट्रियता, लोकतन्त्र र समाजवादका लागि सात दशकदेखि निरन्तर
              समर्पित नेपाली कांग्रेस।
            </p>
            <p>
              <i><strong>गौरवमय इतिहास,</strong></i>
            </p>
            <p>
              <i><strong>जिम्मेवार वर्तमान,</strong></i>
            </p>
            <p>
              <i><strong>र उज्यालो भविष्य।</strong></i>
            </p>
            <p>
              जननेता वीपी कोइरालाको विचार र संस्कारको जगमा समुन्नत नेपालका लागि
              समर्पित एक अठोट, अभियान र आन्दोलन।<strong>
                https://nepalicongress.org/ </strong
              >ले नेपाली कांग्रेसलाई एक ‘डिजिटल हाउस’ भित्र समग्रमा समेट्ने छ।
              नेपाली कांग्रेसको केन्द्र, प्रदेश, जिल्ला, भ्रातृ र शुभेच्छुक
              संस्था एवं विदेशस्थित जनसम्पर्कहरूलाई एउटै छहारीमुनि भेट्न सकिने
              छ।
            </p>
            <p>
              ‘<i
                ><strong
                  >गौरवमय इतिहास, जिम्मेवार वर्तमान र उज्यालो सुनिश्चित
                  भविष्य’को पर्यायवाची हो नेपाली कांग्रेस।</strong
                ></i
              >
            </p>
            <p>
              <i
                ><strong
                  >राष्ट्रियता, लोकतत्र र समाजवादका लागि सात दशकको अनवरत
                  संघर्षको हो नेपाली कांग्रेस।</strong
                ></i
              >
            </p>
            <p>
              <i
                ><strong
                  >युगपुरुष वीपी कोइरालाको विचार र संस्कारको जगमा समुन्नत नेपाल
                  निर्माणका लागि दृढ अठोट राख्ने आन्दोलन हो नेपाली
                  कांग्रेस।</strong
                ></i
              >
            </p>
            <p>
              हरेक राष्ट्रिय अन्तर्राष्ट्रिय समस्याहरूको समाधान दिने नेपाली
              कांग्रेसलाई विश्वले अब https://nepalicongress.org/ एक<strong>
                ‘डिजिटल हाउस’ </strong
              >भित्र प्रस्तुत गरेका छौं। समग्रतामा नेपाली कांग्रेसको केन्द्र,
              प्रदेश, जिल्ला तहका संरचना, भ्रातृ एवं शुभेच्छुक संघसंस्था तथा
              विदेशस्थित सम्पर्क समितिहरूलाई एउटै छहारीमा समेटिएको छ। निरन्तर
              सहयोग, समीक्षा एवं समालोचनात्मक विवेचनाहरूमा नै यसको सफलता रहेको
              वास्तविकतालाई हामी स्वीकार गर्दछौं।
            </p>
            <p><br data-cke-filler="true" /></p>
            <p><strong>जय नेपाल</strong></p>
            <h4><strong>डा. प्रकाशशरण महत</strong></h4>
            <h4>प्रवक्ता</h4>
            <h4>एवं</h4>
            <h4>संयोजक</h4>
            <h4>स्थानीय तह निर्वाचन केन्द्रीय प्रचार–प्रसार समिति</h4>
            <h4>नेपाली कांग्रेस</h4>
        
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "About",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      page: 1,
      rows: 10,

      breadcrumbs: [
        {
          eng: {
            title: "Home",
          },
          nep: {
            title: "गृहपृष्ठ",
          },
          slug: "/",
        },
        {
          eng: {
            title: "Introduction",
          },
          nep: {
            title: "परिचय",
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["selectedLanguage"]),
  },
};
</script>

<style lang="scss" scoped>
.bannerimage {
  width: 100%;
}
ul {
  list-style: none;
  padding-left: 0;
  li {
    margin-bottom: 10px;
  }
}
.containerbox {
  max-width: 1500px;
}
</style>
<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col md="12" class="pb-0">
          <p>
            तपाईंले <strong>10</strong> क्रियाशील सदस्यहरूको नविकरण गर्नुभएको
            छ, त्यसैले अब अपडेट सफल बनाउनको लागि तल सूचीबद्ध रकम भुक्तानी
            गर्नुहोस्। त्यसपछि सबै अद्यावधिक फाइलहरू प्रमाणित गरिनेछ र तिनीहरूको
            नविकरण हुनेछ।
          </p>
        </v-col>
        <v-col md="12" class="pt-0">
          <table      border="1">
            <thead>
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
              <tr v-for="(body, index) in 10" :key="index">
                <td class="widthSN">
                  {{ index + 1 }}
                </td>
                <td class="withName">101011010100001/13-14</td>
                <td class="withName">टिकाराम दुर्विच</td>
                <td class="withName">डम्वर वहादुर दुर्विच</td>
                <td class="withName">वुद्धिमाया दुर्विच</td>
                <td class="width20">पुरुष</td>
                <td class="width20">35</td>

                <td class="width30">आ.ज.</td>
                <td class="no-print">कृषि</td>
                <td class="width20 no-print"></td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col md="12">
          <p>
            तपाईंले भुक्तानी प्रक्रिया गर्नका लागि तल सूचीबद्ध कुनै पनि भुक्तानी
            विधि चयन गर्न सक्नुहुन्छ।
          </p>
          <v-form>
            <v-radio-group v-model="selectedPaymentMethod" column>
              <ul class="paymentList">
                <li>
                  <v-radio value="khalti"></v-radio>
                  <img
                    src="https://blog.khalti.com/wp-content/uploads/2019/09/khalti-logo.png"
                    alt="Khalti"
                    width="100"
                  />
                </li>
                <li>
                  <v-radio value="esewa"></v-radio>
                  <img
                    src="https://cdn.esewa.com.np/ui/images/esewa_og.png?111"
                    alt="eSewa"
                    width="100"
                  />
                </li>
                <li>
                  <v-radio value="fonepay"></v-radio>
                  <img
                    src="https://login.fonepay.com/assets/img/fonepay_payments_fatafat.png"
                    alt="Fonepay"
                    width="100"
                  />
                </li>
              </ul>
            </v-radio-group>
            <button class="customButton">Pay Now</button>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
export default {
  name: "MemberPayment",
  components: {
    TitleBreadCrumb,
  },
  data: () => {
    return {
      title: "Kriyasil Member Payment",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Kriyasil Member Payment",
        },
      ],
      selectedPaymentMethod: "",
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
       
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.paymentList {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-flow: row;
  margin-bottom: 20px;
  li {
    display: flex;
    align-items: center;
    margin: 10px;
    img {
      cursor: pointer;
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
    padding: 5px 10px;
  }
}
.customButton {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 20px;
  width: 150px;
  text-align: center;
  text-decoration: none;
  &:hover {
    background-color: #45a049;
  }
}
</style>
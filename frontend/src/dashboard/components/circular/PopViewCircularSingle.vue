<template>
  <div>
    <header>
      <i class="fa fa-close" @click="closepopup"></i>
    </header>
    <table class="table table-responsive" border="1">
      <tbody>
        <tr v-if="single.images != undefined && single.images.length != 0">
          <th>फोटो</th>
          <td>
            <img
              :src="baseUrl + single.images[0].fileUrl"
              alt
              class="passportimage"
            />
          </td>
        </tr>
        <tr>
          <th>क्रियाशील नं.</th>
          <td>{{ single.workingformnumber }}</td>
        </tr>
        <tr>
          <th>पुरानो क्रियाशील सदस्यता नं.</th>
          <td>{{ single.workingformnumberold }}</td>
        </tr>
        <tr>
          <th>सदस्यको नाम .</th>
          <td>{{ single.membername }}</td>
        </tr>
        <tr>
          <th>वावु / आमाको नाम</th>
          <td>{{ single.fathermothername }}</td>
        </tr>
        <tr>
          <th>पति / पत्निको नाम</th>
          <td>{{ single.husbandwifename }}</td>
        </tr>
        <tr>
          <th>उमेर</th>
          <td>{{ single.age }}</td>
        </tr>
        <tr>
          <th>पेशा</th>
          <td>{{ single.profession }}</td>
        </tr>
        <tr>
          <th>लिङ्ग</th>
          <td>{{ single.gender }}</td>
        </tr>
        <tr>
          <th>प्रदेश</th>
          <td>{{ single.region }}</td>
        </tr>
        <tr>
          <th>जिल्ला</th>
          <td>{{ single.district }}</td>
        </tr>
        <tr>
          <th>प्रतिनिधिसभा नि.क्षे.नं.</th>
          <td>{{ single.houseofrepresentative }}</td>
        </tr>
        <tr>
          <th>प्रदेश सभा नि.क्षे.नं.</th>
          <td>{{ single.pradeshassemblyconstituency }}</td>
        </tr>
        <tr>
          <th>न.पा./गा.पा.को नाम</th>
          <td>{{ single.municipality }}</td>
        </tr>
        <tr>
          <th>समावेशी समूह</th>
          <td>{{ single.inclusivegroup }}</td>
        </tr>
        <tr>
          <th>वडा नं.</th>
          <td>{{ single.wardno }}</td>
        </tr>

        <tr>
          <th>साविक न.पा./गा.वि.स</th>
          <td>{{ single.savikmunicipality }}</td>
        </tr>
        <tr>
          <th>साविक वडा नं.</th>
          <td>{{ single.savikwardno }}</td>
        </tr>
        <tr>
          <th>मोवाइल नं.</th>
          <td>{{ single.phone }}</td>
        </tr>
        <tr>
          <th>इमेल</th>
          <td>{{ single.email }}</td>
        </tr>
        <tr>
          <th>कैफियत</th>
          <td>{{ single.kaifiyat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PopViewCircularSingle",
  props:['single'],
  methods:{
    closepopup(){
      this.$emit('clickBox')
    }
  }
};
</script>

<style>
</style>
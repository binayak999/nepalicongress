<template>
  <section class="pdfbox">
    <ul class="imageheader">
      <li>
        <img :src="require(`@/assets/images/flag.jpg`)" alt="" />
      </li>
      <li>
        <h1>नेपाली कांग्रेस</h1>
        <h2>क्रियाशील</h2>
      </li>
      <li>
        <img :src="require(`@/assets/images/tree.png`)" alt="" />
      </li>
    </ul>
    <table class="table table-responsive" border="1">
      <thead>
        <tr>
          <th v-for="(heading, index) in headings" :key="index">
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(body, index) in bodydata" :key="index">
          <td>{{ body.workingformnumber }}</td>
          <td>{{ body.membername }}</td>
          <td>{{ body.fathermothername }}</td>
          <td>{{ body.houseofrepresentative }}</td>
          <td>{{ body.age }}</td>
          <td>{{ body.profession }}</td>
          <td>{{ body.gender }}</td>
          <td>{{ body.region }}</td>
          <td>{{ body.district }}</td>
          <td>{{ body.froRconstituencyNo }}</td>
          <td>{{ body.pradeshassemblyconstituency }}</td>
          <td>{{ body.municipality }}</td>
          <td>{{ body.houseofrepresentative }}</td>
          <td>{{ body.wardno }}</td>
          <td>{{ body.inclusivegroup }}</td>
          <td>{{ body.savikmunicipality }}</td>
          <td>{{ body.savikwardno }}</td>
          <td>{{ body.phone }}</td>
          <td>{{ body.email }}</td>
          <td>{{ body.kaifiyat }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "Downloadabletable",
  props: ["headings", "bodydata"],
};
</script>

<style lang="scss" scoped>
.pdfbox {
  position: fixed;
  left: 100px;
  right: 100px;
  background: white;
  z-index: 9999;
  padding: 30px;

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
  .imageheader {
    background: white;
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    img {
      height: 90px;
    }
    h1 {
      font-size: 30px;
      text-align: center;
    }
    h2 {
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
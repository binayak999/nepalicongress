<template>
  <section>
    <!-- <v-row class="d-flex justify-space-between statstitle">
      <h1 v-if="status">{{ title }}</h1>
      <ul class="switchLayout no-print">
        <li
          @click="switchLayout('chart')"
          v-bind:class="{ active: show == 'chart' }"
        >
          chart view
        </li>
        <li
          @click="switchLayout('table')"
          v-bind:class="{ active: show == 'table' }"
        >
          table view
        </li>
      </ul>
    </v-row> -->
    <!-- <button class="open-modal-btn" @click="openModal">
      View Fullscreen Chart
    </button> -->
    <div ref="reportContent">
      <div class="chart-container">
        <pie-chart
          :width="300"
          :height="100"
          :data="chartData"
          :options="chartOptions"
          
        ></pie-chart>
      </div>
      <div
        style="min-height: 250px; overflow-x: scroll;"

      >
        <table class="table pdfbox customheight" border="border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Count</th>
              <th v-if="totalDAll != totalAll">Percentage In Filtered Sum</th>
              <th v-if="totalAll != undefined">Percentage Overall</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in datachart" :key="index">
              <td v-if="data.title != undefined">{{ data.title }}</td>
              <td v-if="data.title != undefined">{{ data.count }}</td>
              <td v-if="totalDAll != totalAll && data.title != undefined">
                {{ ((data.count / totalDAll) * 100).toFixed(2) }}%
              </td>
              <td v-if="totalAll != undefined && data.title != undefined">
                {{ ((data.count / totalAll) * 100).toFixed(5) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal Popup -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <pie-chart
          :width="800"
          :height="600"
          :data="chartData"
          :options="chartOptions"
        ></pie-chart>
        <div class="table-container">
          <table class="table pdfbox customheight" border="border">
            <thead>
              <tr>
                <th>Title</th>
                <th>Count</th>
                <th v-if="totalDAll != totalAll">Percentage In Filtered Sum</th>
                <th v-if="totalAll != undefined">Percentage Overall</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in datachart" :key="index">
                <td v-if="data.title != undefined">{{ data.title }}</td>
                <td v-if="data.title != undefined">{{ data.count }}</td>
                <td v-if="totalDAll != totalAll && data.title != undefined">
                  {{ ((data.count / totalDAll) * 100).toFixed(2) }}%
                </td>
                <td v-if="totalAll != undefined && data.title != undefined">
                  {{ ((data.count / totalAll) * 100).toFixed(5) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="close-btn" @click="closeModal">
          <v-icon color="#fff"> mdi-close </v-icon>
        </button>
      </div>
    </div>
  
  </section>
</template>
<script>
import PieChart from "../PieChart.js";


export default {
  name: "ChartAndTable",
  components: { PieChart },
  props: ["datachart", "title", "status", "totalAll", "totalDAll"],
  data() {
    return {
      colors: [
        "#145A32", // Deep Forest Green
        "#196F3D", // Emerald Green
        "#1E8449", // Dark Mint Green
        "#239B56", // Deep Grass Green
        "#27AE60", // Pine Green
        "#186A3B", // Olive Green
        "#0E6655", // Teal Green
        "#0B5345", // Dark Jade Green
        "#1D8348", // Classic Forest Green
        "#28B463", // Rich Fern Green,
      ],
      show: "table",
      chartData: null,
      chartOptions: null,
      isModalOpen: false,
    };
  },
  methods: {
   
    switchLayout(view) {
      this.show = view;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    initializeChartData() {
      if (
        !this.datachart ||
        !Array.isArray(this.datachart) ||
        !this.datachart.length
      ) {
        this.chartData = null;
        return;
      }

      const labels = this.datachart.map((data) => data.title || "N/A");
      const dataCounts = this.datachart.map((data) => data.count);
      const backgroundColors = this.colors.slice(0, this.datachart.length);

      this.chartData = {
        labels,
        datasets: [
          {
            label: this.title || "Chart",
            backgroundColor: backgroundColors,
            data: dataCounts,
          },
        ],
      };
    },
  },
  created() {
    this.initializeChartData();
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        tooltip: { enabled: true },
      },
      hover: { mode: "nearest", intersect: true },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  th {
    font-size: 12px;
    font-weight: 500;
    width: 35%;
    padding: 5px;
  }
  td {
    font-size: 12px;
    font-weight: 500;
    width: 35%;
    padding: 5px;
  }
}

.statstitle {
  align-items: center;

  h1 {
    font-size: 14px;
  }

  .switchLayout {
    display: flex;
    list-style: none;
    text-transform: capitalize;
    padding-left: 0px;
    background-color: rgb(173, 173, 173);
    padding: 3px;
    border-radius: 30px;
    gap: 5px;

    li {
      font-size: 14px;
      background: $midwhite;
      color: $dark;
      cursor: pointer;
      padding: 2px 10px;
      border-radius: 30px;
    }

    .active {
      background: $secondary;
      color: $white;
    }
  }
}

.open-modal-btn {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.open-modal-btn:hover {
  background-color: #145a32;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.download-pdf-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-pdf-btn:hover {
  background-color: #145a32;
}
</style>

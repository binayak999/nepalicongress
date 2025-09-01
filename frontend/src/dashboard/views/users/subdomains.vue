<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />

    <v-container v-if="!isDataLoaded">
      <v-row>
        <v-col>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          Loading...
        </v-col>
      </v-row>
    </v-container>

    <template v-else>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" class="ml-auto">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-data-table
        :headers="headers"
        :items="allSubdomain"
        :search="search"
        sort-by="sn"
        class="elevation-1"
        :loading="isLoading"
        loading-text="Loading data..."
      >
        <!-- Actions column -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                small 
                class="mr-2" 
                @click="editItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit Item</span>
          </v-tooltip>
        </template>

        <!-- Option Action column -->
        <template v-slot:[`item.optionAction`]="{ item }">
          <!-- Deactive button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="btn btn_secondary"
                style="background-color: red !important;"
                @click="updateAction(item._id)"
                v-if="!item.optionAction && isEligibleForActions(item)"
                v-bind="attrs"
                v-on="on"
              >
                is Deactive
              </button>
            </template>
            <span>Make Active</span>
          </v-tooltip>
          
          <!-- Active button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="btn btn_primary"
                style="background-color: green !important;"
                @click="updateAction(item._id)"
                v-if="item.optionAction && isEligibleForActions(item)"
                v-bind="attrs"
                v-on="on"
              >
                is Active
              </button>
            </template>
            <span>Make Deactive</span>
          </v-tooltip>
        </template>

        <!-- Show Public column -->
        <template v-slot:[`item.showPublic`]="{ item }">
          <!-- Deactive button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="btn btn_secondary"
                style="background-color: red !important;"
                @click="updatePublicAccess(item._id)"
                v-if="!item.showPublic && isEligibleForActions(item)"
                v-bind="attrs"
                v-on="on"
              >
                is Deactive
              </button>
            </template>
            <span>Make Active</span>
          </v-tooltip>
          
          <!-- Active button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="btn btn_primary"
                style="background-color: green !important;"
                @click="updatePublicAccess(item._id)"
                v-if="item.showPublic && isEligibleForActions(item)"
                v-bind="attrs"
                v-on="on"
              >
                is Active
              </button>
            </template>
            <span>Make Deactive</span>
          </v-tooltip>
        </template>

        <!-- Visibility column -->
        <template v-slot:[`item.visible`]="{ item }">
          <!-- Deactive button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="btn btn_secondary"
                style="background-color: red !important;"
                @click="updateVisibility(item._id)"
                v-if="!item.visible && isEligibleForActions(item)"
                v-bind="attrs"
                v-on="on"
              >
                is Deactive
              </button>
            </template>
            <span>Make Active</span>
          </v-tooltip>
          
          <!-- Active button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="btn btn_primary"
                style="background-color: green !important;"
                @click="updateVisibility(item._id)"
                v-if="item.visible && isEligibleForActions(item)"
                v-bind="attrs"
                v-on="on"
              >
                is Active
              </button>
            </template>
            <span>Make Deactive</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </template>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Subdomain",
  components: {
    TitleBreadCrumb
  },
  data() {
    return {
      title: "Subdomain",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Subdomain",
        },
      ],
      search: "",
      isLoading: false,
      headers: [
        { text: "S.N.", value: "__v" },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Username", value: "userHandle" },
        { text: "Municipality", value: "municipality" },
        { text: "Address", value: "address" },
        { text: "Password", value: "pass" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "Active Action", value: "optionAction", sortable: false },
        { text: "Show Public Action", value: "showPublic", sortable: false },
        { text: "Show Visible", value: "visible", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        content: "",
      },
      defaultItem: {
        name: "",
        content: "",
      }
    };
  },

  computed: {
    ...mapGetters(["allDashCategories", "allSubdomain", "allloadingSubdomain"]),
    
    isDataLoaded() {
      return this.allloadingSubdomain;
    },
    
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  methods: {
    ...mapActions([
      "fetchSubDomain", 
      "updateOptionAction", 
      "updateShowPublic", 
      "getVisibleFuncStatus"
    ]),
    
    isEligibleForActions(item) {
      return item.categoryNep === 'नेपाली कांग्रेस जिल्ला कार्यसमिति' || 
             item.categoryNep === 'नेपाली जनसम्पर्क समिति';
    },
    
    editItem(item) {
      this.$router.push(`/dashboard/editsubdomain/${item._id}`).catch(error => {
        console.error("Navigation error:", error);
      });
    },
    
    updateAction(id) {
      this.isLoading = true;
      this.updateOptionAction({ id }).finally(() => {
        this.isLoading = false;
      });
    },
    
    updatePublicAccess(id) {
      this.isLoading = true;
      this.updateShowPublic({ id }).finally(() => {
        this.isLoading = false;
      });
    },
    
    updateVisibility(id) {
      this.isLoading = true;
      this.getVisibleFuncStatus({ id }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  
  created() {
    this.isLoading = true;
    this.fetchSubDomain().finally(() => {
      this.isLoading = false;
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

.v-sheet {
  display: none;
}

.btn {
  padding: 8px 20px;
  color: $white;
  font-size: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  
  &.btn_primary {
    background-color: $btncolor !important;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  &.btn_secondary {
    background-color: $secondary !important;
    
    &:hover {
      opacity: 0.9;
    }
  }

  &:focus {
    outline: none;
  }
}
</style>
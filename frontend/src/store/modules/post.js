import axios from "axios";
import store from "..";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
  // dashboard
  posts: [],
  pages: [],
  news: [],
  history: [],
  events: [],
  notice: [],
  pressrelease: [],
  ruelsandregulation: [],
  ourinspirations: [],
  partyconstitution: [],
  onlinelibrary: [],
  president: [],
  datehistory: [],
  documents: [],
  popposts: [],
  circulardocument: [],
  loading: false,
  posting: false,
  circular: [],
  circularold: [],
  activeMemberReport: [],
  provincedistrict: [],
  provinces: [],
  filterData: [],
  filterDataUser: [],
  filterDataLength: 0,
  loadingActive: false,

  filtdata: [],
  filtChartdata: [],

  // frontend
  postsFrontend: [],
  pagesFrontend: [],
  newsFrontend: [],
  historyFrontend: [],
  eventsFrontend: [],
  noticeFrontend: [],
  pressreleaseFrontend: [],
  ruelsandregulationFrontend: [],
  ourinspirationsFrontend: [],
  partyconstitutionFrontend: [],
  onlinelibraryFrontend: [],
  documentsFrontend: [],
  poppostsFrontend: [],
  circulardocumentFrontend: [],

  // homepage
  postsHomepage: [],
  newsHomepage: [],
  historyHomepage: [],
  eventsHomepage: [],
  noticeHomepage: [],
  presidentHomepage: [],
  datehistoryHomepage: [],
  pressreleaseHomepage: [],
  ruelsandregulationHomepage: [],
  ourinspirationsHomepage: [],
  documentsHomepage: [],
  poppostHomepage: [],
  circulardocumentHomepage: [],
  activemember: [],
  activememberOldNew: [],
  calendarevent: [],

  // orginalData
  onlinelibraryFrontendOrginal: [],
  circularDocumentFrontendOrginal: [],
  documentFrontendOrginal: [],

  // single
  singlepost: [],
  singlepage: [],
  singlecircular: [],
  singleActiveMember: [],

  success: [],
  totalChart: [],

  representative: [],
  districts: [],
  region: [],
  ward: [],
  loadingReport: false,
  reports: [],

  activeTotalOld: 0,
  activeTotal: 0,
  loadspecific: true,

  totalActiveNumber: [],
  activeMemberPhone: [],
  colordata: [],
  provincedistrictOnly: [],
  subdomainsubmitted: [],
  menustatusactive: true,
  toles:[],
  onlinemebers: [],
};

const getters = {
  // dashboard
  allPost: (state) => state.posts,
  allPage: (state) => state.pages,
  allNews: (state) => state.news,
  allHistory: (state) => state.history,
  allEvents: (state) => state.events,
  allNotice: (state) => state.notice,
  allPressRelease: (state) => state.pressrelease,
  allRulesandRegulation: (state) => state.ruelsandregulation,
  allOurInspiration: (state) => state.ourinspirations,
  allPartyConstitution: (state) => state.partyconstitution,
  allOnlineLibrary: (state) => state.onlinelibrary,
  allDocuments: (state) => state.documents,
  allPopposts: (state) => state.popposts,
  allPresident: (state) => state.president,
  allDateHistory: (state) => state.datehistory,
  allCircular: (state) => state.circular,
  allCircularOld: (state) => state.circularold,
  allActiveMember: (state) => state.activemember,
  allProvienceDistrict: (state) => state.provincedistrict,
  allProvices: (state) => state.provinces,
  allFilterData: (state) => state.filterData,
  allFilterChartData: (state) => state.filtChartdata,
  allFilterDataUser: (state) => state.filterDataUser,
  allCircularDocuments: (state) => state.circulardocument,
  allActiveMemberReport: (state) => state.activeMemberReport,
  allactivememberOldNew: (state) => state.activememberOldNew,
  allCalendarEvent: (state) => state.calendarevent,

  allFitdata: (state) => state.filtdata,

  allActiveTotal: (state) => state.activeTotal,
  allActiveOldTotal: (state) => state.activeTotalOld,
  allActiveMemberTotal: (state) => state.filterDataLength,

  allProvinceonly: (state) => state.provincedistrictOnly,

  allRepresentative: (state) => state.representative,
  allDistrict: (state) => state.districts,
  allRegion: (state) => state.region,
  allWard: (state) => state.ward,

  // frontend
  allPostFrontend: (state) => state.postsFrontend,
  allPageFrontend: (state) => state.pagesFrontend,
  allNewsFrontend: (state) => state.newsFrontend,
  allHistoryFrontend: (state) => state.historyFrontend,
  allEventsFrontend: (state) => state.eventsFrontend,
  allNoticeFrontend: (state) => state.noticeFrontend,
  allPressReleaseFrontend: (state) => state.pressreleaseFrontend,
  allRulesandRegulationFrontend: (state) => state.ruelsandregulationFrontend,
  allOurInspirationFrontend: (state) => state.ourinspirationsFrontend,
  allPartyConstitutionFrontend: (state) => state.partyconstitutionFrontend,
  allOnlineLibraryFrontend: (state) => state.onlinelibraryFrontend,
  allDocumentsFrontend: (state) => state.documentsFrontend,
  allPoppostsFrontend: (state) => state.poppostsFrontend,
  allCircularDocumentFrontend: (state) => state.circulardocumentFrontend,

  // homepage
  allPostHomepage: (state) => state.postsHomepage,
  allNewsHomepage: (state) => state.newsHomepage,
  allHistoryHomepage: (state) => state.historyHomepage,
  allEventsHomepage: (state) => state.eventsHomepage,
  allNoticeHomepage: (state) => state.noticeHomepage,
  allPressReleaseHomepage: (state) => state.pressreleaseHomepage,
  allRulesandRegulationHomepage: (state) => state.ruelsandregulationHomepage,
  allOurInspirationHomepage: (state) => state.ourinspirationsHomepage,
  allDocumentsHomepage: (state) => state.documentsHomepage,
  allPoppostsHomepage: (state) => state.poppostHomepage,
  allCircularDocumentHomepage: (state) => state.circulardocumentHomepage,
  allPresidentHomepage: (state) => state.presidentHomepage,
  allDateHistoryHomepage: (state) => state.datehistoryHomepage,

  allChartData: (state) => state.totalChart,

  // single
  singlePostAll: (state) => state.singlepost,
  singlePageAll: (state) => state.singlepage,
  singleCircularAll: (state) => state.singlecircular,
  allSingleActiveMember: (state) => state.singleActiveMember,

  allReport: (state) => state.reports,

  loadingall: (state) => state.loading,
  loadingspecificall: (state) => state.loadspecific,
  loadingReportAll: (state) => state.loadingReport,
  allloadingActive: (state) => state.loadingActive,
  postingLoad: (state) => state.posting,

  allTotalAcitvePhone: (state) => state.totalActiveNumber,
  allactiveMemberPhone: (state) => state.activeMemberPhone,
  allColorData: (state) => state.colordata,

  allSubmittedSubdomain: (state) => state.subdomainsubmitted,
  allMenuStatusActive: (state) => state.menustatusactive,

  allOnlineMembers: (state) => state.onlinemebers,
  allToles: (state) => state.toles,
};

const actions = {
  // homepage

  async fetchPostsHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/posts/homepage`);
      // console.log(res.data.posts);
      commit("setPostsHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPostsHomepage", []);
    }
  },
  async fetchNewsHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/news/homepage`);
      // console.log(res.data.posts);
      commit("setNewsHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setNewsHomepage", []);
    }
  },
  async fetchHistoryHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/history/homepage`);
      // console.log(res.data.posts);
      commit("setHistoryHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setHistoryHomepage", []);
    }
  },
  async fetchEventsHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/events/homepage`);
      // console.log(res.data.posts);
      commit("setEventsHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setEventsHomepage", []);
    }
  },
  async fetchNoticeHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/notice/homepage`);
      // console.log(res.data.posts);
      commit("setNoticeHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setNoticeHomepage", []);
    }
  },
  async fetchPressReleaseHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/pressrelease/homepage`);
      // console.log(res.data.posts);
      commit("setPressReleaseHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPressReleaseHomepage", []);
    }
  },
  async fetchRulesNregulationHomepage({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/rulesandregulation/homepage`
      );
      // console.log(res.data.posts);
      commit("setRulesHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setRulesHomepage", []);
    }
  },
  async fetchPresidentHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/president/homepage`);
      // console.log(res.data.posts);
      commit("setPresidentHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPresidentHomepage", []);
    }
  },
  async fetchDateHistoryHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/datehistory/homepage`);
      // console.log(res.data.posts);
      commit("setDateHistoryHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setDateHistoryHomepage", []);
    }
  },
  async fetchInspirationHomepage({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/ourinspiration/homepage`
      );
      // console.log(res.data.posts);
      commit("setInspirationHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setInspirationHomepage", []);
    }
  },
  async fetchDocumentsHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/documents/homepage`);
      // console.log(res.data.posts);
      commit("setDocumentsHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setDocumentsHomepage", []);
    }
  },
  async fetchPoppostsHomepage({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/popposts/homepage`);
      // console.log(res.data.posts);
      commit("setPoppostsHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPoppostsHomepage", []);
    }
  },
  async fetchCircularDocumentHomepage({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/circulardocument/homepage`
      );
      // console.log(res.data.posts);
      commit("setCircularDocumentHomepage", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setCircularDocumentHomepage", []);
    }
  },

  // frontend
  async fetchPostsFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/posts/frontend`);
      // console.log(res.data.posts);
      commit("setPostsFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPostsFrontend", []);
    }
  },
  async fetchNewsFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/news/frontend`);
      // console.log(res.data.posts);
      commit("setNewsFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setNewsFrontend", []);
    }
  },
  async fetchHistoryFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/history/frontend`);
      // console.log(res.data.posts);
      commit("setHistoryFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setHistoryFrontend", []);
    }
  },
  async fetchEventsFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/events/frontend`);
      // console.log(res.data.posts);
      commit("setEventsFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setEventsFrontend", []);
    }
  },
  async fetchNoticeFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/notice/frontend`);
      // console.log(res.data.posts);
      commit("setNoticeFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setNoticeFrontend", []);
    }
  },
  async fetchPressReleaseFrontend({ commit }, data) {
    try {
      const res = await axios.post(
        `${baseUrl}singlepost/pressrelease/frontend`,
        data
      );
      // console.log(res.data.posts);
      commit("setPressReleaseFrontend", res.data);
    } catch (error) {
      console.log(error.response);
      commit("setPressReleaseFrontend", []);
    }
  },
  async fetchRulesNregulationFrontend({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/rulesandregulation/frontend`
      );
      // console.log(res.data.posts);
      commit("setRulesFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setRulesFrontend", []);
    }
  },
  async fetchInspirationFrontend({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/ourinspiration/frontend`
      );
      // console.log(res.data.posts);
      commit("setInspirationFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setInspirationFrontend", []);
    }
  },
  async fetchPartyConstitutionFrontend({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/partyconstitution/frontend`
      );
      // console.log(res.data.posts);
      commit("setPartyConstitutionFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPartyConstitutionFrontend", []);
    }
  },
  async fetchOnlineLibraryFrontend({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/onlinelibrary/frontend`
      );
      // console.log(res.data.posts);
      commit("setOnlineLibraryFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setOnlineLibraryFrontend", []);
    }
  },

  async submitActiveMember({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}circular/subDomainSubmit`, {
        headers: {
          ActiveMemberHeader: `Bearer ${
            JSON.parse(secureStorage.getItem("activeUserData")).token
          }`,
        },
      });
      console.log(res.status);
      this.dispatch("fetchCircular");
      this.dispatch("fetchCircularOld");
      commit("setSuccess", true);
    } catch (error) {
      console.log(error);
    }
  },

  async fetchDocumentFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/documents/frontend`);
      // console.log(res.data.posts);
      commit("setDocumentsFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setDocumentsFrontend", []);
    }
  },
  async fetchPoppostFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}singlepost/popposts/frontend`);
      // console.log(res.data.posts);
      commit("setPoppostsFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPoppostsFrontend", []);
    }
  },
  async fetchCircularDocumentFrontend({ commit }) {
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/circulardocument/frontend`
      );
      // console.log(res.data.posts);
      commit("setCircularDocumentsFrontend", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setCircularDocumentsFrontend", []);
    }
  },

  async fetchPagesFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}page/frontend`);
      // console.log(res.data.posts);
      commit("setPagesFrontend", res.data.pages);
    } catch (error) {
      console.log(error.response);
      commit("setPagesFrontend", []);
    }
  },

  // search library
  async searchLibrary({ commit }, data) {
    try {
      commit("searchOnlineLibrary", data);
    } catch (error) {
      console.log(error);
    }
  },
  // search document
  async searchDocument({ commit }, data) {
    try {
      commit("setSearchDocument", data);
    } catch (error) {
      console.log(error);
    }
  },
  // search circular document
  async searchCircularDocument({ commit }, data) {
    try {
      commit("setSearchCircularDocument", data);
    } catch (error) {
      console.log(error);
    }
  },

  // backend
  async fetchPosts({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/posts`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminposts`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }

      // console.log(res.data.posts);
      commit("setPosts", res.data.posts);
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
      commit("setPosts", []);
    }
  },
  async fetchCalendarEvent({ commit }) {
    try {
      let res = await axios.get(`${baseUrl}singlepost/admincalendarevents`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });

      // console.log(res.data.posts);
      commit("setCalendarEvent", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setCalendarEvent", []);
    }
  },

  async fetchPresident({ commit }) {
    try {
      let res;

      res = await axios.get(`${baseUrl}singlepost/adminpresident`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });

      // console.log(res.data.posts);
      commit("setPresident", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPresident", []);
    }
  },
  async fetchDateHistory({ commit }) {
    try {
      let res;

      res = await axios.get(`${baseUrl}singlepost/admindatehistory`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });

      // console.log(res.data.posts);
      commit("setDateHistory", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setDateHistory", []);
    }
  },

  async fetchNews({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/news`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminnews`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setNews", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setNews", []);
    }
  },
  async fetchHistory({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/history`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminhistory`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setHistory", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setHistory", []);
    }
  },
  async fetchEvents({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/events`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminevents`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setEvents", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setEvents", []);
    }
  },
  async fetchNotice({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/notice`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminnotice`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      commit("setNotice", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setNotice", []);
    }
  },
  async fetchPressRelease({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/pressrelease`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminpressrelease`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setPressRelease", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPressRelease", []);
    }
  },

  async fetchRulesNregulation({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/rulesandregulation`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminrulesandregulation`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setRules", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setRules", []);
    }
  },
  async fetchPartyConstitution({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/partyconstitution`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminpartyconstitution`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setPartyConstitution", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPartyConstitution", []);
    }
  },
  async fetchOnlineLibrary({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/onlinelibrary`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminonlinelibrary`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      // console.log(res.data.posts);
      commit("setOnlineLibrary", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setOnlineLibrary", []);
    }
  },
  async fetchInspiration({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/ourinspiration`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminourinspiration`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      commit("setInspiration", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setInspiration", []);
    }
  },
  async fetchDocument({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/documents`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/admindocuments`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      commit("setDocuments", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setDocuments", []);
    }
  },
  async fetchPopPost({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/popposts`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/adminpopposts`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }
      commit("setPopposts", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setPopposts", []);
    }
  },
  async fetchCircularDocument({ commit }) {
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}singlepost/circulardocument`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}singlepost/admincirculardocument`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }

      commit("setCircularDocument", res.data.posts);
    } catch (error) {
      console.log(error.response);
      commit("setCircularDocument", []);
    }
  },
  // backend
  async fetchCircular({ commit }, data) {

    if (data == undefined) data.limit = 100;

    state.loadingActive = true;
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(
          `${baseUrl}circular/circulars?limit=${data.limit}&page=${data.page}&memberType=${data.memberType}`,
          {
            headers: {
              ActiveMemberHeader: `Bearer ${
                JSON.parse(secureStorage.getItem("activeUserData")).token
              }`,
            },
          }
        );
      } else {
        res = await axios.get(
          `${baseUrl}circular/admincirculars?limit=${data.limit}&page=${data.page}&memberType=${data.memberType}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
      }
      state.activeTotal = res.data.total;
      commit("setCirculars", res.data);
    } catch (error) {
      commit("setCirculars", []);
      if (error.response && error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }
      if (error.response && error.response.status == 403) {
        store.dispatch("logoutUser");
      }
      console.log(error.response);

    }
    state.loadingActive = false;
  },

  async getReports({ commit }) {
    let res;
    try {
      res = await axios.get(`${baseUrl}circular/getTotalReports`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
    }
    state.loadingReport = true;
    commit("setReport", res.data);
  },

  async getReportsPhone({ commit }, data) {
    let res;
    try {
      state.loadingReport = false;
      res = await axios.post(`${baseUrl}circular/getNumberList`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setReportPhone", res.data);
    } catch (error) {
      console.log(error);
      commit("setReportPhone", []);
    }
    state.loadingReport = true;
  },

  async getReportsPhoneNumber({ commit }) {
    let res;
    try {
      state.loadingReport = false;
      res = await axios.get(`${baseUrl}circular/getNumberList`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setReportPhoneTotal", res.data);
    } catch (error) {
      console.log(error);
      commit("setReportPhoneTotal", []);
    }
    state.loadingReport = true;
  },
  async getColorData({ commit }) {
    let res;
    try {
      state.loadingReport = false;
      res = await axios.get(`${baseUrl}circular/getTotalReportColor`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setColorData", res.data);
    } catch (error) {
      console.log(error);
      commit("setColorData", []);
    }
    state.loadingReport = true;
  },

  async getReportsProvince({ commit }, data) {
    let res;
    try {
      state.loadspecific = false;
      res = await axios.get(
        `${baseUrl}circular/getTotalReportProvince?province=${data}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    state.loadspecific = true;
    state.loadingReport = true;
    commit("setReport", res.data);
  },

  // backend
  async fetchCircularAll({ commit }, data) {
    if (data == undefined) data = 100;

    commit("setCircularsAllOldNew", []);
    state.loadingActive = true;
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}circular/circularsall?limit=${data}`, {
          headers: {
            ActiveMemberHeader: `Bearer ${
              JSON.parse(secureStorage.getItem("activeUserData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(
          `${baseUrl}circular/admincircularsall?limit=${data}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
      }

      commit("setCircularsAllOldNew", res.data.posts);
    } catch (error) {
      if (error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }

      console.log(error.response);
      commit("setCircularsAllOldNew", []);
    }
    state.loadingActive = false;
  },

  async fetchCircularAllCard({ commit }, data) {
    if (data == undefined) data = 100;

    commit("setCircularsAllOldNew", []);
    state.loadingActive = true;
    try {
      let res;
      if (
        JSON.parse(secureStorage.getItem("cardUserData")).user.role !== "admin"
      ) {
        res = await axios.get(`${baseUrl}circular/circularsall?limit=${data}`, {
          headers: {
            ActiveMemberHeader: `Bearer ${
              JSON.parse(secureStorage.getItem("cardUserData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(
          `${baseUrl}circular/admincircularsall?limit=${data}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("cardUserData")).token
              }`,
            },
          }
        );
      }

      commit("setCircularsAllOldNew", res.data.posts);
    } catch (error) {
      if (error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }

      console.log(error.response);
      commit("setCircularsAllOldNew", []);
    }
    state.loadingActive = false;
  },
  // backend
  async fetchCircularOld({ commit }, data) {
    if (data == undefined) data = 100;

    state.loadingActive = true;
    try {
      let res;
      if (JSON.parse(secureStorage.getItem("userData")).user.role !== "admin") {
        res = await axios.get(`${baseUrl}circular/circularsold?limit=${data}`, {
          headers: {
            ActiveMemberHeader: `Bearer ${
              JSON.parse(secureStorage.getItem("activeUserData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(
          `${baseUrl}circular/admincircularsold?limit=${data}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
      }
      state.activeTotalOld = res.data.total;
      commit("setCircularsold", res.data.posts);
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }
      commit("setCircularsold", []);
    }
    state.loadingActive = false;
  },

  async fetchPages({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}page/`);
      commit("setPages", res.data.pages);
      if (res.status === 200) {
        setTimeout(() => {
          state.loading = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
      commit("setPages", []);
    }
  },

  // backend
  async fetchProvinceDistrict({ commit }) {
    let muni = [];
    try {
      let res;
      res = await axios.get(`${baseUrl}provicedistrict/`);

      state.provinces = res.data;

      if (
        JSON.parse(secureStorage.getItem("userData")).user.nepname != undefined
      ) {
        res.data.forEach((ele) => {
          if (
            ele.name.trim() ==
            JSON.parse(secureStorage.getItem("userData")).user.nepname.trim()
          ) {
            muni = ele.list;
          }
        });
        state.representative = muni.repno;
      }
      commit("setProvinceDistrict", muni);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrict", []);
    }
  },
  async fetchProvinceDistrictActive({ commit }) {
    let muni = [];
    try {
      let res;
      res = await axios.get(`${baseUrl}provicedistrict/`);

      state.provinces = res.data;

      if (
        JSON.parse(secureStorage.getItem("cardUserData")).user.nepname !=
        undefined
      ) {
        res.data.forEach((ele) => {
          if (
            ele.name.trim() ==
            JSON.parse(
              secureStorage.getItem("cardUserData")
            ).user.nepname.trim()
          ) {
            muni = ele.list;
          }
        });
        state.representative = muni.repno;
      }
      commit("setProvinceDistrict", muni);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrict", []);
    }
  },
  async fetchProvinceDistrictData({ commit }, data) {
    let muni = [];
    try {
      let res;
      res = await axios.get(`${baseUrl}provicedistrict/`);

      state.provinces = res.data;

      if (
        JSON.parse(secureStorage.getItem("userData")).user.nepname != undefined
      ) {
        res.data.forEach((ele) => {
          if (ele.name.trim() == data.trim()) {
            muni = ele.list;
          }
        });
        state.representative = muni.repno;
      }
      commit("setProvinceDistrict", muni);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrict", []);
    }
  },

  async fetchProvinceDistrictProvince({ commit }) {
    let muni = [];
    commit("setProvinceDistrict", []);
    try {
      let res;
      res = await axios.get(`${baseUrl}provicedistrict/withprovince`);

      state.provinces = res.data;

      res.data.forEach((ele) => {
        muni = ele.district;
        // console.log(muni);
      });
      state.representative = muni.list;

      commit("setProvinceDistrict", muni);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrict", []);
    }
  },
  async getToles({ commit }, data) {
    try {
      let response = await axios.post(`${baseUrl}provicedistrict/toles`, data);
      commit("setToles", response.data.results);
    } catch (error) {
      console.log(error);
      commit("setToles", []);
    }
  },
  async fetchProvinceDistrictMunicipality({ commit }) {
    let muni = [];
    commit("setProvinceDistrict", []);
    try {
      let res;
      res = await axios.get(
        `${baseUrl}provicedistrict/provinceDistrictMuncipality`
      );

      state.provinces = res.data;

      res.data.forEach((ele) => {
        muni = ele.district;
        // console.log(muni);
      });
      state.representative = muni.list;

      commit("setProvinceDistrict", muni);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrict", []);
    }
  },

  async fetchProvinceDistrictSelectProvice({ commit }, dataForm) {
    let muni = [];
    try {
      state.provinces.forEach((ele) => {
        if (ele.province == dataForm) {
          muni = ele.district;
        }
      });
      state.districts = muni;

      commit("setProvinceDistrict", muni);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrict", []);
    }
  },

  async fetchProvinceDistrictSelect({ commit }) {
    try {
      let res;
      res = await axios.get(`${baseUrl}provicedistrict/withprovince`);

      commit("setProvinceDistrictProvince", res.data);
    } catch (error) {
      console.log(error);
      commit("setProvinceDistrictProvince", []);
    }
  },
  async subdomainSubmitted({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}circular/subdomainsubmitted`);
      commit("setSubdomainSubmitted", res.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getMenuStatusActive({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}circular/getMenuStatusActive`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      // console.log(res.data.posts);
      commit("setActiveMenuStatus", res.data);
    } catch (error) {
      console.log(error.response);
      commit("setActiveMenuStatus", []);
    }
  },
  async filterData({ commit }, dataForm) {
    state.loadingActive = true;
    commit("setFilterData", []);
    try {
      let res;
      if (
        JSON.parse(secureStorage.getItem("userData")).user.role === "subdomain"
      ) {
        res = await axios.post(`${baseUrl}circular/filterCircular`, dataForm, {
          headers: {
            ActiveMemberHeader: `Bearer ${
              JSON.parse(secureStorage.getItem("activeUserData")).token
            }`,
          },
        });
      } else if (
        JSON.parse(secureStorage.getItem("userData")).user.role ===
        "activeviewer"
      ) {
        res = await axios.post(
          `${baseUrl}circular/filterCircularAdmin`,
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${baseUrl}circular/filterCircularAdmin`,
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
      }
      state.filterDataLength = res.data.total;
      state.totalChart = res.data;
      commit("setFilterData", res.data);
      commit("setFilters", dataForm);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
      commit("setFilterData", []);
    }
    state.loadingActive = false;
  },

  async filterDataCardPrinter({ commit }, dataForm) {
    state.loadingActive = true;
    commit("setFilterData", []);
    try {
      let res;

      res = await axios.post(
        `${baseUrl}circular/filterCircularAdminCard`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("cardUserData")).token
            }`,
          },
        }
      );

      state.filterDataLength = res.data.pagination.total;
      state.totalChart = res.data;
      commit("setFilterData", res.data);
      commit("setFilters", dataForm);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
      commit("setFilterData", []);
    }
    state.loadingActive = false;
  },

  async filterDataCard({ commit }, dataForm) {
    state.loadingActive = true;
    commit("setFilterData", []);
    try {
      let res;

      res = await axios.post(
        `${baseUrl}circular/filterCircularAdminCard`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );

      state.filterDataLength = res.data.total;
      state.totalChart = res.data;
      commit("setFilterData", res.data);
      commit("setFilters", dataForm);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "warning",
          status: true,
          title: `Information`,
          message: `You don't have access to check the data this time please contact admin if any confusion`,
        };
        this.dispatch("alertNow", info);
      }
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
      commit("setFilterData", []);
    }
    state.loadingActive = false;
  },

  async fetchChartData({ commit }, dataForm) {
    state.loadingActive = true;
    commit("setChartFilterData", []);
    try {
      let res = await axios.post(
        `${baseUrl}circular/chartLoadAdmin`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );

      state.totalChart = res.data;
      commit("setChartFilterData", res.data);
    } catch (error) {
      console.log(error);
      commit("setChartFilterData", []);
    }
    state.loadingActive = false;
  },
  async filterDataUser({ commit }, dataForm) {
    state.loadingActive = true;
    try {
      let res = await axios.post(
        `${baseUrl}circular/filterUserActiveMemberWeb`,
        dataForm
      );

      commit("setFilterDataHome", res.data.posts);
    } catch (error) {
      console.log(error);
      commit("setFilterDataHome", []);
    }
    state.loadingActive = false;
  },

  // single
  async fetchSingle({ commit }, params) {
    commit("setPostsSingle", []);
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/${params.page}/${params.slug}`
      );

      if (res.status === 200) {
        commit("setPostsSingle", res.data.posts);
      } else {
        commit("setPostsSingle", []);
      }
    } catch (error) {
      console.log(error.response);
    }
  },

  // single active member
  async fetchSingleActiveMember({ commit }, params) {
    commit("setActiveMember", []);
    try {
      const res = await axios.get(
        `${baseUrl}circular/getSingleActiveMember/${params}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        commit("setActiveMember", res.data.activemember);
      } else {
        commit("setActiveMember", []);
      }
    } catch (error) {
      console.log(error.response);
    }
  },

  // single
  async fetchSingleDash({ commit }, params) {
    commit("setPostsSingle", []);
    try {
      const res = await axios.get(
        `${baseUrl}singlepost/${params.page}/dashboard/${params.slug}`
      );

      if (res.status === 200) {
        commit("setPostsSingle", res.data.posts);
      } else {
        commit("setPostsSingle", []);
      }
    } catch (error) {
      console.log(error.response);
    }
  },

  async singlePage({ commit }, slug) {
    state.loading = true;
    try {
      const res = await axios.get(`${baseUrl}page/singlepage/${slug}`);
      if (res.status === 200) {
        commit("setPageSingle", res.data.page);

        setTimeout(() => {
          state.loading = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async singleCircular({ commit }, slug) {
    // console.log(slug);
    state.loading = true;
    try {
      const res = await axios.get(`${baseUrl}circular/single/${slug}`);
      if (res.status === 200) {
        commit("setCircularSingle", res.data.post);

        setTimeout(() => {
          state.loading = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async deleteCirculars({ commit }, slug) {
    state.loading = true;
    try {
      const res = await axios.put(
        `${baseUrl}circular/delete/${slug}`,
        {},
        {
          headers: {
            ActiveMemberHeader: `Bearer ${
              JSON.parse(secureStorage.getItem("activeUserData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        this.dispatch("fetchCircularAll");
        this.dispatch("fetchCircular");
        this.dispatch("fetchCircularOld");
        commit("setCircularSingle", []);
        setTimeout(() => {
          state.loading = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async deleteMultipleCirculars({ commit }, data) {
    state.loading = true;
    try {
      const res = await axios.put(
        `${baseUrl}circular/deletemultiple`,

        data,

        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        this.dispatch("fetchCircularAll");
        this.dispatch("fetchCircular");
        this.dispatch("fetchCircularOld");
        commit("setCircularSingle", []);
        setTimeout(() => {
          state.loading = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // creating post and page
  async createPost({ commit }, data) {
    state.posting = true;
    try {
      let images = [];
      let videos = [];
      let vidcond = true;
      let attachupd = data.attachment.length;
      let imageupd = data.images.length;
      let attachment = [];

      if (data.images != null) {
        data.images.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "images");
          console.log(fileUpload);
          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status === 201) {
            images.push({ fileUrl: res.data.filePath });
            imageupd -= 1;
          }
        });
      }
      if (data.videos != "" && data.videos != null) {
        vidcond = false;
        let fileUpload = new FormData();
        fileUpload.append("file", data.videos);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", data.imageFile);
        fileUpload.append("fileType", "videos");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          videos.push({ fileUrl: res.data.filePath });
          vidcond = true;
        }
      }

      if (data.attachment.length != 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["videos"];
      delete data["imageFile"];
      delete data["pdf"];

      data = Object.assign(
        data,
        {
          images,
        },
        {
          videos,
        },
        { attachment }
      );

      let box = setInterval(async () => {
        if (vidcond && imageupd === 0 && attachupd === 0) {
          clearInterval(box);
          commit("setSuccess", "Successfully Added");
          const res = await axios.post(`${baseUrl}post/create`, data, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          });

          if (res.status === 201 && data.slug == "events") {
            router.push("/dashboard/events").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Event Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "posts") {
            router.push("/dashboard/posts").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Post Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "history") {
            router.push("/dashboard/history").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `History Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "news") {
            router.push("/dashboard/news").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `News Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "notice") {
            router.push("/dashboard/notice").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Manifesto Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "our-inspiration") {
            router.push("/dashboard/ourinspiration").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Our Inspiration  Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "rules-and-regulations") {
            router.push("/dashboard/rules").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
          }
          if (res.status === 201 && data.slug == "press-release") {
            router.push("/dashboard/pressrelease").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Press Release Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "party-constitution") {
            router.push("/dashboard/partyconstitution").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Party Constitution Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "online-library") {
            router.push("/dashboard/onlinelibrary").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Online Library Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "documents") {
            router.push("/dashboard/documents").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Document  Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "popposts") {
            router.push("/dashboard/popposts").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Popposts Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "circulars") {
            router.push("/dashboard/circulardocuments").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Circulars Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "president") {
            router.push("/dashboard/presidentmessage").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `President Message Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "datehistory") {
            router.push("/dashboard/historyslider").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `History Slider Message Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 201 && data.slug == "calendar-events") {
            router.push("/dashboard/calendarevents").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Calendar History Message Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Unsuccessful");
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async createPage({ commit }, data) {
    state.posting = true;
    try {
      let images = [];
      let videos = [];
      let attachment = [];
      let attachupd = data.attachment.length;
      let imageupd = data.images.length;

      let vidcond = true;
      if (data.images != null) {
        data.images.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "images");
          console.log(fileUpload);
          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status === 201) {
            images.push({ fileUrl: res.data.filePath });
            imageupd -= 1;
          }
        });
      }
      if (data.videos != "" && data.videos != null) {
        vidcond = false;
        let fileUpload = new FormData();
        fileUpload.append("file", data.videos);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", data.imageFile);
        fileUpload.append("fileType", "videos");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          videos.push({ fileUrl: res.data.filePath });
          vidcond = true;
        }
      }

      if (data.attachment.length != 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["videos"];
      delete data["imageFile"];
      delete data["attachment"];

      data = Object.assign(
        data,
        {
          images,
        },
        {
          videos,
        },
        { attachment }
      );

      let box = setInterval(async () => {
        if (vidcond && attachupd === 0 && imageupd === 0) {
          clearInterval(box);
          const res = await axios.post(`${baseUrl}page/create`, data, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          });
          if (res.status === 201) {
            router.push("/dashboard/pages").catch((err) => {
              console.error(err);
            });
          }
          commit("setSuccess", "Successfully Added");

          setTimeout(() => {
            state.posting = false;
          }, 1000);
          let info = {
            icon: "success",
            status: true,
            title: `Success`,
            message: `Page has been created`,
          };
          this.dispatch("alertNow", info);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Unsuccessful");
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async createCircular({ commit }, data) {
    state.posting = true;
    try {
      let images = [];
      let imgcond = true;

      if (data.imageUrl != "" && data.imageUrl != null) {
        imgcond = false;
        let fileUpload = new FormData();
        fileUpload.append("file", data.imageUrl);
        fileUpload.append("assignedTo", data.membername);
        fileUpload.append("imageFile", "circular");
        fileUpload.append("fileType", "images");
        try {
          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status === 201) {
            images.push({ fileUrl: res.data.filePath });
            imgcond = true;
          }
        } catch (error) {
          console.log(error);
        }
      }
      delete data["images"];
      delete data["imageUrl"];

      data = Object.assign(data, { images });
      let box = setInterval(async () => {
        if (imgcond) {
          clearInterval(box);
          try {
            const res = await axios.post(`${baseUrl}circular/create`, data, {
              headers: {
                ActiveMemberHeader: `Bearer ${
                  JSON.parse(secureStorage.getItem("activeUserData")).token
                }`,
              },
            });
            if (res.status === 201) {
              if (data.memberType == "New") {
                router.push("/dashboard/activeMember").catch((err) => {
                  console.error(err);
                });
              } else {
                router.push("/dashboard/renewactiveMember").catch((err) => {
                  console.error(err);
                });
              }
            }
            commit("setSuccess", "Successfully Added");

            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Circular has been created`,
            };
            this.dispatch("alertNow", info);
          } catch (error) {
            console.log(error.response);
            let info = {
              icon: "error",
              status: true,
              title: `Error`,
              subtitle: error.response.data.message,
            };
            this.dispatch("alertNow", info);
            commit("setSuccess", "Was Unsuccessful");
          }
          state.posting = false;
        }
      }, 1000);
      commit("setSuccess", "Successfully Added");
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
      commit("setSuccess", "Was Unsuccessful");
    }
  },

  // update section
  async updateStatusPost({ commit }, data) {
    state.posting = true;
    try {
      const res = await axios.put(`${baseUrl}post/updateStatus`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        console.log(res.data.message);
        this.dispatch("fetchPosts");
        this.dispatch("fetchNews");
        this.dispatch("fetchHistory");
        this.dispatch("fetchEvents");
        this.dispatch("fetchNotice");
        this.dispatch("fetchPressRelease");
        this.dispatch("fetchRulesNregulation");
        this.dispatch("fetchPartyConstitution");
        this.dispatch("fetchOnlineLibrary");
        this.dispatch("fetchInspiration");
        this.dispatch("fetchDocument");
        this.dispatch("fetchPopPost");
        this.dispatch("fetchCircularDocument");
        this.dispatch("fetchPresident");
        this.dispatch("fetchDateHistory");
        this.dispatch("fetchCalendarEvent");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Post Status Has Been Updated`,
        };
        this.dispatch("alertNow", info);
        setTimeout(() => {
          state.posting = false;
        }, 1000);
        commit("setSuccess", "message");
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async updateStatusPostInside({ commit }, data) {
    state.posting = true;
    try {
      let images = data.oldImage;
      let videos = data.oldVideos;
      let vidcond = true;
      let attachupd = data.attachment.length;
      let imageupd = data.images.length;
      let attachment = data.oldAttachment;

      if (data.images != null) {
        data.images.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "images");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status === 201) {
            images.push({ fileUrl: res.data.filePath });
            imageupd -= 1;
          }
        });
      }
      if (data.videos != "" && data.videos != null) {
        vidcond = false;
        videos = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.videos);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", data.imageFile);
        fileUpload.append("fileType", "videos");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          videos.push({ fileUrl: res.data.filePath });
          vidcond = true;
        }
      }

      if (data.attachment.length != 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["videos"];
      delete data["imageFile"];
      delete data["pdf"];
      delete data["oldImage"];
      delete data["oldAttachment"];
      delete data["oldVideos"];

      data = Object.assign(
        data,
        {
          images,
        },
        {
          videos,
        },
        { attachment }
      );

      let box = setInterval(async () => {
        if (vidcond && imageupd === 0 && attachupd === 0) {
          clearInterval(box);
          const res = await axios.put(`${baseUrl}post/updateAll`, data, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          });

          if (res.status === 200 && data.slug == "events") {
            router.push("/dashboard/events").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Events Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "posts") {
            router.push("/dashboard/posts").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Posts Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "history") {
            router.push("/dashboard/history").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `History Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "news") {
            router.push("/dashboard/news").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `News Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "notice") {
            router.push("/dashboard/notice").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Notice Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "our-inspiration") {
            router.push("/dashboard/ourinspiration").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Our Inspiration Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "rules-and-regulations") {
            router.push("/dashboard/rules").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Rules and Regulations Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "press-release") {
            router.push("/dashboard/pressrelease").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Press Release Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "party-constitution") {
            router.push("/dashboard/partyconstitution").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Party Constitution Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "online-library") {
            router.push("/dashboard/onlinelibrary").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Online Library Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "documents") {
            router.push("/dashboard/documents").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Document Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "popposts") {
            router.push("/dashboard/popposts").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Popup Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "circulars") {
            router.push("/dashboard/circulardocuments").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Circular Documents Has Been Updated`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "president") {
            router.push("/dashboard/presidentmessage").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `President Message Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "datehistory") {
            router.push("/dashboard/historyslider").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `History Slider Message Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          if (res.status === 200 && data.slug == "calendar-events") {
            router.push("/dashboard/calendarevents").catch((err) => {
              console.error(err);
            });
            setTimeout(() => {
              state.posting = false;
            }, 1000);
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Calendar Events Has Been Created`,
            };
            this.dispatch("alertNow", info);
          }
          commit("setSuccess", "message");
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async updateStatusPageInside({ commit }, data) {
    state.posting = true;
    try {
      let images = data.oldImage;
      let videos = data.oldVideos;
      let vidcond = true;
      let attachupd = data.attachment != undefined ? data.attachment.length : 0;
      let imageupd = data.images != undefined ? data.images.length : 0;
      let attachment = data.oldAttachment;

      if (data.images && data.images != null) {
        data.images.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "images");
          console.log(fileUpload);
          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status === 201) {
            images.push({ fileUrl: res.data.filePath });
            imageupd -= 1;
          }
        });
      }
      if (data.videos && data.videos != "" && data.videos != null) {
        vidcond = false;
        videos = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.videos);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", data.imageFile);
        fileUpload.append("fileType", "videos");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          videos.push({ fileUrl: res.data.filePath });
          vidcond = true;
        }
      }
      if (data.attachment && data.attachment.length != 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", data.imageFile);
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["videos"];
      delete data["imageFile"];
      delete data["pdf"];
      delete data["oldImage"];
      delete data["oldAttachment"];
      delete data["oldVideos"];

      data = Object.assign(
        data,
        {
          images,
        },
        {
          videos,
        },
        { attachment }
      );

      let box = setInterval(async () => {
        if (vidcond && attachupd == 0 && imageupd == 0) {
          clearInterval(box);
          const res = await axios.put(`${baseUrl}page/update`, data, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          });

          if (res.status === 200) {
            router.push("/dashboard/pages").catch((err) => {
              console.error(err);
            });
            this.dispatch("fetchPages");
            setTimeout(() => {
              state.posting = false;
            }, 1000);
          }

          let info = {
            icon: "success",
            status: true,
            title: `Success`,
            message: `Page Has Been Updated`,
          };
          this.dispatch("alertNow", info);
          commit("setSuccess", "Successfully updated");
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async updateCircularInside({ commit }, data) {
    state.posting = true;
    try {
      let images = data.oldImage;
      let imgcond = true;

      if (data.imageUrl != undefined) {
        imgcond = false;
        images = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.imageUrl);
        fileUpload.append("assignedTo", data.membername);
        fileUpload.append("imageFile", "circular");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
          imgcond = true;
        }
        delete data["images"];
        delete data["imageFile"];
        delete data["oldImage"];
      }

      data = Object.assign(data, { images });

      let box = setInterval(async () => {
        if (imgcond) {
          clearInterval(box);
          try {
            const res = await axios.put(`${baseUrl}circular/updateAll`, data, {
              headers: {
                ActiveMemberHeader: `Bearer ${
                  JSON.parse(secureStorage.getItem("activeUserData")).token
                }`,
              },
            });

            if (res.status === 200) {
              if (data.memberType == "New") {
                router.push("/dashboard/activeMember").catch((err) => {
                  console.error(err);
                });
              } else {
                router.push("/dashboard/renewactiveMember").catch((err) => {
                  console.error(err);
                });
              }
              this.dispatch("fetchPages");
              setTimeout(() => {
                state.posting = false;
              }, 1000);
            }

            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Page Has Been Updated`,
            };
            this.dispatch("alertNow", info);
            commit("setSuccess", "Successfully updated");
          } catch (error) {
            console.log(error.response);
            let info = {
              icon: "error",
              status: true,
              title: `Error`,
              subtitle: error.response.data.message,
            };
            this.dispatch("alertNow", info);
            commit("setSuccess", "Was Unsuccessful");
          }
          state.posting = false;
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async updateCircularByAdmin({ commit }, data) {
    state.posting = true;
    try {
      let images = data.oldImage;
      let imgcond = true;

      if (data.imageUrl != undefined) {
        imgcond = false;
        images = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.imageUrl);
        fileUpload.append("assignedTo", data.membername);
        fileUpload.append("imageFile", "circular");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
          imgcond = true;
        }
        delete data["images"];
        delete data["imageFile"];
        delete data["oldImage"];
      }

      data = Object.assign(data, { images });

      let box = setInterval(async () => {
        if (imgcond) {
          clearInterval(box);
          try {
            const res = await axios.put(
              `${baseUrl}circular/updateByAdmin`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(secureStorage.getItem("userData")).token
                  }`,
                },
              }
            );

            if (res.status === 200) {
              let info = {
                icon: "success",
                status: true,
                title: `Success`,
                message: `Page Has Been Updated`,
              };
              this.dispatch("alertNow", info);
              commit("setSuccess", "Successfully updated");
              router.push("/dashboard/activeMembersubdomain");

              this.dispatch("filterData", state.filtdata);
            }
          } catch (error) {
            console.log(error.response);
            let info = {
              icon: "error",
              status: true,
              title: `Error`,
              subtitle: error,
            };
            this.dispatch("alertNow", info);
            commit("setSuccess", "Was Unsuccessful");
          }
          state.posting = false;
        }
      }, 1000);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  // delete section
  async deletePost({ commit }, data) {
    state.posting = true;

    try {
      const res = await axios.post(`${baseUrl}deletepost/singlepost`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        // console.log(res.data.message);
        this.dispatch("fetchPosts");
        this.dispatch("fetchNews");
        this.dispatch("fetchHistory");
        this.dispatch("fetchEvents");
        this.dispatch("fetchNotice");
        this.dispatch("fetchPressRelease");
        this.dispatch("fetchRulesNregulation");
        this.dispatch("fetchPartyConstitution");
        this.dispatch("fetchOnlineLibrary");
        this.dispatch("fetchInspiration");
        this.dispatch("fetchDocument");
        this.dispatch("fetchPopPost");
        this.dispatch("fetchCircularDocument");
        this.dispatch("fetchPresident");
        this.dispatch("fetchDateHistory");
        this.dispatch("fetchCalendarEvent");
        setTimeout(() => {
          state.posting = false;
        }, 1000);
        commit("setSuccess", "message");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Posts Has Been Deleted`,
        };
        this.dispatch("alertNow", info);
      } else {
        state.posting = false;
        commit("setSuccess", "unsuccessfuly");
      }
    } catch (error) {
      console.log(error);
      state.posting = false;
      commit("setSuccess", "unsuccessfuly");
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async deletePage({ commit }, data) {
    try {
      const res = await axios.delete(`${baseUrl}page/single/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        // console.log(res.data.message);
        this.dispatch("fetchPages");
        commit("setSuccess", "message");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Page has been deleted`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something is wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async updateCircular({ commit }, data) {
    try {
      const res = await axios.put(`${baseUrl}circular/updateCircular`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        commit("setCircular", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async postDateofIssue({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}circular/dateOfIssue`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        commit("setCircular", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async postOnlineMembers({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}member/onlineMembers`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        commit("setOnlineMembers", res.data);
      }
    } catch (error) {
      console.log(error);
      commit("setOnlineMembers", error.response.message);
    }
  },
};

const mutations = {
  // homepage
  setFilterData: (state, post) => (state.filterData = post),
  setChartFilterData: (state, post) => (state.filterChartData = post),
  setFilterDataHome: (state, post) => (state.filterDataUser = post),
  setPostsHomepage: (state, post) => (state.postsHomepage = post),
  setNewsHomepage: (state, post) => (state.newsHomepage = post),
  setHistoryHomepage: (state, post) => (state.historyHomepage = post),
  setEventsHomepage: (state, events) => (state.eventsHomepage = events),
  setNoticeHomepage: (state, post) => (state.noticeHomepage = post),
  setPressReleaseHomepage: (state, post) => (state.pressreleaseHomepage = post),
  setRulesHomepage: (state, post) => (state.ruelsandregulationHomepage = post),
  setInspirationHomepage: (state, post) =>
    (state.ourinspirationsHomepage = post),
  setDocumentsHomepage: (state, post) => (state.documentsHomepage = post),
  setPoppostsHomepage: (state, post) => (state.poppostHomepage = post),
  setCircularDocumentHomepage: (state, post) =>
    (state.circulardocumentHomepage = post),
  setPresidentHomepage: (state, post) => (state.presidentHomepage = post),
  setDateHistoryHomepage: (state, post) => (state.datehistoryHomepage = post),
  setFilters: (state, post) => (state.filtdata = post),

  // frontend
  setPostsFrontend: (state, post) => (state.postsFrontend = post),
  setPagesFrontend: (state, post) => (state.pagesFrontend = post),
  setNewsFrontend: (state, post) => (state.newsFrontend = post),
  setHistoryFrontend: (state, post) => (state.historyFrontend = post),
  setEventsFrontend: (state, events) => (state.eventsFrontend = events),
  setNoticeFrontend: (state, post) => (state.noticeFrontend = post),
  setPressReleaseFrontend: (state, post) => (state.pressreleaseFrontend = post),
  setRulesFrontend: (state, post) => (state.ruelsandregulationFrontend = post),
  setInspirationFrontend: (state, post) =>
    (state.ourinspirationsFrontend = post),
  setPartyConstitutionFrontend: (state, post) =>
    (state.partyconstitutionFrontend = post),
  setDocumentsFrontend: (state, post) => {
    state.documentsFrontend = post;
    state.documentFrontendOrginal = post;
  },
  setPopuppostsFrontend: (state, post) => {
    state.poppostsFrontend = post;
  },
  setOnlineLibraryFrontend: (state, post) => {
    state.onlinelibraryFrontendOrginal = post;
    state.onlinelibraryFrontend = post;
  },
  setCircularDocumentsFrontend: (state, post) => {
    state.circularDocumentFrontendOrginal = post;
    state.circulardocumentFrontend = post;
  },

  // dashboard
  setPosts: (state, post) => (state.posts = post),
  setPresident: (state, post) => (state.president = post),
  setDateHistory: (state, post) => (state.datehistory = post),
  setCirculars: (state, post) => (state.circular = post),
  setCircularsAll: (state, post) => (state.activemember = post),
  setCircularsAllOldNew: (state, post) => (state.activememberOldNew = post),
  setCircularsold: (state, post) => (state.circularold = post),
  setPages: (state, post) => (state.pages = post),
  setNews: (state, post) => (state.news = post),
  setHistory: (state, post) => (state.history = post),
  setEvents: (state, events) => (state.events = events),
  setNotice: (state, post) => (state.notice = post),
  setPressRelease: (state, post) => (state.pressrelease = post),
  setRules: (state, post) => (state.ruelsandregulation = post),
  setInspiration: (state, post) => (state.ourinspirations = post),
  setPartyConstitution: (state, post) => (state.partyconstitution = post),
  setOnlineLibrary: (state, post) => (state.onlinelibrary = post),
  setDocuments: (state, post) => (state.documents = post),
  setCircular: (state, post) => (state.circulardocument = post),
  setPopposts: (state, post) => (state.popposts = post),
  setProvinceDistrict: (state, post) => (state.provincedistrict = post),
  setProvinceDistrictProvince: (state, post) =>
    (state.provincedistrictOnly = post),
  setCircularDocument: (state, post) => (state.circulardocument = post),
  setCalendarEvent: (state, post) => (state.calendarevent = post),

  searchOnlineLibrary: (state, post) => {
    let term = post;
    state.onlinelibraryFrontend = state.onlinelibraryFrontendOrginal.filter(
      (item) => item.nep.title.indexOf(term) > -1
    );

    console.log(state.onlinelibraryFrontend.length == 0);
    if (state.onlinelibraryFrontend.length == 0) {
      term = post.toLowerCase();
      state.onlinelibraryFrontend = state.onlinelibraryFrontendOrginal.filter(
        (item) => item.eng.title.toLowerCase().indexOf(term) > -1
      );
    } else {
      term = post;
      state.onlinelibraryFrontend = state.onlinelibraryFrontendOrginal.filter(
        (item) => item.nep.title.indexOf(term) > -1
      );
    }
  },
  setSearchDocument: (state, post) => {
    let term = post;
    state.documentsFrontend = state.documentFrontendOrginal.filter(
      (item) => item.nep.title.indexOf(term) > -1
    );

    console.log(state.documentsFrontend.length == 0);
    if (state.documentsFrontend.length == 0) {
      term = post.toLowerCase();
      state.documentsFrontend = state.documentFrontendOrginal.filter(
        (item) => item.eng.title.toLowerCase().indexOf(term) > -1
      );
    } else {
      term = post;
      state.documentsFrontend = state.documentFrontendOrginal.filter(
        (item) => item.nep.title.indexOf(term) > -1
      );
    }
  },
  setSearchCircularDocument: (state, post) => {
    let term = post;
    state.circularDocumentFrontend = state.circularDocumentFrontendOrginal.filter(
      (item) => item.nep.title.indexOf(term) > -1
    );

    console.log(state.circularDocumentFrontend.length == 0);
    if (state.circularDocumentFrontend.length == 0) {
      term = post.toLowerCase();
      state.circularDocumentFrontend = state.circularDocumentFrontendOrginal.filter(
        (item) => item.eng.title.toLowerCase().indexOf(term) > -1
      );
    } else {
      term = post;
      state.circularDocumentFrontend = state.circularDocumentFrontendOrginal.filter(
        (item) => item.nep.title.indexOf(term) > -1
      );
    }
  },

  // single
  setPostsSingle: (state, post) => (state.singlepost = post),
  setPageSingle: (state, page) => (state.singlepage = page),
  setCircularSingle: (state, page) => (state.singlecircular = page),
  setActiveMember: (state, page) => (state.singleActiveMember = page),

  setSuccess: (state, response) => (state.success = response),
  setReport: (state, report) => (state.reports = report),

  setReportPhone: (state, report) => (state.activeMemberPhone = report),
  setReportPhoneTotal: (state, report) => (state.totalActiveNumber = report),
  setColorData: (state, report) => (state.colordata = report),
  setSubdomainSubmitted: (state, report) => (state.subdomainsubmitted = report),
  setActiveMenuStatus: (state, report) => (state.menustatusactive = report),
  setOnlineMembers: (state, report) => (state.onlinemebers = report),
  setToles: (state, data) => (state.toles = data),
};

export default { state, getters, actions, mutations };

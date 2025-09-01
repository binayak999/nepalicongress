const state = {
  menus: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Posts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Posts List", path: "/dashboard/posts" },
        { title: "Add Post", path: "/dashboard/addpost" },
      ],
    },

    {
      title: "Events",
      open: false,
      path: undefined,
      submenu: [
        { title: "Events List", path: "/dashboard/events" },
        { title: "Add Event", path: "/dashboard/addevent" },
      ],
    },
    {
      title: "History",
      open: false,
      path: undefined,
      submenu: [
        { title: "History List", path: "/dashboard/history" },
        { title: "Add History", path: "/dashboard/addhistory" },
      ],
    },

    {
      title: "News",
      open: false,
      path: undefined,
      submenu: [
        { title: "News List", path: "/dashboard/news" },
        { title: "Add News", path: "/dashboard/addnews" },
      ],
    },
    {
      title: "Our Inspiration",
      open: false,
      path: undefined,
      submenu: [
        { title: "Our Inspiration List", path: "/dashboard/ourinspiration" },
        { title: "Add Our Inspiration", path: "/dashboard/addourinspiration" },
      ],
    },
    {
      title: "Press Release",
      open: false,
      path: undefined,
      submenu: [
        { title: "Press Release List", path: "/dashboard/pressrelease" },
        { title: "Add Press Release", path: "/dashboard/addpressrelease" },
      ],
    },

    {
      title: "Report Box",
      open: false,
      path: undefined,
      submenu: [
        { title: "Report List", path: "/dashboard/reports" },
        { title: "Add New Report", path: "/dashboard/addreport" },
      ],
    },

    {
      title: "Working Committee",
      open: false,
      path: undefined,
      submenu: [
        { title: "Committee List", path: "/dashboard/workingcommittee" },
        { title: "Add New Committee", path: "/dashboard/addcommittee" },
      ],
    },
    {
      title: "Documents",
      open: false,
      path: undefined,
      submenu: [
        { title: "Documents List", path: "/dashboard/documents" },
        { title: "Add Document", path: "/dashboard/adddocument" },
      ],
    },
    {
      title: "Popposts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Popposts List", path: "/dashboard/popposts" },
        { title: "Add Poppost", path: "/dashboard/addpoppost" },
      ],
    },

    {
      title: "Users",
      open: false,
      path: undefined,
      submenu: [
        { title: "Memebers List", path: "/dashboard/members" },
        { title: "Update Profile", path: "/dashboard/updateSubdomain" },
      ],
    },
  ],
  menusdistrict: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Active Member",
      open: false,
      path: undefined,
      submenu: [
        { title: "New Active Member List", path: "/dashboard/activeMember" },
        { title: "Renewed Member List", path: "/dashboard/renewactiveMember" },
        {
          title: "Add Renew Active Member",
          path: "/dashboard/addRenewActiveMember",
        },
        {
          title: "Add New Active Member",
          path: "/dashboard/addActiveMember",
        },
        {
          title: "Active Member Report",
          path: "/dashboard/activememberreport",
        },
      ],
    },
    {
      title: "Posts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Posts List", path: "/dashboard/posts" },
        { title: "Add Post", path: "/dashboard/addpost" },
      ],
    },

    {
      title: "Events",
      open: false,
      path: undefined,
      submenu: [
        { title: "Events List", path: "/dashboard/events" },
        { title: "Add Event", path: "/dashboard/addevent" },
      ],
    },
    {
      title: "History",
      open: false,
      path: undefined,
      submenu: [
        { title: "History List", path: "/dashboard/history" },
        { title: "Add History", path: "/dashboard/addhistory" },
      ],
    },

    {
      title: "News",
      open: false,
      path: undefined,
      submenu: [
        { title: "News List", path: "/dashboard/news" },
        { title: "Add News", path: "/dashboard/addnews" },
      ],
    },
    {
      title: "Our Inspiration",
      open: false,
      path: undefined,
      submenu: [
        { title: "Our Inspiration List", path: "/dashboard/ourinspiration" },
        { title: "Add Our Inspiration", path: "/dashboard/addourinspiration" },
      ],
    },
    {
      title: "Press Release",
      open: false,
      path: undefined,
      submenu: [
        { title: "Press Release List", path: "/dashboard/pressrelease" },
        { title: "Add Press Release", path: "/dashboard/addpressrelease" },
      ],
    },

    {
      title: "Report Box",
      open: false,
      path: undefined,
      submenu: [
        { title: "Report List", path: "/dashboard/reports" },
        { title: "Add New Report", path: "/dashboard/addreport" },
      ],
    },

    {
      title: "Working Committee",
      open: false,
      path: undefined,
      submenu: [
        { title: "Committee List", path: "/dashboard/workingcommittee" },
        { title: "Add New Committee", path: "/dashboard/addcommittee" },
      ],
    },
    {
      title: "Documents",
      open: false,
      path: undefined,
      submenu: [
        { title: "Documents List", path: "/dashboard/documents" },
        { title: "Add Document", path: "/dashboard/adddocument" },
      ],
    },
    {
      title: "Popposts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Popposts List", path: "/dashboard/popposts" },
        { title: "Add Poppost", path: "/dashboard/addpoppost" },
      ],
    },

    {
      title: "Users",
      open: false,
      path: undefined,
      submenu: [
        { title: "Memebers List", path: "/dashboard/members" },
        { title: "Update Profile", path: "/dashboard/updateSubdomain" },
      ],
    },
  ],
  menuspecific: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Active Member",
      open: false,
      path: undefined,
      submenu: [
        { title: "New Active Member List", path: "/dashboard/activeMember" },
        { title: "Renewed Member List", path: "/dashboard/renewactiveMember" },
        { title: "Add New Active Member", path: "/dashboard/addActiveMember" },
        {
          title: "Add Renew Active Member",
          path: "/dashboard/addRenewActiveMember",
        },
        {
          title: "Active Member Report",
          path: "/dashboard/activememberreport",
        },
      ],
    },
    {
      title: "Posts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Posts List", path: "/dashboard/posts" },
        { title: "Add Post", path: "/dashboard/addpost" },
      ],
    },

    {
      title: "Events",
      open: false,
      path: undefined,
      submenu: [
        { title: "Events List", path: "/dashboard/events" },
        { title: "Add Event", path: "/dashboard/addevent" },
      ],
    },
    {
      title: "History",
      open: false,
      path: undefined,
      submenu: [
        { title: "History List", path: "/dashboard/history" },
        { title: "Add History", path: "/dashboard/addhistory" },
      ],
    },

    {
      title: "News",
      open: false,
      path: undefined,
      submenu: [
        { title: "News List", path: "/dashboard/news" },
        { title: "Add News", path: "/dashboard/addnews" },
      ],
    },
    {
      title: "Our Inspiration",
      open: false,
      path: undefined,
      submenu: [
        { title: "Our Inspiration List", path: "/dashboard/ourinspiration" },
        { title: "Add Our Inspiration", path: "/dashboard/addourinspiration" },
      ],
    },
    {
      title: "Press Release",
      open: false,
      path: undefined,
      submenu: [
        { title: "Press Release List", path: "/dashboard/pressrelease" },
        { title: "Add Press Release", path: "/dashboard/addpressrelease" },
      ],
    },

    {
      title: "Report Box",
      open: false,
      path: undefined,
      submenu: [
        { title: "Report List", path: "/dashboard/reports" },
        { title: "Add New Report", path: "/dashboard/addreport" },
      ],
    },

    {
      title: "Working Committee",
      open: false,
      path: undefined,
      submenu: [
        { title: "Committee List", path: "/dashboard/workingcommittee" },
        { title: "Add New Committee", path: "/dashboard/addcommittee" },
      ],
    },
    {
      title: "Documents",
      open: false,
      path: undefined,
      submenu: [
        { title: "Documents List", path: "/dashboard/documents" },
        { title: "Add Document", path: "/dashboard/adddocument" },
      ],
    },
    {
      title: "Popposts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Popposts List", path: "/dashboard/popposts" },
        { title: "Add Poppost", path: "/dashboard/addpoppost" },
      ],
    },

    {
      title: "Users",
      open: false,
      path: undefined,
      submenu: [
        { title: "Memebers List", path: "/dashboard/members" },
        { title: "Update Profile", path: "/dashboard/updateSubdomain" },
      ],
    },
  ],
  menuspecificchetra: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Active Member",
      open: false,
      path: undefined,
      submenu: [
        { title: "New Active Member List", path: "/dashboard/activeMember" },
        { title: "Add New Active Member", path: "/dashboard/addActiveMember" },
        {
          title: "Active Member Report",
          path: "/dashboard/activememberreport",
        },
      ],
    },
    {
      title: "Posts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Posts List", path: "/dashboard/posts" },
        { title: "Add Post", path: "/dashboard/addpost" },
      ],
    },
    {
      title: "Events",
      open: false,
      path: undefined,
      submenu: [
        { title: "Events List", path: "/dashboard/events" },
        { title: "Add Event", path: "/dashboard/addevent" },
      ],
    },
    {
      title: "History",
      open: false,
      path: undefined,
      submenu: [
        { title: "History List", path: "/dashboard/history" },
        { title: "Add History", path: "/dashboard/addhistory" },
      ],
    },

    {
      title: "News",
      open: false,
      path: undefined,
      submenu: [
        { title: "News List", path: "/dashboard/news" },
        { title: "Add News", path: "/dashboard/addnews" },
      ],
    },
    {
      title: "Our Inspiration",
      open: false,
      path: undefined,
      submenu: [
        { title: "Our Inspiration List", path: "/dashboard/ourinspiration" },
        { title: "Add Our Inspiration", path: "/dashboard/addourinspiration" },
      ],
    },
    {
      title: "Press Release",
      open: false,
      path: undefined,
      submenu: [
        { title: "Press Release List", path: "/dashboard/pressrelease" },
        { title: "Add Press Release", path: "/dashboard/addpressrelease" },
      ],
    },

    {
      title: "Report Box",
      open: false,
      path: undefined,
      submenu: [
        { title: "Report List", path: "/dashboard/reports" },
        { title: "Add New Report", path: "/dashboard/addreport" },
      ],
    },

    {
      title: "Working Committee",
      open: false,
      path: undefined,
      submenu: [
        { title: "Committee List", path: "/dashboard/workingcommittee" },
        { title: "Add New Committee", path: "/dashboard/addcommittee" },
      ],
    },
    {
      title: "Documents",
      open: false,
      path: undefined,
      submenu: [
        { title: "Documents List", path: "/dashboard/documents" },
        { title: "Add Document", path: "/dashboard/adddocument" },
      ],
    },
    {
      title: "Popposts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Popposts List", path: "/dashboard/popposts" },
        { title: "Add Poppost", path: "/dashboard/addpoppost" },
      ],
    },

    {
      title: "Users",
      open: false,
      path: undefined,
      submenu: [
        { title: "Memebers List", path: "/dashboard/members" },
        { title: "Update Profile", path: "/dashboard/updateSubdomain" },
      ],
    },
  ],

  adminmenus: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Active Member",
      open: false,
      path: undefined,
      submenu: [
        { title: "New Active Member List", path: "/dashboard/activeMember" },
        {
          title: "Renewed Active Member List",
          path: "/dashboard/renewactiveMember",
        },
        {
          title: "Active Member Report",
          path: "/dashboard/activeMembersubdomain",
        },

        {
          title: "New Active Member",
          path: "/dashboard/addActiveMember",
        },
        {
          title: "Renew Active Member",
          path: "/dashboard/reneweMembersubdomain",
        },
        {
          title: "Trasfer Active Member",
          path: "/dashboard/transferMembersubdomain",
        },
        {
          title: "Active Member Card",
          path: "/dashboard/activeMembercards",
        },
      ],
    },
    // {
    //   title: "Votings",
    //   open: false,
    //   path: undefined,
    //   submenu: [
    //     { title: "Voting List", path: "/dashboard/votes" },
    //     { title: "Voters", path: "/dashboard/voters" },
    //     // { title: "VoteCandidate", path: "/dashboard/votecandidate" },
    //     { title: "Add New Vote", path: "/dashboard/addvote" },
    //     // { title: "Add New Candidate", path: "/dashboard/addCandidate" },
    //     { title: "Add New Voters", path: "/dashboard/addVoter" },
    //     { title: "Voters Processed", path: "/dashboard/votersProcessed" },
    //   ],
    // },
    {
      title: "Polls",
      open: false,
      path: undefined,
      submenu: [
        { title: "Poll List", path: "/dashboard/polls" },
        { title: "Add New Poll", path: "/dashboard/addpoll" },
      ],
    },
    {
      title: "Pages",
      open: false,
      path: undefined,
      submenu: [
        { title: "Page List", path: "/dashboard/pages" },
        { title: "Add New Page", path: "/dashboard/addPage" },
      ],
    },
    {
      title: "Posts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Posts List", path: "/dashboard/posts" },
        { title: "Add Post", path: "/dashboard/addpost" },
      ],
    },
    {
      title: "Documents",
      open: false,
      path: undefined,
      submenu: [
        { title: "Documents List", path: "/dashboard/documents" },
        { title: "Add Document", path: "/dashboard/adddocument" },
      ],
    },
    {
      title: "Circular",
      open: false,
      path: undefined,
      submenu: [
        { title: "Circular List", path: "/dashboard/circulardocuments" },
        { title: "Add Circular", path: "/dashboard/addcirculardocument" },
      ],
    },

    {
      title: "Events",
      open: false,
      path: undefined,
      submenu: [
        { title: "Events List", path: "/dashboard/events" },
        { title: "Add Event", path: "/dashboard/addevent" },
      ],
    },
    {
      title: "History",
      open: false,
      path: undefined,
      submenu: [
        { title: "History List", path: "/dashboard/history" },
        { title: "Add History", path: "/dashboard/addhistory" },
      ],
    },

    {
      title: "President Message",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "President Message List",
          path: "/dashboard/presidentmessage",
        },
        {
          title: "Add President Message",
          path: "/dashboard/addpresidentmessage",
        },
      ],
    },

    {
      title: "History Slider",
      open: false,
      path: undefined,
      submenu: [
        { title: "History Slider List", path: "/dashboard/historyslider" },
        { title: "Add History Slider", path: "/dashboard/addhistoryslider" },
      ],
    },

    {
      title: "Online Library",
      open: false,
      path: undefined,
      submenu: [
        { title: "Online Library List", path: "/dashboard/onlinelibrary" },
        { title: "Add Online Library", path: "/dashboard/addonlinelibrary" },
      ],
    },
    {
      title: "Congress Work",
      open: false,
      path: undefined,
      submenu: [
        { title: "Congress Work List", path: "/dashboard/news" },
        { title: "Add Congress Work", path: "/dashboard/addnews" },
      ],
    },
    {
      title: "Our Inspiration",
      open: false,
      path: undefined,
      submenu: [
        { title: "Our Inspiration List", path: "/dashboard/ourinspiration" },
        { title: "Add Our Inspiration", path: "/dashboard/addourinspiration" },
      ],
    },
    {
      title: "Press Release",
      open: false,
      path: undefined,
      submenu: [
        { title: "Press Release List", path: "/dashboard/pressrelease" },
        { title: "Add Press Release", path: "/dashboard/addpressrelease" },
      ],
    },
    {
      title: "Manifesto",
      open: false,
      path: undefined,
      submenu: [
        { title: "Manifesto List", path: "/dashboard/notice" },
        { title: "Add Manifesto", path: "/dashboard/addnotice" },
      ],
    },
    {
      title: "Party Constitution",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "Party Constitution List",
          path: "/dashboard/partyconstitution",
        },
        {
          title: "Add Party Constitution",
          path: "/dashboard/addpartyconstitution",
        },
      ],
    },

    {
      title: "Rules And Regulations",
      open: false,
      path: undefined,
      submenu: [
        { title: "Rules And Regulations List", path: "/dashboard/rules" },
        { title: "Add Rules And Regulations", path: "/dashboard/addrules" },
      ],
    },
    {
      title: "Report Box",
      open: false,
      path: undefined,
      submenu: [{ title: "Report List", path: "/dashboard/reports" }],
    },
    {
      title: "Central Committee",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "Central Committee List",
          path: "/dashboard/centralcommittee",
        },
        {
          title: "Add Central Committee",
          path: "/dashboard/addcentralcommittee",
        },
      ],
    },
    {
      title: "Central Office",
      open: false,
      path: undefined,
      submenu: [
        { title: "Central List", path: "/dashboard/centraloffice" },
        { title: "Add New Central", path: "/dashboard/addcentraloffice" },
      ],
    },
    {
      title: "Users",
      open: false,
      path: undefined,
      submenu: [
        { title: "Subdomain List", path: "/dashboard/subdomain" },
        {
          title: "Active Member Status",
          path: "/dashboard/activememberdatastatus",
        },
        { title: "Tree View", path: "/dashboard/treeview" },
        { title: "Add New Subdomain", path: "/dashboard/addsubdomain" },
        { title: "Memebers List", path: "/dashboard/members" },
        { title: "Online Member List", path: "/dashboard/onlineusers" },
        { title: "Users List", path: "/dashboard/users" },
        { title: "Create Active Logins", path: "/dashboard/createactivelogin" },
        { title: "Active Logins List", path: "/dashboard/activeloginlist" },
        { title: "Social Profile List", path: "/dashboard/socialprofiles" },
        { title: "Card Login List", path: "/dashboard/cardloginlist" },
        { title: "Create Card Login", path: "/dashboard/createcardlogin" },
      ],
    },

    {
      title: "Leaders",
      open: false,
      path: undefined,
      submenu: [
        { title: "Leaders List", path: "/dashboard/leaders" },
        { title: "Letters", path: "/dashboard/lettertoleader" },
        { title: "Add Leader", path: "/dashboard/addleader" },
      ],
    },
    {
      title: "Signature",
      open: false,
      path: undefined,
      submenu: [
        { title: "Add Signature", path: "/dashboard/addsignature" },
        { title: "Signature", path: "/dashboard/signatures" },
      ],
    },
    {
      title: "Musuem",
      open: false,
      path: undefined,
      submenu: [
        { title: "Medias", path: "/dashboard/medias" },
        { title: "Add Media", path: "/dashboard/addMedia" },
      ],
    },
    {
      title: "Popposts",
      open: false,
      path: undefined,
      submenu: [
        { title: "Popposts List", path: "/dashboard/popposts" },
        { title: "Add Poppost", path: "/dashboard/addpoppost" },
      ],
    },
    {
      title: "Public Forums",
      path: "/dashboard/forums",
    },
    {
      title: "Calendar Events",
      open: false,
      path: undefined,
      submenu: [
        { title: "Calendar Events List", path: "/dashboard/calendarevents" },
        { title: "Add Calendar Event", path: "/dashboard/addcalendarevent" },
      ],
    },
    {
      title: "Notifications",
      open: false,
      path: undefined,
      submenu: [
        { title: "Notification List", path: "/dashboard/notifications" },
        { title: "Notification Add", path: "/dashboard/notificationadd" },
        {
          title: "Notification History Sent",
          path: "/dashboard/notificationhistory",
        },
      ],
    },
    {
      title: "General Convention",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "User Create",
          path: "/dashboard/createGeneralConventionUser",
        },
        { title: "User List", path: "/dashboard/generalConventionUsers" },
      ],
    },
    {
      title: "Meeting Management",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "Committe Member Authorization",
          path: "/dashboard/committeeEntryAdmin",
        },
        {
          title: "Committee Member Entry",
          path: "/dashboard/committeeEntry",
        },
        {
          title: "Committe Member List",
          path: "/dashboard/committeememberlist",
        },
        {
          title: "Meeting",
          path: "/dashboard/meeting",
        },
        {
          title: "Meeting History",
          path: "/dashboard/meetingreports",
        },
      ],
    },
    {
      title: "Payment Management",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "User Post Entry",
          path: "/dashboard/userpostentry",
        },
        {
          title: "User Payment Assign",
          path: "/dashboard/userpaymentassign",
        },
        {
          title: "Kriyasil Member Payment",
          path: "/dashboard/memberpayment",
        },
        {
          title: "Transaction History",
          path: "/dashboard/transactionlist",
        },
      ],
    },
  ],
  specificusermenus: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },

    {
      title: "Active Member",
      open: false,
      path: undefined,
      submenu: [
        {
          title: "Active Member Report",
          path: "/dashboard/activeMembersubdomain",
        },
      ],
    },
  ],
  activemenus: [
    {
      title: "Active Member Report",
      path: "/dashboard/activeMembersubdomain",
    },
  ],
  onlinemembermenus: [
    { title: "Online Member List", path: "/dashboard/onlineusers" },
  ],
  activeSubMenu: "",
};

const getters = {
  allMenu: (state) => Object.assign(state.menus),
  allAdminMenu: (state) => Object.assign(state.adminmenus),
  allMenuSpecific: (state) => Object.assign(state.menuspecific),
  allMenuSpecificChetra: (state) => Object.assign(state.menuspecificchetra),
  allMenuDistrict: (state) => Object.assign(state.menusdistrict),
  allMenuActiveMenu: (state) => Object.assign(state.activemenus),
  allMenuSpecificUserMenu: (state) => Object.assign(state.specificusermenus),
  allOnlineMemberMenu: (state) => Object.assign(state.onlinemembermenus),
  singleActiveMenu: (state) => state.activeSubMenu,
};

const actions = {
  activeMenu({ commit }, data) {
    commit("setSubActiveMenu", data);
  },
};

const mutations = {
  menuMutation: (state, menu) => (state.menus = menu),
  setSubActiveMenu: (state, menu) => (state.activeSubMenu = menu),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

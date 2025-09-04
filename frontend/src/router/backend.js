import Dashboard from "../dashboard/Dashboard.vue";
const backendmenu = [
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "DashboardHome" */ "../dashboard/views/Home.vue"
          ),
      },
      {
        path: "editposts/:page/:slug",
        name: "EditPosts",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/posts/editpost"
          ),
      },
      {
        path: "editcentralcommittee/:id",
        name: "EditCentralCommittee",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/centralcommittee/editcommittee"
          ),
      },
      {
        path: "editcentraloffice/:id",
        name: "EditCentralOffice",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/centraloffice/editcentraloffice"
          ),
      },
      {
        path: "activeMember/:id",
        name: "SingleActiveMember",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/circular/singleCircular"
          ),
      },
      {
        path: "editworkingcommittee/:id",
        name: "EditDistrictCommittee",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/districtcommittee/editcommittee"
          ),
      },
      {
        path: "editpostscustomdate/:page/:slug",
        name: "EditEvents",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/posts/editpostcustomdate"
          ),
      },
      {
        path: "categories",
        name: "Categories",
        component: () =>
          import(
            /* webpackChunkName: "Categories" */ "../dashboard/views/categories/categories.vue"
          ),
      },
      {
        path: "addcategory",
        name: "AddCategory",
        component: () =>
          import(
            /* webpackChunkName: "AddCategory" */ "../dashboard/views/categories/addcategories.vue"
          ),
      },
      {
        path: "workingcommittee",
        name: "WorkingCommittee",
        component: () =>
          import(
            /* webpackChunkName: "Categories" */ "../dashboard/views/districtcommittee/committee"
          ),
      },
      {
        path: "addcommittee",
        name: "AddDisCentralCommittee",
        component: () =>
          import(
            /* webpackChunkName: "AddCategory" */ "../dashboard/views/districtcommittee/addcommittee"
          ),
      },
      {
        path: "centralcommittee",
        name: "CentralCommittee",
        component: () =>
          import(
            /* webpackChunkName: "Categories" */ "../dashboard/views/centralcommittee/committee"
          ),
      },
      {
        path: "addcentralcommittee",
        name: "AddCentralCommittee",
        component: () =>
          import(
            /* webpackChunkName: "AddCategory" */ "../dashboard/views/centralcommittee/addcommittee"
          ),
      },
      {
        path: "centraloffice",
        name: "CentralOffice",
        component: () =>
          import(
            /* webpackChunkName: "Categories" */ "../dashboard/views/centraloffice/centraloffice"
          ),
      },
      {
        path: "addcentraloffice",
        name: "AddCentralOffice",
        component: () =>
          import(
            /* webpackChunkName: "AddCategory" */ "../dashboard/views/centraloffice/addcentraloffice"
          ),
      },
      {
        path: "activeMember",
        name: "Circular",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/circular.vue"
          ),
      },
      {
        path: "renewactiveMember",
        name: "CircularOld",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/circularold.vue"
          ),
      },
      {
        path: "activeMembersubdomain",
        name: "CircularSubdomain",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/circularsubdomains.vue"
          ),
      },
      {
        path: "activeMembercards",
        name: "ActiveMemberCards",
        component: () =>
          import(
            /* webpackChunkName: "ActiveMemberCards" */ "../dashboard/views/circular/circularcards.vue"
          ),
      },
      {
        path: "importActiveMember",
        name: "ImportActiveMember",
        component: () =>
          import(
            /* webpackChunkName: "ActiveMemberCards" */ "../dashboard/views/circular/importCards.vue"
          ),
      },
      {
        path: "reneweMembersubdomain",
        name: "RenewSubdomain",
        component: () =>
          import(
            /* webpackChunkName: "RenewSubdomain" */ "../dashboard/views/circular/circularsubdomainsrenew.vue"
          ),
      },
      {
        path: "transferMembersubdomain",
        name: "TransferSubdomain",
        component: () =>
          import(
            /* webpackChunkName: "TransferSubdomain" */ "../dashboard/views/circular/circularsubdomaintransfer.vue"
          ),
      },
      {
        path: "addActiveMember",
        name: "AddCircular",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/addCircular.vue"
          ),
      },

      {
        path: "phoneactivemember",
        name: "PhoneRepor",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/phoneactivemember.vue"
          ),
      },
      {
        path: "addRenewActiveMember",
        name: "AddCircularOld",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/addCircularOld.vue"
          ),
      },

      {
        path: "activememberreport",
        name: "ActiveMemberReport",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/subdomaincircularreport.vue"
          ),
      },
      {
        path: "activememberdatastatus",
        name: "ActiveMemberDataStatus",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/activeStatus.vue"
          ),
      },
      {
        path: "treeview",
        name: "Treeview",
        component: () =>
          import(
            /* webpackChunkName: "Treeview" */ "../dashboard/views/circular/treeview.vue"
          ),
      },
      {
        path: "treeviewallward",
        name: "TreeviewAllWard",
        component: () =>
          import(
            /* webpackChunkName: "Treeview" */ "../dashboard/views/circular/treeviewallwards.vue"
          ),
      },
      {
        path: "treeviewall",
        name: "TreeviewAll",
        component: () =>
          import(
            /* webpackChunkName: "Treeview" */ "../dashboard/views/circular/treeviewall.vue"
          ),
      },
      {
        path: "socialprofiles",
        name: "SocialProfiles",
        component: () =>
          import(
            /* webpackChunkName: "Treeview" */ "../dashboard/views/circular/socialprofiles.vue"
          ),
      },
      {
        path: "updateActiveMember/:id",
        name: "UpdateCircular",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circular/updateCircular.vue"
          ),
      },
      {
        path: "posts",
        name: "Posts",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/posts/posts.vue"
          ),
      },
      {
        path: "addpost",
        name: "AddPost",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/posts/addpost.vue"
          ),
      },
      {
        path: "circulardocuments",
        name: "CircularDocuments",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circulardocuments/circulardocument.vue"
          ),
      },
      {
        path: "addcirculardocument",
        name: "AddCircularDocuments",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/circulardocuments/addcirculardocument.vue"
          ),
      },
      {
        path: "popposts",
        name: "Popposts",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/popposts/popposts.vue"
          ),
      },
      {
        path: "addpoppost",
        name: "AddPoppost",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/popposts/addpoppost.vue"
          ),
      },
      {
        path: "presidentmessage",
        name: "President",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/president/presidents.vue"
          ),
      },
      {
        path: "addpresidentmessage",
        name: "AddPresidentMessage",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/president/addpresident.vue"
          ),
      },
      {
        path: "historyslider",
        name: "HistorySlider",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/historyslider/historyslider.vue"
          ),
      },
      {
        path: "addhistoryslider",
        name: "AddHistorySlider",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/historyslider/addhistoryslider.vue"
          ),
      },
      {
        path: "events",
        name: "EventsDash",
        component: () =>
          import(
            /* webpackChunkName: "Events" */ "../dashboard/views/events/events.vue"
          ),
      },
      {
        path: "addevent",
        name: "AddEvent",
        component: () =>
          import(
            /* webpackChunkName: "AddEvent" */ "../dashboard/views/events/addevent.vue"
          ),
      },
      {
        path: "calendarevents",
        name: "CalendarEventsDash",
        component: () =>
          import(
            /* webpackChunkName: "CalendarEvents" */ "../dashboard/views/calendarevents/events.vue"
          ),
      },
      {
        path: "addcalendarevent",
        name: "AddCalendarEvent",
        component: () =>
          import(
            /* webpackChunkName: "AddCalendarEvent" */ "../dashboard/views/calendarevents/addevent.vue"
          ),
      },
      {
        path: "history",
        name: "History",
        component: () =>
          import(
            /* webpackChunkName: "History" */ "../dashboard/views/history/history.vue"
          ),
      },
      {
        path: "addhistory",
        name: "AddHistory",
        component: () =>
          import(
            /* webpackChunkName: "AddHistory" */ "../dashboard/views/history/addhistory.vue"
          ),
      },
      {
        path: "notice",
        name: "Notice",
        component: () =>
          import(
            /* webpackChunkName: "Notice" */ "../dashboard/views/notice/notice.vue"
          ),
      },
      {
        path: "addnotice",
        name: "AddNotice",
        component: () =>
          import(
            /* webpackChunkName: "AddNotice" */ "../dashboard/views/notice/addnotice.vue"
          ),
      },
      {
        path: "news",
        name: "News",
        component: () =>
          import(
            /* webpackChunkName: "News" */ "../dashboard/views/news/news.vue"
          ),
      },
      {
        path: "addnews",
        name: "AddNews",
        component: () =>
          import(
            /* webpackChunkName: "AddNews" */ "../dashboard/views/news/addnews.vue"
          ),
      },
      {
        path: "rules",
        name: "RulesAndRegulation",
        component: () =>
          import(
            /* webpackChunkName: "Rules" */ "../dashboard/views/rulesandregulations/rules.vue"
          ),
      },
      {
        path: "addrules",
        name: "AddRules",
        component: () =>
          import(
            /* webpackChunkName: "AddRules" */ "../dashboard/views/rulesandregulations/addrules.vue"
          ),
      },
      {
        path: "pressrelease",
        name: "PressRelease",
        component: () =>
          import(
            /* webpackChunkName: "PressRelease" */ "../dashboard/views/pressrelease/pressrelease.vue"
          ),
      },
      {
        path: "addpressrelease",
        name: "AddPressRelease",
        component: () =>
          import(
            /* webpackChunkName: "AddPressRelease" */ "../dashboard/views/pressrelease/addpressrelease.vue"
          ),
      },
      {
        path: "partyconstitution",
        name: "PartyConstitution",
        component: () =>
          import(
            /* webpackChunkName: "PartyConstitution" */ "../dashboard/views/partyconstitution/partyconstitution"
          ),
      },
      {
        path: "addpartyconstitution",
        name: "AddPartyConstitution",
        component: () =>
          import(
            /* webpackChunkName: "AddPartyConstitution" */ "../dashboard/views/partyconstitution/addpartyconstitution.vue"
          ),
      },
      {
        path: "onlinelibrary",
        name: "OnlineLibrary",
        component: () =>
          import(
            /* webpackChunkName: "OnlineLibrary" */ "../dashboard/views/onlinelibrary/onlinelibrary"
          ),
      },
      {
        path: "addonlinelibrary",
        name: "AddOnlineLibrary",
        component: () =>
          import(
            /* webpackChunkName: "AddOnlineLibrary" */ "../dashboard/views/onlinelibrary/addonlinelibrary.vue"
          ),
      },
      {
        path: "ourinspiration",
        name: "OurInspiration",
        component: () =>
          import(
            /* webpackChunkName: "OurInspiration" */ "../dashboard/views/ourinspiration/ourinspirations.vue"
          ),
      },
      {
        path: "addourinspiration",
        name: "AddOurInspiration",
        component: () =>
          import(
            /* webpackChunkName: "AddOurInspiration" */ "../dashboard/views/ourinspiration/addinspiration"
          ),
      },
      {
        path: "reports",
        name: "Reports",
        component: () =>
          import(
            /* webpackChunkName: "Report" */ "../dashboard/views/reports/reports"
          ),
      },
      {
        path: "documents",
        name: "Documents",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/documents/documents.vue"
          ),
      },
      {
        path: "adddocument",
        name: "AddDocument",
        component: () =>
          import(
            /* webpackChunkName: "AddPost" */ "../dashboard/views/documents/adddocument.vue"
          ),
      },
      {
        path: "addreport",
        name: "Addreport",
        component: () =>
          import(
            /* webpackChunkName: "AddReport" */ "../dashboard/views/reports/addreport.vue"
          ),
      },
      {
        path: "subdomain",
        name: "Subdomain",
        component: () =>
          import(
            /* webpackChunkName: "Subdomain" */ "../dashboard/views/users/subdomains"
          ),
      },
      {
        path: "editsubdomain/:name",
        name: "SubdomainSingleFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../dashboard/views/users/updateuser"
          ),
      },
      {
        path: "users",
        name: "Users",
        component: () =>
          import(
            /* webpackChunkName: "AddSubdomain" */ "../dashboard/views/users/users"
          ),
      },
      {
        path: "onlineusers",
        name: "OnlineUsers",
        component: () =>
          import(
            /* webpackChunkName: "OnlineUsers" */ "../dashboard/views/users/onlinemembers"
          ),
      },
      {
        path: "janasamparkaList",
        name: "JanaSamparkaList",
        component: () =>
          import(
            /* webpackChunkName: "OnlineUsers" */ "../dashboard/views/users/janasamparkamembers"
          ),
      },
      {
        path: "members",
        name: "Members",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/members"
          ),
      },
      {
        path: "createactivelogin",
        name: "CreateActiveLogin",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/createactivelogin"
          ),
      },
      {
        path: "createactivelogin/:id",
        name: "CreateActiveLogin",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/createactivelogin"
          ),
      },
      {
        path: "activeloginlist",
        name: "ActiveLoginList",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/activeloginlist"
          ),
      },
      {
        path: "createcardlogin",
        name: "CreateCardLogin",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/createcardprintlogin"
          ),
      },
      {
        path: "createcardlogin/:id",
        name: "UpdateCardLogin",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/createcardprintlogin"
          ),
      },
      {
        path: "cardloginlist",
        name: "CardLoginList",
        component: () =>
          import(
            /* webpackChunkName: "Members" */ "../dashboard/views/users/cardloginlist"
          ),
      },
      {
        path: "addsubdomain",
        name: "AddSubdomain",
        component: () =>
          import(
            /* webpackChunkName: "AddMember" */ "../dashboard/views/users/addusers"
          ),
      },
      {
        path: "updateSubdomain",
        name: "UpdateSubdomain",
        component: () =>
          import(
            /* webpackChunkName: "AddMember" */ "../dashboard/views/users/updateUsers"
          ),
      },
      {
        path: "addVote",
        name: "AddVote",
        component: () =>
          import(
            /* webpackChunkName: "AddVotes" */ "../dashboard/views/votes/addvotes"
          ),
      },
      {
        path: "votersProcessed",
        name: "VotersProcessed",
        component: () =>
          import(
            /* webpackChunkName: "AddVotes" */ "../dashboard/views/votes/generateUser"
          ),
      },
      {
        path: "addVoter",
        name: "AddVoters",
        component: () =>
          import(
            /* webpackChunkName: "AddVotes" */ "../dashboard/views/votes/addVoters"
          ),
      },
      {
        path: "viewvote/:id",
        name: "ViewVote",
        component: () =>
          import(
            /* webpackChunkName: "AddVotes" */ "../dashboard/views/votes/votesView"
          ),
      },
      {
        path: "addCandidate",
        name: "AddCandidates",
        component: () =>
          import(
            /* webpackChunkName: "AddVotes" */ "../dashboard/views/votes/addCandidate"
          ),
      },
      {
        path: "votes",
        name: "Votes",
        component: () =>
          import(
            /* webpackChunkName: "Votes" */ "../dashboard/views/votes/votes"
          ),
      },
      {
        path: "voters",
        name: "Voters",
        component: () =>
          import(
            /* webpackChunkName: "Votes" */ "../dashboard/views/votes/voters"
          ),
      },
      {
        path: "addPoll",
        name: "AddPoll",
        component: () =>
          import(
            /* webpackChunkName: "AddPoll" */ "../dashboard/views/polls/addpoll"
          ),
      },
      {
        path: "medias",
        name: "Medias",
        component: () =>
          import(
            /* webpackChunkName: "Medias" */ "../dashboard/views/musuem/medias"
          ),
      },
      {
        path: "addMedia",
        name: "AddMedia",
        component: () =>
          import(
            /* webpackChunkName: "AddMedia" */ "../dashboard/views/musuem/addMedia"
          ),
      },
      {
        path: "polls",
        name: "Polls",
        component: () =>
          import(
            /* webpackChunkName: "Polls" */ "../dashboard/views/polls/polls"
          ),
      },
      {
        path: "forums",
        name: "Forums",
        component: () =>
          import(
            /* webpackChunkName: "Forums" */ "../dashboard/views/forums/forums"
          ),
      },
      {
        path: "pages",
        name: "Pages",
        component: () =>
          import(
            /* webpackChunkName: "Pages" */ "../dashboard/views/pages/pages"
          ),
      },
      {
        path: "addpage",
        name: "AddPage",
        component: () =>
          import(
            /* webpackChunkName: "AddPage" */ "../dashboard/views/pages/addpage"
          ),
      },
      {
        path: "editpage/:slug",
        name: "EditPage",
        component: () =>
          import(
            /* webpackChunkName: "AddPage" */ "../dashboard/views/pages/updatepage"
          ),
      },
      {
        path: "leaders",
        name: "Leaders",
        component: () =>
          import(
            /* webpackChunkName: "Leaders" */ "../dashboard/views/leaders/leaders.vue"
          ),
      },
      {
        path: "lettertoleader",
        name: "Lettertoleader",
        component: () =>
          import(
            /* webpackChunkName: "Leaders" */ "../dashboard/views/leaders/lettertoleader.vue"
          ),
      },
      {
        path: "addleader",
        name: "AddLeader",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/leaders/addleader.vue"
          ),
      },
      {
        path: "notificationadd",
        name: "Notification Add",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/notifications/notificationadd"
          ),
      },
      {
        path: "notifications",
        name: "Notifications",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/notifications/notifications"
          ),
      },
      {
        path: "notificationhistory",
        name: "Notification History",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/notifications/notificationhistory"
          ),
      },
      {
        path: "notificationdevices",
        name: "Notification Devices",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/notifications/notificationdevices"
          ),
      },
      {
        path: "limitactivemember",
        name: "Limit Active Member",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/circular/showCircularLimit"
          ),
      },
      {
        path: "createGeneralConventionUser",
        name: "General Convention User",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/generalconvention/createGeneralConventionLogin"
          ),
      },
      {
        path: "createGeneralConventionUser/:id",
        name: "General Convention User",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/generalconvention/createGeneralConventionLogin"
          ),
      },
      {
        path: "generalConventionUsers",
        name: "General Convention Users",
        component: () =>
          import(
            /* webpackChunkName: "AddLeaders" */ "../dashboard/views/generalconvention/listGeneralConvention"
          ),
      },
      {
        path: "addsignature",
        name: "Add Signature",
        component: () =>
          import(
            /* webpackChunkName: "AddSignature" */ "../dashboard/views/signature/AddSignature"
          ),
      },
      {
        path: "signatures",
        name: "All Signature",
        component: () =>
          import(
            /* webpackChunkName: "AllSignature" */ "../dashboard/views/signature/Signature"
          ),
      },
      {
        path: "committeeEntry",
        name: "Committee Members",
        component: () =>
          import(
            /* webpackChunkName: "Committee Entry" */ "../dashboard/views/generalconvention/CommitteeMembersEntry"
          ),
      },
      {
        path: "committeeEntryAdmin",
        name: "Committee Member Entry Admin",
        component: () =>
          import(
            /* webpackChunkName: "Committee Member Entry Admin" */ "../dashboard/views/generalconvention/CommitteeMemeberEntryAdmin"
          ),
      },
      {
        path: "meeting",
        name: "Meeting",
        component: () =>
          import(
            /* webpackChunkName: "Meeting" */ "../dashboard/views/meetingmanagement/meeting"
          ),
      },
      {
        path: "meetingreports",
        name: "MeetingReports",
        component: () =>
          import(
            /* webpackChunkName: "MeetingReports" */ "../dashboard/views/meetingmanagement/meetingreports"
          ),
      },
      {
        path: "committeememberlist",
        name: "Committee Member List",
        component: () =>
          import(
            /* webpackChunkName: "Meeting" */ "../dashboard/views/meetingmanagement/committeememberlist"
          ),
      },

      {
        path: "userpostentry",
        name: "UserPostEntry",
        component: () =>
          import(
            /* webpackChunkName: "UserPostPayment" */ "../dashboard/views/paymentmanagement/userpostentry"
          ),
      },
      {
        path: "userpaymentassign",
        name: "UserPaymentAssign",
        component: () =>
          import(
            /* webpackChunkName: "UserPostPayment" */ "../dashboard/views/paymentmanagement/userpaymentassign"
          ),
      },
      {
        path: "memberpayment",
        name: "MemberPayment",
        component: () =>
          import(
            /* webpackChunkName: "MemberPayment" */ "../dashboard/views/paymentmanagement/memberpayment"
          ),
      },
      {
        path: "transactionlist",
        name: "TransactionList",
        component: () =>
          import(
            /* webpackChunkName: "TransactionList" */ "../dashboard/views/paymentmanagement/transactionlist"
          ),
      },
      {
        path: "onlinememberpayment",
        name: "OnlineMemberPayment",
        component: () =>
          import(
            /* webpackChunkName: "OnlineMemberPayment" */ "../dashboard/views/paymentmanagement/onlinememberpayment"
          ),
      },
    ],
  },
];

export default backendmenu;

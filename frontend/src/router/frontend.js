import Frontend from "../frontend/Frontend.vue";
const frontendmenu = [
  {
    path: "/",
    component: Frontend,
    children: [
      {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/Home.vue"),
      },
      {
        path: "/childsafety",
        name: "ChildSafety",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/ChildSafety.vue"),
      },
      {
        path: "/social-media",
        name: "SocialMedia",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/SocialMedia.vue"
          ),
      },
      {
        path: "/active-member",
        name: "ActiveMember",
        component: () =>
          import(
            /* webpackChunkName: "ActiveMembers" */ "../frontend/views/ActiveMembers.vue"
          ),
      },
      {
        path: "/single/:page/:slug",
        name: "Single",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/Single.vue"),
      },
      {
        path: "/introduction",
        name: "introduction",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/AboutPage.vue"
          ),
      },
      {
        path: "/letter-to-leader",
        name: "LettertoleaderFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Lettertoleader.vue"
          ),
      },
      {
        path: "/central-working-committee",
        name: "CentralCommitteeFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CentralCommittee"
          ),
      },
      {
        path: "/districtworkingcommittee/:slug",
        name: "DistrictCommitteeFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/DistrictWorkingCommittee"
          ),
      },
      {
        path: "/central-office",
        name: "CentralOfficeFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CentralOffice"
          ),
      },
      {
        path: "/publicforum",
        name: "PublicForum",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/PublicForum.vue"
          ),
      },
      {
        path: "/onlinemembership",
        name: "OnlineMembership",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/OnlineMembership.vue"
          ),
      },
      {
        path: "/page/:slug",
        name: "SinglePage",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/SinglePage.vue"
          ),
      },
      {
        path: "/documents-or-reports",
        name: "DocumentsFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/Documents.vue"
          ),
      },
      {
        path: "/circulars",
        name: "CircularDocumentsFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/Circulars.vue"
          ),
      },

      {
        path: "/news",
        name: "NewsFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/News.vue"
          ),
      },
      {
        path: "/our-inspiration",
        name: "OurInspirationFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/OurInspiration"
          ),
      },
      {
        path: "/history",
        name: "HistoryFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/History.vue"
          ),
      },
      {
        path: "/notice",
        name: "ManifestoFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/Manifesto.vue"
          ),
      },
      {
        path: "/posts",
        name: "PostFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/Posts.vue"
          ),
      },
      {
        path: "/press-release",
        name: "PressReleaseFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/PressRelease.vue"
          ),
      },
      {
        path: "/party-constitution",
        name: "PartyConstitutionFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/PartyConstitution.vue"
          ),
      },
      {
        path: "/rules-and-regulations",
        name: "RulesAndRegulationsFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/RulesAndRegulations"
          ),
      },
      {
        path: "/online-library",
        name: "OnineLibraryFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/OnlineLibrary.vue"
          ),
      },
      {
        path: "/onlinemuseum",
        name: "OnlineMuseumFrontend",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/OnlineMuseum.vue"
          ),
      },
      {
        path: "/videogallery",
        name: "VideoGallery",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Musuem/VideoGallery.vue"
          ),
      },
      {
        path: "/imagegallery",
        name: "ImageGallery",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Musuem/ImageGallery.vue"
          ),
      },
      {
        path: "/addmusuem",
        name: "AddMusuem",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Musuem/AddMusuem.vue"
          ),
      },
      {
        path: "/subdomain",
        name: "SubdomainFrontend",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/Subdomain"),
      },
      {
        path: "/subdomain/:name",
        name: "SubdomainSingle",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/SubdomainSingle"
          ),
      },

      {
        path: "/onlinevoting",
        name: "OnlineVoting",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/OnlineVoting.vue"
          ),
      },
      {
        path: "/online-poll",
        name: "OnlinePoll",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/OnlinePoll.vue"
          ),
      },

      {
        path: "/login",
        name: "Login",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/Login.vue"
          ),
      },
      {
        path: "/login/:slug",
        name: "LoginSlug",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/Login.vue"
          ),
      },
      {
        path: "/loginSubdomain",
        name: "LoginSubdomain",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/LoginSub"
          ),
      },
      {
        path: "/forgetverification",
        name: "ForgetVerification",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/ForgetVerification.vue"
          ),
      },
      {
        path: "/forgetpassword",
        name: "ForgetPassword",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/ForgetPassword.vue"
          ),
      },
      {
        path: "/verification",
        name: "Verificaiton",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/Verification.vue"
          ),
      },

      {
        path: "/register",
        name: "Registration",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/Registration.vue"
          ),
      },
      {
        path: "/register/:slug",
        name: "Registration",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/Registration.vue"
          ),
      },
      {
        path: "/online-membership",
        name: "RegistrationMember",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/RegistrationMember.vue"
          ),
      },
      {
        path: "/payment",
        name: "PaymentMember",
        component: () =>
          import(
            /* webpackChunkName: "PaymentMember" */ "../frontend/views/Payment.vue"
          ),
      },
      {
        path: "/events",
        name: "Events",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/CommonPages/Events"
          ),
      },
      {
        path: "/information-officer",
        name: "Infromation Officer",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/InfromationOfficer"
          ),
      },
      {
        path: "/election-schedules-add",
        name: "Election schedules",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/GeneralConvention/AddFormInfo"
          ),
      },
      {
        path: "/election-officer-login",
        name: "Election Login",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/LoginGeneralConvention"
          ),
      },
      {
        path: "/card-printer-login",
        name: "Card Printer Login",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/Authorization/LoginCardPrinterLogin"
          ),
      },
      {
        path: "/notice-election",
        name: "Election schedules",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/Home"),
      },

      {
        path: "/vote-result-entry",
        name: "Election Vote Result Add",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/GeneralConvention/VoteResultEntry"
          ),
      },
      {
        path: "/vote-result-entry/:id",
        name: "Election Vote Result Add",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/GeneralConvention/VoteResultEntry"
          ),
      },
      {
        path: "/vote-results",
        name: "Election Vote Result",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/GeneralConvention/VoteResultEntryList"
          ),
      },
      {
        path: "/election-directory-2078",
        name: "Election schedules",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../frontend/views/GeneralConvention/DisplayForm"
          ),
      },
      {
        path: "/in-succession-nomination-paper-sample-of-ballot-paper",
        name: "Election schedules",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/Home"),
      },
      {
        path: "/election-officer",
        name: "Election schedules",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../frontend/views/Home"),
      },
      {
        path: "/online-membership-card/:id",
        name: "Online Membership Card",
        component: () =>
          import(
            /* webpackChunkName: "OnlinememberCard" */ "../frontend/views/OnlinememberCard"
          ),
      },
      {
        path: "/hackathon",
        name: "Hackathon",
        component: () =>
          import(
            /* webpackChunkName: "Hackthon" */ "../frontend/views/Hackthon"
          ),
      },
      {
        path: "/deleteAccount",
        name: "DeleteAccount",
        component: () =>
          import(
            /* webpackChunkName: "DeleteAccount" */ "../frontend/views/DeleteAccount"
          ),
      },
    ],
  },
];

export default frontendmenu;

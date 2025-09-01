import axios from 'axios';
import { baseUrl,fileUrl } from "../../main";

const state = {
    hitcount:1065893,
    activeLanguage: {
        title: 'Nepali',
        showtitle: 'नेपाली',
        flagicon: 'https://cdn.countryflags.com/thumbs/nepal/flag-400.png',
    },
    menus: [
        {
            nep: {
                title: 'घर'
            },
            eng: {
                title: 'Home'
            },
            slug: '/',
        },

        {
            nep: {
                title: 'सबडोमेन'
            },
            eng: {
                title: 'Subdomain'
            },
            slug: '/page/subdomain',
        },




    ],
    secondMenu: [
        {
            languageChange: [
                {
                    title: 'English',
                    showtitle: 'English',
                    flagicon: 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png',
                },
                {
                    title: 'Nepali',
                    showtitle: 'नेपाली',
                    flagicon: 'https://cdn.countryflags.com/thumbs/nepal/flag-400.png',
                },
            ],
            actionButton: {
                engtitle: 'My Congress',
                neptitle: 'मेरो कांग्रेस',
                path: '/login',
            }
        }
    ],
    footerAbout: [
        {
            eng: {
                title: 'Nepali Congress Central Office',
                subMenu: [
                    {
                        title: 'B.P. Smriti Bhawan, B.P. Nagar',
                    },
                    {
                        title: 'Lalitpur, Nepal',
                    },
                    {
                        title: 'Tel : 01-5183263 / 5183264 / 5183265',

                    },
                    {
                        title: 'Fax : 01-5183266',
                    },
                    {
                        title: 'Email: info@nepalicongress.org, admin@nepalicongress.org',
                    },
                ]
            },
            nep: {
                title: 'नेपाली कांग्रेस केन्द्रीय कार्यालय',
                subMenu: [
                    {
                        title: 'वीपी स्मृति भवन, वीपी नगर',
                    },
                    {
                        title: 'ललितपुर, नेपाल',
                    },
                    {
                        title: 'फोन: ०१-५१८३२६३ / ५१८३२६४ / ५१८३२६५',

                    },
                    {
                        title: 'फ्याक्स: ०१-५१८३२६६',
                    },
                    {
                        title: 'ईमेल: info@nepalicongress.org, admin@nepalicongress.org',
                    },
                ]
            }
        }
    ],

    quickLink: [
        {
            title: 'Quick Links',
            neptitle: 'क्वीक लिंक्स',
            subMenu: [

            ]
        },
        {
            title: 'Media',
            neptitle: 'मिडिया ',
            subMenu: [
                {
                    eng: {
                        title: 'Video Gallery',
                    },
                    nep: {
                        title: 'भिडियो ग्यालरी',
                    },
                    slug: '/videogallery'
                },
                {
                    eng: {
                        title: 'Image Gallery',
                    },
                    nep: {
                        title: 'छवि ग्यालरी',
                    },
                    slug: '/imagegallery'
                },
            ]
        },
        {
            title: 'Congress ',
            neptitle: 'कांग्रेस  ',
            subMenu: [
                {
                    eng: {
                        title: 'Press Release',
                    },
                    nep: {
                        title: 'प्रेस विज्ञप्ती',
                    },
                    slug: '/press-release'
                },
                {
                    eng: {
                        title: 'Email',
                    },
                    nep: {
                        title: 'ईमेल',
                    },
                    href: 'https://gsgpm1021.siteground.biz/roundcube/?_task=logout&_token=NYsL5IOUpZhwAc1PnTIRg6E1ehBy8ZTh'
                },
                {
                    eng: {
                        title: 'News',
                    },
                    nep: {
                        title: 'कांग्रेसको कर्म',
                    },
                    slug: '/news'
                },
            ]
        }
    ],
    actionsTab: [
        {
            eng: {
                title: 'Press Realease',

            },
            nep: {
                title: 'प्रेस विज्ञप्ति',

            },
            icon: require('@/assets/images/icons/pressrelease.png'),
            path: '/press-release'
        },
        {
            eng: {
                title: 'Rules and Regulations',
                content: ''
            },
            nep: {
                title: 'पार्टी नियमावली',
            },
            icon: require('@/assets/images/icons/partyconstition.png'),
            path: '/rules-and-regulations'
        },
        {
            eng: {
                title: 'Letter to leader',
                content: `Anyone from any corner of the country and abroad can write a letter containing their thoughts and feelings in the name of any leadership of the Central Working Committee of the Nepali Congress through this website. We will send you the appropriate response of the concerned leadership by reaching out to the concerned leadership and accepting the suggestions and sentiments expressed.`
            },
            nep: {
                title: 'नेतृत्वलाई पत्र',
                content: `स्वदेश र विदेशको जुनसुकै कुनाबाट जो कोहीले पनि आफ्नो मनमा लागेको विचार र भावना सम्मिलित पत्र यो वेबसाइटमार्फत् नेपाली कांग्रेसको केन्द्रीय कार्यसमितिको कोही पनि नेतृत्वका नाममा लेख्न सक्नु हुनेछ। प्राप्त पत्र सम्बन्धित नेतृत्व समक्ष पुग्ने र व्यक्त सुझाव एवं भावना आत्मसाथ गर्दै सम्बन्धित नेतृत्वको उचित ‘रेस्पोन्स’ हामी तपाईलाई पठाउने छौं। 
                `
            },
            icon: require('@/assets/images/icons/lettertoleader.png'),
            path: '/letter-to-leader'
        },
        {
            eng: {
                title: 'Public Forum',
                content: `You will be able to openly express your views and opinions on time-related issues here. `
            },
            nep: {
                title: 'खुला बहस',
                content: `समय सान्दर्भिक मुद्धा उपर तपाईको आफ्नो विचार र दृष्टिकोण खुला ढंगले यहाँ व्यक्त गर्न सक्नु हुनेछ।`
            },
            icon: require('@/assets/images/icons/publicforum.png'),
            path: '/publicforum'
        },
        // {
        //     eng: {
        //         title: 'Online Membership Application',
        //         content:`(A) In accordance with the current constitution of Nepal and the constitution of the Nepali Congress, Nepali citizens who want to become a member of the Nepali Congress by adopting the ideas and principles of the Nepali Congress Party may apply for membership online.
        //         (B) In addition to the domain of the received application center, arrangements have been made for the applicant to reach the subdomain of the concerned district simultaneously.
        //         (C) The final decision on the application shall be in accordance with the procedure under paragraph 2 as ensured by the party constitution.`
        //     },
        //     nep: {
        //         title: 'अनलाइन सदस्यता आवेदन',
        //         content:`(क) नेपालको वर्तमान संविधान र नेपाली कांग्रेसको विधान बमोजिम नेपाली कांग्रेस पार्टीको विचार र सिद्धान्त आत्मसाथ गरेर नेपाली कांग्रेसको सदस्य बन्न चाहने नेपाली नागरिकले सदस्यताका लागि अनलाइनमार्फत् आवेदन दिन सक्नु हुनेछ। 
        //         (ख) प्राप्त आवेदन केन्द्रको डोमेनका अतिरिक्त आवेदकको सम्बन्धित जिल्लाको सबडोमेनमा एकसाथ पुग्ने प्रबन्ध मिलाइएको छ। 
        //         (ग) आवेदनमाथि अन्तिम टुंगो लगाउने सर्वाधिकार पार्टी विधानले सुनिश्चित गरेको परिच्छेद २ अन्तर्गतको प्रक्रिया बमोजिम हुनेछ। `
        //     },
        //     icon: require('@/assets/images/icons/becomemember.png'),
        //     path: '/registermember'
        // },
        // {
        //     eng: {
        //         title: 'Online Voting',
        //         content:`(A) Online voting has been arranged on the website to conduct public opinion polls and study on some issues.
        //         (B) Through the extended process of this arrangement, the process has been ensured through technology with the idea that the comrades at different levels of the party can make a significant contribution to move forward with a definite decision from the voting process in various contexts.`
        //     },
        //     nep: {
        //         title: 'अनलाइन मतदान',
        //         content:`(क) कतिपय विषयमा प्रत्यक्ष रुपले जनमत सर्वेक्षण र अध्ययन गर्न वेबसाइटमा अनलाइन भोटिङको प्रबन्ध गरिएको छ। 
        //         (ख) यो प्रबन्धको विस्तारित प्रक्रियामार्फत् पार्टीका विभिन्न तहमा रहनु भएका साथीहरूले विविध सन्दर्भमा मतदान प्रक्रियाबाट निश्चित निर्णयसाथ अघि बढ्न महत्त्वपूर्ण योगदान गर्नसक्ने परिकल्पनासाथ प्रविधिमार्फत् यो प्रक्रिया सुनिश्चित गरिएको छ।`
        //     },
        //     icon: require('@/assets/images/icons/onlinevoting.png'),
        //     path: '/onlinevoting'
        // },
        {
            eng: {
                title: 'Online Museum',
                content: `The museum has a traditional significance. However, with the changing times and the development of technology, the party's website has begun to include a variety of content from different eras.
                Anyone here can send suggestions or content to admin@nepalicongress.org about the content they deem appropriate to put in this online museum.`
            },
            nep: {
                title: 'अनलाइन संग्रहालय',
                content: `संग्रहालयको परम्परागत महत्त्व छँदै छ। तर, बदलिएको समय र प्रविधिको विकाससँगै पार्टीको वेबसाइटमा विभिन्न कालखण्डका विविध सामग्री समावेश गर्ने क्रमको शुरुवात गरिएको छ। 
                यहाँहरू कसैलाई पनि यो अनलाइन म्यूजियममा राख्न उपयुक्त लागेका सामग्रीबारे सुझाव या सामग्री admin@nepalicongress.org मा पठाउन सक्नु हुनेछ।`
            },
            icon: require('@/assets/images/icons/onlinemuseum.png'),
            path: '/onlinemuseum'
        },
        {
            eng: {
                title: 'Online Library',
                content: `Welcome to the online library.
                Here you can study various political philosophies of the world, different periods of history, different socio-political schools of thought of the development of human civilization in different formats. Inspirational autobiographies are also available from books on various aspects of spirituality, literature, diplomacy and social transformation.
                We plan to be limited to only one hundred books. As suggested here, the books are bound to change. The library is currently started with a few books`
            },
            nep: {
                title: 'अनलाइन लाइब्रेरी',
                content: `अनलाइन लाइब्रेरीमा यहाँलाई हार्दिक स्वागत छ।
                विश्वका अनेक राजनीतिक दर्शन, इतिहासका विविध कालखण्ड, मानव सभ्यताको विकासक्रमका फरक–फरक अर्थराजनीतिक चिन्तनधारासम्बन्धी पुस्तकलाई विभिन्न स्वरुपमा यहाँ अध्ययन गर्न सक्नुहुने छ। अध्यात्म, साहित्य, कूटनीति एवं समाज रुपान्तरणका विविध आयामका पुस्तकदेखि प्रेरक आत्मकथाहरू पनि उपलब्ध छन्। 
                केवल एक सय पुस्तकमा सीमित रहने हाम्रो योजना छ। यहाँहरूको सुझावअनुसार पुस्तकहरू फेरबदल हुने नै छन्। हाल थोरै पुस्तकबाट लाइब्रेरी शुरु गरिएको छ।
                नोटः यो पुस्तकालयमा हुनैपर्ने यहाँलाई लागेको कुनै पुस्तक भए admin@nepalicongress.org मा सुझाव लेख्न सक्नु हुनेछ। `
            },
            icon: require('@/assets/images/icons/onlinelibrary.png'),
            path: '/online-library'
        },
    ]
};

const getters = {
    allMenuFrontend: (state) => Object.assign(state.menus),
    allSecondFrontend: (state) => Object.assign(state.secondMenu),
    allFooterMenu: (state) => Object.assign(state.quickLink),
    allFooterAbout: (state) => Object.assign(state.footerAbout),
    actionsTab: (state) => Object.assign(state.actionsTab),
    selectedLanguage: (state) => state.activeLanguage,
    allhitcount: (state) => state.hitcount,

};


const actions = {
    async languageChange({ commit }, data) {
        commit("setChangeLanguge", data);
    },
    async getHeaderMenus({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}page/headermenu`);
            if (res.status === 200) {
                commit("setHeaderMenu", res.data.menus);
                setTimeout(() => {
                    this.state.post.loading = false;
                }, 1000)

                
                if (sessionStorage.getItem("alreadyCount")) {
                    console.log("already counted")
                } else {
                    const ress = await axios.put(`${fileUrl}`);
                    if (ress.status == 200) {
                        sessionStorage.setItem("alreadyCount", "yes");
                    }
                }

                const ct = await axios.get(`${fileUrl}/hit`);
                state.hitcount = ct.data.count;

            }

        } catch (error) {
            console.log(error);
        }
    },
    async getFooterMenus({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}page/footermenu`);
            if (res.status === 200) {
                commit("setFooterMenu", res.data.menus);
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const mutations = {
    menuMutation: (state, menu) => (state.menus = menu),
    setChangeLanguge: (state, menu) => (state.activeLanguage = menu),
    setHeaderMenu: (state, menu) => (state.menus = menu),
    setFooterMenu: (state, menu) => (state.quickLink[0].subMenu = menu),
};

export default {
    state,
    getters,
    actions,
    mutations,
};

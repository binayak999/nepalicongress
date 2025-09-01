import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
    votes: [],
    polls: [],
    pollsFrontend: [],
    votesFrontend: [],
    voters: [],
    vottingnow: undefined,
    uniqueVoters: [],
    votersProcessed:[],
    singleVote:[]
};

const getters = {
    allVotes: (state) => state.votes,
    allPolls: (state) => state.polls,
    allPollsFrontend: (state) => state.pollsFrontend,
    allVotesFrontend: (state) => state.votesFrontend,
    allVoters: (state) => state.voters,
    allUniqueVoters: (state) => state.uniqueVoters,
    allVotersProcessed: (state) => state.votersProcessed,
    allsingleVote:(state)=>state.singleVote,
    setVoted: (state) => state.vottingnow
};

const actions = {
    async fetchVotes({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}voting`);
            commit("setVotes", res.data.votes);
        } catch (error) {
            console.log(error.response);
            commit("setVotes", []);
        }
    },
    async fetchSingleVotes({ commit },id) {
        try {
            const res = await axios.get(`${baseUrl}voting/votefetch/`+id,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            commit("setSingleVoting", res.data.votesFor);
        } catch (error) {
            console.log(error.response);
            commit("setSingleVoting", []);
        }
    },
    async fetchVotesProcessed({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}voting/votersprocessed`,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            commit("setVotersProcessed", res.data.voters);
        } catch (error) {
            console.log(error.response);
            commit("setVotersProcessed", []);
        }
    },
    async fetchVoters({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}voting/voters`);
            if (res.status === 200) {

                commit("setVoters", res.data.voters);
            }

        } catch (error) {
            console.log(error.response);
            commit("setVoters", []);
        }
    },
    async fetchUniqueVoters({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}voting/voters/unique`);
            if (res.status === 200) {
                commit("setUniqueVoters", res.data.voters);
            }

        } catch (error) {
            console.log(error.response);
            commit("setUniqueVoters", []);
        }
    },
    async deleteVoter({ commit }, data) {
        try {
            const res = await axios.delete(`${baseUrl}voting/voters/${data}`);
            if (res.status === 200) {
                commit("setSuccess", "Successfully");
                this.dispatch("fetchVoters");
            }

        } catch (error) {
            console.log(error.response);
            commit("setSuccess", "Error");
        }
    },
    async fetchPolls({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}poll`);
            commit("setPolls", res.data.polls);
        } catch (error) {
            console.log(error.response);
            commit("setPolls", []);
        }
    },
    async fetchPollsFrontend({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}poll/frontend`, {
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            commit("setPollsFrontend", res.data.polls);
        } catch (error) {
            console.log(error.response);
            commit("setPollsFrontend", []);
        }
    },
    async fetchVoteFrontend({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}voting/frontend`);
            commit("setVoteFrontend", res.data.votes);
        } catch (error) {
            console.log(error.response);
            commit("setVoteFrontend", []);
        }
    },
    async postPoll({ commit }, data) {
        try {
            const res = await axios.post(`${baseUrl}poll/create`, data, {
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            console.log(res.data)
            if (res.status === 201) {
                router.push('polls').catch(err => console.log(err));
                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `Polls Has Been Deleted`,
                };
                this.dispatch("alertNow", info);
            }
            commit("setSuccess", "Successfully Added");
        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Was Unsuccessful");
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: `Something went wrong`,
            };
            this.dispatch("alertNow", info);
        }
    },
    async postVote({ commit }, data) {
        try {
            const res = await axios.post(`${baseUrl}voting/create`, data, {
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            console.log(res.data)
            if (res.status === 201) {
                router.push('votes').catch(err => console.log(err));
            }
            commit("setSuccess", "Successfully Added");
        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async pollNow({ commit }, data) {
        try {
            const res = await axios.post(`${baseUrl}poll/pollnow`, data, {
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            if (res.status === 201) {
                alert("Thanks for you poll")
                router.push("/").catch(error => console.log(error));
                commit("setSuccess", "Successfully Added");
            } else if (res.status === 409) {

                router.push("/").catch(error => console.log(error));
                commit("setSuccess", "Successfully Added");
            }

        } catch (error) {
            console.log(error.response.status);
            router.push("/").catch(error => console.log(error));
            alert("Already Submited you your poll")
            commit("setSuccess", "Was Unsuccessful");
        }
    },

    async voteLogin({ commit }, data) {

        try {
            const res = await axios.post(`${baseUrl}voting/voteUserCheck`, data, 
              );
            if (res.status == 200) {
                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `Login Successful`,
                };
                this.dispatch("alertNow", info);
            }
            secureStorage.setItem("votetoken", res.data.votetoken)
            commit("setVotting", secureStorage.getItem("votetoken"));
        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Was Unsuccessful");
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: `Username and Password Don't Match`,
            };
            this.dispatch("alertNow", info);
        }
    },
    async voteNow({ commit }, data) {

        try {
            const res = await axios.post(`${baseUrl}voting/voteNow`, data, {
                headers: {
                    'Authorization-Vote': `Bearer ${secureStorage.getItem('votetoken')}`
                }
            });
            if (res.status === 200) {
                commit("setSuccess", "Successfully Added");
                // secureStorage.removeItem('votetoken');
                // router.push("/");
                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `Voted Successfully`,
                };
                this.dispatch("alertNow", info);
            }

        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Was Unsuccessful");
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: error.response.data.message,
            };
            this.dispatch("alertNow", info);
        }
    },
    async sendSMS({ commit }, data) {

        try {
            const res = await axios.post(`${baseUrl}voting/sendSms`, data, {
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            if (res.status === 200) {
                commit("setSuccess", "Successfully Added");
                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `SMS send Successfully`,
                };
                this.dispatch("alertNow", info);
                this.dispatch("fetchVotesProcessed");
            }

        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Error while sending SMS");
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: error.response.data.message,
            };
            this.dispatch("alertNow", info);
        }
    },

    async updateStatus({ commit }, data) {
        try {
            const res = await axios.put(`${baseUrl}voting/votestatus/${data.id}`, data);
            if (res.status === 200) {
                console.log(res);
                this.dispatch('fetchVotes');
            }
            commit("setSuccess", "Successfully Uploaded");
            let info = {
                icon: "success",
                status: true,
                title: `Success`,
                message: `Voted Status Updated`,
            };
            this.dispatch("alertNow", info);
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
    async updateStatusPoll({ commit }, data) {
        try {
            const res = await axios.put(`${baseUrl}poll/pollstatus/${data.id}`, data);
            if (res.status === 200) {
                console.log(res);
                this.dispatch('fetchPolls');
                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `Poll Status Has Been Updated`,
                };
                this.dispatch("alertNow", info);
            }
            commit("setSuccess", "Successfully Uploaded");
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

};

const mutations = {
    setVotes: (state, vote) => (state.votes = vote),
    setPolls: (state, poll) => (state.polls = poll),
    setPollsFrontend: (state, poll) => (state.pollsFrontend = poll),
    setVoteFrontend: (state, votes) => (state.votesFrontend = votes),
    setVotting: (state, votes) => (state.vottingnow = votes),
    setVoters: (state, votes) => (state.voters = votes),
    setSuccess: (state, response) => (state.success = response),
    setUniqueVoters: (state, response) => (state.uniqueVoters = response),
    setSingleVoting: (state, response) => (state.singleVote = response),
    setVotersProcessed: (state, response) => (state.votersProcessed = response),
};

export default {
    state,
    getters,
    actions,
    mutations,
};

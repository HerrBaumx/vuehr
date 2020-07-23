import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from '../utils/api'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
    state: {
        routes: [],
        sessions: {},
        hrs: [],
        currentSession: null,
        currentHr: JSON.parse(window.sessionStorage.getItem("user")),
        filterKey: '',
        stomp: null
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession(state, currentSession) {
            state.currentSession = currentSession;
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentHr.username + '#' + msg.to];

            if (!mss) {
                // state.sessions[state.currentHr.username + '#' + msg.to] = [];
                Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, []);
            }
            state.sessions[state.currentHr.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_CURRENTHR(state,hr) {
            state.currentHr = hr;
        },
        INIT_DATA(state) {
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_HR(state, data) {
            state.hrs = data;

        }
    },
    actions: {
        connect(context) {

            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({}, success => {
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    let receiveMsg = JSON.parse(msg.body);
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
                })
            }, error => {

            })
        },
        initData(context) {
            context.commit('INIT_DATA')
            getRequest("/chat/hrs").then(resp => {
                if (resp) {
                    context.commit('INIT_HR', resp);

                }
            });
        }
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;
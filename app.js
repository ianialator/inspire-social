var fbconfig = {
  apiKey: "AIzaSyCk0QafOxLmLwDyQXa58Ktrz_qjfl_Edf4",
  authDomain: "inspire-social.firebaseapp.com",
  databaseURL: "https://inspire-social.firebaseio.com",
  projectId: "inspire-social",
  storageBucket: "inspire-social.appspot.com",
  messagingSenderId: "495940347374"
};
firebase.initializeApp(fbconfig);
const db = firebase.database();

//data stuff for the app
const prompts = {
  "ed resource": ["How do I get involved in...", "Who in the area helps with...", "Where do I start if I want to help the cause of...", "Got any info on how to volunteer at..."],
  "cool story": ["What's going on in th world of...", "Go dig up a story about..."],
  "project update": ["What's something (new or old) thing we could use help on?", "What we are doing this week?", "what unexpected thing has happened in the past couple weeks? (good or bad)"]
};

const causes = []
const topicOpts = ["volunteering", "open-source philosophy", "the gig economy", "decentralization", "grassroots activism", "people doing good for their community"] 
//All the Vue stuff ============================================================================================
// DATA comes first...............
new Vue({
  el: "#app",
  data: {
    apID: '',
    promptData: {
      promptCat: '',
      CurPrompt: '',
      causeOpt: '',
      GUtopic: '',
    },
    entry: '',
  },
// then the METHODS / FUNCTIONS................
  methods: {
    genPrompt: function () {
      var apID
      var self = this

      var request = new XMLHttpRequest()
      request.onload = function () {
      let promptCat = [Math.floor(Math.random() * prompts.length)]
        let promptData = {
          curPrompt: [Math.floor(Math.random() * promptCat.length)],
          cause: [Math.floor(Math.random() * causeOpt.length)],
          GUtopic: [Math.floor(Math.random() * topicsOpt.length)]
        }
        self.promptData = promptData
      }
    },

    submitResponse: function (entry) {
      var today = new Date();
      var date = today.getDate();
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      db.ref(date + '::' + time).set({
        type: this.promptData,
        response: entry,
      }),
      console.log('posted @:');
      console.log(time + ':' + entry);
    },
    next: function () {
      this.genPrompt();
    },
  },
  // and here is a spot for HOOKS.........
  mounted() {
    this.genPrompt();
  }
}

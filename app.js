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
const ageOpt = ["16-19", "20-30", "31-50", "51-65", "66+"];
const marStatOpt = ["Single", "Married (no kids)", "Married (w/ kids)"];
const jobPrefOpt = {
  "stress": ["low stress", "medium stress", "high stress"],
  "time": ["one-time thing", "weekly", "monthly", "every few months"]
};
const motiveOpt = ["Extra spending power", "supporting local businesses", "supporting a specific cause", "do some good in the world", "feel useful in their downtime", "get out and have some fun", "meet like-minded people", "get their friends and relatives involved in a cause", "tha clout", ];
const causeOpt = ["climate change", "civil rights", "freedom of the press", "native issues", "preservation of democracy", "anti-poverty", "homelessness", "domestic abuse", "food insecurity/waste", "drug addiction", "systemic/institutionalized discrimination", "the school-to-prison pipeline", "prison reform", "radicalism", "human trafficking", "waste management", "gun violence", "medical instability"];
const locOpt = {
  "type": ["Urban", "Rural", "suburban"],
  "dist": ["Local", "Non-local"]
}
const techSkillOpt = ["Beginner", "Intermediate", "Advanced"]



//All the Vue stuff ============================================================================================
new Vue({
  el: "#app",
  data: {
    apID: '',
    promptData: {
      name: '',
      age: '',
      gender: '',
      type: '',
      distance: '',
      marStat: '',
      jobStress: '',
      jobTime: '',
      cause: '',
      motive: '',
      techSkill: '',
    },
    entry: '',
  },
  
  methods: {
    genPrompt: function () {
      ///** NAME GETTER
      var apID
      var self = this

      var request = new XMLHttpRequest()
      request.open('GET', 'https://uinames.com/api/?region=united%20states', true)
      request.onload = function () {
        apID = JSON.parse(this.response)
        let name = apID.name
        let genderPicker = Math.floor(Math.random() * 100)
        let gen = ''
        if (genderPicker == 0){
          gen = 'other'
        } else {
          gen = apID.gender
        }
        let promptData = {
          name: name.toUpperCase(),
          gender: gen,
          age: ageOpt[Math.floor(Math.random() * ageOpt.length)],
          marStat: marStatOpt[Math.floor(Math.random() * marStatOpt.length)],
          type: locOpt.type[Math.floor(Math.random() * locOpt.type.length)],
          distance: locOpt.dist[Math.floor(Math.random() * locOpt.dist.length)],
          jobStress: jobPrefOpt.stress[Math.floor(Math.random() * jobPrefOpt.stress.length)],
          jobTime: jobPrefOpt.time[Math.floor(Math.random() * jobPrefOpt.time.length)],
          cause: causeOpt[Math.floor(Math.random() * causeOpt.length)],
          motive: motiveOpt[Math.floor(Math.random() * motiveOpt.length)],
          techSkill: techSkillOpt[Math.floor(Math.random() * techSkillOpt.length)],
        }
        self.promptData = promptData
      }
      request.send()
    },

    submitResponse: function (entry) {
      var today = new Date();
      var date = today.getDate();
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      db.ref(date + '::' + time).set({
          type: this.promptData,
          response: entry,
        },
        function () {
          console.log('posted');
        });
      console.log(time + ':' + entry);
    },
    next: function () {
      this.genPrompt();
    },
  },
  mounted() {
    this.genPrompt();
  }
})

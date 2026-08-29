<template>
  <div class="events bgimage blurred">
    <div class="container container-small">
      <h1 class="heading">{{ $t('events.heading') }}</h1>

      <navigation></navigation>

      <div v-for="(event, index) in masterList" v-bind:key="event.id">
        <h2 class="month-heading" v-if="((index > 0) && extractMonth(event)!== extractMonth(masterList[index-1])) || index === 0">{{ extractMonth(event) }}</h2>
        <div class="row no-gutters" style="color: #fff; text-decoration: none;">
          <div class="col-3 col-sm-2">
            <div v-if="((index > 0) && extractDayMonth(event) !== extractDayMonth(masterList[index-1])) || index === 0">
              <h5 class="mb-0">{{ extractDayMonth(event) }}</h5>
              {{ extractDayOfWeek(event) }}
            </div>
          </div>
          <div class="col">
            <a v-bind:href="event.htmlLink" target="_blank">
              <div class="calendar-item" v-bind:class="event.organizer.email.replace(/@|\./g, '')">
                <div>{{ event.summary }}</div>
                <p v-if="event.description !== undefined" v-html="event.description"></p>
                <p v-if="isSameDayEvent(event)">{{ extractSingleDayTime(event) }}</p>
                <p class="organizer-email">{{ event.organizer.email }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import moment from 'moment';
  import 'moment/locale/el';

  import navigation from '@/components/Navigation';


  // utility funcs

  function compareDates(a, b) {
    let aDate = a.start.date || a.start.dateTime;
    let bDate = b.start.date || b.start.dateTime;

    // Compare two dates and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    let isFinA = isFinite(aDate = (new Date(aDate)).valueOf());
    let isFinB = isFinite(bDate = (new Date(bDate)).valueOf());

    return (isFinA && isFinB ? (aDate > bDate) - (aDate < bDate) : NaN);
  }

  const G_API_KEY = 'AIzaSyDp00A7Ol9o-65hJ8dIGkKOQVdTq5p_dVQ';


  function generateGAPIEventPromise (optionsObj) {
    return gapi.client.init({
          apiKey: G_API_KEY,
        }).then(function() {
          return gapi.client.request({
            'path': 'https://www.googleapis.com/calendar/v3/calendars/' + optionsObj.calendarName + '/events?singleEvents=true&maxResults=' + optionsObj.maxResults + '&orderBy=startTime&timeMin=' + optionsObj.timeMin,
          })
        });
  }

  function recordErrorToConsole(reason) {
    console.log('Error: ' + reason.result.error.message);
  }

  export default {
    name: 'Events',
    data() {
      return {
        masterList: [],
      };
    },
    methods: {
      addToMasterArray(response) {
        Array.prototype.push.apply(this.masterList, response.result.items);
        this.masterList.sort(compareDates);
      },

      isSameDayEvent(event) {
        if (!event.start.dateTime) {
          return false;
        }
        if (moment(event.start.dateTime).isSame(moment(event.end.dateTime), 'day')) {
          return true;
        }
        return false;
      },

      isSingleAllDayEvent(event) {
        if (event.start.date && moment.duration((moment(event.end.date)).diff(moment(event.start.date))).asHours() <= 24) {
          return true;
        }
        return false;
      },

      extractSingleDayTime(event) {
        let startMoment = moment(event.start.dateTime);
        let startFormatted = startMoment.format('h:mm');

        let endMoment = moment(event.end.dateTime)
        let endFormatted = endMoment.format('h:mm A');

        let startSplit = startFormatted.split(":");
        let endSplit = endFormatted.split(":");

        if ((startSplit[1].indexOf("00") != -1) && (endSplit[1].indexOf("00") != -1)) {
          startFormatted = startSplit[0];
          endFormatted = endSplit[0] + endMoment.format(' A');
        }
        
        return startFormatted + ' - ' + endFormatted;
      },

      extractDayMonth(event) {
        let startMoment = moment(event.start.date || event.start.dateTime);
        let endMoment = moment(event.end.date || event.end.dateTime);

        let format = 'D MMM';

        if (moment.locale() !== 'el') {
          format = "MMM D";
        }

        return startMoment.format(format);
      },

      extractMonth(event) {
        let startMoment = moment(event.start.date || event.start.dateTime);

        return startMoment.format('MMMM');
      },

      extractDayOfWeek(event) {
        let startMoment = moment(event.start.date || event.start.dateTime);

        return startMoment.format('ddd');
      },
    },
    mounted() {
      let self = this;

      let startOfDayTimestamp = moment().startOf('day').toISOString();

      function start() {
        generateGAPIEventPromise({
          calendarName: 'greekbulletin@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'greekschool@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'info@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'metyouth@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'philoptochos@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'pta@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'romiosyni@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'volunteer@greekfest.org',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'webteam@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'sundayschool@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'fellowship@halifaxgreeks.ca',
          maxResults: 50,
          timeMin: startOfDayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);
      };
      // 1. Load the JavaScript client library.
      gapi.load('client', start);


      if (this.$i18n.locale === 'gr') {
        moment.locale('el');
      } else {
        moment.locale('en');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {color: inherit; text-decoration: none;}

.calendar-item {
  box-shadow: 0 1px 1px #E0E0E0;
  margin-bottom: 1rem;
  padding: .3rem .7rem 0 .7rem;
}

.month-heading {
  color: #fff;
  padding-bottom: 20px;
  padding-top: 20px;
  text-align: right;
}

.organizer-email {
  font-size: 75%;
  text-align: right;
  width: 100%;
  margin-bottom: 0px;
}

.greekbulletinhalifaxgreeksca {background-color: #757575;}
.greekschoolhalifaxgreeksca {background-color: #43A047;}
.infohalifaxgreeksca {background-color: #8D6E63;}
.metyouthhalifaxgreeksca {background-color: #01579B;}
.philoptochoshalifaxgreeksca {background-color: #B71C1C;}
.ptahalifaxgreeksca {background-color: #558B2F;}
.romiosynihalifaxgreeksca {background-color: #0288D1;}
.volunteergreekfestorg {background-color: #E64A19;}
.webteamhalifaxgreeksca {background-color: #EC407A;}
.sundayschoolhalifaxgreeksca {background-color: #880E4F;}
.fellowshiphalifaxgreeksca {background-color: #880E4F;}
  
</style>

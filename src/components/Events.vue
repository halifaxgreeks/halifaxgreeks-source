<template>
  <div class="events bgimage blurred">
    <div class="container container-small">
      <h1 class="heading">{{ $t('events.heading') }}</h1>

      <div class="list-group">
        <div v-for="(event, index) in masterList">
          <h2 class="month-heading" v-if="((index - 1 > 0) && extractMonth(event)!== extractMonth(masterList[index-1])) || index === 0">{{ extractMonth(event) }}</h2>
          <div class="single-card">
            <a v-bind:href="event.htmlLink" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ extractDayMonth(event) }}</h5>
                <p>{{ extractDayOfWeek(event) }}<span v-if="isSameDayEvent(event)"> {{ extractSingleDayTime(event) }}</span><span v-else>, {{ $t('events.allDay') }}</span></p>
              </div>

              <p class="mb-1">{{ event.summary }}</p>
              <p v-if="event.description !== undefined" v-html="event.description"></p>
              <p class="organizer-email">{{ event.organizer.email }}</p>
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
        let startFormatted = startMoment.format('h:mma');

        let endMoment = moment(event.end.dateTime)
        let endFormatted = endMoment.format('h:mma');

        let startSplit = startFormatted.split(":");
        let endSplit = endFormatted.split(":");

        if (startSplit[1].indexOf("00") != -1) {
          startFormatted = startSplit[0] + startMoment.format('a');
        }

        if (endSplit[1].indexOf("00") != -1) {
          endFormatted = endSplit[0] + endMoment.format('a');
        }
        
        return startFormatted + ' - ' + endFormatted;
      },

      extractDayMonth(event) {
        let startMoment = moment(event.start.date || event.start.dateTime);
        let endMoment = moment(event.end.date || event.end.dateTime);

        let format = 'D MMMM';

        if (moment.locale() !== 'el') {
          format = "MMMM D";
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

      let yesterdayTimestamp = moment().add(-1, 'days').toISOString();

      function start() {
        generateGAPIEventPromise({
          calendarName: 'greekbulletin@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'greekschool@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'info@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'metyouth@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'philoptochos@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'pta@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'romiosyni@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'volunteer@greekfest.org',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'webteam@halifaxgreeks.ca',
          maxResults: 4,
          timeMin: yesterdayTimestamp,
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

.month-heading {
  color: white;
  padding-bottom: 20px;
  padding-top: 20px;
  text-align: right;
}

.organizer-email {
  font-size: 75%;
  text-align: right;
  width: 100%;
  margin-bottom: 0px;
  color: #b7b7b7;
}
  
</style>

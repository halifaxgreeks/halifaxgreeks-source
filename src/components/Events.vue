<template>
  <div class="events bgimage blurred">
    <div class="container container-small">
      <h1 class="heading">{{ $t('events.heading') }}</h1>

      <div class="list-group">
        <div v-for="event in masterList">
          <a v-bind:href="event.htmlLink" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ generateDateString(event) }}</h5>
            </div>
            <p class="mb-1">{{ event.summary }}</p>
          </a>
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

  const API_KEY = 'AIzaSyDp00A7Ol9o-65hJ8dIGkKOQVdTq5p_dVQ';


  function generateGAPIEventPromise (optionsObj) {
    return gapi.client.init({
          apiKey: API_KEY,
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
      generateDateString(event) {
        let startDate = event.start;
        let endDate = event.end;

        let format1 = 'D MMMM';
        let format2 = 'D MMMM h:mma';

        if (moment.locale() !== 'el') {
          format1 = "MMMM D";
          format2 = 'MMMM D h:mma';
        }

        if (event.start.date) {
          if (moment.duration((moment(event.end.date)).diff(moment(event.start.date))).asHours() <= 24) {
            return moment(event.start.date).format(format1);
          }
          return moment(event.start.date).format(format1) + ' - ' +
                  moment(event.end.date).format(format1); 
        }

        // if same day event
        if (moment(event.start.dateTime).isSame(moment(event.end.dateTime), 'day')) {
          return moment(event.start.dateTime).format(format2) + ' - ' +
                  moment(event.end.dateTime).format('h:mma');
        }
        return moment(event.start.dateTime).format(format2) + ' - ' +
                  moment(event.end.dateTime).format(format2); 

      },
    },
    mounted() {
      let self = this;

      let yesterdayTimestamp = moment().add(-1, 'days').toISOString();

      function start() {
        generateGAPIEventPromise({
          calendarName: 'info@halifaxgreeks.ca',
          maxResults: 5,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'greekschool@halifaxgreeks.ca',
          maxResults: 5,
          timeMin: yesterdayTimestamp,
        }).then(self.addToMasterArray, recordErrorToConsole);

        generateGAPIEventPromise({
          calendarName: 'metyouth@halifaxgreeks.ca',
          maxResults: 5,
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
  .heading {
    padding-top: 0.5em;
    padding-bottom: 2em;
    color: white;
  }

  @media (min-width: 700px) {
      .container-small {
          width: 700px;
      }
  }

  .container-small {
      max-width: 100%;
  }
</style>

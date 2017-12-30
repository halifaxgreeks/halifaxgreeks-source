<template>
  <div class="events container container-small">
    <h1 class="heading">{{ $t('events.heading') }}</h1>

    <div class="list-group">
      <div v-for="event in masterEventList">
        <a v-bind:href="event.htmlLink" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ generateDateString(event) }}</h5>
          </div>
          <p class="mb-1">{{ event.summary }}</p>
        </a>
      </div>
    </div>

  </div>
</template>

<script>

  import moment from 'moment';
  import 'moment/locale/el';

  // utility funcs

  function convertDate(d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp) 
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
        d.constructor === Date ? d :
        d.constructor === Array ? new Date(d[0],d[1],d[2]) :
        d.constructor === Number ? new Date(d) :
        d.constructor === String ? new Date(d) :
        typeof d === "object" ? new Date(d.year,d.month,d.date) :
        NaN
    );
  }

  function compareDates (a,b) {
    let a_d = a.start.date || a.start.dateTime;
    let b_d = b.start.date || b.start.dateTime;

    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
        isFinite(a_d=convertDate(a_d).valueOf()) &&
        isFinite(b_d=convertDate(b_d).valueOf()) ?
        (a_d>b_d)-(a_d<b_d) :
        NaN
    );
  }

  const API_KEY = 'AIzaSyDp00A7Ol9o-65hJ8dIGkKOQVdTq5p_dVQ';

  function generateGAPIQueryString (optionsObj) {
    return 'https://www.googleapis.com/calendar/v3/calendars/' 
          + optionsObj.calendarName + '/events?singleEvents=true&maxResults=' 
          + optionsObj.maxResults + '&orderBy=startTime&timeMin=' + optionsObj.timeMin;
  }

  export default {
    name: 'Events',
    data() {
      return {
        infoCalEvents: [],
        greekschoolCalEvents: [],
      };
    },
    computed: {
      masterEventList() {
        if (this.infoCalEvents.items != undefined 
          && this.greekschoolCalEvents.items != undefined) {
          let intermediateForm = this.infoCalEvents.items.concat(this.greekschoolCalEvents.items);

          intermediateForm.sort(compareDates);

          return intermediateForm;
        }
      },
    },
    methods: {
      generateDateString(event) {
        let startDate = event.start;
        let endDate = event.end;

        if (event.start.date) {
          if (moment.duration((moment(event.end.date)).diff(moment(event.start.date))).asHours() <= 24) {
            return moment(event.start.date).format('D MMMM');
          }
          return moment(event.start.date).format('D MMMM') + ' - ' +
                  moment(event.end.date).format('D MMMM'); 
        }

        // if same day event
        if (moment(event.start.dateTime).isSame(moment(event.end.dateTime), 'day')) {
          return moment(event.start.dateTime).format('D MMMM h:mma') + ' - ' +
                  moment(event.end.dateTime).format('h:mma');
        }
        return moment(event.start.dateTime).format('D MMMM h:mma') + ' - ' +
                  moment(event.end.dateTime).format('D MMMM h:mma'); 

      },
    },
    mounted() {
      let self = this;

      let yesterdayTimestamp = moment().add(-1, 'days').toISOString();

      function start() {
        // 2. Initialize the JavaScript client library.
        gapi.client.init({
          'apiKey': API_KEY,
        }).then(function() {
          // 3. Initialize and make the API request.
          return gapi.client.request({
            'path': generateGAPIQueryString({
              calendarName: 'info@halifaxgreeks.ca',
              maxResults: 5,
              timeMin: yesterdayTimestamp,
            }),
          })
        }).then(function(response) {
          self.infoCalEvents = response.result;
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });

        gapi.client.init({
          'apiKey': API_KEY,
        }).then(function() {
          // 3. Initialize and make the API request.
          return gapi.client.request({
            'path': generateGAPIQueryString({
              calendarName: 'greekschool@halifaxgreeks.ca',
              maxResults: 5,
              timeMin: yesterdayTimestamp,
            }),
          })
        }).then(function(response) {
          self.greekschoolCalEvents = response.result;
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      };
      // 1. Load the JavaScript client library.
      gapi.load('client', start);


      if (this.$i18n.locale == 'gr') {
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
    margin-top: 2em;
    margin-bottom: 2em;
  }


  @media (min-width: 700px) {
      .container-small {
          width: 700px;
      }
      .container-large {
          width: 1500px;
      } 
  }

  .container-small, .container-large {
      max-width: 100%;
  }
</style>

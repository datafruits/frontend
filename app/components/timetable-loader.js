import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import moment from 'moment';
import jstz from 'jstimezonedetect';

export default Component.extend({
  store: service(),
  tagName: '',
  init() {
    this._super(...arguments);
    this.data = [];
  },

  didReceiveAttrs() {
    let query = this.query;
    this.fetchData.perform(query);
  },

  fetchData: task(function*(query) {
    yield timeout(1000);
    query.timezone = jstz.determine().name();
    const start = query.start;
    if(query.view === 'month'){
      query.start = moment(start).startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
      query.end = moment(start).endOf('month').add(1, 'month').format('YYYY-MM-DD');
    }else{
      query.start = moment(start).startOf('week').subtract(1, 'week').format('YYYY-MM-DD');
      query.end = moment(start).endOf('week').add(1, 'week').format('YYYY-MM-DD');
    }
    let shows = this.store.query('scheduled-show', query).then((shows) => {
      return shows;
    });
    let resolvedShows = yield shows;
    return this.set('data', resolvedShows);
  }).restartable()
});

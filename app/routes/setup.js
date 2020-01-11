import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  flashMessages: service(),
  session: service(),
  beforeModel(){
    if(this.session.isAuthenticated){
      this.transitionTo('authenticated.dashboard');
    }
  }
});

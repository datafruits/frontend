import DS from "ember-data";
import Model, { attr } from "@ember-data/model";

export default class HostApplication extends Model {
  @attr email;
  @attr createdAt;
  @attr username;
  @attr link;
  @attr homepageUrl;
  @attr interval;
  @attr desiredTime;
  @attr approved;
}

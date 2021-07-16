import Model, { attr, hasMany, belongsTo } from "@ember-data/model";
import moment from "moment";
import { alias } from "@ember/object/computed";

export default class ScheduledShow extends Model {
  @hasMany("track") tracks;
  @belongsTo("playlist") playlist;
  @belongsTo("user") host;
  @attr("date") start;
  @attr("date") end;
  @attr title;
  @attr("file") image;
  @attr imageFilename;
  @attr thumbImageUrl;
  @attr tweetContent;
  @attr description;
  @attr timezone;
  @attr recurringInterval;

  @attr isLive;
  @attr isGuest;
  @attr guest;

  get formattedDate() {
    return moment(this.start).format();
  }

  get displayTitle() {
    return `${this.title} - ${this.formattedDate}`;
  }

  get startFormatted() {
    return moment(this.start).format("HH:mm");
  }

  get recurringFormatted() {
    if(this.recurringInterval === "week"){
      return "weekly";
    } else if(this.recurringInterval === "month") {
      return "monthly";
    } else if(this.recurringInterval === "biweek") {
      return "biweekly";
    } else {
      return null;
    }
  }

  get recurringBgColor() {
    if(this.recurringInterval === "week"){
      return "bg-purple-400";
    } else if(this.recurringInterval === "month") {
      return "bg-blue-400";
    } else if(this.recurringInterval === "biweek") {
      return "bg-green-400";
    } else {
      return null;
    }
  }

  get endFormatted() {
    return moment(this.end).format("HH:mm");
  }

  @alias("start") startsAt;
  @alias("end") endsAt;
}

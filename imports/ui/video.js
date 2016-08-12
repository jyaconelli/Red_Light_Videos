import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
 
import './video.html';
import './videoPlayer';
 
Template.video.events({
  'click .delete'() {
		console.log("cliked!");
		Meteor.call('videos.remove', this._id);
  },
});

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Videos } from '../api/videos.js';

import './video.js';
import './body.html';
import './loginForm.js';
import './logoutButton.js';
 
Template.body.onCreated(function bodyOnCreated(){ 
	this.state = new ReactiveDict();
	Meteor.subscribe('videos');
});
 
Template.body.helpers({
  videos(){
	  const instance = Template.instance();
	  if(instance.state.get('hideTriggers')){
		  return Videos.find({tags: { $nin: ["boob", "ass"] }}, {sort: { createdAt: -1 } });
	  }
	  return Videos.find({}, { sort: { createdAt: -1 }});
  },
  
});

Template.body.events({
	'submit .new-video'(event){
		
		event.preventDefault();
		
		const target = event.target;
		const _title = target.title.value;
		const _url = target.url.value;
		var _tags = target.tags.value;
		const _thumbnail = target.thumbnail.value;
		
		_tags = _tags.split(",");
		
		Meteor.call('videos.insert', _title, _url, _tags, _thumbnail);
		
		Meteor.call('tags.insertAll', _tags);
		
		target.title.value = "";
		target.url.value = "";
		target.thumbnail.value = "";
		target.tags.value = "";
		
		
	},
	'change .hide-triggers input'(event, instance){
		instance.state.set('hideTriggers', event.target.checked);
	}
	
});
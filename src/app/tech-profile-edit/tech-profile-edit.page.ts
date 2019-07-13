import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { TechProfileAPIService } from '../_services/tech-profile-api.service';

import { TechProfileComponent } from '../tech-profile/tech-profile.component';

@Component({
  selector: 'app-tech-profile-edit',
  templateUrl: './tech-profile-edit.page.html',
  styleUrls: ['./tech-profile-edit.page.scss'],
})
export class TechProfileEditPage implements OnInit {

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
			private _techProfileService: TechProfileAPIService,
			private _alertService: AlertService,
			private tpc: TechProfileComponent) {

	}

	ngOnInit() {

	}

	getParams() {
		let self = this;
		return {
			getBackgroundColor: (id, idx) => {
				return "white";
			},
			onLxDescriptionClick: (id, idx) => {
				console.log("LxDescriptionClick!")
			}
		};
	}

	onNewTopicBtnClicked() {
		let self = this;
		self._alertService.show({
			header: 'New Topic!',
			message: "Enter the new topic name:",
			inputs: [{
			  name: 'topicName',
			  placeholder: '....',
			  type: 'text'
			}],			
			buttons: [{
				text: 'Cancel', 
				handler: (data) => {
					// do nothing.. ?
				}
			},{
				text: 'OK', 
				handler: (data) => {
					if (data.topicName && data.topicName.length >= 2) {
						self._techProfileService.addTopic(data.topicName).then((data) => {
							self.tpc.init(true);
						})
					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}
}
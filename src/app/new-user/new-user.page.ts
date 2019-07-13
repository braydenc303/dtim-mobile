import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

import { CountryPhone } from './country-phone.model';
import { PhoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  	name = undefined;
  	phone = undefined;
  	email = undefined;

  	validations_form: FormGroup;  	
  	country_phone_group: FormGroup;

  	countries: Array<CountryPhone>;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
    			private _userService: UserService,
    			private _alertService: AlertService,
    			private formBuilder: FormBuilder ) {

    }

	validation_messages = {
		'name': [
		  { type: 'required', message: 'Name is required.' }
		],
		'email': [
		  { type: 'required', message: 'Email is required.' },
		  { type: 'pattern', message: 'Please enter a valid email.' }
		],
		'phone': [
		  { type: 'required', message: 'Phone is required.' },
		  { type: 'validCountryPhone', message: 'The phone should be ten digits long.' }
		]
	};

  	ngOnInit() {
	    this.countries = [
	      new CountryPhone('US', 'United States')
	    ];

	    let country = new FormControl(this.countries[0], Validators.required);
	    let phone = new FormControl('', Validators.compose([
	      Validators.required,
	      PhoneValidator.validCountryPhone(country)
	    ]));
	    this.country_phone_group = new FormGroup({
	      country: country,
	      phone: phone
	    });

		this.validations_form = this.formBuilder.group({
		  name: new FormControl('', Validators.required),
		  email: new FormControl('', Validators.compose([
		    Validators.required,
		    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		  ])),
		  country_phone: this.country_phone_group
		});
	}

	onNameChange($event) {
		this.name = $event.currentTarget.value;
	}

	getName() {
		return this.name;
	}

	onPhoneChange($event) {
		this.phone = $event.currentTarget.value;
	}

	getPhone() {
		return this.phone;
	}

	onEmailChange($event) {
		this.email = $event.currentTarget.value;
	}

	getEmail() {
		return this.email;
	}

	isSaveBtnEnabled() {
		return this.name && this.name.length > 3
				&& ((this.phone && this.phone.length == 10) || (
					this.email && this.email.length >= 6));
	}

	onSaveBtnClicked() {
		console.log("Save Btn Clicked!");
    	
    	let self = this;

    	self._userService.createNewUser(this.name, this.phone, this.email).then((candidate) => {
			self._userService.markUserAsAttending(candidate["id"]).then(() => {
				self._alertService.show({
					header: 'You\'re in!',
					message: "Your profile has been created. Please hand the tablet to the next person. Thanks!",
					buttons: [
						{
							text: 'OK', role: 'cancel', handler: () => {
								self._router.navigate(['/home']);
							}
						}
					]
				})
			})
    	})
	}

	onCancelBtnClicked() {
		console.log("Cancel Btn Clicked!");
    	this._router.navigate(['/home']);
	}
}
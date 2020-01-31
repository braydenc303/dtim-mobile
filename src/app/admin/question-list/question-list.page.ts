import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../_services/question.service';
import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { QuestionEditService } from '../../_services/question-edit.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {

	lineItem = undefined
	lineItemId = undefined
	levelNumber = undefined
  	questions = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _techProfileModelService: TechProfileModelService,
			    private _questionEditService: QuestionEditService) {

  }

  ngOnInit() {
	let self = this;
	self._route.params.subscribe((params) => {
		self.lineItemId = params['lineItemId'] * 1;
		self.levelNumber = params['level'] * 1;

		if (!self.lineItemId || isNaN(self.levelNumber)) {
			self._questionService.getAll().then((allQuestions) => {
				self.questions = allQuestions;
			})
		} else {
			self._questionService.getByLineItemAndLevel(self.lineItemId, self.levelNumber).then((questions) => {
				self.questions = questions;
			})

			self._techProfileModelService._init();
			self.lineItem = self._techProfileModelService.getTechProfileLineItemById(self.lineItemId);
		}
	})
  }

  ionViewDidEnter() {
  	this.ngOnInit()
  }

	getAllQuestions() {
		return this.questions;
	}  

	onDisplayQuestionBtnClicked(q) {
		this._router.navigate(['/question-display/' + q.id]);
	}

	onNewQuestionBtnClicked() {
		let self = this;
			
		self._questionEditService.reset();

		if (self.lineItemId && !isNaN(self.levelNumber)) {
			self._questionEditService.setSetupFunc(() => { return [{lineItemId: self.lineItemId, levelNumber: self.levelNumber}] })
		}

		this._router.navigate(['/question-edit/new']);
	}

	onBackBtnClicked(q) {
		this._location.back();
	}

	getLineItemName() {
		return this.lineItem && this.lineItem['name']
	}

	getLevelDescriptionShort() {
		return this.lineItem && this.lineItem["l" + this.levelNumber + "Description"].substring(0, 25);
	}
}

import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  quizContent: any[] = this.quizService.quizContent;

  constructor(private quizService: QuizService) { }
}

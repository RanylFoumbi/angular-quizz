import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.getQuizContent()
      this.quizService.quizContent = this.quizService.quizContent.filter(
        (question) => question.category.id == params['categoryId']
      )
    });
    this.getUser()
  }

  getUser(): void {
    this.authService.getSavedUserInfo().subscribe((data) => {
      const user = (data as any[])[0]
      this.playerName = user.username
      this.quizService.playerName = user.username
    })
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}

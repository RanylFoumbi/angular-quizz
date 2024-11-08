import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Category } from "./category.service"

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizContent: any[] = [];
  playerAnswers: {questionId: number; answer: string}[] = [];
  score = 0;
  isQuizFinished = false;
  playerName: string = '';

  constructor(private http: HttpClient) { }

  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find((q) => q.id === this.playerAnswers[i].questionId);
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (currentAnswer.isCorrect && this.playerAnswers[i].answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  getQuizContent(categoryId: number) {
    this.http.get(`http://localhost:3000/questions?category=${categoryId}`).subscribe((questions: any) => {
      for (const question of questions) {
        this.http.get(`http://localhost:3000/answers?questionId=${question.id}`).subscribe((answers: any) => {
          this.http.get<Category[]>(`http://localhost:3000/categories?id=${question.category}`).subscribe((data) =>{
            this.quizContent.push({
              id: question.id,
              question: question.questionLabel,
              answers,
              category: data[0]
           });
          })
        });
      }
    });
  }

  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }
}

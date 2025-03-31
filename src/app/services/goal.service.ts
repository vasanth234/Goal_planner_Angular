import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http:HttpClient) { 

  }

  saveGoal(obj:any){
    return this.http.post("https://api.freeprojectapi.com/api/GoalTracker/createGoalWithMilestones",obj)

  }
}

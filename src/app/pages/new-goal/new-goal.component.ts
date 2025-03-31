import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-new-goal',
  imports: [ReactiveFormsModule],
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent {

  goalForm: FormGroup = new FormGroup({});
  newgoal=inject(GoalService);

  constructor() {
    this.InitializationForm();
    this.createNewMilestoneForm();
    const localdata=localStorage.getItem("getUser");
    if(localdata){
      const loggedData=JSON.parse(localdata);
      this.goalForm.get("userId")?.setValue(loggedData.userId)
    }
  }

  InitializationForm() {
    this.goalForm = new FormGroup({
      goalId: new FormControl(0),
      goalName: new FormControl(""),
      description: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      isAchieved: new FormControl(false),
      userId: new FormControl(""),
      milestones: new FormArray([])
    });
  }

  get milestoneList(): FormArray {
    return this.goalForm.get("milestones") as FormArray;
  }

  createNewMilestoneForm() {
    const newForm = new FormGroup({
      milestoneId: new FormControl(0),
      milestoneName: new FormControl(""),
      description: new FormControl(""),
      targetDate: new FormControl(""),
      isCompleted: new FormControl(false)
    });

    this.milestoneList.push(newForm);
  }



  setGoal(){
    const formValue=this.goalForm.value;
    this.newgoal.saveGoal(formValue).subscribe((res:any)=>{
      alert("Goal created")

    },error=>{
      alert(error.error)

    })
  }
}

/*import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-goal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent {
  
  goalForm: FormGroup = new FormGroup({});

  constructor() {
    this.InitializationForm(); // Initialize the main form first
  }

  InitializationForm() {
    this.goalForm = new FormGroup({
      goalId: new FormControl(0),
      goalName: new FormControl(""),
      description: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      isAchieved: new FormControl(false),
      userId: new FormControl(""),
      milestones: new FormArray([])
    });

    // Add the first milestone
    this.createNewMilestoneForm();
  }

  get milestoneList(): FormArray {
    return this.goalForm.get("milestones") as FormArray;
  }

  createNewMilestoneForm() {
    const newForm = new FormGroup({
      milestoneId: new FormControl(0),
      milestoneName: new FormControl(""),
      description: new FormControl(""),
      targetDate: new FormControl(""),
      isCompleted: new FormControl(false)
    });

    this.milestoneList.push(newForm);
  }

  removeMilestone(index: number) {
    this.milestoneList.removeAt(index);
  }
}*/




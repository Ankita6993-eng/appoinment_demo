import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css'],
})
export class AppoinmentComponent implements OnInit {
  public day = ['Monday', 'Tuesday', 'Wensday', 'Thursday', 'Friday'];
  appoinmentform: FormGroup | any;
  schedule: any;
  isdiasplay: boolean = true;
  start_hours: any = [];
  end_hours: any = [];
  hours: any = [];
  data: any = [];
  jsonarrayvalue: any;
  activeDaySelection: number | any;
  selectedDay: any;
  daySelected: any;
  clearForm: FormArray | any;
  lastindex: any;
  selctedindex: any;
  constructor(public fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.appoinmentform = this.fb.group({
       //day:this.day,
      schedule: new FormArray([]),
    });

    for (let hour = 9; hour < 22; hour++) {
      for (let mins = 0; mins < 60; mins++) {
        this.start_hours.push(moment({ hour, minutes: mins }).format('H:mm'));
      }
    }
    this.data[0] = {
      start: this.start_hours,
      end: null,
      start_selected: null,
      end_selected: null,
    };
  }
  createschedule() {
    return this.fb.group({
      name: [''],
      start_time: this.patchDynamicFormBlockValue(),
      end_time: [''],
    });
  }

  

  onselect(time:string,val: any, ind: any) {    
      console.log('indss', ind);
      console.log('valss', val);   
    if (time=='Start_Time') {
      console.log('start time value', val);
      //console.log('start time index', val);
      this.lastindex = parseInt(val) + 30;
      console.log('df', this.lastindex);
      this.end_hours = this.start_hours.slice(this.lastindex);
     }
     if(time=='End_Time'){
        console.log('end time index', ind);
       // console.log('end time value', val);
        this.lastindex = parseInt(val)-30;
      console.log('end time value', this.lastindex);
      this.start_hours = this.end_hours.slice(this.lastindex);
    }

    // if (time === "start_time"){
    //   console.log('t', time);
      
    //     console.log('val', val);
        
    //     let index = parseInt(val) + 30;
    //     console.log('index', index);
        
    //     this.end_hours = this.start_hours.slice(index);
    //     this.data[ind].end = this.end_hours;
    //     console.log('gg', this.data[ind].end);
        
    //     this.data[ind].start_selected = val;
    //     console.log('', this.data[ind].start_selected);
        
    // }
    //else if (time === "end_time"){
    //   console.log('t', time);
      
    //   console.log('val', val);
      
    //   let index = parseInt(val) - 30;
    //   console.log('index', index);
      
    //   this.start_hours = this.end_hours.slice(index);
    //   this.data[ind].start = this.start_hours;
    //   console.log('gg', this.data[ind].start);
      
    //   this.data[ind].end_selected = val;
    //   console.log('', this.data[ind].end_selected);
        
        // if (this.data[ind+1]) {
        //  this.data[ind+1] = this.start_hours;
        // }else{
        //   this.data[ind+1] = {start: this.start_hours}
        // }
        // this.data[ind].end_selected = val;
   // }
  }

  daysSelectListClick(index: number, value: string) {
    console.log('value', value);
    console.log('index', index);

    this.activeDaySelection = index;
    console.log(this.activeDaySelection);
    this.selectedDay = value;
    console.log(this.selectedDay);
    this.clearForm = this.appoinmentform.get('schedule') as FormArray;
    this.clearForm.clear();
    this.addschedule(index);
  }

  getControls() {
    return (<FormArray>this.appoinmentform.get('schedule')).controls;
  }

  addschedule(ind?: any) {
    this.schedule = this.appoinmentform.get('schedule') as FormArray;
    this.schedule.push(this.createschedule());
    //console.log('this.schedule', this.schedule);

    if (this.schedule.length > 0 && !this.appoinmentform.value) {
      console.log('wde', this.schedule.length);
      let end_value = this.appoinmentform.get('schedule')['controls'];
      console.log('dsw', end_value);
    }
  }

  onclick() {
    console.log('', this.appoinmentform.value);
    this.daySelected = this.selectedDay;
    this.jsonarrayvalue = JSON.parse(JSON.stringify(this.appoinmentform.value));
    console.log('jasonarrayvalue', this.jsonarrayvalue);
  }

  patchDynamicFormBlockValue() {
    for (let i = 0; i < this.schedule.length; i++) {
      console.log('value', this.schedule.at(i).value);
      var end_value = this.schedule.at(i).value;
      console.log('end_value', end_value);
      console.log('d', end_value.end_time);
      var end_value = end_value.end_time;
      var end_hours_index = this.start_hours.findIndex(
        (a: any) => a === end_value
      );
      console.log('last index', end_hours_index);
      this.start_hours = this.start_hours.slice(end_hours_index + 15);
     
      this.appoinmentform.patchValue({
        start_time: this.start_hours,
      });
      //this.appoinmentform.patchValue({schedule:{start_time:this.start_hours[i]}})
      //this.start_hours=this.start_hours[value]
      //((this.appoinmentform.get('schedule') as FormArray).at(i) as FormGroup).get('start_time').patchValue(value11);
      //this.appoinmentform.patchValue({start_time: this.start_hours});
    }
  }

  deleteScheduleGroup(index: number) {
    const add = this.appoinmentform.get('schedule') as FormArray;
    add.removeAt(index);
    //this.isdiasplay=false;
  }
}

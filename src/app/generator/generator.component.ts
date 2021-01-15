import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { CodeService } from '../$services/code/code.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  progressbarValue = 100;
  curSec: number = 0;
  code = ''
  buttonDisabled = false;
  char = '';
  arrayChar = [];
  alphabet_letters:string = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
  time = new Date();
  seconds = this.time.getSeconds()
  isRefreshing = true;
  subscription: Subscription;
  everytwoSeconds: Observable<number> = timer(0, 4000);
  constructor(private codeService: CodeService) { }

  ngOnInit(): void {
    setInterval(() => {
       this.time = new Date();
    }, 1000);
    this.startRefresh();
  } 

  startRefresh() {
    this.isRefreshing = true;
    this.subscription = this.everytwoSeconds.subscribe(() => {
      this.initiateTable();
    });
  }

  stopRefresh() {
    this.isRefreshing = false;
    this.subscription.unsubscribe();
  }

  initiateTable() {
    if (this.char === '') {
      for (let i = 0; i < 10; i++) { 
        this.arrayChar[i] = {};
        for (let col = 0; col < 11; col++){
          if(col === 0) {
            this.arrayChar[i][col] = i;
          } else {
            const char = this.alphabet_letters.charAt(Math.floor(Math.random() * this.alphabet_letters.length));
            this.arrayChar[i][col] = char
          }
        }  
      }
    } else {
      let count = 0;
      for (let i = 0; i < 10; i++) { 
        this.arrayChar[i] = {}
        for (let col = 0; col < 11; col++){
          if(col === 0) {
            this.arrayChar[i][col] = i;
          } else {
            if(count < 20) {
              this.arrayChar[i][col] = this.char.toUpperCase()
              count++
            } else{
              const char = this.alphabet_letters.charAt(Math.floor(Math.random() * this.alphabet_letters.length));
              this.arrayChar[i][col] = char;
            }
          }
        }  
      }
    }
    this.generateCode();
  }

  countOccurrences (item1, item2) {
    let occChar = 0;
      for (let i = 0; i < this.arrayChar.length; ++i){ 
        let objArray = Object.values(this.arrayChar[i]) 
        for (let col = 0; col < objArray.length; col++){
          if (this.arrayChar[i][col] === this.arrayChar[item1][item2]) {
            occChar++;
          }
        }
      }
    return occChar;
  }

  checkForLowestNumber (number) {
    let lowestNumber = 2;
    let value;
    if (number > 9){
      while ((number / lowestNumber) > 9){
        lowestNumber++
      }
      value = Math.ceil(number / lowestNumber)
        
    } else {
      value = number
    }
    return value
  }


  generateCode() {
    const position1Seconds = this.seconds.toString().charAt(0);
    const position2Seconds = this.seconds.toString().charAt(1);

    const char1Occurrences = this.countOccurrences(position1Seconds, position2Seconds)
    const char2Occurrences = this.countOccurrences(position2Seconds, position1Seconds)

    const valueCode1 = this.checkForLowestNumber(char1Occurrences);
    const valueCode2 = this.checkForLowestNumber(char2Occurrences);

    this.code = `${valueCode1}${valueCode2}`;
    this.codeService.addCode(this.code);
  }

  onGenerateClick () {
    this.initiateTable();
    this.buttonDisabled = true;
    this.char = '';
    setTimeout(() => { 
      this.buttonDisabled = false; 
    }, 4000);
  }

}

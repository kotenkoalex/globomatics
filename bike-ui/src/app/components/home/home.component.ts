import {Component, OnInit} from '@angular/core';
import {BikeService} from "../../services/bike.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Observable, throwError} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models: string[] = [
    'Globo MTB 29',
    'Globo Carbon 29',
    'Globo Trial 29',
  ];
  // @ts-ignore
  bikeform: FormGroup;
  validMessage: string = ""

  constructor(private bikeService: BikeService) {
  }

  ngOnInit(): void {
    this.bikeform = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        model: new FormControl('', Validators.required),
        serialNumber: new FormControl('', Validators.required),
        purchasePrice: new FormControl('', Validators.required),
        purchaseDate: new FormControl('', Validators.required),
        contact: new FormControl(),
      }
    )
  }

  submitRegistration() {
    if (this.bikeform.valid) {
      this.validMessage = "Your bike registration has been submitted. Thank you!";
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data => {
          this.bikeform.reset();
          return true;
        },
        error => {
          return throwError(error)
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting"
    }
  }

}

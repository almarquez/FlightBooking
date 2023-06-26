import {Component, OnInit} from '@angular/core';
import {PassengerService} from "../api/services/passenger.service";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {ConsoleLogger} from "@angular/compiler-cli";

@Component({
	selector: 'app-register-passenger',
	templateUrl: './register-passenger.component.html',
	styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

	form = this.fb.group({
		email: [''],
		firstName: [''],
		lastName: [''],
		isFemale: [true]
	})

	constructor(private passengerService: PassengerService,
							private fb: FormBuilder,
							private authService: AuthService,
							private router: Router) {
	}

	ngOnInit(): void {
	}

	checkPassenger(): void {
		const params = <any>{email: this.form.get('email')?.value}
		this.passengerService
			.findPassenger(params)
			.subscribe({
				next: () => this.login,
				error: (e)=> {if (e.status != 404) console.error(e)}
			})
	}

	register() {
		console.log("Form Values:", this.form.value)
		this.passengerService.registerPassenger({body: this.form.value})
			.subscribe({
				next: () => this.login(),
				error: (err) => console.error(err)
			})

	}

	private login = () => {
		this.authService.loginUser(<any>{email: this.form.get('email')?.value})
		this.router.navigate(['/search-flights'])
	}

}

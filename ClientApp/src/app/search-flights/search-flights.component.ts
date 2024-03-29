import {Component, OnInit} from '@angular/core';
import {FlightService} from "../api/services/flight.service";
import {FlightRm} from "../api/models/flight-rm";

@Component({
	selector: 'app-search-flights',
	templateUrl: './search-flights.component.html',
	styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

	searchResult: FlightRm[] = []

	// Services are injectable
	// Similar to dependency injection in asp.net core
	constructor(private flightService: FlightService) {
	}

	ngOnInit(): void {
	}

	search() {
		this.flightService.searchFlight({})
			.subscribe(response => this.searchResult = response,
				this.handleError)
	}

	private handleError(err: any) {
		console.log("Response Error. Status: ", err.status)
		console.log("Response Error. Status Text: ", err.statusText)
		console.log(err)
	}

}

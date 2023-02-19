using Microsoft.AspNetCore.Mvc;
using FlightBooking.Dtos;
using FlightBooking.Models;

namespace FlightBooking.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        static private IList<NewPassengerDto> Passengers = new List<NewPassengerDto>();

        /// <summary>
        /// Register a new passenger
        /// </summary>
        /// <remarks>Register's new passenger using NewPassengerDto</remarks>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Register(NewPassengerDto dto)
        {
            Passengers.Add(dto);
            System.Diagnostics.Debug.WriteLine(Passengers.Count);
            return CreatedAtAction(nameof(Find), new {email = dto.Email});
        }

        /// <summary>
        /// Find a passenger
        /// </summary>
        /// <remarks>Find's a passenger by the "{email}" parameter</remarks>
        /// <param name="email">The email of the passenger</param>
        [HttpGet("{email}")]
        public ActionResult<PassengerRm> Find(string email)
        {
            var passenger = Passengers.FirstOrDefault(p => p.Email == email);
            if (passenger is null)
                return NotFound();

            var rm = new PassengerRm(
                passenger.Email,
                passenger.FirstName,
                passenger.LastName,
                passenger.Gender
            );
            
            return Ok(rm);
        }
    }
}

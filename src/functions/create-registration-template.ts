export interface FormData {
  regnId: string;
  participant_name: string;
  designation: string;
  institution: string;
  department: string;
  country: string;
  state?: string;
  address?: string;
  pin_no?: string;
  passport_details?: string;
  email_id: string;
  phone_no: string;
  sex: string;
  iig_member: string;
  nature_of_participation: string;
  paper_title?: string;
  registration_fee: string;
  accommodation_option: string;
  days_booked?: string;
  occupancy_type?: string;
  arrival_details?: string;
  departure_details?: string;
  accomodation_fee: string;
  registration_proof?: boolean;
  accomodation_proof?: boolean;
}

function isSaarcMember(country: string): boolean {
  if (
    country === "India" ||
    country === "Nepal" ||
    country === "Bhutan" ||
    country === "Bangladesh"
  )
    return true;
  return false;
}

/**
 * Function to create an HTML template for the registration details.
 * The template is created using the data provided in the FormData object.
 * The template is returned as a string and can later be passed into `generatePdf` as argument
 *
 * @param data
 * @returns
 */
export default function createRegistrationTemplate(data: FormData): string {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Registration Details</title>
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          background-color: ${
            data.country === "India"
              ? "rgb(245, 255, 237)"
              : "rgb(255, 242, 237)"
          };
          color: rgb(62, 62, 62);
        }
        header {
          padding-bottom: 8px;
          border-bottom: 1px solid rgb(202, 202, 202);
        }
        header p {
          margin-bottom: 32px;
          font-style: italic;
          font-size: 14px;
          color: rgb(85, 85, 85);
        }
        header h1 {
          font-size: 20px;
          font-weight: 600;
        }
        section {
          padding: 16px 0;
        }
        section h2 {
          font-size: 16px;
        }
        section p {
          line-height: 1;
        }
        .container {
          padding: 24px;
        }
        .information {
          margin-top: 16px;
          padding: 4px 20px;
          background-color: antiquewhite;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <p>
            The 44th Annual Meet and International Conference On "Shaping
            Tomorrow: Society, Culture and the Environment in an Interconnected
            World"
          </p>
          <h1>Registration Details #${data.regnId}</h1>
        </header>
        <section class="personal-details">
          <h2>Personal Details</h2>
          <p>Name: ${data.participant_name}</p>
          <p>Designation: ${data.designation}</p>
          <p>Institution: ${data.institution}</p>
          <p>Department: ${data.department}</p>
          <p>Country: ${data.country}</p>
          ${
            data.country === "India"
              ? `<p>State: ${data.state}</p>
          <p>Address: ${data.address}</p>
          <p>Pin No: ${data.pin_no}</p>`
              : `<p>Passport Details: ${data.passport_details}`
          }
          <p>Email: ${data.email_id}</p>
          <p>Phone No.: ${data.phone_no}</p>
          <p>Sex: ${data.sex}</p>
        </section>
        <section class="participation-details">
          <h2>Peaticipation Details</h2>
          <p>IIG Member: ${data.iig_member}</p>
          <p>Nature of Participation: ${data.nature_of_participation}</p>
          <p>Title of the Paper: "${data.paper_title}"</p>
          <p><strong>Registration Fee (${
            isSaarcMember(data.country) ? "INR" : "USD"
          }): ${data.registration_fee} (${
    data.registration_proof ? "Paid" : "Unpaid"
  })</strong></p>
        </section>
        <section class="accomodation-details">
          <h2>Accomodation Details</h2>
          <p>Accomodation Option: ${data.accommodation_option}</p>
          ${
            data.accommodation_option === "Through Organizer"
              ? `
                <p>Occupancy Type: ${data.occupancy_type}</p>
                <p>Arrival On: ${data.arrival_details}</p>
                <p>Departure On: ${data.departure_details}</p>
            `
              : ""
          }
          <p><strong>Accomodation Fee (INR): ${data.accomodation_fee} (${
    data.accomodation_proof ? "Paid" : "Unpaid"
  })</strong></p>
        </section>
        <section class="terms">
          <h2>Terms & Conditions</h2>
          <p>1. Registration fee is non-refundable.</p>
          <p>2. No conference kit will be provided to accompanying person.</p>
          <p>
            3. Onsite registration is available for participants without paper
            only.
          </p>
        </section>
        <section class="information">
          <p>
            Kindly contact us through our email
            <a href="mailto:iigconference2024@cottonuniversity.ac.in"
              >iigconference2024@cottonuniversity.ac.in</a
            >
            for any further queries.
          </p>
        </section>
      </div>
    </body>
  </html>
    `;

  return template;
}

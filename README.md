#### ENYE Phase 1.1: Front-end

This project demonstrated my understanding of working with JSON data with various RESTful APIs. In this challenge, a sample API with a single endpoint was provided and I wrote some Javascript to request data from the API and transform the response.

### Records API

The provided API below returns a list of profiles with information surrounding e-commerce transaction details.

```bash
https://api.enye.tech/v1/challenge/records

```

API response schema

```json
{
    "records": {
        "profiles": [{
            "FirstName": "",
            "LastName": "",
            "Gender": "",
            "Latitude": "",
            "Longitude": "",
            "CreditCardNumber": "",
            "CreditCardType": "",
            "Email": "",
            "DomainName": "",
            "PhoneNumber": "",
            "MacAddress": "",
            "URL": "",
            "UserName": "",
            "LastLogin": "",
            "PaymentMethod": ""
        }, ...]
    },
    "status": "",
    "size": ""
}
```

### Required Technology

- [React JS](https://reactjs.org/tutorial/tutorial.html)

### Tasks Completed

1. Using the Profiles API, I created a UI that presents the information intuitively and beautifully
2. Only 20 profiles are listed on a page using Pagination
3. My application incorporates two (2) filters to dynamically present the information (filter by gender, payment method)
4. My application include a search bar to search for a specific account in the records
5. My application front-end was written using ReactJS
6. The application was deployed successfully to the web using Netlify - **https://enye-collins.netlify.app**


End-users were kept in mind by making the front-end design usable, accessible, intuitive, beautiful and yet simple.
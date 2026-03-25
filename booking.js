// Country → Location mapping
const locations = {
    "India": ["Kashmir", "Goa", "Jaipur", "Kerala", "Agra"],
    "Turkey": ["Istanbul", "Cappadocia", "Pamukkale", "Antalya", "Ephesus"],
    "France": ["Paris", "Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre"],
    "Indonesia": ["Bali", "Ubud", "Nusa Penida", "Mount Batur", "Tanah Lot"],
    "Dubai": ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Desert Safari", "Burj Al Arab"],
    "Switzerland": ["Geneva", "Zurich", "Lucerne", "Interlaken", "Zermatt"],
    "Andaman & Nicobar": ["Port Blair", "Radhanagar Beach", "Havelock Island", "Cellular Jail", "Neil Island"],
    "Italy": ["Rome", "Vatican City", "Florence", "Venice", "Milan"]
};

// Get dropdown elements
const countrySelect = document.getElementById("country");
const locationSelect = document.getElementById("location");

// Event listener for country change
countrySelect.addEventListener("change", function () {
    const selectedCountry = this.value;

    // Reset location dropdown
    locationSelect.innerHTML = '<option value="">-- Select Location --</option>';

    // Populate locations
    if (locations[selectedCountry]) {
        locations[selectedCountry].forEach(place => {
            const option = document.createElement("option");
            option.value = place;
            option.textContent = place;
            locationSelect.appendChild(option);
        });
    }
});


document.querySelector(".book").addEventListener("click", function (e) {
    e.preventDefault();

    // ✅ Get values properly
    const name = document.getElementById("c_name").value.trim();
    const email = document.getElementById("mail").value.trim();
    const phone = document.getElementById("num").value.trim();
    const country = document.getElementById("country").value;
    const location = document.getElementById("location").value;
    const adults = document.getElementById("members").value;
    const children = document.getElementById("children").value;
    const packageName = document.getElementById("package").value;
    const departureDate = document.getElementById("departureDate").value;
    const departureLocation = document.getElementById("departureLocation").value;
    const description = document.getElementById("description").value.trim();

    // Email & Phone regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Empty field validation
    if (
        !name || !email || !phone || !country || !location ||
        !adults || !packageName || !departureDate ||
        !departureLocation || !description
    ) {
        alert("❌ All fields are required");
        return;
    }

    //  Invalid email
    if (!emailRegex.test(email)) {
        alert("❌ Please enter a valid email address");
        return;
    }

    // ❌ Invalid phone
    if (!phoneRegex.test(phone)) {
        alert("❌ Please enter a valid 10-digit mobile number");
        return;
    }

    // ✅ Final booking object
    const bookingData = {
        name,
        email,
        phone,
        country,
        location,
        adults,
        children,
        packageName,
        departureDate,
        departureLocation,
        description
    };

    // ✅ Send to backend
    fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    })
        .then(response => {
            if (!response.ok) throw new Error("Booking failed");
            return response.json();
        })


        .then(data => {
            alert("🎉 Booking Successful!");

            // ✅ Check if the form exists before resetting
            const form = document.getElementById("bookingForm");
            if (form) {
                form.reset();
            } else {
                console.warn("Could not find element with id 'bookingForm' to reset.");
            }

            // ✅ Redirect to home
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        })
        .catch(error => {
            console.error(error);
            alert("❌ Error while booking");
        });
});

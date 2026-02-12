function updateLocationOptions() {
    const modality = document.getElementById('event_modality').value;
    const locationDiv = document.getElementById('location_container');
    const remoteDiv = document.getElementById('remote_url_container');
    const attendeesDiv = document.getElementById('attendees_container');
    const locationInput = document.getElementById('event_location');
    const remoteUrlInput = document.getElementById('event_remote_url');
    const attendeesInput = document.getElementById('event_attendees');

    if (modality === 'In-Person') {
        attendeesDiv.classList.remove('d-none');
        locationDiv.classList.remove('d-none');
        remoteDiv.classList.add('d-none');
        locationInput.setAttribute('required', '');
        remoteUrlInput.removeAttribute('required');
        attendeesInput.setAttribute('required', '');
    } else if (modality === 'Remote') {
        attendeesDiv.classList.remove('d-none');
        remoteDiv.classList.remove('d-none');
        locationDiv.classList.add('d-none');
        remoteUrlInput.setAttribute('required', '');
        locationInput.removeAttribute('required');
        attendeesInput.setAttribute('required', '');
    } else {
        attendeesDiv.classList.add('d-none');
        locationDiv.classList.add('d-none');
        remoteDiv.classList.add('d-none');
        locationInput.removeAttribute('required');
        remoteUrlInput.removeAttribute('required');
        attendeesInput.removeAttribute('required');
    }
}
document.getElementById('event_modality').addEventListener('change', updateLocationOptions);


//   const eventDetails = {
//         name: // name of the event from the form,
//         weekday: //weekday of the event from the form,
//         time: //time of the event from the form,
//         modality: //modality of the event from the form,
//         location: //if the modality is "In-person" then this has a value and remote_url is null,
//         remote_url: //if the modality is "Remote" then this has a value location is null,
//         attendees: //list of attendees from the form
//     };
events = []
modal = document.getElementById('eventModal');
function saveEvent(e) {
    e.preventDefault();
    eventDetails = {
        name: e.target.event_name.value,
        weekday: e.target.event_weekday.value,
        time: e.target.event_time.value,
        modality: e.target.event_modality.value,
        location: e.target.event_location.value,
        remote_url: e.target.event_remote_url.value,
        attendees: e.target.event_attendees.value,
        category: e.target.event_category.value
    }
    // console.log(eventDetails);
    events.push(eventDetails);
    addEventToCalendarUI(eventDetails);
    e.target.reset(); // Clear the form
}
document.getElementById('eventForm').addEventListener('submit', saveEvent);

function addEventToCalendarUI(eventInfo) {
    // console.log(eventInfo)
    let event_element = createEventCard(eventInfo);
    // console.log(eventInfo.weekday.toLowerCase())
    document.getElementById(eventInfo.weekday.toLowerCase()).appendChild(event_element);
}

function createEventCard(eventDetails) {
    let event_element = document.createElement('div');
    let categoryClass = '';
    switch (eventDetails.category) {
        case 'Work':
            categoryClass = 'category-work';
            break;
        case 'Personal':
            categoryClass = 'category-personal';
            break;
        case 'Social':
            categoryClass = 'category-social';
            break;
        case 'Other':
            categoryClass = 'category-other';
            break;
        default:
            categoryClass = 'category-other';
    }
    event_element.classList = `event row border rounded m-1 py-1 ${categoryClass}`;

    // Target the event modal to pop up and load our data and then delete the event and save the new event or the origonal event if they hit calcel
    // data-bs-toggle="modal" data-bs-target="#eventModal"
    event_element.setAttribute('data-bs-toggle', 'modal');
    event_element.setAttribute('data-bs-target', '#eventModal');
    event_element.setAttribute('data-bs-whatever', JSON.stringify(eventDetails));

    const locationLabel = eventDetails.modality === 'Remote' ? 'Remote URL' : 'Location';
    const locationValue = eventDetails.modality === 'Remote' ? eventDetails.remote_url : eventDetails.location;
    const locationDisplay = eventDetails.modality === 'Remote' ? `<a href="${locationValue}" target="_blank">${locationValue}</a>` : locationValue;

    event_element.innerHTML = `
    <div class="col-12">
        <div class="p-1">
            <div><span class="fw-bold">Event Name:</span></div>
            <div><span>${eventDetails.name}</span></div>
        </div>
        <div class="p-1">
            <div><span class="fw-bold">Event Time:</span></div>
            <div><span>${eventDetails.time}</span></div>
        </div>
        <div class="p-1">
            <div><span class="fw-bold">Event Modality:</span></div>
            <div><span>${eventDetails.modality}</span></div>
        </div>
        <div class="p-1">
            <div><span class="fw-bold">Event ${locationLabel}:</span></div>
            <div><span>${locationDisplay}</span></div>
        </div>
        <div class="p-1">
            <div><span class="fw-bold">Attendees:</span></div>
            <div><span>${eventDetails.attendees}</span></div>
        </div>
    </div>
    `;
    return event_element;
}

// document.getElementById('createRandomEvent').addEventListener('click', function () {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//     const categories = ['Work', 'Personal', 'Social', 'Other'];
//     const modalities = ['In-Person', 'Remote'];

//     const randomDay = days[Math.floor(Math.random() * days.length)];
//     const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//     const randomModality = modalities[Math.floor(Math.random() * modalities.length)];

//     // Generate random time
//     const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
//     const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');

//     const eventDetails = {
//         name: 'Random Event',
//         weekday: randomDay,
//         time: `${hours}:${minutes}`,
//         modality: randomModality,
//         location: randomModality === 'In-Person' ? 'Random Location' : '',
//         remote_url: randomModality === 'Remote' ? 'https://example.com' : '',
//         attendees: 'Self',
//         category: randomCategory
//     };

//     events.push(eventDetails);
//     addEventToCalendarUI(eventDetails);
// });

document.getElementById('eventModal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    if (button.getAttribute('data-bs-whatever') === 'new') {
        document.getElementById('event_name').value = '';
        document.getElementById('event_weekday').value = '';
        document.getElementById('event_time').value = '';
        document.getElementById('event_modality').value = '';
        document.getElementById('event_location').value = '';
        document.getElementById('event_remote_url').value = '';
        document.getElementById('event_attendees').value = '';
        document.getElementById('event_category').value = '';
    } else {
        const eventDetails = JSON.parse(button.getAttribute('data-bs-whatever'));
        let cancel_value_data = document.getElementById('cancel_value_data');
        cancel_value_data.setAttribute('restore_data', JSON.stringify(eventDetails));

        // Update the modal's content.
        document.getElementById('event_name').value = eventDetails.name;
        document.getElementById('event_weekday').value = eventDetails.weekday;
        document.getElementById('event_time').value = eventDetails.time;
        document.getElementById('event_modality').value = eventDetails.modality;
        document.getElementById('event_location').value = eventDetails.location;
        document.getElementById('event_remote_url').value = eventDetails.remote_url;
        document.getElementById('event_attendees').value = eventDetails.attendees;
        document.getElementById('event_category').value = eventDetails.category;
        document.getElementById('cancel_value_data').value = JSON.stringify(eventDetails);
        button.remove();
    }
    updateLocationOptions();
});

// <button type="button" class="btn-close"
function closeHandler() {
    // console.log('close button clicked');
    let cancel_value_data = document.getElementById('cancel_value_data').getAttribute('restore_data');

    if (cancel_value_data) {
        let eventDetails = JSON.parse(cancel_value_data);

        addEventToCalendarUI(eventDetails);

        // Clear the form
        document.getElementById('event_name').value = '';
        document.getElementById('event_weekday').value = '';
        document.getElementById('event_time').value = '';
        document.getElementById('event_modality').value = '';
        document.getElementById('event_location').value = '';
        document.getElementById('event_remote_url').value = '';
        document.getElementById('event_attendees').value = '';
        document.getElementById('event_category').value = '';

        // Clear the restore data
        document.getElementById('cancel_value_data').setAttribute('restore_data', '');

        // Set focus to the event name field
        document.getElementById('event_name').focus();
    }
}
document.getElementById('close_button_bottom').addEventListener('click', closeHandler);
document.getElementById('close_button_top').addEventListener('click', closeHandler);

// On page unload save the inner html of the calendar
window.addEventListener('beforeunload', function () {
    let calendar_html = document.getElementById('calendar').innerHTML;
    localStorage.setItem('calendar_html', calendar_html);
});

// On page load restore the inner html of the calendar
window.addEventListener('load', function () {
    let calendar_html = localStorage.getItem('calendar_html');
    if (calendar_html) {
        document.getElementById('calendar').innerHTML = calendar_html;
    }
});

console.log("script.js loaded");
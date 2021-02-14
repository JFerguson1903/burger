// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // UPDATE
    const changeDevouredBtns = document.querySelectorAll('.devour_it');

    // Set up the event listener for the create button
    if (changeDevouredBtns) {
        changeDevouredBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                // Grabs the id of the element that goes by the name, "id"
                const id = e.target.getAttribute('data-id');
                const devourIt = e.target.getAttribute('data-devourit');

                const newDevouredState = {
                    devoured: devourIt,
                };

                fetch(`/api/burgers/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    // make sure to serialize the JSON body
                    body: JSON.stringify(newDevouredState),
                }).then((response) => {
                    // Check that the response is all good
                    // Reload the page so the user can see the new quote
                    if (response.ok) {
                        console.log(`changed devoured to: ${devourIt}`);
                        location.reload('/');
                    } else {
                        alert('something went wrong!');
                    }
                });
            });
        });
    }

    // CREATE
    const createBurgerBtn = document.getElementById('create-form');

    if (createBurgerBtn) {
        createBurgerBtn.addEventListener('submit', (e) => {
            e.preventDefault();

            // Grabs the value of the textarea
            const newBurger = {
                burger_name: document.getElementById('BurgerName').value.trim(),
                devoured: false,
            };

            // Send POST request to create a new quote
            fetch('/api/burgers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                // make sure to serialize the JSON body
                body: JSON.stringify(newBurger),
            }).then(() => {
                // Empty the form
                document.getElementById('BurgerName').value = '';

                // Reload the page so the user can see the new quote
                console.log('Created a new burger!');
                location.reload();
            });
        });
    }

});
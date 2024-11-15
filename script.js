document.addEventListener("DOMContentLoaded", function() {
    // Initialisation d'EmailJS
    emailjs.init("eYrpSqmEKtsSAX0lt");

    let currentStep = 1;
    const totalSteps = 5;
    const answers = {}; // Stockage des réponses pour chaque étape

    // Fonction pour mettre à jour l'étape active
    function updateStep() {
        document.querySelectorAll('.question-container').forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById(`step${currentStep}`).classList.add('active');
        document.getElementById('currentStep').textContent = currentStep;
    }

    // Gestion de l'envoi de formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Récupération des données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                amount: document.getElementById('amount').value,
                answers: JSON.stringify(answers) // Convertit les réponses en chaîne JSON
            };

            // Envoi de l'e-mail avec EmailJS
            emailjs.send("service_oq4lgml", "template_sghgi3l", formData)
                .then(function() {
                    alert("Dziękujemy za złożenie wniosku! Konsultant skontaktuje się z Tobą wkrótce.");
                    contactForm.reset();
                    currentStep = 1; // Réinitialiser à la première étape après l'envoi
                    updateStep(); // Réinitialiser l'affichage des étapes
                }, function(error) {
                    alert("Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.");
                    console.error("Erreur d'envoi : ", error);
                });
        });
    } else {
        console.error("Formulaire non trouvé");
    }

    // Fonction pour sélectionner une option et passer à l'étape suivante
    window.selectOption = function(element, step) {
        // Retirer la classe sélectionnée des autres options
        document.querySelectorAll(`#step${step} .option`).forEach(opt => {
            opt.classList.remove('selected');
        });

        // Ajouter la classe sélectionnée à l'option cliquée
        element.classList.add('selected');

        // Stocker la réponse
        answers[`step${step}`] = element.textContent;

        // Passer à l'étape suivante avec un délai
        setTimeout(() => {
            if (step < totalSteps) {
                currentStep++;
                updateStep();
            }
        }, 500);
    };

    // Initialisation de la première étape
    updateStep();
});
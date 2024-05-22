import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.css']
})
export class SpeechRecognitionComponent {
getClassForAlert() {
throw new Error('Method not implemented.');
}
checkTextareaContent() {
throw new Error('Method not implemented.');
}
  recognition: any; // Variable pour stocker l'objet de reconnaissance vocale
  isListening: boolean = false; // Variable pour suivre l'état de la reconnaissance vocale
  message: string = ''; // Variable pour stocker le message d'état
  alertType: string = ''; // Variable pour stocker le type d'alerte (success, danger, etc.)
  isTextareaEmpty: boolean = true; // Variable pour suivre l'état du textarea (vide ou non)

  @ViewChild('textareaRef') textareaRef!: ElementRef; // Référence à l'élément textarea dans le template

  constructor() {
    // Initialisation de l'objet de reconnaissance vocale
    this.recognition = new ((window as any).webkitSpeechRecognition)();
    this.recognition.lang = 'fr-FR'; // Langue de la reconnaissance vocale (français)
    this.recognition.continuous = true; // Continuer à écouter tant que l'utilisateur parle

    // Événement déclenché lorsque la reconnaissance vocale détecte un résultat
    this.recognition.onresult = (event: { results: any[]; }) => {
      const last = event.results.length - 1;
      const currentTranscript = event.results[last][0].transcript;
      console.log(currentTranscript); // Afficher le texte transcrit dans la console
      this.updateTextarea(currentTranscript); // Mettre à jour le textarea avec le texte transcrit
      this.message = ''; // Réinitialiser le message d'alerte
    };

    // Événement déclenché lorsque la reconnaissance vocale est terminée
    this.recognition.onend = () => {
      if (this.isListening) {
        this.isListening = false; // Mettre à jour l'état de la reconnaissance vocale
        this.message = 'Aucun son détecté après le démarrage.'; // Afficher le message d'alerte
        this.alertType = 'danger'; // Définir le type d'alerte comme danger
      }
    };
  }

  // Méthode pour démarrer ou arrêter la reconnaissance vocale
  toggleRecognition(): void {
    if (!this.isListening) {
      this.message = 'La saisie a démarré.'; // Afficher le message "La saisie a démarré"
      this.alertType = 'success'; // Définir le type d'alerte comme succès
      this.recognition.start(); // Démarrer l'écoute
      this.isListening = true;
      setTimeout(() => {
        if (this.isListening && this.message === 'La saisie a démarré.') {
          this.message = 'Aucun son détecté après le démarrage.'; // Afficher le message "Aucun son détecté après le démarrage."
          this.alertType = 'danger'; // Définir le type d'alerte comme danger
          this.recognition.stop(); // Arrêter l'écoute
          this.isListening = false;
        }
      }, 5000); // Déclencher le message après 5 secondes
    } else {
      this.recognition.stop(); // Arrêter l'écoute
      this.isListening = false;
      this.message = ''; // Réinitialiser le message d'état
      this.alertType = ''; // Réinitialiser le type d'alerte
    }
  }

  // Méthode pour mettre à jour le textarea avec le texte transcrit
  updateTextarea(text: string): void {
    this.textareaRef.nativeElement.value += text + ' '; // Ajouter le texte transcrit au textarea
    this.isTextareaEmpty = this.textareaRef.nativeElement.value.trim() === ''; // Mettre à jour l'état du textarea
  }

  // Méthode pour imprimer le texte contenu dans le textarea
  printText(): void {
    const textToPrint = this.textareaRef.nativeElement.value;
    if (textToPrint.trim() !== '') {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write('<html><head><title>Texte à imprimer</title></head><body>');
      printWindow?.document.write('<pre>' + textToPrint + '</pre>'); // Utiliser <pre> pour conserver les espaces et les sauts de ligne
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.print();
    }
  }
}

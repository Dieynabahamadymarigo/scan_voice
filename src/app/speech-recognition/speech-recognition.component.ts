import { Component, ViewChild, ElementRef } from '@angular/core';
import { Document, Paragraph, Packer, TextRun, IRunOptions } from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.css']
})
export class SpeechRecognitionComponent {
  recognition: any; // Variable pour stocker l'objet de reconnaissance vocale
  isListening: boolean = false; // Variable pour suivre l'état de la reconnaissance vocale
  message: string = ''; // Variable pour stocker le message d'état
  alertType: string = ''; // Variable pour stocker le type d'alerte (success, danger, etc.)
  noSoundTimeout: any; // Timeout ID pour détecter l'absence de son
  documentTitle: string = ''; // Propriété pour stocker le titre du document
  
  @ViewChild('textareaRef') textareaRef!: ElementRef; // Référence à l'élément textarea dans le template

  constructor() {
    // Initialisation de l'objet de reconnaissance vocale
    this.recognition = new ((window as any).webkitSpeechRecognition)();
    this.recognition.lang = 'fr-FR'; // Langue de la reconnaissance vocale (français)
    this.recognition.continuous = true; // Continuer à écouter tant que l'utilisateur parle

    // Événement déclenché lorsque la reconnaissance vocale détecte un résultat
    this.recognition.onresult = (event: { results: any[]; }) => {
      clearTimeout(this.noSoundTimeout); // Réinitialiser le timeout
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
        this.showMessage('Aucun son détecté après le démarrage.', 'danger'); // Afficher le message d'alerte
      }
    };
  }

  // Méthode pour démarrer ou arrêter la reconnaissance vocale
  toggleRecognition(): void {
    if (!this.isListening) {
      this.showMessage('La saisie a démarré.', 'success'); // Afficher le message "La saisie a démarré"
      this.recognition.start(); // Démarrer l'écoute
      this.isListening = true;
      this.noSoundTimeout = setTimeout(() => {
        if (this.isListening) {
          this.showMessage('Aucun son détecté après le démarrage.', 'danger'); // Afficher le message "Aucun son détecté après le démarrage."
          this.recognition.stop(); // Arrêter l'écoute
          this.isListening = false;
        } 
      }, 5000); // Déclencher le message après 5 secondes
    } else {
      clearTimeout(this.noSoundTimeout); // Réinitialiser le timeout si l'écoute est arrêtée manuellement
      this.recognition.stop(); // Arrêter l'écoute
      this.isListening = false;
      this.message = ''; // Réinitialiser le message d'état
      this.alertType = ''; // Réinitialiser le type d'alerte
    }
  }

  // Méthode pour afficher un message d'alerte
  showMessage(message: string, type: string): void {
    this.message = message;
    this.alertType = type;
  }

  // Méthode pour mettre à jour le textarea avec le texte transcrit
  updateTextarea(text: string): void {
    this.textareaRef.nativeElement.value += text + ' '; // Ajouter le texte transcrit au textarea
  }

  // Méthode pour imprimer le texte contenu dans le textarea
  printText(): void {
    const textToPrint = this.textareaRef.nativeElement.value;
    if (textToPrint.trim() !== '') {
      // Créer une div temporaire pour contenir le texte à imprimer
      const printArea = document.createElement('div');
      printArea.style.position = 'fixed';
      printArea.style.top = '0';
      printArea.style.left = '0';
      printArea.style.width = '100%';
      printArea.style.height = '100%';
      printArea.style.background = 'white';
      printArea.style.zIndex = '10000';
      printArea.style.padding = '20px';
      printArea.innerHTML = `<pre>${textToPrint}</pre>`;
      document.body.appendChild(printArea);

      // Ajouter les styles nécessaires pour l'impression
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          div, pre {
            visibility: visible;
          }
          pre {
            white-space: pre-wrap; /* Conserve les sauts de ligne et les espaces */
          }
        }
      `;
      document.head.appendChild(style);

      // Lancer l'impression
      window.print();

      // Nettoyer après l'impression
      document.body.removeChild(printArea);
      document.head.removeChild(style);
    }
  }

  // Méthode pour sauvegarder en format Word
  saveAsWord(): void {
    const textToPrint = this.textareaRef.nativeElement.value;
    if (textToPrint.trim() !== '') {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: textToPrint.split('\n').map((line: string | IRunOptions) => new TextRun(line))
            })
          ]
        }]
      });

      Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'document.docx');
      });
    }
  }

  // Méthode pour sauvegarder en format PDF
  saveAsPDF(): void {
    const textToPrint = this.textareaRef.nativeElement.value;
    if (textToPrint.trim() !== '') {
      const pdf = new jsPDF();
      pdf.text(textToPrint, 10, 10);
      pdf.save('document.pdf');
    }
  }

  // Méthode pour sauvegarder en format PNG ou JPEG
  saveAsImage(format: 'png' | 'jpeg'): void {
    const textToPrint = this.textareaRef.nativeElement.value;
    if (textToPrint.trim() !== '') {
      const tempDiv = document.createElement('div');
      tempDiv.style.whiteSpace = 'pre-wrap';
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.innerText = textToPrint;
      document.body.appendChild(tempDiv);

      html2canvas(tempDiv).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, `document.${format}`);
          }
          document.body.removeChild(tempDiv);
        }, `image/${format}`);
      });
    }
  }
}

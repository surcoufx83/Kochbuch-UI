import { L10nLocaleInterface } from './l10n.interface';

export const L10nDe: L10nLocaleInterface = {
  common: {
    default: 'Standard',
    timeperiod: {
      long: {
        day: 'Tag',
        days: 'Tage',
        hour: 'Stunde',
        hours: 'Stunden',
        min: 'Minute',
        mins: 'Minuten',
      },
      short: {
        day: 'Tag',
        days: 'Tage',
        hour: 'St.',
        hours: 'St.',
        min: 'Min.',
        mins: 'Min.',
      },
    },
  },
  footer: {
    changeLanguage: 'Anzeigesprache ändern',
    copyright: 'Kochbuch © 2020 - [0]',
    description: 'Dies ist ein privates Kochbuch. Für die Inhalte sind die jeweiligen Rezeptersteller verantwortlich.',
    thanks: 'Danke an',
    thanksto: 'Die Betatester Tobias und Valerie',
  },
  locales: {
    de: 'De - Deutsch',
    en: 'En - Englisch',
  },
  navbar: {
    adminLink: 'Administration',
    loginLink: 'Anmelden',
    logoutLink: 'Abmelden',
    profileLink: 'Profil anzeigen',
    searchInputPlaceholder: '🔍 Suche nach Rezepten oder Zutaten',
    settingsLink: 'Einstellungen',
    title: 'Kochbuch',
  },
  sidebar: {
    aiEditor: 'Fotoscanner',
    hideSidebar: 'Ausblenden',
    home: 'Startseite',
    myRecipes: 'Mein Kochbuch',
    newRecipe: 'Neues Rezept',
    randomRecipe: 'Zufallsrezept',
    search: 'Suche',
  },
  views: {
    editor: {
      aiEditor: {
        title: 'Foto Rezepte-Erfassung',
        description: 'Du hast ein Foto von einem leckeren Gericht oder einer Seite aus einem Kochbuch? Du kannst dein Bild hochladen und die KI (Chat GPT) analysiert es und erstellt das Rezept. Wenn alles geklappt hat, wirst du auf die Seite des Rezepts geschickt und kannst dort ggf. nötige Korrekturen vornehmen.',
        dataProtectionWarning: 'Wichtiger Hinweis: Chat GPT ist eine Software die Daten in den USA verarbeitet. Lade kein Bild hoch, dass Personen zeigt, persönliche Daten von Personen enthält, oder andere in Deutschland oder den USA gesetzlich verbotene Inhalte enthält.',
        stillBusyMessage: 'Ungeduldig? Nachvollziehbar! Das auswerten des Bildes kann auch mal zwei Minuten dauern. Du wartest bereits [0]',
        takePictureButton: 'Kamera',
        uploadPictureButton: 'Bild hochladen',
        uploadBusyButton: 'Bitte warten...',
        errorResponse: 'Das Bild wurde nicht verarbeitet. Die KI hat folgenden Fehler gemeldet: "[0]"',
      },
      common: {
        editNote1: 'Alle mit * markierten Felder müssen befüllt werden. Andere Angaben sind optional, können aber den Nutzern des Kochbuchs bei der Vorbereitung oder beim Kochen helfen.',
        editNote2: 'Alle Änderungen werden temporär in deinem Browser gespeichert. Wenn du die Seite verlässt und später wiederkommst, kannst du die Bearbeitung an der Stelle fortsetzen, wo du aufgehört hast. Erst mit einem Klick auf den Button Rezept speichern, werden die Informationen auch tatsächlich ans Kochbuch übertragen.',
        unsavedChanges: 'Das Rezept enthält nicht gespeicherte Änderungen!',
      },
      create: {
        description: 'Bitte hab einen Augenblick Geduld. Im Hintergrund wird eine neue Seite für das Kochbuch vorbereitet. Du wirst gleich weitergeleitet.',
        title: 'Ein neues Rezept wird vorbereitet...',
      },
      edit: {
        title: 'Rezept [0] überarbeiten',
        description1: 'Du kannst dein Rezept mit dem Formular beliebig überarbeiten.',
        description2: '',
        saveChangesBtn: 'Änderungen speichern',
        revertChangesBtn: 'Alle Änderungen zurücksetzen',
      },
      fields: {
        name: {
          title: 'Name für dieses Gericht',
          placeholder: 'z.B. Vogtländischer Sauerbraten mit Rotkohl und Klößen',
        },
        description: {
          title: 'Zusatzinformationen und Detailbeschreibung',
          placeholder: 'z.B. Weitergehende Informationen, Detailbeschreibung, Originalname; Optional',
        },
        eaterCount: {
          title: 'Für wie viele Personen?',
          placeholder: 'z.B. 4',
        },
        ingredientQuantity: {
          title: 'Menge',
          description: 'z.B. 4',
          placeholder: 'Menge',
        },
        ingredientUnit: {
          title: 'Einheit',
          description: 'z.B. EL',
          placeholder: 'Einheit',
        },
        ingredientDescription: {
          title: 'Zutat',
          description: 'z.B. Olivenöl',
          placeholder: 'Zutat',
        },
        stepPreparation: {
          title: 'Anweisungen',
          placeholder: 'Bitte beschreibe hier detailliert die Zubereitung in diesem Arbeitsschritt.',
        },
        stepTitle: {
          title: 'Überschrift für diesen Abschnitt',
          placeholder: 'Trage hier eine kurze Überschrift ein.',
        },
        stepTimeConsumption: {
          title: 'Zeitaufwand (in Minuten)',
          placeholder: '',
        },
        stepTimeConsumptionPreparing: {
          title: 'Vorbereiten',
          placeholder: 'z.B. 15',
        },
        stepTimeConsumptionCooking: {
          title: 'Kochen/Backen',
          placeholder: 'z.B. 45',
        },
        stepTimeConsumptionResting: {
          title: 'Ruhezeit',
          placeholder: 'z.B. 240',
        },
      },
      groups: {
        discardBtntext: 'Änderungen verwerfen',
        discardModalBackBtn: 'Zurück',
        discardModalDescription: 'Von dir vorgenommene Änderungen werden verworfen und das Rezept zurückgesetzt auf den Stand vor der Bearbeitung. Bitte bestätige es hier nochmal kurz um versehentlichen Datenverlust auszuschließen.',
        discardModalSubmitBtn: 'Ja, Änderungen verwerfen',
        discardModalTitle: 'Verwerfen bestätigen',
        headData: 'Allgemeine Angaben',
        ingredientAddBtnText: 'Weitere Zutat',
        ingredientDropzone: 'Hier ablegen',
        ingredients: 'Zutatenliste',
        ingredientsDescription: 'Gib alle Zutaten an, welche für das Rezept benötigt werden. Die Mengenangabe kannst du auch weglassen (z.B. für etwas Salz zum Würzen).',
        ingredientsGroupSwitch: 'Zutaten sortieren',
        ingredientsPerStep: 'Zutaten pro Schritt verwalten',
        ingredientsPerStepDescription: 'Die Zutaten für dieses Rezept werden für jeden Schritt individuell gepflegt, daher ist die Zutatenliste an dieser Stelle ausgeblendet.',
        stepAddBtnText: 'Weiterer Schritt',
        steps: 'Schritt-für-Schritt Anleitung',
        stepsDescription: 'Nutze diesen Abschnitt um die Schritte der Zubereitung zu beschreiben. Du kannst alles in einen Block packen oder mehrere Schritte über das Plus-Zeichen anlegen. Optional kannst du für jeden Schritt auch noch angeben, wie lange Vorbereitung, Ruhezeit, und das Kochen dauern.',
        stepDeleteBtn: 'Schritt löschen',
        stepRequiredIngredients: 'Erforderliche Zutaten',
        stepRequiredIngredientsNone: 'Keine',
        submissionDescription: 'Sind alle Pflichtfelder befüllt, kannst du das Rezept speichern.',
        submissionTitle: 'Abschluss',
        submitBtnText: 'Rezept speichern',
      },
      new: {
        title: 'Neues Rezept erfassen',
        aiBotButton: 'Los geht\'s',
        aiBotDescription: 'Du möchtest ein Rezept aus einem Kochbuch eintragen? Mache ein Foto und lade es hier hoch. Die Künstliche Intelligenz wird sehr viel Strom verbrauchen, um möglichst viele Rezeptinformationen automatisch zu ermitteln. Probiere es aus...',
        description1: 'Vielen Dank, dass du ein neues Rezept zu unserer Sammlung beitragen möchtest!',
        description2: 'Bitte fülle das folgende Formular Schritt für Schritt aus. Sobald ein Name, ein paar Zutaten und die Zubereitung befüllt sind, kannst du das Rezept speichern. Das Rezept kann jederzeit nachträglich geändert, veröffentlich und zurückgezogen, oder auch gelöscht werden.',
        saveChangesBtn: 'Rezept speichern',
        revertChangesBtn: 'Alle Eingaben löschen',
      },
      validation: {
        errorSaving: 'Die Änderungen konnten nicht gespeichert werden. Folgender Fehler wurde zurückgemeldet:',
        errorSavingNonSolvable: 'Die Änderungen konnten nicht gespeichert werden. Der Fehler wurde geloggt und kann möglicherweise durch Stefan korrigiert werden.',
        errorSavingNonSolvable2: 'Die Änderungen konnten nicht gespeichert werden. Der Fehler wurde geloggt und kann möglicherweise durch Stefan korrigiert werden. Folgender Fehler wurde zurückgemeldet:',
        gotoRecipeLink: 'Zum Rezept',
        mustNotBeEmptyMessage: 'Dieses Feld muss befüllt werden.',
        savingSuccess: 'Die Änderungen wurden erfolgreich gespeichert.',
      },
      apiResponse: {
        'code-0': '',
        'code-1': 'Es gab ein Problem beim Initialisieren der Datenbanktransaktion.',
        'code-2': 'Es gab ein Problem beim Abschließen der Datenbanktransaktion.',
        'code-3': 'Es gab einen Fehler beim Ändern des Rezepts in der Datenbank.',
        'code-4': 'Die Daten die der Browser gesendet hat sind unvollständig.',
        'code-10': 'Der Rezeptname ist zu kurz.',
        'code-11': 'Der Rezeptname ist zu lang.',
        'code-12': 'Der Beschreibungstext ist zu lang.',
        'code-13': 'Die Anzahl der Portionen ist kleiner als 1.',
        'code-14': 'Die Anzahl der Portionen ist zu groß. Aktuell sind höchstens 255 erlaubt.',
        'code-15': 'Der Text der Quellenangabe ist zu lang.',
        'code-16': 'Der Link der Quellenangabe ist zu lang.',
        'code-20': 'Die Zutatenliste ist leer.',
        'code-21': 'Die Zutatenliste enthält nur Einträge ohne Bezeichnung.',
        'code-30': '',
      }
    },
    home: {
      titleGuest: 'Hallo Besucher',
      titleUser: 'Hallo [0]',
      descriptionGuest: 'Schön das du in das Kochbuch schaust. Bitte melde dich über das Menü in der oberen Leiste an, um Zugriff auf alle Rezepte zu erhalten.',
      descriptionUser: 'Hier findest du die neuesten Rezepte im Kochbuch. Oben in der Menüleiste findest du ein Suchfeld womit du gezielt in den Rezepten suchen kannst.',
      descriptionMobile: 'Über das Menü-Symbol hast du die Möglichkeit, eigene Rezepte zu einzutragen.',
      recipes: {
        recentTitle: 'Unsere neuesten Rezepte',
        bestTitle: 'Unsere beliebtesten Rezepte',
        mostViewsSubtitle: 'Häufig angesehen',
        topVotedSubtitle: 'Top bewertet',
      }
    },
    login: {
      afterAuthButtonText: 'Anmeldung wird abgeschlossen...',
      afterAuthDescription: 'Bitte hab noch kurz Geduld. Die Anmeldung an der Cloud wird gerade verarbeitet und dein Benutzerkonto geladen. Das dauert etwas.',
      description: 'Die Anmeldung hier am Kochbuch erfolgt über unsere Nextcloud. Sofern du bereits ein Konto besitzt, klicke auf den folgenden Button um dich anzumelden. Besitzt du kein Nextcloud-Konto, wende Dich an deine Kochbuch-Admins.',
      failedMessage: 'Die Anmeldung konnte nicht abgeschlossen werden. Es ist ein Fehler in der Kommunikation zwischen Kochbuch und Nextcloud aufgetreten. Bitte versuche die Anmeldung später nochmal.',
      nextcloudButtonText: 'Mit Nextcloud-Konto anmelden',
      title: 'Benutzeranmeldung',
    },
    logout: {
      title: 'Abmeldung',
      description1: 'Einen Moment Geduld...',
      description2: 'Du wirst gerade vom Kochbuch abgemeldet. Alle Daten im Browser werden entfernt sodass keine Spuren zurückbleiben. Nach dem Abmelden kannst du das Kochbuch als Gast weiter benutzen.',
    },
    myrecipes: {
      createRecipeLink: 'Rezept erstellen',
      noSavedRecipesDescription: 'Noch keine Rezepte.',
      noSavedRecipesText: 'Du hast keine Rezepte in deinem Kochbuch.',
      savedRecipeDescription: 'Ein Rezept gespeichert.',
      savedRecipesDescription: '[0] Rezepte gespeichert.',
      title: 'Mein Kochbuch',
    },
    recipe: {
      author: {
        title: 'Mehr von [0]',
        descriptionSn: '[0] hat noch ein weiteres Rezept veröffentlicht.',
        descriptionPl: '[0] hat noch [1] weitere Rezepte veröffentlicht.',
        btnText: 'Alle Rezepte von [0]'
      },
      card: {
        cardsRecipeLink: 'Zum Rezept',
        cardsRecipeLinkTitle: 'Hier klicken um zum Rezept [0] von [1] zu gehen',
        cardsUserLinkTitle: 'Alle Rezepte von [0]',
      },
      categories: {
        dessert: {
          name: 'Desserts',
          items: {
            biscuit: 'Kekse',
            cake: 'Kuchen',
            icecream: 'Eiscreme',
            pie: 'Torte',
            pudding: 'Pudding',
          }
        },
        diet: {
          name: 'Ernährungsweise',
          items: {
            glutenfree: 'Glutenfrei',
            vegan: 'Vegan',
            vegetarian: 'Vegetarisch',
          }
        },
        flavor: {
          name: 'Geschmacksrichtung',
          items: {
            fruity: 'Fruchtig',
            spicy: 'Würzig',
          }
        },
        keyIngredient: {
          name: 'Hauptzutat',
          items: {
            beef: 'Rind',
            chicken: 'Hähnchen',
            pasta: 'Pasta',
            pork: 'Schwein',
            rice: 'Reis',
            vegetables: 'Gemüse',
          }
        },
        meal: {
          name: 'Mahlzeit',
          items: {
            breakfast: 'Frühstück',
            brunch: 'Brunch',
            coffeeAndCake: 'Kaffee und Kuchen',
            dinner: 'Abendessen',
            lunch: 'Mittagessen',
            sideDish: 'Beilage',
            snack: 'Snack',
            teaTime: 'Teestunde',
          }
        },
        preparation: {
          name: 'Zubereitungsart',
          items: {
            bake: 'Gebacken',
            boil: 'Gekocht',
            deepfry: 'Frittiert',
            grill: 'Gegrillt',
            roast: 'Gebraten',
            steam: 'Gedünstet',
          }
        },
        reason: {
          name: 'Anlass',
          items: {
            barbecue: 'Grillparty',
            birthday: 'Geburtstag',
            christmas: 'Weihnachten',
            halloween: 'Halloween',
            party: 'Party',
            picnic: 'Picknick',
          }
        },
        regional: {
          name: 'Stil',
          items: {
            asian: 'Asiatisch',
            french: 'Französisch',
            indian: 'Indisch',
            italian: 'Italienisch',
            mexican: 'Mexikanisch',
            oriental: 'Orientalisch',
            spanish: 'Spanisch',
            swabian: 'Schwäbisch',
          }
        },
        seasonal: {
          name: 'Saison',
          items: {
            asgaragusSeason: 'Spargelzeit',
            autumn: 'Herbst',
            spring: 'Frühling',
            summer: 'Sommer',
            winter: 'Winter',
          }
        },
      },
      ingredients: {
        title: 'Zutatenliste',
        description: {
          groupIngredientsSwitch: 'Zutaten pro Schritt anzeigen',
          recipeIsCreatedFor: 'Das Rezept ist ausgelegt für',
          portion: 'Portion',
          portions: 'Portionen',
        },
        quantityHeader: 'Mengenangabe',
        ingredientHeader: 'Zutatenbeschreibung',
      },
      intro: {
        title: 'Über dieses Rezept',
        textIntro1CreatedSelfAndPublished: 'Dieses Rezept wurde von dir am [1] erstellt und am [2] veröffentlicht.',
        textIntro2CreatedSelfAndHidden: 'Dieses Rezept wurde von dir am [1] erstellt, ist aber nicht öffentlich sichtbar.',
        textIntro3HiddenShared: 'Es wurde bisher [0] mal über einen speziellen Link freigegeben (siehe Abschnitt Teilen).',
        textIntro1CreatedOtherPart1Published: 'Dieses Rezept wurde von',
        textIntro1CreatedOtherPart2Published: 'am [0] veröffentlicht.',
        textIntro1CreatedOtherPart1Hidden: 'Dieses Rezept wurde von',
        textIntro1CreatedOtherPart2Hidden: 'am [0] erstellt, ist aber nicht öffentlich sichtbar.',
        textIntro4NotCookedNotVoted: 'Es wurde bisher noch nicht nachgekocht und auch nicht bewertet.',
        textIntro4CookedNotVoted: 'Es wurde bisher [0] mal nachgekocht aber noch nicht bewertet.',
        textIntro4NotCookedVoted: 'Es wurde im Schnitt mit [0] Herzen bewertet.',
        textIntro4CookedVoted: 'Es wurde bisher [0] mal nachgekocht und im Schnitt mit [1] Herzen bewertet.',
        textIntroAiGeneratedContent: 'Die Inhalte wurden mit KI-Unterstützung erstellt.',
        textIntroSource: 'Herkunft',
      },
      manage: {
        title: 'Rezept verwalten',
        created: 'Erstellt',
        editBtn: 'Bearbeiten',
        editHint: 'Du kannst ein von dir erstelltes Rezept jederzeit bearbeiten.',
        publicVisbility: {
          title: 'Sichtbarkeit',
          btnPrivate: 'Nur für Dich',
          btnUserOnly: 'Angemeldete',
          btnPublic: 'Alle',
          hintPrivate: 'das Rezept kannst nur du sehen und niemand anders hat darauf Zugriff.',
          hintUserOnly: 'andere Benutzer mit einem Nextcloud-Konto können sich das Rezept anschauen.',
          hintPublic: 'jeder der die Adresse des Rezepts kennt, hat darauf Zugriff. Egal ob du ihn kennst oder nicht.',
          shareBtn: 'Teilen',
          shareSubjectTitle: '[0] auf kochbuch.mogul.network',
          shareSubjectText: '[0] von [1] findest du in unserem digitalen Kochbuch. Happy Nachkochen!',
          shareWithUsersBtn: 'Veröffentlichen',
        },
        deletion: 'Gefährlicher Bereich',
        deleteBtn: 'Rezept löschen',
        deleteHint: 'Du möchtest das Rezept loswerden? Mit dem Löschbutton kannst du das Rezept löschen. Diese Aktion kann nicht rückgängig gemacht werden. Alle Informationen, Bilder, Kommentare werden auch entfernt.',
        deleteModalTitle: 'Löschen bestätigen',
        deleteModalDescription: 'Du möchtest das Rezept \'[0]\' löschen? Kein Problem: bitte bestätige es hier nochmal kurz um ein versehentlichen Löschen auszuschließen, ansonsten kannst du jederzeit zurück zum Rezept.',
        deleteModalError: 'Beim Speichern der Änderungen ist ein Fehler aufgetreten. Du kannst es nochmal versuchen, aber wahrscheinlich hilft das nicht. Bitte informiere Stefan über diesen Fehler.',
        deleteModalBackBtn: 'Zurück',
        deleteModalSubmitBtn: 'Ja, Rezept löschen',
      },
      pageloading: 'Details zum Rezept werden geladen...',
      pictures: {
        delete: {
          deleteLinkTitle: 'Bild löschen',
          modalBackBtn: 'Zurück',
          modalDescription: 'Bitte bestätige, dass das Bild unwiederruflich gelöscht werden kann.',
          modalSubmitBtn: 'Ja, Bild löschen',
          modalTitle: 'Löschen bestätigen',
          submitError: 'Beim Speichern der Änderungen ist ein Fehler aufgetreten. Du kannst es nochmal versuchen, aber wahrscheinlich hilft das nicht. Bitte informiere Stefan über diesen Fehler.',
        },
        nextPictureTitle: 'Nächstes Bild',
        picturePositionIndicator: '[0]/[1] von [2]',
        picturePositionIndicatorNoUser: '[0]/[1]',
        previousPictureTitle: 'Vorheriges Bild',
        showAllButton: 'Alle Bilder',
        title: 'Bildergalerie',
      },
      pictureUpload: {
        apiResponse: {
          'code-0': '',
          'code-1': 'Fehler bei der Kommunikation mit dem Server (Rezept nicht korrekt übermittelt). Bitte lade die Seite erneut und versuche es dann noch einmal.',
          'code-2': 'Fehler bei der Kommunikation mit dem Server (Keine Bilder übermittelt). Bitte lade die Seite erneut und versuche es dann noch einmal.',
          'code-3': 'Das Bild wurde wegen eines falschen Dateityps zurückgewiesen. Bitte versuche es noch einmal mit einem anderen Bild.',
          'code-4': 'Eines der Bilder wurde wegen eines falschen Dateityps zurückgewiesen. Bitte versuche es noch einmal mit einem anderen Bild.',
          'code-5': 'Es gab ein Problem beim Initialisieren der Datenbanktransaktion. Bitte versuche es später nochmal.',
          'code-6': 'Es gab ein Problem beim Abschließen der Datenbanktransaktion. Bitte versuche es später nochmal.',
          'code-7': 'Das Bild konnte auf dem Server nicht gespeichert werden. Bitte versuche es später nochmal.',
          'code-8': 'Das Bild konnte nicht in der Datenbank gespeichert werden. Bitte versuche es später nochmal.',
          'code-9': 'Das Bild wurde nicht an Chat GPT übermittelt (API Key fehlt). Die Funktion steht aktuell nicht zur Verfügung.',
          'code-10': 'Das Bild ist zu groß, bitte wähle ein anderes Bild.',
          'code-11': 'Das [0]. Bild ist zu groß. Keines deiner gewählten Bilder wurde hochgeladen. Bitte wähle andere Bilder aus.',
          'code-12': 'Ungültiger Dateityp, bitte wähle ein Bild.',
          'code-13': 'Ungültiger Dateityp der [0]. Datei. Keine deiner gewählten Dateien wurde hochgeladen. Bitte wähle nur Bilder aus.',
          'code-91': 'Fehler beim Hochladen des Bildes zum Server (Datei zu groß). Bitte versuche es nocheinmal mit einem anderen Bild.',
          'code-92': 'Fehler beim Hochladen des Bildes zum Server (HTML form limit erreicht). Bitte versuche es nocheinmal mit einem anderen Bild.',
          'code-93': 'Fehler beim Hochladen des Bildes zum Server (nur teilweise hochgeladen, dann abgebrochen). Bitte versuche es nocheinmal mit einem anderen Bild.',
          'code-94': 'Fehler beim Hochladen des Bildes zum Server (keine Datei gesendet). Bitte versuche es nocheinmal mit einem anderen Bild.',
          'code-96': 'Fehler beim Hochladen des Bildes zum Server (Tempverzeichnis fehlt). Bitte versuche es später nocheinmal.',
          'code-97': 'Fehler beim Hochladen des Bildes zum Server (Konnte nicht auf Festplatte gespeichert werden). Bitte versuche es später nocheinmal.',
          'code-98': 'Fehler beim Hochladen des Bildes zum Server (Extension hat Upload geblockt). Bitte versuche es später nocheinmal.',
        },
        descriptionGuest: 'Du kochst das Rezept nach? Mach doch danach ein Foto und lade es hier hoch. Wir freuen uns über jedes Bild, dass noch mehr Appetit macht.',
        descriptionOwner: 'Du kannst jederzeit weitere Bilder hochladen. Nutze den Button rechts dafür.',
        galleryBtnText: 'Zur Galerie',
        title: 'Eigenes Bild hochladen',
        uploadBtnText: 'Bild hochladen',
        uploadSuccessfullPl: 'Die Bilder wurden erfolgreich hochgeladen.',
        uploadSuccessfullSn: 'Das Bild wurde erfolgreich hochgeladen.',
        uploadFailedToastTitle: 'Hinweis',
        uploadSuccessToastTitle: 'Hinweis',
      },
      shortcuts: {
        gotoPicturesBtn: 'Bilder',
        gotoIngredientsBtn: 'Zutaten',
        gotoStepsBtn: 'Zubereitung',
      },
      steps: {
        title: 'Zubereitung',
        stepPlaceholder: '[0]. Schritt',
        stepTitle: '[0]. [1]',
      },
      timeconsumption: {
        title: 'Zubereitungsdauer',
        preparation: {
          short: 'Vorbereiten',
          long: 'Vorbereitungszeit'
        },
        rest: {
          short: 'Ruhen',
          long: 'Ruhezeit'
        },
        cooking: {
          short: 'Kochen',
          long: 'Koch-/Backzeit'
        },
        totalTimeConsumed: 'Gesamtzeit',
        timeNotSpecified: 'Keine Angabe',
      },
      voting: {
        title: 'Rezept bewerten',
        voteToday: 'Du kochst das Rezept heute nach? Vergiss nicht, danach eine Bewertung vorzunehmen. Wir freuen uns auf Deine Meinung!',
        votedAlready: 'Du hast dieses Rezept bereits bewertet. Du kannst über den Button deine Bewertung nochmal einsehen, ändern und sogar löschen.',
        btnText: 'Bewertung abgeben',
        btnTextRenew: 'Bewertung ändern',
        modal: {
          title: 'Rezeptbewertung',
          titleAlreadyVoted: 'Rezeptbewertung ändern',
          titleDescription: 'Mit der Beantwortung der folgenden kurzen Fragen gibst du eine direkte Rückmeldung an den Autoren des Rezepts. Du kannst jederzeit abbrechen. Erst durch einen Klick auf Bewertung speichern wird deine Bewertung übernommen.',
          titleDescriptionAlreadyVoted: 'Du hast das Rezept bereits bewertet. Du kannst deine Bewertung hier ändern oder über den Button ganz unten auch löschen.',
          cookedTitle: 'Hast du das Rezept nachgekocht?',
          cookedYes: 'Ja',
          cookedNo: 'Nein',
          cookedNoAnswer: 'Keine Angabe',
          cookedBeforeTimes: 'Bereits [0] mal mit Ja bestätigt, zuletzt [1]',
          difficultyTitle: 'Wie schwierig war es?',
          difficultyDescription: 'Wie schwer fandest du es, dass Rezept nachzukochen? War alles beschrieben was du benötigst oder haben sich dir viele Fragezeichen aufgetan?',
          difficulty1Easy: 'Leicht',
          difficulty2Medium: 'OK',
          difficulty3Hard: 'Kompliziert',
          difficultyNoAnswer: 'Keine Angabe',
          rateTitle: 'Wieviele Herzen hat das Gericht verdient?',
          rateDescription: 'Bewerte mit 1 (schlecht) bis 5 (sehr gut), wie gut dir das Gericht geschmeckt hat.',
          rateNoAnswer: 'Keine Angabe',
          submitBtnText: 'Bewertung speichern',
          deleteBtnText: 'Bewertung löschen',
          cancelBtnText: 'Zurück',
          votingError: 'Beim Speichern der Änderungen ist ein Fehler aufgetreten. Du kannst es nochmal versuchen, aber wahrscheinlich hilft das nicht. Bitte informiere Stefan über diesen Fehler.',
        },
        deletionModal: {
          title: 'Löschen bestätigen',
          titleDescription: 'Du möchtest deine letzte Bewertung löschen? Kein Problem: bitte bestätige es hier nochmal kurz um ein versehentlichen Löschen auszuschließen, ansonsten kannst du jederzeit zurück zum vorherigen Fenster.',
          deletedCookedRecords: 'Auch Gekocht-Angaben entfernen',
          deletionError: 'Beim Speichern der Änderungen ist ein Fehler aufgetreten. Du kannst es nochmal versuchen, aber wahrscheinlich hilft das nicht. Bitte informiere Stefan über diesen Fehler.',
          deleteBtnText: 'Ja, Bewertung löschen',
          cancelBtnText: 'Zurück',
        },
      },
      warningNotPublished: 'Das Rezept wurde bisher nicht veröffentlicht und ist damit für andere Benutzer nicht zu finden.',
      warningNotPublishedForAdmin: 'Das Rezept wurde bisher nicht veröffentlicht ist für dich aber sichtbar, da du Administrator bist.',
      writtenBy: 'Eingetragen von [0]',
      writtenByShort: 'von [0]',
    },
    search: {
      title: '🔍 Suche nach',
      topics: {
        title: 'Suchbereiche',
        recipes: 'Rezepte',
        ingredients: 'Zutaten',
        user: 'Benutzer',
      },
      searchBusy: 'Suche läuft...',
      userFound: '[0] Benutzer gefunden',
      userResult: '[0] hat bisher [1] Rezept(e) erstellt',
      recipeFound: '[0] Rezept gefunden',
      recipesFound: '[0] Rezepte gefunden',
      nothingFound: 'Keine Treffer',
    },
    userrecipes: {
      title: 'Rezepte von [0]',
      descriptionNoRecipes: '[0] hat noch kein eigenes Rezept eingetragen.',
      descriptionWithRecipesPl: '[0] hat in diesem Kochbuch [1] Rezepte eingetragen.',
      descriptionWithRecipesSn: '[0] hat in diesem Kochbuch ein Rezept eingetragen.',
    },
  }
}
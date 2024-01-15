
// Pour faciliter le traitement, je modifie la forme d'un événement
function ConvertToEvent(event)
{
    var heureDebut = parseInt(event.start.split(':')[0]);
    var diff = Math.floor(event.duration/60);

    
    if(event.duration-diff*60 > 0)
    diff++;
    var heureFin = heureDebut + diff;
    var nom = "Id : " + event.id;
    var binding = {"Debut":heureDebut,"Fin":heureFin,"Nom":nom};
    return binding;
}

// Permet de voir dans quelles colonnes placer l'évenement
function SetColumn(event, Heures, colonnes)
{
    for(let i = 0; i < colonnes.length; i++)
    {
        var t = Heures.filter((h) => h.Colonne === colonnes[i] && h.Heure >= event.Debut && h.Heure < event.Fin);
        if(t.length === 0)
        {
            return colonnes[i];
        }
    }
    if(!colonnes.includes(colonnes.length)) colonnes.push(colonnes.length);
    return colonnes.length;
}

// On divise les créneaux en heures
function FillDictionaries(event, countColonne, Heures)
{
    countColonne = 0;
    for(let i = event.Debut; i <= event.Fin; i++)
    {
        var heure = {"Colonne":countColonne,"Nom":event.Nom,"IsRemplie":true,"Heure":i,"IsDebut":false,"IsFin":false};
        if(i === event.Debut) heure.IsDebut = true;
        if(i === event.Fin) heure.IsFin = true;
        Heures.push(heure);
    }
}

// On trace le calendrier dans la console
function TracerCalendrier(Heures)
{
    for(let i = 8; i < 22; i++)
    {
        var s = i + "    ";
        if(i >= 10) s = s = i + "   ";
        var filtres = Heures.filter((h) => h.Heure === i);
        if(filtres.length !== 0) 
        {
            filtres.sort((a,b) => {return a.Colonne < b.Colonne});
            for(let j = 0; j < filtres.length; j++)
            {
                if(filtres[j].IsDebut || filtres[j].IsFin)
                s += "###########    ";
                else
                s += "#         #   ";
            }
            console.log(s);
            s = "     ";
            for(let j = 0; j < filtres.length; j++)
            {
                if(!filtres[j].IsFin)
                {
                if(filtres[j].IsDebut)
                s += "# " + filtres[j].Nom + "  #    ";
                else
                s += "#         #   ";
                }
                
            }
            
            console.log(s);
        }
        else
        console.log(i);
    }
}

// On exécute le programme avec un jeu de tests
function Calendar()
{
    var countColonne = 0;

    var Heures = [];
    var colonnes = [];
    colonnes.push(0);

    var f1 = {"id":1,"start":"08:00", "duration":140};
    var f2 = {"id":2,"start":"12:00", "duration":120};
    var f3 = {"id":3,"start":"09:00", "duration":60};
    var creneaux = [f1,f2,f3];
    var events = [];
    for(let i = 0; i < creneaux.length; i++)
    {
        events.push(ConvertToEvent(creneaux[i]));
    }


    for(let i = 0; i < events.length; i++)
    {
    countColonne = SetColumn(events[i], Heures,colonnes);
    FillDictionaries(events[i], countColonne, Heures);
    }
    TracerCalendrier(Heures);
}
Calendar();
